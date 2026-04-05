"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export function SealStamp({ size = 80 }: { size?: number }) {
  const [pressed, setPressed] = useState(false);

  return (
    <motion.button
      type="button"
      onClick={() => {
        setPressed(true);
        setTimeout(() => setPressed(false), 600);
      }}
      animate={pressed ? { scale: [1, 0.9, 1.02, 1], rotate: [0, -2, 0.5, 0] } : {}}
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ scale: 1.05 }}
      className="relative inline-flex items-center justify-center"
      aria-label="Claude Code Folding 印章"
    >
      <svg width={size} height={size} viewBox="0 0 100 100">
        <rect x="5" y="5" width="90" height="90" rx="6" fill="none" stroke="#be4040" strokeWidth="3.5" opacity={0.75} />
        <rect x="12" y="12" width="76" height="76" rx="3" fill="none" stroke="#be4040" strokeWidth="1.2" opacity={0.4} />
        <text x="50" y="40" textAnchor="middle" dominantBaseline="middle" fill="#be4040" fontSize="20" fontWeight="700" opacity={0.8}>解剖</text>
        <text x="50" y="66" textAnchor="middle" dominantBaseline="middle" fill="#be4040" fontSize="20" fontWeight="700" opacity={0.8}>天机</text>
      </svg>
      {pressed && (
        <motion.span
          initial={{ scale: 0.5, opacity: 0.35 }}
          animate={{ scale: 2, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 rounded-lg bg-red-900/20"
        />
      )}
    </motion.button>
  );
}
