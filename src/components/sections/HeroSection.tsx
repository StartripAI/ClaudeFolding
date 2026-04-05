"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  useInView,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";
import { ParticleBackground } from "@/components/ui/ParticleBackground";

/* ── animation helpers ── */

const fy = (delay: number) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" as const, delay },
});

/* ── CountUp component ── */

function CountUp({
  target,
  suffix = "",
}: {
  target: number;
  suffix?: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, target, {
      duration: 1.5,
      ease: "easeOut",
    });
    return controls.stop;
  }, [isInView, count, target]);

  useEffect(() => {
    const unsub = rounded.on("change", (v) => setDisplay(v));
    return unsub;
  }, [rounded]);

  return (
    <span ref={ref}>
      {display}
      {suffix}
    </span>
  );
}

/* ── stats data (two rows) ── */

const stats = [
  {
    zhLabel: "十一令连环",
    target: 11,
    suffix: "",
    dataLabel: "步执行链",
  },
  {
    zhLabel: "三省五部",
    target: 8,
    suffix: "",
    dataLabel: "座架构节点",
  },
  {
    zhLabel: "虎符廿五",
    target: 25,
    suffix: "+",
    dataLabel: "件工具",
  },
  {
    zhLabel: "诏令九五",
    target: 95,
    suffix: "",
    dataLabel: "条命令",
  },
];

/* ── HeroSection ── */

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative z-10 flex min-h-screen items-center justify-center"
    >
      <ParticleBackground />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        {/* title */}
        <motion.h1
          {...fy(0.2)}
          className="font-display text-6xl font-bold leading-[1.08] text-foreground sm:text-7xl lg:text-8xl"
        >
          <motion.span
            initial={{ clipPath: "inset(0 100% 0 0)" }}
            animate={{ clipPath: "inset(0 0% 0 0)" }}
            transition={{ duration: 1.2, ease: "easeOut", delay: 0.4 }}
            className="inline-block"
          >
            Claude Code 折叠
          </motion.span>
        </motion.h1>

        {/* subtitle */}
        <motion.p
          {...fy(0.5)}
          className="mx-auto mt-6 max-w-lg text-xl text-muted"
        >
          52 万行源码，五层折叠。一朝拆尽，天机毕露。
        </motion.p>

        {/* stat counters — two rows */}
        <motion.div
          {...fy(0.7)}
          className="mx-auto mt-14 max-w-2xl"
        >
          {/* Top row: Chinese cultural labels (gold, display font) */}
          <div className="flex items-center justify-center">
            {stats.map((stat, i) => (
              <div key={stat.zhLabel} className="flex items-center">
                <div className="px-4 sm:px-7">
                  <span className="font-display text-xl font-bold text-accent sm:text-2xl">
                    {stat.zhLabel}
                  </span>
                </div>
                {i < stats.length - 1 && (
                  <div className="h-5 w-px bg-accent/15" />
                )}
              </div>
            ))}
          </div>

          {/* Bottom row: Data numbers (mono, gray, small) */}
          <div className="mt-3 flex items-center justify-center">
            {stats.map((stat, i) => (
              <div key={stat.dataLabel} className="flex items-center">
                <div className="px-4 sm:px-7">
                  <span className="font-mono text-xs text-muted/50 tabular-nums">
                    <CountUp target={stat.target} suffix={stat.suffix} />
                    {" "}
                    {stat.dataLabel}
                  </span>
                </div>
                {i < stats.length - 1 && (
                  <div className="h-3 w-px bg-white/6" />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div {...fy(0.9)} className="mt-10">
          <a
            href="#agent-loop"
            className="inline-block rounded-full border border-accent/40 bg-accent/10 px-7 py-3 text-sm font-medium text-accent transition-colors hover:bg-accent/20"
          >
            展开第一折 ↓
          </a>
        </motion.div>
      </div>
    </section>
  );
}
