"use client";

import { motion } from "framer-motion";

interface ResultBlockProps {
  label: string;
  summary: string;
  strengths: string[];
  weaknesses: string[];
  advice: string;
  starNote?: string;
}

export default function ResultBlock({
  label,
  summary,
  strengths,
  weaknesses,
  advice,
  starNote,
}: ResultBlockProps) {
  return (
    <div className="space-y-6">
      {/* Header：從小到大 + 淡入 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center mb-8"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "backOut" }}
          className="inline-block bg-gradient-to-r from-cosmic-purple to-cosmic-pink text-white px-8 py-4 rounded-full text-2xl font-bold mb-4"
          style={{
            boxShadow: "0 8px 32px rgba(155, 93, 229, 0.4)",
          }}
        >
          {label}
        </motion.div>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-cosmic-white/80 max-w-2xl mx-auto"
        >
          {summary}
        </motion.p>
      </motion.div>

      {/* Strengths：淡入上浮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center">
          <span className="mr-2">✨</span>
          你的優勢
        </h3>
        <ul className="space-y-2">
          {strengths.map((strength, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
              className="text-cosmic-white/80 flex items-start"
            >
              <span className="text-cosmic-purple mr-2">▸</span>
              {strength}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Weaknesses：淡入上浮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="bg-cosmic-gray/50 backdrop-blur-sm border border-cosmic-purple/30 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center">
          <span className="mr-2">🔍</span>
          需要覺察的盲點
        </h3>
        <ul className="space-y-2">
          {weaknesses.map((weakness, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.9 + index * 0.1 }}
              className="text-cosmic-white/80 flex items-start"
            >
              <span className="text-cosmic-purple mr-2">▸</span>
              {weakness}
            </motion.li>
          ))}
        </ul>
      </motion.div>

      {/* Advice：淡入上浮 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1.0 }}
        className="bg-gradient-to-r from-cosmic-purple/20 to-cosmic-pink/20 backdrop-blur-sm border border-cosmic-purple/50 rounded-2xl p-6"
      >
        <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center">
          <span className="mr-2">💡</span>
          給你的建議
        </h3>
        <p className="text-cosmic-white/90 leading-relaxed">{advice}</p>
      </motion.div>

      {/* Star Note：淡入上浮 */}
      {starNote && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.1 }}
          className="bg-gradient-to-r from-cosmic-navy to-cosmic-gray backdrop-blur-sm border border-cosmic-purple rounded-2xl p-6"
        >
          <h3 className="text-xl font-semibold text-cosmic-white mb-4 flex items-center">
            <span className="mr-2">⭐</span>
            星語提醒
          </h3>
          <p className="text-cosmic-white/90 leading-relaxed italic">
            {starNote}
          </p>
        </motion.div>
      )}
    </div>
  );
}
