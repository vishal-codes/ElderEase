"use client";

import Home from "@/components/Home";
import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";
import HealthInsuranceSupport from "@/components/HealthInsurance";
import PrescriptionReminder from "@/components/PrescriptionReminder";
import DailyJournal from "@/components/DailyJournal";

export default function Page() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-300 via-pink-100 to-blue-200 overflow-hidden">
      {/* Main content */}
      <Navbar />
      <LandingPage />
      {/* <Home /> */}
      {/* <HealthInsuranceSupport /> */}
      {/* <PrescriptionReminder /> */}
      {/* <DailyJournal /> */}
    </div>
  );
}
