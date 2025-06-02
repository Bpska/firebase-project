"use client";

import { Button } from "@/components/ui/button"; // Assuming you have a Button component
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"; // Assuming you have Card components
import { Input } from "@/components/ui/input"; // Assuming you have an Input component
import { Label } from "@/components/ui/label"; // Assuming you have a Label component
import { useRouter } from "next/navigation";
import jsPDF from 'jspdf';
import { useRegistrationForm } from "@/contexts/RegistrationFormContext";

export default function PaymentPage() {
  const router = useRouter();
  const { formData } = useRegistrationForm();

  const handlePayment = () => {
    // Placeholder for payment processing logic
    // You will use formData here to send to your backend for processing
    console.log("Processing payment...");
    router.push("/registration/history");
  };

  const generatePdf = () => {
    console.log("Generating PDF with formData:", JSON.stringify(formData, null, 2));

    const doc = new jsPDF({
      orientation: 'p',
      unit: 'mm',
      format: 'a4'
    });

    let y = 10;
    const margin = 10; // left and right margin
    const formFieldHeight = 7; // Height of each form field box
    const startX = 10;
    // Header
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text("BIJU PATNAIK UNIVERSITY OF TECHNOLOGY, ROURKELA", 105, y, { align: 'center' });
    y += 7;
    doc.setFontSize(12);
    doc.text("APPLICATION FOR REGULAR SUBJECT REGISTRATION", 105, y, { align: 'center' });
    doc.setFontSize(10);
    doc.setFont('helvetica', 'normal');
    doc.text("Form No: ACA-11", 170, y);
    y += 15;

    // Instructions
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text("INSTRUCTIONS:", 10, y);
    y += 5;
    doc.setFont('helvetica', 'normal');
    const instructions = [
      "All Students must register for subjects as per the curriculum.",
      "Students must fill up this form in BLOCK LETTERS legibly.",
      "Students must affix recent passport size photograph on the form.",
      "Students must submit the form along with prescribed fee.",
      "Last date for submission of this form is as notified by the University.",
      "No form will be accepted after the last date.",
      "Students are advised to keep a photocopy of the filled form for their record."
    ];
    instructions.forEach((instruction, index) => {
      doc.text(`${index + 1}. ${instruction}`, 10, y);
      y += 5;
    });
    y += 10; // Add some space after instructions

    // Photo Box Placeholder
    const photoBoxX = 140;
    const photoBoxY = 20; // Adjust Y position as needed
    const photoBoxWidth = 50;
    const photoBoxHeight = 60;
    doc.rect(photoBoxX, photoBoxY, photoBoxWidth, photoBoxHeight);
    doc.text('RECENT PASSPORT\nSIZE PHOTO', photoBoxX + photoBoxWidth / 2, photoBoxY + photoBoxHeight / 2, { align: 'center' });

    // Form Fields - Positioning based on the image
    y = 90; // Starting Y position for form fields
    const labelWidth = 60; // Width for labels
    const fieldWidth = 130; // Width for input fields

    // A. Name of the College:
    doc.setFont('helvetica', 'bold');
    doc.text("A. Name of the College:", startX, y);
    doc.setFont('helvetica', 'normal');
    doc.rect(startX, y + 1, fieldWidth + labelWidth, formFieldHeight); // Draw box
    doc.text(formData.collegeName, startX + 2, y + 5); // Value inside box
    y += formFieldHeight + 5;

    // B. Name of the Student:
    doc.setFont('helvetica', 'bold');
    doc.text("B. Name of the Student:", startX, y);
    doc.setFont('helvetica', 'normal');
    doc.rect(startX, y + 1, fieldWidth + labelWidth, formFieldHeight); // Draw box
    doc.text(formData.studentName, startX + 2, y + 5); // Value inside box
    y += formFieldHeight + 5;

    // C. Registration Number:
    doc.setFont('helvetica', 'bold');
    doc.text("C. Registration Number:", startX, y);
    doc.setFont('helvetica', 'normal');
    doc.rect(startX, y + 1, fieldWidth + labelWidth, formFieldHeight); // Draw box
    doc.text(formData.registrationNumber, startX + 2, y + 5); // Value inside box
    y += formFieldHeight + 5;

    // D. Discipline & Branch:
    doc.setFont('helvetica', 'bold');
    doc.text("D. Discipline & Branch:", startX, y);
    doc.setFont('helvetica', 'normal');
    doc.rect(startX, y + 1, fieldWidth + labelWidth, formFieldHeight); // Draw box
    doc.text(formData.disciplineBranch, startX + 2, y + 5); // Value inside box
    y += formFieldHeight + 5;

    // E. Semester: and F. Mobile No: (Side by side)
    const halfWidth = (fieldWidth + labelWidth - margin) / 2;
    doc.setFont('helvetica', 'bold');
    doc.text("E. Semester:", startX, y);
    doc.setFont('helvetica', 'normal');
    doc.rect(startX, y + 1, halfWidth, formFieldHeight); // Draw box for Semester
    doc.text(formData.semester, startX + 2, y + 5); // Value inside box

    doc.setFont('helvetica', 'bold');
    doc.text("F. Mobile No:", startX + halfWidth + margin, y);
    doc.setFont('helvetica', 'normal');
    doc.rect(startX + halfWidth + margin, y + 1, halfWidth, formFieldHeight); // Draw box for Mobile No
    doc.text(formData.mobileNo, startX + halfWidth + margin + 2, y + 5); // Value inside box
    y += formFieldHeight + 5;

    // E-Mail Id:
    doc.setFont('helvetica', 'bold');
    doc.text("E-Mail Id:", startX, y);
    doc.setFont('helvetica', 'normal');
    doc.rect(startX, y + 1, fieldWidth + labelWidth, formFieldHeight); // Draw box
    doc.text(formData.email, startX + 2, y + 5); // Value inside box
    y += formFieldHeight + 10; // Add extra space before subjects

    // Subject Table - This part requires more complex drawing or a plugin
    doc.setFont('helvetica', 'bold');
 doc.text("G. Subjects:", startX, y);
 y += 5;

    const tableStartY = y;
    const tableRowHeight = 7;
    const slNoColWidth = 15;
    const subjectCodeColWidth = 60;
    const subjectColWidth = 115;

    // Draw table headers
 doc.rect(startX, tableStartY, slNoColWidth, tableRowHeight);
 doc.rect(startX + slNoColWidth, tableStartY, subjectCodeColWidth, tableRowHeight);
 doc.rect(startX + slNoColWidth + subjectCodeColWidth, tableStartY, subjectColWidth, tableRowHeight);

 doc.setFontSize(10);
 doc.text("Sl.No", startX + slNoColWidth / 2, tableStartY + tableRowHeight / 2, { align: 'center' });
 doc.text("Subject Code", startX + slNoColWidth + subjectCodeColWidth / 2, tableStartY + tableRowHeight / 2, { align: 'center' });
 doc.text("Subject", startX + slNoColWidth + subjectCodeColWidth + subjectColWidth / 2, tableStartY + tableRowHeight / 2, { align: 'center' });

 y = tableStartY + tableRowHeight;

    // Draw table rows with subject data
 doc.setFont('helvetica', 'normal');
    formData.subjects.forEach((subject, index) => {
 doc.rect(startX, y, slNoColWidth, tableRowHeight);
 doc.rect(startX + slNoColWidth, y, subjectCodeColWidth, tableRowHeight);
 doc.rect(startX + slNoColWidth + subjectCodeColWidth, y, subjectColWidth, tableRowHeight);

 doc.text(String(subject.slNo), startX + slNoColWidth / 2, y + tableRowHeight / 2, { align: 'center' });
 doc.text(subject.subjectCode, startX + slNoColWidth + subjectCodeColWidth / 2, y + tableRowHeight / 2, { align: 'center' });
 doc.text(subject.subject, startX + slNoColWidth + subjectCodeColWidth + subjectColWidth / 2, y + tableRowHeight / 2, { align: 'center' });
 y += tableRowHeight;
    });

 doc.save("registration_details.pdf");
  };

  return (
    <div className="container mx-auto flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center p-8">
      <Card className="w-full max-w-md bg-gradient-to-br from-purple-100 to-indigo-100 dark:from-gray-800 dark:to-gray-900 shadow-xl rounded-lg overflow-hidden">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center text-gray-800 dark:text-gray-200">
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-center text-muted-foreground dark:text-gray-400">
            Please enter your payment details below.
          </p>

          {/* Display some form data to confirm */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md">
            <h3 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Order Summary</h3>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Student Name: <span className="font-medium">{formData.studentName}</span>
            </p>
            {/* Add more fields from formData as needed */}
          </div>

          {/* Payment Gateway Integration Area */}
          <div className="border border-dashed border-blue-300 dark:border-blue-700 p-6 rounded-md text-center text-gray-600 dark:text-gray-400">
            <p className="mb-2">This is where the actual payment gateway integration will be.</p>
            <p>You will integrate your chosen payment provider (e.g., Stripe, PayPal) here to handle the payment process.</p>
            <p className="mt-4 text-sm italic">
              (Input fields for card details, etc., will be added as part of the gateway integration)
            </p>
          </div>

          <div className="flex flex-col space-y-4"> {/* Use flex-col for stacking buttons */}
            <div className="space-y-4">
              {/* Example Input Field (Replace with actual payment form elements) */}
              <div>
                <Label htmlFor="amount" className="text-gray-700 dark:text-gray-300">Amount Due</Label>
                <Input id="amount" type="text" value="$XXX.XX" disabled className="mt-1 bg-gray-100 dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-800 dark:text-gray-200" />
              </div>
              {/* Add more payment fields as required by your gateway */}
            </div>

            <Button
              size="lg"
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 hover:from-blue-600 hover:to-purple-700"
              onClick={handlePayment}
            >
              Proceed to Payment
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
              onClick={() => router.back()} // Navigate back to the form page
            >
              Backward
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="w-full text-blue-600 border-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:border-blue-400 dark:hover:bg-gray-700"
              onClick={generatePdf}
            >
              Download Registration PDF
            </Button>
          </div> {/* Close the flex-col div */}

        </CardContent>
      </Card>
    </div>
  );
}