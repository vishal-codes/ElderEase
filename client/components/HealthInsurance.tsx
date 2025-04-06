"use client";

import React, { useState } from "react";
import { FaMicrophone, FaVolumeUp, FaFileUpload } from "react-icons/fa";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

export default function HealthInsuranceSupport() {
  const [messages, setMessages] = useState<
    { sender: "user" | "bot"; text: string }[]
  >([]);
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

    // TODO: Replace with actual AI API call
    const botResponse = `I'm reviewing your insurance info. Here's what I found about: "${userInput}"`;
    setMessages((prev) => [...prev, { sender: "bot", text: botResponse }]);
  };

  const handleSpeechInput = () => {
    SpeechRecognition.startListening({ continuous: false });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // TODO: Send PDF file to your backend for processing or parse it here
    console.log("PDF Uploaded:", file.name);
  };

  return (
    <div className="min-h-screen flex items-center bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 p-6">
      <div className="max-w-6xl w-full mx-auto bg-white shadow-lg rounded-xl p-6 md:flex md:space-x-6 min-h-[80vh]">
        {/* Steps Section */}
        <div className="md:w-1/2 space-y-4 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-purple-700">How to Use:</h2>
          <ul className="list-disc list-inside space-y-4 text-gray-700 text-base">
            <li>📄 Upload your Health Insurance PDF</li>
            <li>🎙️ Ask questions in the chat or use your voice</li>
            <li>🤖 AI will help you understand & maximize your claims</li>
            <li>🔊 Tap the speaker icon to hear the response</li>
          </ul>
        </div>

        {/* Chat Section */}
        <div className="md:w-1/2 space-y-4">
          <h1 className="text-2xl font-bold text-center text-purple-800">
            Health Insurance AI Support
          </h1>

          {/* Upload Section */}
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-purple-600">
              <FaFileUpload /> Upload Insurance PDF
              <input
                type="file"
                accept="application/pdf"
                className="hidden"
                onChange={handleFileUpload}
              />
            </label>
          </div>

          {/* Chat UI */}
          <div className="h-[500px] overflow-y-auto space-y-3 border rounded-md p-4 bg-gray-50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`rounded-lg px-4 py-2 max-w-[80%] text-sm shadow-md ${
                    msg.sender === "user"
                      ? "bg-purple-200 text-right"
                      : "bg-white text-left"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span>{msg.text}</span>
                    {msg.sender === "bot" && (
                      <button
                        onClick={() => speak(msg.text)}
                        className="ml-2 text-purple-600 hover:text-purple-800"
                      >
                        <FaVolumeUp />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Controls */}
          <div className="flex gap-2 items-center">
            <input
              type="text"
              value={input || transcript}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about your insurance coverage..."
              className="flex-grow p-2 border rounded-md w-[100px] sm:w-auto"
            />
            <button
              onClick={() => handleSend()}
              className="px-4 py-2 bg-purple-600 text-white rounded-md"
            >
              Send
            </button>
            <button
              onClick={handleSpeechInput}
              className={`p-2 rounded-full ${
                listening ? "bg-purple-300" : "bg-purple-100"
              } text-purple-600 hover:bg-purple-200`}
            >
              <FaMicrophone />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
