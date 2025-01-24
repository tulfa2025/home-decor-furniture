"use client";
import React from "react";
import { motion } from "framer-motion";

const addPopup = (videoId: number) => {
  // Create the overlay and popup container
  const overlay = document.createElement("div");
  overlay.style.position = "fixed";
  overlay.style.top = 0;
  overlay.style.left = 0;
  overlay.style.width = "100%";
  overlay.style.height = "100%";
  overlay.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
  overlay.style.display = "flex";
  overlay.style.justifyContent = "center";
  overlay.style.alignItems = "center";
  overlay.style.zIndex = 9999;

  // Create the popup
  const popup = document.createElement("div");
  popup.style.position = "relative";
  popup.style.backgroundColor = "#fff";
  popup.style.borderRadius = "8px";
  popup.style.maxWidth = "90%";
  popup.style.maxHeight = "80%";
  popup.style.overflow = "auto";

  // Create iframe for Vimeo video
  const iframe = document.createElement("iframe");
  iframe.src = `https://player.vimeo.com/video/${videoId}`; // Replace with your Vimeo video ID
  iframe.style.minWidth = "80vw";
  iframe.style.minHeight = "50vh";
  iframe.frameBorder = "0";
  iframe.allow = "autoplay; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;

  // Add iframe to popup
  popup.appendChild(iframe);

  const closeSvg = document.createElementNS(
    "http://www.w3.org/2000/svg",
    "svg"
  );
  closeSvg.setAttribute("width", '30px');
  closeSvg.setAttribute("height", '30px');
  closeSvg.setAttribute("viewBox", "0 0 37 36");
  closeSvg.innerHTML = `
    <g filter="url(#filter0_b_2735_6319)">
        <rect x="0.335938" width="36" height="36" rx="18" fill="#666666" />
        <path d="M24.3359 12L12.3359 24M12.3359 12L24.3359 24" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </g>
    <defs>
        <filter id="filter0_b_2735_6319" x="-2.33073" y="-2.66667" width="41.3333" height="41.3333" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
            <feFlood flood-opacity="0" result="BackgroundImageFix" />
            <feGaussianBlur in="BackgroundImageFix" stdDeviation="1.33333" />
            <feComposite in2="SourceAlpha" operator="in" result="effect1_backgroundBlur_2735_6319" />
            <feBlend mode="normal" in="SourceGraphic" in2="effect1_backgroundBlur_2735_6319" result="shape" />
        </filter>
    </defs>
`;

  // Style the SVG element
  closeSvg.style.position = "absolute";
  closeSvg.style.top = "10px";
  closeSvg.style.right = "10px";
  closeSvg.style.cursor = "pointer";

  // Add event listener for close action
  closeSvg.addEventListener("click", function () {
    document.body.removeChild(overlay); // Remove the overlay when the SVG is clicked
  });

  // Append close button and popup to the overlay
  popup.appendChild(closeSvg);
  overlay.appendChild(popup);

  // Append the overlay to the body
  document.body.appendChild(overlay);
};

const TulfaPlayButton = ({ height, width, videoId }) => {
  return (
    <motion.button
      onClick={() => {
        if (videoId) addPopup(videoId);
      }}
      style={{
        opacity: 1,
      }}
      whileHover={{
        opacity: 0.75,
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
