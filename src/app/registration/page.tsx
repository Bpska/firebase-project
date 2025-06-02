'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button'; // Assuming you have shadcn/ui buttons
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'; // Assuming you have shadcn/ui selects

export default function RegistrationPage() {
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const router = useRouter();

  const years = ['First Year', 'Second Year', 'Third Year', 'Fourth Year']; // Example years
  const departments = ['Computer Science', 'Electrical Engineering', 'Mechanical Engineering', 'Civil Engineering']; // Example departments

  const handleProceed = () => {
    if (selectedYear && selectedDepartment) {
      // Navigate to the next page, potentially passing selectedYear and selectedDepartment
      router.push(`/registration/form?year=${selectedYear}&department=${selectedDepartment}`);
    } else {
      // Optionally show an error message
      alert('Please select both Year and Department.');
    }
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="bg-white p-10 rounded-xl shadow-2xl text-center max-w-md w-full">
        <h1 className="text-4xl font-bold mb-6 text-gray-800">Select Year and Department</h1>

        <div className="mb-6">
          <label htmlFor="year" className="block text-left text-sm font-medium text-gray-700 mb-2">
            Select Year
          </label>
          <Select onValueChange={setSelectedYear}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Year" />
            </SelectTrigger>
            <SelectContent>
              {years.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="mb-8">
          <label htmlFor="department" className="block text-left text-sm font-medium text-gray-700 mb-2">
            Select Department
          </label>
          <Select onValueChange={setSelectedDepartment}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map((department) => (
                <SelectItem key={department} value={department}>
                  {department}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleProceed}
          size="lg"
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white transition-all duration-300 ease-in-out transform hover:scale-105"
        >
          Proceed to Form
        </Button>
      </div>
    </div>
  );
}