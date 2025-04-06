
"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import {
  HiOutlineUserGroup,
  HiOutlineShieldCheck,
  HiOutlineClipboardList,
  HiOutlineChatAlt2,
  HiOutlineDocumentText,
  HiOutlineBell,
} from "react-icons/hi";

export default function LandingPage() {
  const features = [
    {
      icon: (
        <HiOutlineUserGroup size={40} className="text-purple-600 mx-auto" />
      ),
      title: "Government Subsidy Guide",
    },
    {
      icon: (
        <HiOutlineShieldCheck size={40} className="text-purple-600 mx-auto" />
      ),
      title: "Health Insurance Support",
    },
    {
      icon: (
        <HiOutlineClipboardList size={40} className="text-purple-600 mx-auto" />
      ),
      title: "Prescription Reminders",
    },
    {
      icon: <HiOutlineChatAlt2 size={40} className="text-purple-600 mx-auto" />,
      title: "Daily Journal AI Insights",
    },
    {
      icon: (
        <HiOutlineDocumentText size={40} className="text-purple-600 mx-auto" />
      ),
      title: "Exportable Health Summary",
    },
    {
      icon: <HiOutlineBell size={40} className="text-purple-600 mx-auto" />,
      title: "Emergency Assistance",
    },
  ];

  return (
    <div className=" text-gray-900">
      {/* Hero Section */}

      <section className="relative min-h-screen px-6 py-20 md:px-20 flex items-center">
        {/* Blob first */}
        <motion.div
          initial={{ opacity: 0.4, scale: 1 }}
          animate={{ opacity: 0.5, scale: 1.75 }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="pointer-events-none absolute w-[600px] h-[550px] top-[20%] left-[60%] z-0 
             bg-gradient-to-br from-pink-400 via-purple-400 to-blue-400 
             opacity-10 blur-[25px] rounded-full"
        />

        {/* Grid goes inside a relative wrapper to not overlap the blob */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 items-center w-full z-10">
          <motion.div
            className="w-full flex justify-center mb-10 md:mb-0"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Image
              src="/next.svg"
              alt="Hero Graphic"
              width={400}
              height={400}
            />
          </motion.div>
          <motion.div
            className="w-full p-6 sm:p-20 text-center md:text-left bg-white/10 backdrop-blur-xl rounded-2xl border border-white/90 shadow-lg"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            🌻
            <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-700 via-fuchsia-500 to-indigo-600 text-transparent bg-clip-text">
              ElderEase
            </h1>
            <p className="text-xl mt-4 text-indigo-700">
              Empowering seniors with easy access to healthcare and social
              support programs.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="min-h-screen px-6 md:px-20 py-20 ">
        <motion.h2
          className="text-3xl font-bold text-center mb-10 bg-gradient-to-r bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          What We Offer
        </motion.h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {features.map((item, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-xl text-center border border-purple-100"
              whileHover={{ scale: 1.07, rotate: 0.5 }}
              whileTap={{ scale: 0.97 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.5 }}
              viewport={{ once: true }}
            >
              {item.icon}
              <h3 className="text-lg font-semibold  mt-4">{item.title}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="min-h-screen px-6 md:px-20 py-20">
        <motion.h2
          className="text-3xl font-bold text-center mb-6  bg-clip-text"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Contact Us
        </motion.h2>
        <motion.form
          className="max-w-2xl mx-auto grid gap-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 p-3 rounded-xl w-full shadow-sm focus:ring-2 focus:ring-purple-300"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 p-3 rounded-xl w-full shadow-sm focus:ring-2 focus:ring-purple-300"
          />
          <textarea
            rows={4}
            placeholder="Your Message"
            className="border border-gray-300 p-3 rounded-xl w-full shadow-sm focus:ring-2 focus:ring-purple-300"
          ></textarea>
          <button
            type="submit"
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-6 rounded-xl hover:opacity-90 transition-all duration-300"
          >
            Send Message
          </button>
        </motion.form>
      </section>
    </div>
  );
}

