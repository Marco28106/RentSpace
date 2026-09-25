"use client";

import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";

export default function AnimatedGrid({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  if (reducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: { staggerChildren: 0.06, delayChildren: 0.02 },
        },
      }}
      aria-busy="false"
    >
      {children}
    </motion.div>
  );
}

export function AnimatedItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    setReducedMotion(
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
  }, []);

  if (reducedMotion) return <div className={className}>{children}</div>;

  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, scale: 0.92, y: 16 },
        visible: {
          opacity: 1,
          scale: 1,
          y: 0,
          transition: { duration: 0.4, ease: [0.175, 0.885, 0.32, 1.275] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
