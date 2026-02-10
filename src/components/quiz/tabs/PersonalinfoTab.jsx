import {
  Card,
  Typography,
  Button,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import { useState } from "react";

export default function PersonalInfoTab({
  personalData,
  setPersonalData,
  onNext,
}) {
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!personalData.fullName?.trim())
      newErrors.fullName = "Full name is required";

    if (!personalData.email?.trim())
      newErrors.email = "Email address is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalData.email))
      newErrors.email = "Enter a valid email address";

    if (!personalData.gender) newErrors.gender = "Please select a gender";

    if (!personalData.dob) newErrors.dob = "Date of birth is required";

    if (!personalData.education?.trim())
      newErrors.education = "Education is required";

    if (!personalData.occupation?.trim())
      newErrors.occupation = "Occupation is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = async () => {
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:8000/api/personal-info/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(personalData),
      });

      if (!res.ok) {
        const error = await res.json();
        alert(error.detail || "Submission failed");
        return;
      }

      const result = await res.json();

      // Store participant ID for quiz & results
      localStorage.setItem("participantId", result.participant_id);

      onNext(); // move to quiz
    } catch (err) {
      console.error(err);
      alert("Server error. Try again later.");
    }
  };

  return (
    <Card className="p-8 md:p-10 max-w-3xl mx-auto shadow-lg">
      {/* Header */}
      <div className="text-center mb-8 space-y-2">
        <Typography variant="h4" className="font-bold text-gray-900">
          Personal Information
        </Typography>
        <Typography className="text-sm text-gray-600">
          All fields are mandatory for research purposes.
        </Typography>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Full Name */}
        <div>
          <Input
            label="Full Name *"
            value={personalData.fullName}
            error={!!errors.fullName}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                fullName: e.target.value,
              })
            }
            onBlur={validate}
          />
          {errors.fullName && (
            <p className="text-xs text-red-500 mt-1">{errors.fullName}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <Input
            type="email"
            label="Email Address *"
            value={personalData.email}
            error={!!errors.email}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                email: e.target.value,
              })
            }
            onBlur={validate}
          />
          {errors.email && (
            <p className="text-xs text-red-500 mt-1">{errors.email}</p>
          )}
        </div>

        {/* Gender */}
        <div>
          <Select
            label="Gender *"
            value={personalData.gender}
            error={!!errors.gender}
            onChange={(value) =>
              setPersonalData({ ...personalData, gender: value })
            }
            onBlur={validate}
          >
            <Option value="Male">Male</Option>
            <Option value="Female">Female</Option>
            <Option value="Prefer not to say">Prefer not to say</Option>
          </Select>
          {errors.gender && (
            <p className="text-xs text-red-500 mt-1">{errors.gender}</p>
          )}
        </div>

        {/* DOB */}
        <div>
          <Input
            type="date"
            label="Date of Birth *"
            value={personalData.dob}
            error={!!errors.dob}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                dob: e.target.value,
              })
            }
            onBlur={validate}
          />
          {errors.dob && (
            <p className="text-xs text-red-500 mt-1">{errors.dob}</p>
          )}
        </div>

        {/* Education */}
        <div>
          <Input
            label="Highest Education *"
            value={personalData.education}
            error={!!errors.education}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                education: e.target.value,
              })
            }
            onBlur={validate}
          />
          {errors.education && (
            <p className="text-xs text-red-500 mt-1">{errors.education}</p>
          )}
        </div>

        {/* Occupation */}
        <div>
          <Input
            label="Occupation *"
            value={personalData.occupation}
            error={!!errors.occupation}
            onChange={(e) =>
              setPersonalData({
                ...personalData,
                occupation: e.target.value,
              })
            }
            onBlur={validate}
          />
          {errors.occupation && (
            <p className="text-xs text-red-500 mt-1">{errors.occupation}</p>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t mt-10 pt-6 flex flex-col items-center gap-3">
        <Button
          color="blue"
          size="lg"
          onClick={handleNext}
          className="w-full md:w-auto px-10"
        >
          Start Assessment
        </Button>

        <Typography className="text-xs text-gray-500">
          * Required fields
        </Typography>
      </div>
    </Card>
  );
}
