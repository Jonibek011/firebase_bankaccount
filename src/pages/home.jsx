import React from "react";
import { IoChatbubbleOutline } from "react-icons/io5";
import { MdTaskAlt } from "react-icons/md";
import { FiDollarSign } from "react-icons/fi";
import { LuSparkles } from "react-icons/lu";
import { HiArrowRight } from "react-icons/hi";
import { motion } from "framer-motion";

import { Link } from "react-router-dom";
//components
import { Testimonials } from "../components/home/Testimonial";
import Features from "../components/home/Features";
import { Articles } from "../components/home/Articles";
function home() {
  return (
    <section className="min-h-[400vh] bg-gradient-to-br from-slate-950 via-purple-950  to-slate-950">
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute  top-0 left-[40%] translate-x-[-50%] inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-300 mb-8 border border-purple-500/20"
      >
        {" "}
        <LuSparkles className="w-4 h-4" />
        <span>Modern way to manage your life</span>
      </motion.div>
      <div className="relative min-h-screen flex items-center justify-center overflow-hidden ">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-[-15%] left-[40%] translate-x-[-50%] w-96 h-96 bg-purple-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/30 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.5, 0.3, 0.5],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </div>

        {/* Navigation */}
        <motion.nav
          className="absolute top-0 left-0 right-0 z-50 px-6 py-6"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-xl flex items-center justify-center">
                <LuSparkles className="text-white w-6 h-6" />
              </div>
              <span className="text-white text-2xl">lifeHub</span>
            </div>

            <div className="hidden md:flex items-center gap-8 text-gray-300">
              <a
                href="#features"
                className="hover:text-white transition-colors"
              >
                Opportunity
              </a>
              <a href="#pricing" className="hover:text-white transition-colors">
                Price
              </a>
              <button className="px-6 py-2 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-colors">
                Sign Up
              </button>
            </div>
          </div>
        </motion.nav>

        {/* Hero Content */}
        <div className="relative w-full z-10 max-w-6xl mt-40  mx-auto px-6 text-center">
          <motion.h1
            className="text-white text-7xl  mb-6 max-w-4xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Hello welcome to
            <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
              LifeHub
            </span>
          </motion.h1>

          <motion.p
            className="text-gray-400 text-lg md:text-2xl mb-12 max-w-2xl mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            You are all-in-one platform for a better life
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <Link
              to="dashboard"
              initial={{ scale: 1 }}
              whileTap={{ scale: 0.95 }}
              className="group cursor-pointer px-8 py-4 bg-gradient-to-r from-purple-500 to-blue-600 rounded-full text-white flex items-center gap-2 hover:shadow-2xl hover:shadow-purple-500/50 transition-all"
            >
              Get started <HiArrowRight className="text-white w-6 h-6" />
            </Link>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors border border-white/20">
              Get demo
            </button>
          </motion.div>

          <motion.div
            className="statistic-cards mt-20 flex gap-10  justify-between  max-w-lg mx-auto"
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            <div>
              <h2 className="text-white text-3xl">10K+</h2>
              <p className="text-gray-400">Active Users</p>
            </div>
            <div>
              <h2 className="text-white text-3xl">50K+</h2>
              <p className="text-gray-400">Tasks Completed</p>
            </div>
            <div>
              <h2 className="text-white text-3xl">99%</h2>
              <p className="text-gray-400">Satisfaction</p>
            </div>
          </motion.div>

          {/* Floating Cards Preview */}
          <motion.div
            className="mt-20 relative"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1, delay: 1 }}
          >
            <div className="relative w-full max-w-4xl mx-auto">
              <motion.div
                className="absolute left-0 top-0 w-64 h-80 bg-[#ffffff09] shadow-xl   backdrop-blur-2xl rounded-2xl border border-purple-500/20 p-6"
                animate={{
                  y: [0, -20, 0],
                  rotate: [-2, -4, -2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex gap-4">
                  <div className="mb-4 rounded-2xl flex justify-center items-center bg-gradient-to-br from-pink-500 to-pink-800  w-12 h-12">
                    <IoChatbubbleOutline className="w-6 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-lg text-white font-medium">New Chat</h2>
                    <p className="text-green-500 flex items-center gap-1">
                      {" "}
                      <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>{" "}
                      3 online
                    </p>
                  </div>
                </div>
                <div className="w-full mt-3 mb-8 bg-[#ffffff11] border border-[#ffffff1a] rounded-xl p-3">
                  <h1 className="text-white text-start">
                    Hey team! Ready for the meating?
                  </h1>
                  <p className="text-sm text-blue-600 text-start">2 min ago</p>
                </div>
                <div className="space-y-2">
                  <div className="h-3 bg-white/20 rounded w-3/4" />
                  <div className="h-3 bg-white/20 rounded w-1/2" />
                </div>
              </motion.div>

              <motion.div
                className="relative shadow-xl mx-auto w-80 h-96 bg-gradient-to-br from-blue-500/5 to-blue-700/5 backdrop-blur-xl rounded-2xl border border-blue-500/20 p-6 flex flex-col gap-5"
                animate={{
                  y: [0, -30, 0],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br  from-purple-600 from-20% to-purple-900 to- rounded-2xl flex justify-center items-center  mb-4">
                    <MdTaskAlt className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white text-lg font-medium">
                      Task Manager
                    </h2>
                    <p className="text-slate-500">24 tasks today</p>
                  </div>
                </div>
                <div className="border border-[#ffffff1a] bg-[#ffffff11] p-3 rounded-xl">
                  <h2 className="text-white text-start flex gap-1 items-center">
                    {" "}
                    <span className="w-5 h-5 inline-block rounded-[5px] bg-green-500"></span>
                    Complete design review
                  </h2>
                  <p className="text-start text-sm text-blue-600">Due today</p>
                </div>

                <div className="border border-[#ffffff1a] bg-[#ffffff11] p-3 rounded-xl">
                  <h2 className="text-white text-start flex gap-1 items-center">
                    {" "}
                    <span className="w-5 h-5 inline-block rounded-[5px] bg-purple-500"></span>
                    Update documentation
                  </h2>
                  <p className="text-start text-sm text-blue-600">
                    Due Tomorrow
                  </p>
                </div>

                <div className="space-y-3">
                  <div className="h-3 bg-white/20 rounded w-full" />
                  <div className="h-3 bg-white/20 rounded w-5/6" />
                  <div className="h-3 bg-white/20 rounded w-4/5" />
                </div>
              </motion.div>

              <motion.div
                className="absolute shadow-xl right-0 top-0 w-64 h-80 bg-gradient-to-br from-pink-500/10 to-pink-500/5 backdrop-blur-xl rounded-2xl border border-pink-500/10 p-6 flex flex-col gap-5"
                animate={{
                  y: [0, -20, 0],
                  rotate: [2, 4, 2],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <div className="flex gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-600 from-20% to-blue-900 rounded-2xl flex justify-center items-center mb-4">
                    <FiDollarSign className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h2 className="text-white">Monthly Budjet</h2>
                    <p className="text-sm text-slate-400">Current month</p>
                  </div>
                </div>

                <div className="border border-[#ffffff1a] bg-[#ffffff11] p-3 rounded-xl flex gap-3">
                  <div className="w-2 h-12 bg-[#f1523d] rounded-full"></div>
                  <div>
                    <h2 className="text-white">Monthly Expense</h2>
                    <p className="text-gray-400 text-start text-sm ">
                      Total: <span className="text-blue-600">255$</span>
                    </p>
                  </div>
                </div>

                <div className="border border-[#ffffff1a] bg-[#ffffff11] p-3 rounded-xl flex gap-3">
                  <div className="w-2 h-12 bg-blue-500 rounded-full"></div>
                  <div>
                    <h2 className="text-white">Monthly Income</h2>
                    <p className="text-gray-400 text-start text-sm ">
                      Total: <span className="text-green-600">1835$</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      <div>
        <Features />
      </div>
      <div className="testimonials">
        <Testimonials />
      </div>
      <div className="article">
        <Articles />
      </div>
    </section>
  );
}

export default home;
