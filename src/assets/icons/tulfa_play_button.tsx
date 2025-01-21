"use client";
import React from "react";
import { motion } from "framer-motion";

const TulfaPlayButton = ({ height, width, onClick }) => {
  return (
    <motion.button
      onClick={onClick}
      style={{
        opacity: 0.75,
      }}
      whileHover={{
        opacity: 0.99,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          x="0.694444"
          y="0.694444"
          width="23.6111"
          height="23.6111"
          rx="11.8056"
          stroke="white"
          stroke-width="1.38889"
        />
        <path
          d="M9.72217 6.94434V17.361L18.0555 12.1527L9.72217 6.94434Z"
          stroke="white"
          stroke-width="1.38889"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </motion.button>
  );
};

export default TulfaPlayButton;
