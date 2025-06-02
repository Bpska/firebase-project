'use client';

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useRegistrationForm, Subject } from "@/contexts/RegistrationFormContext"; // Import Subject from context

export default function RegistrationFormPage() {
  const router = useRouter();
  const { formData, updateFormData } = useRegistrationForm();
  const [studentName, setStudentName] = useState('');
  const [registrationNumber, setRegistrationNumber] = useState('');
  const [disciplineBranch, setDisciplineBranch] = useState('');
  const [semester, setSemester] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [emailId, setEmailId] = useState('');

  // Log state changes
  console.log('Student Name:', studentName);
  console.log('Registration Number:', registrationNumber);
  console.log('Discipline Branch:', disciplineBranch);
  console.log('Semester:', semester);
  console.log('Mobile No:', mobileNo);
  console.log('Email Id:', emailId);

  const [subjects, setSubjects] = useState<Subject[]>([
    { slNo: 1, subjectCode: '', subject: '' },
    { slNo: 2, subjectCode: '', subject: '' },
    { slNo: 3, subjectCode: '', subject: '' },
    { slNo: 4, subjectCode: '', subject: '' },
    { slNo: 5, subjectCode: '', subject: '' },
    { slNo: 6, subjectCode: '', subject: '' },
 { slNo: 7, subjectCode: '', subject: '' },
 { slNo: 8, subjectCode: '', subject: '' },
 { slNo: 9, subjectCode: '', subject: '' },
  ]);

  // Log subjects array changes
  console.log('Subjects:', subjects);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const handleSubjectChange = (index: number, field: keyof Subject, value: string) => {
    const newSubjects = [...subjects];
    if (field === 'slNo') {
      // Convert value to number for slNo
      newSubjects[index][field] = parseInt(value, 10);
    } else {
      newSubjects[index][field] = value;
    }
    setSubjects(newSubjects);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    const newErrors: { [key: string]: string } = {};
    const currentFormData = {
      collegeName: "NALANDA INSTITUTE OF ENGINEERING & TECHNOLOGY, BHUBANESWAR", // Assuming this is constant
      studentName,
      registrationNumber,
      disciplineBranch,
      semester,
      mobileNo,
      emailId,
      subjects,
    };

    // Log currentFormData before updating context
    console.log('currentFormData:', currentFormData);

    // Basic Validation
 if (!studentName.trim()) newErrors.studentName = "Student Name is required";
 if (!registrationNumber.trim()) newErrors.registrationNumber = "Registration Number is required";
 if (!disciplineBranch.trim()) newErrors.disciplineBranch = "Discipline & Branch is required";
 if (!semester.trim()) newErrors.semester = "Semester is required";
 if (!mobileNo.trim()) newErrors.mobileNo = "Mobile No is required";
 if (!emailId.trim()) newErrors.emailId = "E-Mail Id is required";

    // Basic Subject Validation (at least one subject code or name)
    const hasSubjectInput = subjects.some(subject => subject.subjectCode.trim() || subject.subject.trim());
    if (!hasSubjectInput) {
      newErrors.subjects = "At least one subject is required";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      // Prevent navigation if there are errors
      return;
    }

    updateFormData(currentFormData);

    // You would typically send this data to your backend for PDF generation and payment initiation

    // Reset form after successful submission (optional)
    // setStudentName('');
    // ... reset other state variables

    // Placeholder: Simulate successful submission and navigate to payment
    router.push('/registration/payment');
  }

  return (
    <div className="container mx-auto p-8 min-h-[calc(100vh-4rem)]">
      <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600">
          Subject Registration Form
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="collegeName">A. Name of the College:</Label>
            <Input
              id="collegeName"
              type="text"
              value={"NALANDA INSTITUTE OF ENGINEERING & TECHNOLOGY, BHUBANESWAR"} // Assuming this is constant
              disabled
              className="mt-1"
            />
          </div>

          <div>
            <Label htmlFor="studentName">B. Name of the Student:</Label>
            <Input
              id="studentName"
              type="text"
              value={studentName}
              onChange={(e) => setStudentName(e.target.value)}
              required
 className={`mt-1 ${errors.studentName ? 'border-red-500' : ''}`}
            />
 {errors.studentName && <p className="text-red-500 text-sm mt-1">{errors.studentName}</p>}
          </div>

          <div>
            <Label htmlFor="registrationNumber">C. Registration Number:<span className="text-red-500">*</span></Label>
            <Input
              id="registrationNumber"
              type="text"
              value={registrationNumber}
              onChange={(e) => setRegistrationNumber(e.target.value)}
              required
 className={`mt-1 ${errors.registrationNumber ? 'border-red-500' : ''}`}
            />
 {errors.registrationNumber && <p className="text-red-500 text-sm mt-1">{errors.registrationNumber}</p>}
          </div>

          <div>
            <Label htmlFor="disciplineBranch">D. Discipline & Branch:<span className="text-red-500">*</span></Label>
            <Input
              id="disciplineBranch"
              type="text"
              value={disciplineBranch}
              onChange={(e) => setDisciplineBranch(e.target.value)}
              required
 className={`mt-1 ${errors.disciplineBranch ? 'border-red-500' : ''}`}
            />
 {errors.disciplineBranch && <p className="text-red-500 text-sm mt-1">{errors.disciplineBranch}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <Label htmlFor="semester">E. Semester:<span className="text-red-500">*</span></Label>
              <Input id="semester" type="text" className={`mt-1 ${errors.semester ? 'border-red-500' : ''}`} value={semester} onChange={(e) => setSemester(e.target.value)} required/>
 {errors.semester && <p className="text-red-500 text-sm mt-1">{errors.semester}</p>}
            </div>
            <div>
              <Label htmlFor="mobileNo">F. Mobile No:<span className="text-red-500">*</span></Label>
              <Input id="mobileNo" type="text" className={`mt-1 ${errors.mobileNo ? 'border-red-500' : ''}`} value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required/>
 {errors.mobileNo && <p className="text-red-500 text-sm mt-1">{errors.mobileNo}</p>}
            </div>
          </div>

          <div>
            <Label htmlFor="emailId">E-Mail Id:<span className="text-red-500">*</span></Label>
            <Input id="emailId" type="email" className={`mt-1 ${errors.emailId ? 'border-red-500' : ''}`} value={emailId} onChange={(e) => setEmailId(e.target.value)} required />
 {errors.emailId && <p className="text-red-500 text-sm mt-1">{errors.emailId}</p>} {/* Added a closing curly brace here */}
          </div>

          <div>
            <h2 className="text-xl font-semibold mb-3 text-gray-700">G. Subjects:</h2>
 {errors.subjects && <p className="text-red-500 text-sm mt-1 mb-3">{errors.subjects}</p>}
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300 rounded-md">
                <thead>
                  <tr className="bg-gray-100 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Sl.No</th>
                    <th className="py-3 px-6 text-left">Subject Code</th>
                    <th className="py-3 px-6 text-left">Subject</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 text-sm font-light">
                  {subjects.map((subject, index) => (
                    <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                      <td className="py-3 px-6 text-left whitespace-nowrap">{subject.slNo}</td>
                      <td className="py-3 px-6 text-left">
                        <Input
                          type="text"
                          value={subject.subjectCode}
                          onChange={(e) => handleSubjectChange(index, 'subjectCode', e.target.value)}
                          className="w-full border-none focus:ring-0 focus:outline-none"
                        />
                      </td>
                      <td className="py-3 px-6 text-left">
                        <Input
                          type="text"
                          value={subject.subject}
                          onChange={(e) => handleSubjectChange(index, 'subject', e.target.value)}
                          className="w-full border-none focus:ring-0 focus:outline-none"
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <Button
              type="button" // Changed to type="button" to prevent form submission
              size="lg"
              variant="outline"
              onClick={() => router.back()} // Use router.back() to go to the previous page
            >
              Backward
            </Button>
            <Button
              type="submit" // This button still submits the form and navigates forward
              size="lg"
              className="py-3 text-lg font-semibold text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl"
            >
              Submit Registration
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}