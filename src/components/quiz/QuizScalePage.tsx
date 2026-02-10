import { useState } from "react";
import Navbar from "../navbar";
import { Card, Typography, Button } from "@material-tailwind/react";
import InstructionsTab from "./tabs/Instructionstab";
import PersonalInfoTab from "./tabs/PersonalinfoTab";
import AssessmentTab from "./tabs/Assessmenttab";
import ResultModal from "./ResultModal";

export default function QuizScalePage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const [personalData, setPersonalData] = useState({
    fullName: "",
    gender: "",
    dob: "",
    education: "",
    occupation: "",
  });

  const [answers, setAnswers] = useState(Array(30).fill(null));

  const submitAssessment = async () => {
    try {
      const response = await fetch("http://127.0.0.1:8000/assessment/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          personalInfo: personalData,
          answers: answers,
        }),
      });

      const data = await response.json();
      setShowResult(true);
    } catch (error) {
      console.error("Submission failed", error);
    }
  };

  return (
    <>
      <Navbar />

      <section className="max-w-5xl mx-auto mt-4 p-6">
        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-6">
          {["Instructions", "Personal Data", "Assessment"].map((label, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className={`pb-2 text-sm font-medium transition ${
                activeTab === i
                  ? "text-blue-600 border-b-4 border-blue-600"
                  : "text-gray-500 hover:text-blue-500"
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {activeTab === 0 && <InstructionsTab onNext={() => setActiveTab(1)} />}

        {activeTab === 1 && (
          <PersonalInfoTab
            personalData={personalData}
            setPersonalData={setPersonalData}
            onNext={() => setActiveTab(2)}
          />
        )}

        {activeTab === 2 && (
          <AssessmentTab
            answers={answers}
            setAnswers={setAnswers}
            onFinish={submitAssessment}
          />
        )}
      </section>

      {showResult && (
        <ResultModal answers={answers} onClose={() => setShowResult(false)} />
      )}
    </>
  );
}
