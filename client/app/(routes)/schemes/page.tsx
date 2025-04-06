
'use client';

import React, { useEffect, useRef, useState } from "react";
import Navbar from "@/components/Navbar";
import UserInfoModal from "@/components/UserInfoModal";
import { FaMicrophone, FaVolumeUp, FaFileUpload } from "react-icons/fa";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useUserData } from "@/app/context/UserDataContext";
import Image from "next/image";

export default function SchemesChatPage() {
  const { userData } = useUserData();
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [messages, setMessages] = useState<{ sender: "user" | "bot"; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { transcript, listening, resetTranscript } = useSpeechRecognition();
  const chatRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const fetchSchemes = async () => {
      if (!userData) return;
      setLoading(true);
  
      try {
        const payload = {
          ...userData,
          employmentStatus: userData.employmentStatus === "employed",
        };
      
        const response = await fetch("https://mainproj-backend.onrender.com/recommend", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      
        const data = await response.json();
        console.log("Received response:", data);
      
        let recommendation;
      
        if (data.recommendation.raw_text) {
          // Remove markdown-style ```json code block
          const cleaned = data.recommendation.raw_text
            .replace(/^```json/, "")
            .replace(/```$/, "")
            .trim();
      
          recommendation = JSON.parse(cleaned);
        } else if (data.recommendation.gov_schemes) {
          // Already structured
          recommendation = data.recommendation;
        } else {
          throw new Error("Unexpected recommendation format");
        }
      
        const schemesText = recommendation.gov_schemes
          .map((s : any) => `📌 **${s.name}**\n${s.description}\n🔗 ${s.link || "N/A"}`)
          .join("\n\n");
      
        const discountsText = recommendation.discounts
          .map((d: any) => `💸 **${d.name}**\n${d.description}\n🔗 ${d.link || "N/A"}`)
          .join("\n\n");
      
        const finalMessage = `✅ **Schemes for ${recommendation.state}**\n\n${schemesText}\n\n🍽️ **Discounts**\n\n${discountsText}`;
      
        setMessages([{ sender: "bot", text: finalMessage }]);
      } catch (error) {
        console.error("Fetch schemes error:", error);
        setMessages([{ sender: "bot", text: "❌ Failed to fetch schemes. Try again later." }]);
      }
  
      setLoading(false);
    };
  
    fetchSchemes();
  }, [userData]);

  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTop = chatRef.current.scrollHeight;
    }
  }, [messages]);

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
    setLoading(true);

    try {
      const response = await fetch("https://mainproj-backend.onrender.com/chat-schemes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ question: userInput }),
      });
      const data = await response.json();
      setMessages((prev) => [...prev, { sender: "bot", text: data.answer || "No response." }]);
    } catch (error) {
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ Error contacting server." }]);
    }
    setLoading(false);
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
      <Navbar showViewInfo={!!userData} onViewInfoClick={() => setShowInfoModal(true)} />
      <UserInfoModal isOpen={showInfoModal} onClose={() => setShowInfoModal(false)} userData={userData} />

      <div className="max-w-6xl w-full mx-auto mt-6 bg-white shadow-lg rounded-xl p-6 md:flex md:space-x-6 min-h-[80vh]">
        <div className="md:w-1/2 space-y-4 mb-6 md:mb-0">
          <h2 className="text-2xl font-bold text-purple-700">How to Use:</h2>
          <ul className="list-disc list-inside space-y-4 text-gray-700 text-base">
            <li>🔍 Explore personalized government schemes</li>
            <li>🎙️ Ask questions using text or voice</li>
            <li>💡 Get AI-powered recommendations</li>
            <li>🔊 Use speaker icon to hear the response aloud</li>
          </ul>
        </div>

        <div className="md:w-1/2 space-y-4 flex flex-col">
          <h1 className="text-2xl font-bold text-center text-purple-800">Govt Schemes AI Assistant</h1>

          {/* <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-purple-600">
              <FaFileUpload /> Upload Supporting Docs
              <input type="file" className="hidden" onChange={handleFileUpload} />
            </label>
          </div> */}

          <div ref={chatRef} className="relative flex-1 overflow-y-auto space-y-3 border rounded-md p-4 bg-gray-50 min-h-[300px] max-h-[500px]">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`rounded-lg px-4 py-2 max-w-[80%] text-sm shadow-md ${msg.sender === "user" ? "bg-purple-200 text-right" : "bg-white text-left"}`}>
                  <div className="flex items-center justify-between">
                    <span>{msg.text}</span>
                    {msg.sender === "bot" && (
                      <button onClick={() => speak(msg.text)} className="ml-2 text-purple-600 hover:text-purple-800 cursor-pointer">
                        <FaVolumeUp />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
            {loading && (
              <div className="absolute inset-0 bg-gray-200/60 backdrop-blur-sm flex items-center justify-center z-10">
                <Image src="/loading.svg" alt="Loading" width={100} height={100} className="animate-pulse" />
              </div>
            )}
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
