"use client";

import React, { ReactNode } from 'react';
import Link from 'next/link';
import { LayoutDashboard, Users, Settings, BarChart, BookText } from 'lucide-react'; // Added BookText

interface AdminLayoutProps {
  children: ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  // Basic gradient: from-blue-500 to-purple-600
  // A more subtle one for the sidebar might be: from-slate-800 to-slate-900 for dark theme
  // Or for light theme: from-slate-100 to-slate-200
  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-gradient-to-br from-slate-50 to-gray-100 dark:from-slate-900 dark:to-gray-800">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-gradient-to-b from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 p-6 shadow-lg md:min-h-screen">
        <div className="text-2xl font-bold mb-8 text-slate-700 dark:text-slate-200">Admin Panel</div>
        <nav>
          <ul>
            <li className="mb-4">
              <Link href="/admin" className="flex items-center text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                <LayoutDashboard className="mr-3 h-5 w-5" />
                Dashboard
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/users" className="flex items-center text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                <Users className="mr-3 h-5 w-5" />
                User Management
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/analytics" className="flex items-center text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                <BarChart className="mr-3 h-5 w-5" />
                Analytics
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/settings" className="flex items-center text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                <Settings className="mr-3 h-5 w-5" />
                Settings
              </Link>
            </li>
            <li className="mb-4">
              <Link href="/admin/documentation" className="flex items-center text-slate-600 dark:text-slate-300 hover:text-primary dark:hover:text-primary transition-colors">
                <BookText className="mr-3 h-5 w-5" /> {/* Using BookText icon */}
                Documentation
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-6 md:p-10 overflow-auto">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
