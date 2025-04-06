"use client";

import LandingPage from "@/components/LandingPage";
import Navbar from "@/components/Navbar";


export default function Page() {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-purple-300 via-pink-100 to-blue-200 overflow-hidden">
      {/* Main content */}
      <Navbar />
      <LandingPage />
    </div>
  );
}
