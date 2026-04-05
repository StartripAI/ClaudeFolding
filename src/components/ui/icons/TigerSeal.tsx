"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";

type Permission = "direct" | "confirm" | "gated";

const colorMap: Record<Permission, { fill: string; stroke: string; label: string }> = {
  direct: { fill: "#d4a853", stroke: "#d4a853", label: "直通" },
  confirm: { fill: "#bfa17a", stroke: "#bfa17a", label: "确认" },
  gated: { fill: "#be8680", stroke: "#be8680", label: "封存" },
};

interface TigerSealProps {
  permission: Permission;
  size?: number;
  className?: string;
}

export function TigerSeal({ permission, size = 28, className }: TigerSealProps) {
  const { fill, stroke, label } = colorMap[permission];
  const gap = permission === "direct" ? 0 : permission === "confirm" ? 3 : 6;

  return (
    <span className={cn("inline-flex items-center", className)} title={label}>
      <motion.svg
        width={size}
        height={size * 0.75}
        viewBox="0 0 32 24"
        aria-hidden
      >
        {/* Left half */}
        <motion.g
          animate={{ x: -gap }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <path
            d="M16 2C13 2 10 4 8 7C6 10 5 13 5 16C5 19 7 21 10 22H16V2Z"
            fill={fill}
            fillOpacity={0.18}
            stroke={stroke}
            strokeWidth={1}
            strokeOpacity={0.5}
          />
          <circle cx="11" cy="13" r="1.2" fill={fill} fillOpacity={0.4} />
        </motion.g>

        {/* Right half */}
        <motion.g
          animate={{ x: gap }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
        >
          <path
            d="M16 2C19 2 22 4 24 7C26 10 27 13 27 16C27 19 25 21 22 22H16V2Z"
            fill={fill}
            fillOpacity={0.18}
            stroke={stroke}
            strokeWidth={1}
            strokeOpacity={0.5}
          />
          <circle cx="21" cy="13" r="1.2" fill={fill} fillOpacity={0.4} />
        </motion.g>

        {/* Gated cross line */}
        {permission === "gated" && (
          <line
            x1="8" y1="20" x2="24" y2="4"
            stroke={stroke}
            strokeWidth={1.2}
            strokeLinecap="round"
            opacity={0.5}
          />
        )}
      </motion.svg>
    </span>
  );
}
