"use client";

import React, { createContext, useContext, useState, ReactNode } from 'react';

// Define the interface for the subject
export interface Subject {
  slNo: number;
  subjectCode: string;
  subject: string;
}

// Define the interface for the entire form data
interface RegistrationFormData {
  collegeName: string;
  studentName: string;
  registrationNumber: string;
  disciplineBranch: string;
  semester: string;
  mobileNo: string;
  email: string;
  subjects: Subject[];
  year: string;
  department: string;
}

// Define the interface for the context value
interface RegistrationFormContextType {
  formData: RegistrationFormData;
  updateFormData: (data: Partial<RegistrationFormData>) => void;
  resetFormData: () => void;
}

// Create the context with a default undefined value
const RegistrationFormContext = createContext<RegistrationFormContextType | undefined>(undefined);

// Create the provider component
export const RegistrationFormProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    collegeName: '',
    studentName: '',
    registrationNumber: '',
    disciplineBranch: '',
    semester: '',
    mobileNo: '',
    email: '',
    subjects: [{ slNo: 0, subjectCode: '', subject: '' }], // Initial subject
    year: '',
    department: '',
  });

  const updateFormData = (data: Partial<RegistrationFormData>) => {
    setFormData(prevData => ({ ...prevData, ...data }));
  };

  const resetFormData = () => {
    setFormData({
      collegeName: '',
      studentName: '',
      registrationNumber: '',
      disciplineBranch: '',
      semester: '',
      mobileNo: '',
      email: '',
      subjects: [{ slNo: 0, subjectCode: '', subject: '' }],
      year: '',
      department: '',
    });
  };

  return (
    <RegistrationFormContext.Provider value={{ formData, updateFormData, resetFormData }}>
      {children}
    </RegistrationFormContext.Provider>
  );
};

// Create a hook to use the context
export const useRegistrationForm = () => {
  const context = useContext(RegistrationFormContext);
  if (context === undefined) {
    throw new Error('useRegistrationForm must be used within a RegistrationFormProvider');
  }
  return context;
};