"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";

const XButton = ({ height, width, onClick, className, style }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${className} disable_trigger_header_button`}
      style={style}
      whileHover={{
        opacity: 0.9,
      }}
    >
      <Image
        src="/icons/x.svg"
        alt=""
        width={width}
        height={height}
      />
    </motion.button>
  );
};

const MessengerButton = ({ height, width, onClick, className, style }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${className} disable_trigger_header_button`}
      style={style}
      whileHover={{
        opacity: 0.9,
      }}
    >
      <Image
        src="/icons/messenger.svg"
        alt=""
        width={width}
        height={height}
      />
    </motion.button>
  );
};

const FBButton = ({ height, width, onClick, className, style }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${className} disable_trigger_header_button`}
      style={style}
      whileHover={{
        opacity: 0.9,
      }}
    >
      <Image
        src="/icons/fb.svg"
        alt=""
        width={width}
        height={height}
      />
    </motion.button>
  );
};

const IGButton = ({ height, width, onClick, className, style }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${className} disable_trigger_header_button`}
      style={style}
      whileHover={{
        opacity: 0.9,
      }}
    >
      <Image
        src="/icons/ig.svg"
        alt=""
        width={width}
        height={height}
      />
    </motion.button>
  );
};

const LinkedButton = ({ height, width, onClick, className, style }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${className} disable_trigger_header_button`}
      style={style}
      whileHover={{
        opacity: 0.9,
      }}
    >
      <Image
        src="/icons/linkedin.svg"
        alt=""
        width={width}
        height={height}
      />
    </motion.button>
  );
};

const WhatsButton = ({ height, width, onClick, className, style }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${className} disable_trigger_header_button`}
      style={style}
      whileHover={{
        opacity: 0.9,
      }}
    >
      <Image
        src="/icons/wa.svg"
        alt=""
        width={width}
        height={height}
      />
    </motion.button>
  );
};

const LinkButton = ({ height, width, onClick, className, style }) => {
  return (
    <motion.button
      onClick={onClick}
      className={`${className} disable_trigger_header_button`}
      style={style}
      whileHover={{
        opacity: 0.9,
      }}
    >
      <svg
        width={width}
        height={height}
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect width="44" height="44" rx="22" fill="#E9E9E9" />
        <path
          d="M19 25L25 19M21 16.0003L21.463 15.4643C22.4008 14.5266 23.6727 13.9999 24.9989 14C26.325 14.0001 27.5968 14.527 28.5345 15.4648C29.4722 16.4026 29.9989 17.6745 29.9988 19.0007C29.9987 20.3268 29.4718 21.5986 28.534 22.5363L28 23.0003M23.0001 28L22.6031 28.534C21.6544 29.4722 20.3739 29.9984 19.0396 29.9984C17.7054 29.9984 16.4249 29.4722 15.4761 28.534C15.0085 28.0716 14.6372 27.521 14.3839 26.9141C14.1305 26.3073 14 25.6561 14 24.9985C14 24.3408 14.1305 23.6897 14.3839 23.0829C14.6372 22.476 15.0085 21.9254 15.4761 21.463L16.0001 21"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </motion.button>
  );
};

export {
  XButton,
  MessengerButton,
  FBButton,
  IGButton,
  LinkedButton,
  WhatsButton,
  LinkButton,
};
