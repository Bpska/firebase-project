import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // Use useRouter from next/navigation
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { GraduationCap, BookOpen, Users, Calendar, Moon, Sun, History, ArrowRight } from "lucide-react";

const Index = () => {
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [darkMode, setDarkMode] = useState(false);
  const router = useRouter(); // Use useRouter hook

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const years = [
    { value: "first", label: "First Year", icon: Calendar },
    { value: "second", label: "Second Year", icon: BookOpen },
    { value: "third", label: "Third Year", icon: Users },
    { value: "fourth", label: "Fourth Year", icon: GraduationCap },
  ];

  const departments = [
    { value: "cse", label: "Computer Science & Engineering" },
    { value: "ece", label: "Electronics & Communication" },
    { value: "mech", label: "Mechanical Engineering" },
    { value: "civil", label: "Civil Engineering" },
    { value: "eee", label: "Electrical & Electronics" },
    { value: "it", label: "Information Technology" },
  ];

  const handleProceed = () => {
    if (selectedYear && selectedDepartment) {
      // Use query parameters or a state management library for passing data in App Router
      // localStorage is used as a simple alternative for this example
      localStorage.setItem('selectedYear', selectedYear);
      localStorage.setItem('selectedDepartment', selectedDepartment);
      router.push("/registration/form"); // Use router.push for navigation
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {/* Header with controls */}
        <div className="flex justify-end mb-6 sm:mb-8">
          <Button
            onClick={() => router.push("/history")} // Use router.push for navigation
            variant="outline"
            className="w-full sm:w-auto bg-card text-card-foreground border border-border hover:bg-muted transition-colors duration-300"
          >
            <History className="w-4 h-4 mr-2" />
            View History
          </Button>

          <Button
            onClick={() => setDarkMode(!darkMode)}
            variant="ghost"
            size="icon"
            className="bg-card text-card-foreground border border-border hover:bg-muted transition-colors duration-300"
          >
            {darkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </Button>
        </div>

        {/* Header */}
        <div className="text-center mb-8 sm:mb-12 animate-fade-in px-2">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground to-muted-foreground bg-clip-text text-transparent leading-tight">
            University Registration Portal
          </h1>
          <p className="text-lg sm:text-xl text-muted-foreground px-4">
            Complete your subject registration with ease
          </p>
        </div>

        {/* Year Selection */}
        <div className="mb-8 sm:mb-12">
          <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 sm:mb-6 text-center px-4">
            Select Your Academic Year
          </h2>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
            {years.map((year) => {
              const IconComponent = year.icon;
              return (
                <Card
                  key={year.value}
                  className={`cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 ${
                    selectedYear === year.value
                      ? "ring-2 ring-primary/50 shadow-lg bg-card"
                      : "shadow-md bg-card hover:bg-muted"
                  } border border-border touch-manipulation`}
                  onClick={() => setSelectedYear(year.value)}
                >
                  <CardHeader className="text-center p-3 sm:p-6">
                    <IconComponent className="w-8 h-8 sm:w-12 sm:h-12 mx-auto mb-2 text-primary" />
                    <CardTitle className="text-sm sm:text-xl leading-tight text-card-foreground">{year.label}</CardTitle>
                  </CardHeader>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Department Selection */}
        {selectedYear && (
          <div className="mb-8 sm:mb-12 animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground mb-4 sm:mb-6 text-center px-4">
              Select Your Department
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6">
              {departments.map((dept) => (
                <Card
                  key={dept.value}
                  className={`cursor-pointer transform transition-all duration-300 hover:scale-105 hover:shadow-xl active:scale-95 ${
                    selectedDepartment === dept.value
                      ? "ring-2 ring-primary/50 shadow-lg bg-card"
                      : "shadow-md bg-card hover:bg-muted"
                  } border border-border touch-manipulation`}
                  onClick={() => setSelectedDepartment(dept.value)}
                >
                  <CardHeader className="p-3 sm:p-6">
                    <CardTitle className="text-sm sm:text-lg text-center leading-tight text-card-foreground">{dept.label}</CardTitle>
                    <CardDescription className="text-muted-foreground text-center text-xs sm:text-sm">
                      Click to select this department
                    </CardDescription>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        )}

        {/* Proceed Button */}
        {selectedYear && selectedDepartment && (
          <div className="text-center animate-fade-in px-4">
            <Button
              onClick={handleProceed}
              className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90 font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-lg text-base sm:text-lg transform transition-all duration-300 hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl touch-manipulation"
            >
              Proceed to Registration Form
            </Button>
          </div>
        )}
     </div>
    </div>
  );
};

export default Index;