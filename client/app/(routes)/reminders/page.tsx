// File: components/PrescriptionReminder.tsx

"use client";

import React, { useState, useEffect } from "react";
import { FaFileUpload, FaTrashAlt, FaPlus } from "react-icons/fa";

interface Reminder {
  medicine: string;
  time: string; // HH:mm
  instructions: string;
  taken?: boolean;
  day: string; // e.g., "Monday"
}

export default function PrescriptionReminder() {
  const [fileName, setFileName] = useState("");
  const [reminders, setReminders] = useState<Reminder[]>([]);
  const [newReminder, setNewReminder] = useState<Reminder>({
    medicine: "",
    time: "",
    instructions: "",
    day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
  });

  // Request notification permission
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      Notification.permission !== "granted"
    ) {
      Notification.requestPermission();
    }
  }, []);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setFileName(file.name);

    // TODO: Replace with actual backend call
    const mockedReminders: Reminder[] = [
      {
        medicine: "Paracetamol",
        time: "09:00",
        instructions: "After breakfast",
        day: "Monday",
      },
      {
        medicine: "Amoxicillin",
        time: "14:42",
        instructions: "Before lunch",
        day: "Monday",
      },
    ];

    setReminders(mockedReminders);
  };

  const scheduleReminder = (reminder: Reminder) => {
    const [hour, minute] = reminder.time.split(":").map(Number);
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(hour);
    reminderTime.setMinutes(minute - 2);
    reminderTime.setSeconds(0);

    const delay = reminderTime.getTime() - now.getTime();

    if (delay > 0 && Notification.permission === "granted") {
      setTimeout(() => {
        new Notification(`⏰ Time to take ${reminder.medicine}`, {
          body: `${reminder.instructions}`,
        });
      }, delay);
    }
  };

  useEffect(() => {
    reminders.forEach((r) => scheduleReminder(r));
  }, [reminders]);

  const markAsTaken = (index: number) => {
    const updated = [...reminders];
    updated[index].taken = !updated[index].taken;
    setReminders(updated);
  };

  const deleteReminder = (index: number) => {
    const updated = reminders.filter((_, i) => i !== index);
    setReminders(updated);
  };

  const addReminder = () => {
    if (!newReminder.medicine || !newReminder.time) return;
    setReminders([...reminders, newReminder]);
    setNewReminder({
      medicine: "",
      time: "",
      instructions: "",
      day: new Date().toLocaleDateString("en-US", { weekday: "long" }),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-white to-blue-100 p-6">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-xl p-6 space-y-6">
        <h1 className="text-2xl font-bold text-purple-700 text-center">
          Prescription Reminder Setup
        </h1>

        {/* Upload Section */}
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 cursor-pointer text-purple-600">
            <FaFileUpload /> Upload Prescription (PDF/Image)
            <input
              type="file"
              accept="application/pdf,image/*"
              className="hidden"
              onChange={handleFileUpload}
            />
          </label>
          {fileName && (
            <span className="text-sm text-gray-600">{fileName}</span>
          )}
        </div>

        {/* Add Reminder Form */}
        <div className="flex flex-col md:flex-row gap-4 items-center">
          <input
            type="text"
            placeholder="Medicine Name"
            value={newReminder.medicine}
            onChange={(e) =>
              setNewReminder({ ...newReminder, medicine: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="time"
            value={newReminder.time}
            onChange={(e) =>
              setNewReminder({ ...newReminder, time: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <input
            type="text"
            placeholder="Instructions (e.g., after dinner)"
            value={newReminder.instructions}
            onChange={(e) =>
              setNewReminder({ ...newReminder, instructions: e.target.value })
            }
            className="border p-2 rounded w-full"
          />
          <button
            onClick={addReminder}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-md"
          >
            <FaPlus /> Add
          </button>
        </div>

        {/* Reminders List */}
        {reminders.length > 0 && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-700">
              Today&apos;s Reminders
            </h2>
            <ul className="space-y-2">
              {reminders.map((r, idx) => (
                <li
                  key={idx}
                  className={`p-4 flex justify-between items-center border rounded-md shadow-sm ${
                    r.taken ? "bg-green-100" : "bg-gray-50"
                  }`}
                >
                  <div>
                    <p className="font-semibold">💊 {r.medicine}</p>
                    <p className="text-sm text-gray-600">
                      {r.time} ({r.instructions}) — {r.day}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => markAsTaken(idx)}
                      className={`px-3 py-1 rounded text-sm ${
                        r.taken
                          ? "bg-green-600 text-white"
                          : "bg-purple-200 text-purple-800"
                      }`}
                    >
                      {r.taken ? "Taken" : "Mark Taken"}
                    </button>
                    <button
                      onClick={() => deleteReminder(idx)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrashAlt />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
