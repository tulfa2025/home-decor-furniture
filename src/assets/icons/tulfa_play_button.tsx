"use client";
import React from "react";
import { motion } from "framer-motion";

const addPopup = (videoId: number)=> {
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
  iframe.src = `https://player.vimeo.com/video/${videoId}`;  // Replace with your Vimeo video ID
  iframe.style.minWidth = "80vw";
  iframe.style.minHeight = "50vh";
  iframe.frameBorder = "0";
  iframe.allow = "autoplay; fullscreen; picture-in-picture";
  iframe.allowFullscreen = true;

  // Add iframe to popup
  popup.appendChild(iframe);

  // Add close button
  const closeButton = document.createElement("button");
  closeButton.textContent = "Close";
  closeButton.style.position = "absolute";
  closeButton.style.top = "10px";
  closeButton.style.right = "10px";
  closeButton.style.padding = "5px 10px";
  closeButton.style.backgroundColor = "#2A266A";
  closeButton.style.color = "#fff";
  closeButton.style.border = "none";
  closeButton.style.borderRadius = "25px";
  closeButton.addEventListener("click", function() {
      document.body.removeChild(overlay);  // Remove the popup when closed
  });

  // Append close button and popup to the overlay
  popup.appendChild(closeButton);
  overlay.appendChild(popup);

  // Append the overlay to the body
  document.body.appendChild(overlay);
};

const TulfaPlayButton = ({ height, width, videoId }) => {
  return (
    <motion.button
      onClick={()=>{
        if(videoId)addPopup(videoId) 
      }}
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
