'use client';
import React, { useState } from 'react';

interface UserProfile {
  name: string;
  age: string;
  incomeRange: string;
  location: string;
  employmentStatus: string;
  veteranStatus: boolean;
  disabilityStatus: boolean;
}

interface Props {
  userData: UserProfile | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function UserInfoModal({ userData, isOpen, onClose }: Props) {
  if (!isOpen || !userData) return null;

  return (
    <div className="fixed inset-0 bg-white/30 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl w-80 shadow-xl relative">
        <button onClick={onClose} className="absolute top-2 right-3 text-xl text-gray-500 hover:text-red-500">×</button>
        <h3 className="text-lg font-semibold mb-4">Your Info</h3>
        <ul className="space-y-2 text-sm">
          <li><strong>Name:</strong> {userData.name}</li>
          <li><strong>Age:</strong> {userData.age}</li>
          <li><strong>Income:</strong> {userData.incomeRange}</li>
          <li><strong>Location:</strong> {userData.location}</li>
          <li><strong>Employment:</strong> {userData.employmentStatus}</li>
          <li><strong>Veteran:</strong> {userData.veteranStatus ? 'Yes' : 'No'}</li>
          <li><strong>Disabled:</strong> {userData.disabilityStatus ? 'Yes' : 'No'}</li>
        </ul>
        {/* Add edit button logic here if needed */}
      </div>
    </div>
  );
}
