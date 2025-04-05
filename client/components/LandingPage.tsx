"use client";

import { motion } from "framer-motion";
import Image from "next/image";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 items-center px-6 py-20 md:px-20">
        <motion.div
          className="w-full flex justify-center mb-10 md:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Image src="/next.svg" alt="Hero Graphic" width={400} height={400} />
        </motion.div>
        <motion.div
          className="w-full text-center md:text-left"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl font-bold mb-4">ElderEase</h1>
          <p className="text-xl text-gray-600">
            Empowering seniors with easy access to healthcare and social support
            programs.
          </p>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="px-6 md:px-20 py-20 bg-gray-100">
        <motion.h2
          className="text-3xl font-semibold text-center mb-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          What We Offer
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {[
            "Government Subsidy Guide",
            "Health Insurance Support",
            "Prescription Reminders",
            "Daily Journal AI Insights",
            "Exportable Health Summary",
            "Emergency Assistance",
          ].map((feature, idx) => (
            <motion.div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-md text-center"
              whileHover={{ scale: 1.05 }}
            >
              <h3 className="text-xl font-medium mb-2">{feature}</h3>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section className="px-6 md:px-20 py-20 bg-white">
        <motion.h2
          className="text-3xl font-semibold text-center mb-6"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          Contact Us
        </motion.h2>
        <form className="max-w-2xl mx-auto grid gap-6">
          <input
            type="text"
            placeholder="Your Name"
            className="border border-gray-300 p-3 rounded-xl w-full"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="border border-gray-300 p-3 rounded-xl w-full"
          />
          <textarea
            rows={4}
            placeholder="Your Message"
            className="border border-gray-300 p-3 rounded-xl w-full"
          ></textarea>
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-6 rounded-xl hover:bg-blue-700"
          >
            Send Message
          </button>
        </form>
      </section>
    </div>
  );
}
