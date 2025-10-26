/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { Menu, X, CheckCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const LandingPage = ({ onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const fadeInUp = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="bg-white shadow-sm"
      >
        <div className="max-w-[1440px] mx-auto px-4 py-4 flex justify-between items-center">
          <motion.h1
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl font-bold text-indigo-600"
          >
            TicketFlow
          </motion.h1>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate("login")}
              className="px-4 py-2 text-indigo-600 hover:text-indigo-800"
            >
              Login
            </motion.button>
            <motion.button
              whileHover={{
                scale: 1.05,
                boxShadow: "0 10px 25px rgba(79, 70, 229, 0.3)",
              }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate("signup")}
              className="px-6 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Get Started
            </motion.button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="md:hidden bg-white border-t px-4 py-4 flex flex-col gap-2 overflow-hidden"
            >
              <button
                onClick={() => onNavigate("login")}
                className="px-4 py-2 text-indigo-600 text-left"
              >
                Login
              </button>
              <button
                onClick={() => onNavigate("signup")}
                className="px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Get Started
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
        <div className="max-w-[1440px] mx-auto px-4 py-20 md:py-32 relative z-10">
          {/* Animated Circle */}
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute top-10 right-10 w-32 h-32 bg-yellow-400 rounded-full opacity-20"
          />

          {/* Hero Content */}
          <div className="max-w-2xl">
            <motion.h2
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-4xl md:text-6xl font-bold mb-6"
            >
              Manage Your Tickets Effortlessly
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="text-xl mb-8 text-indigo-100"
            >
              Track, organize, and resolve support tickets with our powerful
              management system.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2)",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("signup")}
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-gray-100"
              >
                Get Started Free
              </motion.button>

              <motion.button
                whileHover={{
                  scale: 1.05,
                  y: -5,
                  backgroundColor: "rgba(255, 255, 255, 1)",
                  color: "#4F46E5",
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onNavigate("login")}
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600"
              >
                Login
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Wave Divider */}
        <svg
          className="absolute bottom-0 left-0 w-full"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#f8fafc"
            d="M0,64 C240,96 480,96 720,64 C960,32 1200,32 1440,64 L1440,120 L0,120 Z"
          ></path>
        </svg>
      </section>

      {/* Features Section */}
      <section className="max-w-[1440px] mx-auto px-4 py-16">
        <motion.h3
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-3xl font-bold text-center mb-12 text-gray-800"
        >
          Why Choose TicketFlow?
        </motion.h3>

        <motion.div
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Easy Tracking",
              desc: "Monitor all tickets in one place with real-time status updates",
            },
            {
              title: "Fast Resolution",
              desc: "Prioritize and resolve tickets quickly with our intuitive interface",
            },
            {
              title: "Full Control",
              desc: "Create, edit, and manage tickets with complete flexibility",
            },
          ].map((feature, i) => (
            <motion.div
              key={i}
              variants={fadeInUp}
              whileHover={{
                y: -10,
                boxShadow: "0 25px 50px rgba(0, 0, 0, 0.15)",
                transition: { duration: 0.3 },
              }}
              className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <motion.div
                whileHover={{ rotate: 360, scale: 1.1 }}
                transition={{ duration: 0.6 }}
                className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mb-4"
              >
                <CheckCircle className="text-indigo-600" />
              </motion.div>
              <h4 className="text-xl font-semibold mb-2 text-gray-800">
                {feature.title}
              </h4>
              <p className="text-gray-600">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="max-w-[1440px] mx-auto px-4 text-center">
          <p>&copy; 2025 TicketFlow. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
