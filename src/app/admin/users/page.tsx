"use client";

import React, { useEffect, useState, useCallback } from 'react'; // Added useCallback
import withAdminAuth from '@/components/auth/with-admin-auth';
import AdminLayout from '@/components/layout/admin-layout';
import { db } from '@/lib/firebase';
import { collection, getDocs, Timestamp, doc, updateDoc } from 'firebase/firestore'; // Added doc, updateDoc
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from '@/components/ui/table';
import { Loader2, AlertTriangle } from 'lucide-react';
import { Badge } from '@/components/ui/badge'; // For isAdmin flag

// Define a type for our user data for better type safety
interface UserData {
  id: string; // Firestore document ID
  uid: string;
  email: string;
  username?: string;
  sex?: string;
  isAdmin: boolean;
  hasSpecialAccess: boolean; // Added field
  createdAt?: Timestamp | Date;
}

function UserManagementPage() {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<Record<string, boolean>>({}); // To track updates per user

  // fetchUsers is not wrapped in useCallback anymore, as it will be defined inside useEffect
  // or it could be, but the isMounted logic is cleaner if it's part of the effect's scope.

  useEffect(() => {
    let isMounted = true; // Flag to track mount status

    const fetchUsersInternal = async () => {
      if (!isMounted) return; // Prevent updates if unmounted
      setLoading(true);
      setError(null);
      try {
        const usersCollectionRef = collection(db, 'users');
        const querySnapshot = await getDocs(usersCollectionRef);
        if (!isMounted) return; // Check again after await

        const usersList = querySnapshot.docs.map(docSnap => {
          const data = docSnap.data();
          return {
            id: docSnap.id,
          uid: data.uid,
          email: data.email,
          username: data.username,
          sex: data.sex,
          isAdmin: data.isAdmin || false,
          hasSpecialAccess: data.hasSpecialAccess || false,
          createdAt: data.createdAt,
        } as UserData;
      });

        if (isMounted) {
          setUsers(usersList);
        }
      } catch (err) {
        console.error("Error fetching users:", err);
        if (isMounted) {
          setError("Failed to fetch user data. Please try again later.");
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };

    fetchUsersInternal();

    return () => {
      isMounted = false; // Cleanup: set isMounted to false when component unmounts
    };
  }, []); // Empty dependency array: run once on mount and clean up on unmount

  const toggleSpecialAccess = async (userId: string, currentStatus: boolean) => {
    // For toggleSpecialAccess, the risk of unmounted state updates is lower
    // as it's a direct user interaction, and usually faster.
    // However, for extreme robustness, a similar isMounted check could be added
    // or AbortController for the Firestore update if it were a longer operation.
    // For now, focusing on fetchUsers as it's on initial load.
    setUpdating(prev => ({ ...prev, [userId]: true }));
    setError(null); // Clear previous errors specific to this action
    try {
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        hasSpecialAccess: !currentStatus,
      });
      // Update UI optimistically
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.id === userId ? { ...u, hasSpecialAccess: !currentStatus } : u
        )
      );
      // Optionally, show a success toast/message to the admin here
    } catch (err) {
      console.error(`Error updating special access for user ${userId}:`, err);
      setError(`Failed to update special access for user ${userId}.`);
      // Revert optimistic update if needed, or re-fetch all users
      // await fetchUsers(); // Or revert specific user
    } finally {
      setUpdating(prev => ({ ...prev, [userId]: false }));
    }
  };

  const formatDate = (dateValue: Timestamp | Date | undefined) => {
    if (!dateValue) return 'N/A';
    if (dateValue instanceof Timestamp) {
      return dateValue.toDate().toLocaleDateString();
    }
    if (dateValue instanceof Date) {
      return dateValue.toLocaleDateString();
    }
    return 'Invalid Date';
  };


  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-full">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="ml-4 text-lg">Loading users...</p>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="flex flex-col items-center justify-center h-full text-red-600 dark:text-red-400">
          <AlertTriangle className="h-12 w-12 mb-4" />
          <p className="text-lg text-center">{error}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="container mx-auto py-2">
        <h1 className="text-2xl md:text-3xl font-bold mb-6 text-slate-800 dark:text-slate-100">User Management</h1>
        <Card> {/* Assuming Card component is available and styled */}
          <Table>
            <TableCaption>A list of registered users.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="min-w-[150px]">Email</TableHead>
                <TableHead className="hidden md:table-cell min-w-[100px]">UID</TableHead>
                <TableHead className="hidden lg:table-cell">Username</TableHead>
                {/* <TableHead className="hidden lg:table-cell">Sex</TableHead> */}
                <TableHead>Is Admin?</TableHead>
                <TableHead>Special Access?</TableHead>
                <TableHead className="hidden md:table-cell">Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center text-muted-foreground"> {/* Adjusted colSpan */}
                    No users found.
                  </TableCell>
                </TableRow>
              ) : (
                users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="font-medium break-all max-w-xs">{user.email}</TableCell>
                    <TableCell className="hidden md:table-cell break-all max-w-[150px] truncate">{user.uid}</TableCell>
                    <TableCell className="hidden lg:table-cell">{user.username || 'N/A'}</TableCell>
                    {/* <TableCell className="hidden lg:table-cell">{user.sex || 'N/A'}</TableCell> */}
                    <TableCell>
                      <Badge variant={user.isAdmin ? 'default' : 'outline'}
                             className={user.isAdmin ? 'bg-sky-500 hover:bg-sky-600 text-white dark:bg-sky-600 dark:hover:bg-sky-700 cursor-default' : 'cursor-default'}>
                        {user.isAdmin ? 'Yes' : 'No'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge variant={user.hasSpecialAccess ? 'default' : 'outline'}
                             className={user.hasSpecialAccess ? 'bg-green-500 hover:bg-green-600 text-white dark:bg-green-600 dark:hover:bg-green-700 cursor-default' : 'cursor-default'}>
                        {user.hasSpecialAccess ? 'Granted' : 'Denied'}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{formatDate(user.createdAt)}</TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => toggleSpecialAccess(user.id, user.hasSpecialAccess)}
                        disabled={updating[user.id] || user.isAdmin}
                        title={user.isAdmin ? "Admin status grants all access" : (user.hasSpecialAccess ? "Revoke Special Access" : "Grant Special Access")}
                      >
                        {updating[user.id] ? <Loader2 className="h-4 w-4 animate-spin" /> : (user.hasSpecialAccess ? 'Revoke' : 'Grant')}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </Card>
      </div>
    </AdminLayout>
  );
}

import { Card } from "@/components/ui/card"; // Ensure Card is imported
import { Button } from "@/components/ui/button"; // Import Button

export default withAdminAuth(UserManagementPage);
