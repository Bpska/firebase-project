"use client";

import withAdminAuth from "@/components/auth/with-admin-auth";
import AdminLayout from "@/components/layout/admin-layout"; // Import AdminLayout
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

function AdminDashboardPage() { // Renamed for clarity, as it's the dashboard page
  return (
    <AdminLayout> {/* Wrap content with AdminLayout */}
      <div className="container mx-auto py-2"> {/* Reduced py from 10 to 2 to avoid double padding */}
        <Card className="w-full"> {/* Changed max-w-2xl to w-full to better fit layout */}
          <CardHeader>
            <CardTitle className="text-2xl md:text-3xl">Admin Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-slate-700 dark:text-slate-300">Welcome to the Admin Dashboard!</p>
            <p className="text-sm text-slate-500 dark:text-slate-400">This page is only accessible to administrators.</p>
            {/* You can add more admin-specific content here */}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
}

export default withAdminAuth(AdminDashboardPage); // Export the HOC-wrapped page
