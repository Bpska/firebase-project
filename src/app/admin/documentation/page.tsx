"use client";

import React from 'react';
import withAdminAuth from '@/components/auth/with-admin-auth';
import AdminLayout from '@/components/layout/admin-layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'; // Using Card for sections
import { Lightbulb, Users, Lock, Database, LayoutPanelLeft } from 'lucide-react'; // Icons for sections

function DocumentationPage() {
  return (
    <AdminLayout>
      <div className="container mx-auto py-2 space-y-8">
        <h1 className="text-3xl md:text-4xl font-bold mb-8 text-slate-800 dark:text-slate-100">
          Admin Panel Documentation
        </h1>

        {/* Admin Authentication Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Lock className="mr-3 h-6 w-6 text-primary" />
              Admin Authentication
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-700 dark:text-slate-300">
            <p>Admin users are identified based on specific criteria within the Firebase authentication and Firestore database system.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong><code>isAdmin</code> Flag:</strong> A boolean field named <code>isAdmin</code> is stored in each user's document in the "users" collection in Firestore.
                If this flag is set to <code>true</code>, the user is considered an administrator.
              </li>
              <li>
                <strong>Specific Admin Email:</strong> During registration, if a user signs up with the email <code>bpskar2@gmail.com</code>,
                the <code>isAdmin</code> flag is automatically set to <code>true</code> for their account.
              </li>
              <li>
                <strong>Access Control:</strong> Admin-only pages and functionalities are protected by a Higher-Order Component (HOC) called <code>withAdminAuth</code>.
                This HOC checks the <code>isAdmin</code> flag from the authentication context before rendering any protected route.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* User Management Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Users className="mr-3 h-6 w-6 text-primary" />
              User Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-700 dark:text-slate-300">
            <p>The "User Management" page (accessible via the sidebar) allows administrators to view and manage user accounts.</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Viewing Users:</strong> All registered users are listed in a table, displaying details such as their email, UID, username (if available),
                admin status, and special access status.
              </li>
              <li>
                <strong>Granting/Revoking 'Special Access':</strong>
                For each non-admin user, there is a button to toggle their <code>hasSpecialAccess</code> permission.
                This boolean flag is stored in their user document in Firestore.
              </li>
              <li>
                <strong>Purpose of 'Special Access':</strong> If <code>hasSpecialAccess</code> is set to <code>true</code> for a regular user,
                they will be automatically redirected from standard application pages (like the homepage <code>/</code>) to a dedicated
                <code>/special-access</code> page upon login or when navigating to those standard pages. Admins are not affected by this redirection.
              </li>
            </ul>
          </CardContent>
        </Card>

        {/* Database Connection Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <Database className="mr-3 h-6 w-6 text-primary" />
              Database Connection
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-700 dark:text-slate-300">
            <p>
              User data, including authentication details (managed by Firebase Authentication) and additional user profile information
              (like <code>isAdmin</code> and <code>hasSpecialAccess</code> flags), is stored in <strong>Firebase Firestore</strong>.
            </p>
            <p>
              The Admin Panel directly interacts with Firestore to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Fetch the list of users for the User Management page.</li>
              <li>Update the <code>hasSpecialAccess</code> flag for users.</li>
              <li>Fetch admin status during the authentication process.</li>
            </ul>
            <p>
              The Firebase configuration is initialized in <code>src/lib/firebase.ts</code>.
            </p>
          </CardContent>
        </Card>

        {/* Admin Panel UI Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center text-2xl">
              <LayoutPanelLeft className="mr-3 h-6 w-6 text-primary" />
              Admin Panel UI
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-slate-700 dark:text-slate-300">
            <p>The Admin Panel utilizes a consistent layout structure for ease of navigation and use:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>
                <strong>Sidebar:</strong> Located on the left (on desktop screens; collapses or moves on mobile), the sidebar provides primary navigation
                links to different sections of the Admin Panel, such as the Dashboard, User Management, and this Documentation page.
              </li>
              <li>
                <strong>Content Area:</strong> The main area to the right of the sidebar is where the content for the selected page is displayed.
                For example, user tables, documentation text, or dashboard widgets appear here.
              </li>
              <li>
                <strong>Responsive Design:</strong> The layout is designed to be responsive, adapting to various screen sizes for accessibility on desktops,
                tablets, and mobile devices.
              </li>
            </ul>
            <p>
              UI components are primarily sourced from the <code>shadcn/ui</code> library, ensuring a modern and consistent look and feel. These components are located in <code>src/components/ui/</code>.
            </p>
          </CardContent>
        </Card>

        {/* General Note or Tip */}
        <Card className="bg-blue-50 dark:bg-blue-900/30 border-blue-200 dark:border-blue-700">
          <CardHeader>
            <CardTitle className="flex items-center text-xl text-blue-700 dark:text-blue-300">
              <Lightbulb className="mr-3 h-6 w-6" />
              General Note
            </CardTitle>
          </CardHeader>
          <CardContent className="text-blue-600 dark:text-blue-400">
            <p>
              This Admin Panel is a tool for managing users and understanding application structure.
              Ensure that any changes, especially regarding user permissions, are made with caution.
            </p>
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  );
}

export default withAdminAuth(DocumentationPage);
