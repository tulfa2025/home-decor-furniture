"use client";
import React from "react";
import {motion} from 'framer-motion'

const TulfaMenuButton = ({ 
  height, 
  width,
  onClick
}) => {
  return (
    <motion.button
      onClick={onClick}
      style={{
        opacity: 0.75
    }}
    whileHover={{
        opacity: 0.99
    }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 50 50"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="50" height="50" rx="25" fill="#EF4B32" />
        <path
          d="M25 18V32M18 25H32"
          stroke="white"
          stroke-width="3"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </motion.button>
  );
};

export default TulfaMenuButton;
