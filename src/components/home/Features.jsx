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
    <section id="features" className="relative py-32 px-6">
      <div className="max-w-7xl mx-auto">
        <AnimatePresence>
          <motion.div
            // variants={boxVariants}
            // initial="hidden"
            // animate="visible"
            // exit="exit"
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.8, once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            exit={{ opacity: 0 }}
            className="text-center mb-20"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-purple-300 mb-6 border border-purple-500/20">
              <LuZap className="w-4 h-4" />
              <span>Imkoniyatlar</span>
            </div>
            <h2 className="text-white text-5xl md:text-6xl mb-6">
              Barcha kerakli vositalar{" "}
              <span className="bg-gradient-to-r from-purple-400 to-blue-500 bg-clip-text text-transparent">
                bir joyda
              </span>
            </h2>
            <p className="text-gray-400 text-xl max-w-2xl mx-auto">
              lifeHub bilan hayotingizni yanada samarali va tartibli qiling
            </p>
          </motion.div>
        </AnimatePresence>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <motion.div
            className="bg-gradient-to-br flex flex-col gap-6  from-purple-500/5 to-purple-700/5 border border-purple-500/20 rounded-3xl p-6 "
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: 0.8 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-xl w-16 h-16 flex justify-center items-center bg-gradient-to-br from-purple-500 to-purple-950">
              <BsChat className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white text-xl font-medium">Smart Chat</h2>
            <p className="text-gray-400 text-lg">
              Jamoangiz bilan real vaqtda muloqot qiling. Guruhlar, fayllar va
              emodjilarga to'liq qo'llab quvvatlash
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br flex flex-col gap-6 from-purple-500/5 to-purple-700/5 border border-purple-500/20  rounded-3xl p-6 "
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-xl w-16 h-16 flex justify-center items-center bg-gradient-to-br from-blue-600 to-blue-700">
              <LuWallet className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white text-xl font-medium">Smart Chat</h2>
            <p className="text-gray-400 text-lg">
              Jamoangiz bilan real vaqtda muloqot qiling. Guruhlar, fayllar va
              emodjilarga to'liq qo'llab quvvatlash
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br flex flex-col gap-6 from-purple-500/5 to-purple-700/5 border border-purple-500/20  rounded-3xl p-6 "
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-xl w-16 h-16 flex justify-center items-center bg-gradient-to-br from-pink-500 to-pink-700">
              <FiCheckSquare className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white text-xl font-medium">Smart Chat</h2>
            <p className="text-gray-400 text-lg">
              Jamoangiz bilan real vaqtda muloqot qiling. Guruhlar, fayllar va
              emodjilarga to'liq qo'llab quvvatlash
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br flex flex-col gap-6  from-purple-500/5 to-purple-700/5 border border-purple-500/20 rounded-3xl p-6 "
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: 0.8 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-xl w-16 h-16 flex justify-center items-center bg-gradient-to-br from-orange-600 to-orange-700">
              <LuZap className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white text-xl font-medium">Smart Chat</h2>
            <p className="text-gray-400 text-lg">
              Jamoangiz bilan real vaqtda muloqot qiling. Guruhlar, fayllar va
              emodjilarga to'liq qo'llab quvvatlash
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br flex flex-col gap-6 from-purple-500/5 to-purple-700/5 border border-purple-500/20  rounded-3xl p-6 "
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-xl w-16 h-16 flex justify-center items-center bg-gradient-to-br from-green-600 to-green-700">
              <LuShield className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white text-xl font-medium">Smart Chat</h2>
            <p className="text-gray-400 text-lg">
              Jamoangiz bilan real vaqtda muloqot qiling. Guruhlar, fayllar va
              emodjilarga to'liq qo'llab quvvatlash
            </p>
          </motion.div>

          <motion.div
            className="bg-gradient-to-br flex flex-col gap-6 from-purple-500/5 to-purple-700/5 border border-purple-500/20  rounded-3xl p-6 "
            initial={{ y: 150, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ amount: 0.4, once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            exit={{ opacity: 0 }}
          >
            <div className="rounded-xl w-16 h-16 flex justify-center items-center bg-gradient-to-br from-indigo-500 to-indigo-700">
              <LuSmartphone className="w-8 h-8 text-white" />
            </div>
            <h2 className="text-white text-xl font-medium">Smart Chat</h2>
            <p className="text-gray-400 text-lg">
              Jamoangiz bilan real vaqtda muloqot qiling. Guruhlar, fayllar va
              emodjilarga to'liq qo'llab quvvatlash
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Features;
