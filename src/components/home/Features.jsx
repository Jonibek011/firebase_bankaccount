import React from "react";
import { BsChat } from "react-icons/bs";
import { LuWallet } from "react-icons/lu";
import { FiCheckSquare } from "react-icons/fi";
import { LuZap } from "react-icons/lu";
import { LuShield } from "react-icons/lu";
import { LuSmartphone } from "react-icons/lu";

import { motion, useInView, AnimatePresence } from "framer-motion";

function Features() {
  return (
    <section id="features" className="relative py-16 md:py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence>
          <motion.div
            // variants={boxVariants}
            // initial="hidden"
            // animate="visible"
            // exit="exit"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            exit={{ opacity: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-300 mb-6 border border-purple-500/20">
              <LuZap className="w-4 h-4" />
              <span>Opportunities</span>
            </div>
            <h2 className="text-white text-5xl md:text-6xl mb-6">
              All the necessary tools{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                in one place
              </span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              Make your life more productive and organized with LifeHub
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="group bg-gradient-to-br    pb-10 flex flex-col gap-6  from-purple-500/5 to-purple-700/5 border border-purple-500/20 rounded-3xl p-6 "
            initial={{ y: 100, scale: 0.5, opacity: 0 }}
            whileInView={{ y: 0, scale: 1, opacity: 1 }}
            transition={{ duration: 0.6 }}
            whileHover={{
              scale: 1.05,
              borderColor: "rgb(168 85 247 / 0.5)",
              transition: {
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
          >
            <div className="group-hover:scale-110 transition-all duration-400 rounded-xl w-14 h-14 flex justify-center items-center bg-gradient-to-br from-purple-500 to-purple-800">
              <BsChat className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-white text-2xl font-medium">Smart Chat</h2>
            <p className="text-gray-400 text-lg">
              Communicate with your team in real time. Full support for groups,
              files, and emojis
            </p>
          </motion.div>

          <motion.div
            className="group bg-gradient-to-br    pb-10 flex flex-col gap-6 from-purple-500/5 to-purple-700/5 border border-purple-500/20  rounded-3xl p-6 "
            initial={{ y: 100, scale: 0.5, opacity: 0 }}
            whileInView={{ y: 0, scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.05,
              borderColor: "rgb(168 85 247 / 0.5)",
              transition: {
                duration: 0.4,
                ease: "easeInOut",
                delay: 0,
              },
            }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <div className="group-hover:scale-110 transition-all duration-500 rounded-xl w-14 h-14 flex justify-center items-center bg-gradient-to-br from-blue-600 to-blue-700">
              <LuWallet className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-white text-2xl font-medium">Cost Control</h2>
            <p className="text-gray-400 text-lg">
              Monitor your financial status in real time. Complete analysis with
              charts and reports
            </p>
          </motion.div>

          <motion.div
            className="group bg-gradient-to-br  pb-10 flex flex-col gap-6 from-purple-500/5 to-purple-700/5 border border-purple-500/20  rounded-3xl p-6 "
            initial={{ y: 100, scale: 0.5, opacity: 0 }}
            whileInView={{ y: 0, scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.05,
              borderColor: "rgb(168 85 247 / 0.5)",
              transition: {
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="group-hover:scale-110 transition-all duration-500 rounded-xl w-14 h-14 flex justify-center items-center bg-gradient-to-br from-pink-500 to-pink-700">
              <FiCheckSquare className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-white text-2xl font-medium">Managing Tasks</h2>
            <p className="text-gray-400 text-lg">
              Organize all your tasks in one place. Work with priorities and
              deadlines
            </p>
          </motion.div>

          <motion.div
            className="group bg-gradient-to-br  pb-10 flex flex-col gap-6  from-purple-500/5 to-purple-700/5 border border-purple-500/20 rounded-3xl p-6 "
            initial={{ y: 100, scale: 0.5, opacity: 0 }}
            whileInView={{ y: 0, scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.05,
              borderColor: "rgb(168 85 247 / 0.5)",
              transition: {
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="group-hover:scale-110 transition-all duration-500 rounded-xl w-14 h-14 flex justify-center items-center bg-gradient-to-br from-orange-600 to-orange-700">
              <LuZap className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-white text-2xl font-medium">Fast Work</h2>
            <p className="text-gray-400 text-lg">
              High speed and efficiency. A platform that works without any
              delays
            </p>
          </motion.div>

          <motion.div
            className="group bg-gradient-to-br     pb-10 flex flex-col gap-6 from-purple-500/5 to-purple-700/5 border border-purple-500/20  rounded-3xl p-6 "
            initial={{ y: 100, scale: 0.5, opacity: 0 }}
            whileInView={{ y: 0, scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.05,
              borderColor: "rgb(168 85 247 / 0.5)",
              transition: {
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="group-hover:scale-110 transition-all duration-500 rounded-xl w-14 h-14 flex justify-center items-center bg-gradient-to-br from-green-600 to-green-700">
              <LuShield className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-white text-2xl font-medium">Security</h2>
            <p className="text-gray-400 text-lg">
              Your data is encrypted and protected. Your privacy is our
              priority.
            </p>
          </motion.div>

          <motion.div
            className="group bg-gradient-to-br  pb-10 flex flex-col gap-6 from-purple-500/5 to-purple-700/5 border border-purple-500/20  rounded-3xl p-6 "
            initial={{ y: 100, scale: 0.5, opacity: 0 }}
            whileInView={{ y: 0, scale: 1, opacity: 1 }}
            whileHover={{
              scale: 1.05,
              borderColor: "rgb(168 85 247 / 0.5)",
              transition: {
                duration: 0.4,
                ease: "easeInOut",
              },
            }}
            transition={{ duration: 0.6 }}
          >
            <div className="group-hover:scale-110 transition-all duration-500 rounded-xl w-14 h-14 flex justify-center items-center bg-gradient-to-br from-indigo-500 to-indigo-700">
              <LuSmartphone className="w-7 h-7 text-white" />
            </div>
            <h2 className="text-white text-2xl font-medium">
              Responsive Design
            </h2>
            <p className="text-gray-400 text-lg">
              Works perfectly on any device. Optimized for mobile, tablet and
              desktop
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Features;
