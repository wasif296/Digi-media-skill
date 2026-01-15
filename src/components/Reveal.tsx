import React, { type ReactNode } from "react";
import { motion } from "framer-motion";

interface Props {
  children: ReactNode;
  width?: "fit-content" | "100%";
}

export const Reveal = ({ children, width = "fit-content" }: Props) => {
  return (
    <div style={{ position: "relative", width, overflow: "hidden" }}>
      <motion.div
        variants={{
          hidden: { opacity: 0, y: 75 },
          visible: { opacity: 1, y: 0 },
        }}
        initial="hidden"
        whileInView="visible"
        transition={{ 
          duration: 0.6, 
          delay: 0.25, 
          ease: "easeOut" 
        }}
        viewport={{ once: true }}
      >
        {children}
      </motion.div>
    </div>
  );
};