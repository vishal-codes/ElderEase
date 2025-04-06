// File: components/DailyJournal.tsx

"use client";

import React, { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";
import { FaMicrophone, FaTrash, FaRegStickyNote } from "react-icons/fa";

interface JournalEntry {
  id: number;
  title: string;
  content: string;
  date: string;
}

export default function DailyJournal() {
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [current, setCurrent] = useState("");
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  const generateTitle = async (text: string): Promise<string> => {
    // TODO: Call a GenAI API to get a smart title
    return "A Glimpse of the Day";
  };

  const handleSave = async () => {
    if (!current && !transcript) return;
    const content = current || transcript;
    const title = await generateTitle(content);
    const newEntry: JournalEntry = {
      id: Date.now(),
      title,
      content,
      date: new Date().toLocaleDateString(),
    };
    setEntries([newEntry, ...entries]);
    setCurrent("");
    resetTranscript();
  };

  const handleDelete = (id: number) => {
    setEntries(entries.filter((e) => e.id !== id));
    setSelectedEntry(null);
  };

  if (!browserSupportsSpeechRecognition) {
    return (
      <p className="text-center text-red-500">
        Browser doesn&apos;t support speech recognition.
      </p>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-purple-800">
          Daily Journal
        </h1>

        {/* Journal Input */}
        <div className="bg-white p-4 rounded-xl shadow space-y-3">
          <textarea
            rows={4}
            placeholder="Write about your day..."
            className="w-full p-3 border rounded-md resize-none"
            value={current || transcript}
            onChange={(e) => setCurrent(e.target.value)}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-purple-600 text-white rounded-md"
            >
              Save
            </button>
            <button
              onClick={() =>
                SpeechRecognition.startListening({ continuous: false })
              }
              className={`p-2 rounded-full ${
                listening ? "bg-purple-300" : "bg-purple-100"
              } text-purple-700`}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>

        {/* Entries Grid */}
        <div className="grid md:grid-cols-2 gap-4">
          {entries.map((entry) => (
            <div
              key={entry.id}
              onClick={() => setSelectedEntry(entry)}
              className="cursor-pointer p-4 bg-white rounded-md shadow hover:shadow-lg"
            >
              <h3 className="text-lg font-semibold text-purple-800">
                <FaRegStickyNote className="inline mr-2" /> {entry.title}
              </h3>
              <p className="text-sm text-gray-600">{entry.date}</p>
              <p className="mt-2 text-gray-700 line-clamp-3">{entry.content}</p>
            </div>
          ))}
        </div>

        {/* Selected Entry Modal */}
        {selectedEntry && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-lg space-y-4 relative">
              <h2 className="text-xl font-bold text-purple-700">
                {selectedEntry.title}
              </h2>
              <p className="text-sm text-gray-500">{selectedEntry.date}</p>
              <p className="text-gray-700 whitespace-pre-wrap">
                {selectedEntry.content}
              </p>
              <div className="flex justify-end gap-2 pt-4">
                <button
                  className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md"
                  onClick={() => setSelectedEntry(null)}
                >
                  Close
                </button>
                <button
                  className="px-3 py-1 bg-red-500 text-white rounded-md"
                  onClick={() => handleDelete(selectedEntry.id)}
                >
                  <FaTrash className="inline mr-1" /> Delete
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
