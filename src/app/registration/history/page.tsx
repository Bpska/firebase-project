"use client";

import React from 'react';

import { Button } from "@/components/ui/button";
import Link from "next/link";
import jsPDF from 'jspdf';
import { useRegistrationForm } from "@/contexts/RegistrationFormContext";

// This is a placeholder for your history data structure
interface SubmissionHistoryItem {
  id: string;
  name: string;
  registrationNumber: string;
  pdfLink: string;
  receiptLink: string;
}

// Placeholder data - replace with data fetched from your backend
const submissionHistory: SubmissionHistoryItem[] = [
  {
    id: "sub_1",
    name: "John Doe",
    registrationNumber: "REG12345",
    pdfLink: "/api/pdf/sub_1",
    receiptLink: "/api/receipt/sub_1",
  },
  {
    id: "sub_2",
    name: "Jane Smith",
    registrationNumber: "REG67890",
    pdfLink: "/api/pdf/sub_2",
    receiptLink: "/api/receipt/sub_2",
  },
];

export default function HistoryPage() {
  const { formData } = useRegistrationForm();

  const generatePdf = () => {
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Registration Form Details", 10, 10);

    doc.setFontSize(12);
    let y = 30;
    for (const [key, value] of Object.entries(formData)) {
      let displayValue = '';
      if (typeof value === 'string' || typeof value === 'number') {
        displayValue = String(value);
      } else if (Array.isArray(value)) {
        doc.text(`${key}:`, 10, y);
        y += 7;
        value.forEach((item, index) => {
          if (typeof item === 'object' && item !== null && 'slNo' in item && 'subjectCode' in item && 'subject' in item) {
            doc.text(`  ${item.slNo}. ${item.subjectCode} - ${item.subject}`, 15, y);
            y += 7;
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        displayValue = JSON.stringify(value);
      }

      if (displayValue) {
        doc.text(`${key}: ${displayValue}`, 10, y);
        y += 7;
      }
    }

    doc.save("registration_details.pdf");
  };

  return (
    <div className="container mx-auto py-12 px-4 min-h-[calc(100vh-4rem)]">
      <h1 className="mb-8 text-4xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
        Submission History
      </h1>

      {submissionHistory.length === 0 ? (
        <p className="text-center text-muted-foreground">No submissions found yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-background rounded-lg shadow-lg overflow-hidden">
            <thead className="bg-primary text-primary-foreground">
              <tr>
                <th className="py-3 px-4 text-left">Name</th>
                <th className="py-3 px-4 text-left">Registration Number</th>
                <th className="py-3 px-4 text-left">PDF</th>
                <th className="py-3 px-4 text-left">Receipt</th>
              </tr>
            </thead>
            <tbody>
              {submissionHistory.map((submission, index) => (
                <React.Fragment key={submission.id}>
                  <tr
                    className={`border-b border-border transition-colors ${
                      index % 2 === 0 ? "bg-card" : "bg-card/80"
                    } hover:bg-muted`}
                  >
                    <td className="py-3 px-4">{submission.name}</td>
                    <td className="py-3 px-4">{submission.registrationNumber}</td>
                    <td className="py-3 px-4">
                      <Button variant="link" asChild className="text-primary hover:underline">
                        <Link href={submission.pdfLink}>View PDF</Link>
                      </Button>
                    </td>
                    <td className="py-3 px-4">
                      <Button variant="link" asChild className="text-primary hover:underline">
                        <Link href={submission.receiptLink}>View Receipt</Link>
                      </Button>
                    </td>
                  </tr>

                  <tr key={`${submission.id}-pdf`}>
                    <td colSpan={4} className="py-2 px-4 text-right">
                      <Button onClick={generatePdf} variant="outline" size="sm">
                        Download PDF (Current Form Data)
                      </Button>
                    </td>
                  </tr>
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
