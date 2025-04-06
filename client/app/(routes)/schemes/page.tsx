'use client';

import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import UserInfoModal from "@/components/UserInfoModal";
import { FaMicrophone, FaVolumeUp, FaFileUpload } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useUserData } from "@/app/context/UserDataContext";

export default function SchemesChatPage() {
  const { userData } = useUserData();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const { transcript, listening, resetTranscript } = useSpeechRecognition();

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  const handleSend = async (msg?: string) => {
    const userInput = msg || input;
    if (!userInput.trim()) return;

    setMessages((prev) => [...prev, { sender: "user", text: userInput }]);
    setInput("");
    resetTranscript();

    const botResponse = `Based on your info, here's a scheme you might qualify for: "${userInput}" related options.`;
    setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
  };

  const handleSpeechInput = () => {
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    console.log("File uploaded (future use):", file.name);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-4">
      <UserInfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} userData={userData} />

      <div className="max-w-6xl w-full mx-auto mt-6 bg-white shadow-lg rounded-xl p-6 md:flex md:space-x-6 min-h-[80vh]">
        {/* Info Section */}
        <div className="md:w-1/2 space-y-4 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-purple-700">How to Use:</h2>
          <ul className="list-disc list-inside space-y-4 text-gray-700 text-base">
            <li>🔍 Explore personalized government schemes</li>
            <li>🎙️ Ask questions using text or voice</li>
            <li>💡 Get AI-powered recommendations</li>
            <li>🔊 Use speaker icon to hear the response aloud</li>
          </ul>
        </div>

        {/* Chat Section */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold text-center text-purple-800">Govt Schemes AI Assistant</h1>

          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-purple-600">
              <FaFileUpload /> Upload Supporting Docs
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
          </div>

          <div className="h-[500px] overflow-y-auto space-y-3 border rounded-md p-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] text-sm shadow-md ${msg.sender === "user" ? "bg-purple-200 text-right" : "bg-white text-left"}`}>
                  <div className="flex items-center justify-between">
                    <span>{msg.text}</span>
                    {msg.sender === "bot" && (
                      <button onClick={() => speak(msg.text)} className="ml-2 text-purple-600 hover:text-purple-800">
                        <FaVolumeUp />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={input || transcript}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a scheme you need..."
              className="flex-grow p-2 border rounded-md"
            />
            <button onClick={() => handleSend()} className="px-4 py-2 bg-purple-600 text-white rounded-md">
              Send
            </button>
            <button
              onClick={handleSpeechInput}
              className={`p-2 rounded-full ${listening ? "bg-purple-300" : "bg-purple-100"} text-purple-600 hover:bg-purple-200`}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
