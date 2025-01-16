"use client";
import Image from "next/image";
import { memo, useRef, useState } from "react";
import styles from "./fullscreen_image_container.module.scss";
import { motion } from "framer-motion";
import TulfaCloseButton from "@/assets/icons/tulfa_close_button";

function getDeviceType() {
  const userAgent = navigator.userAgent || navigator.vendor || window.opera;

  // Check for iOS
  if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
    return 'iOS'; // It's an iOS device
  }
  
  // Check for Android
  if (/android/i.test(userAgent)) {
    return 'Android'; // It's an Android device
  }

  // If neither iOS nor Android
  return 'Other';
}


const FullscreenImageContainer = memo(
  ({
    imageSrc,
    fullscreenToggle,
    imageStyles,
    imageClassName,
    isFocusOverlay = false,
    blur = false,
    quality = 75,
  }) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const fullscreenRef = useRef<boolean>(false);

    const [isHovered, setIsHovered] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    const userAgentRef = useRef(getDeviceType())  

    // Request fullscreen mode with vendor prefixes (same as before)
    const enterFullscreen = () => {
      if (elementRef.current) {

        console.log(userAgentRef)

        elementRef.current.style.position = "fixed";
        elementRef.current.style.top = userAgentRef.current === 'iOS' ? '-5vh' : 0;
        elementRef.current.style.left = userAgentRef.current === 'iOS' ? '-5vw' : 0;
        elementRef.current.style.width = "100%";
        elementRef.current.style.height = "100%";
        elementRef.current.style.zIndex = 1500;
        elementRef.current.style.pointerEvents = "auto";

        //Move modal away
        const modalFilter = document.getElementById("modal-filter-mobile");
        if (modalFilter) {
          modalFilter.style.display = "none";
        }

        // TOGGLE FULL SCREEN REF
        fullscreenRef.current = true;
      }
    };

    // Exit fullscreen mode (same as before)
    const exitFullscreen = () => {
      // Restore previous styles
      elementRef.current.style.top = "unset";
      elementRef.current.style.top = "unset";
      elementRef.current.style.left = "unset";
      elementRef.current.style.width = "100%";
      elementRef.current.style.height = "100%";
      elementRef.current.style.position = "relative";
      elementRef.current.style.pointerEvents = "auto";
      elementRef.current.style.zIndex = 300;

      //Move modal away
      const modalFilter = document.getElementById("modal-filter-mobile");
      if (modalFilter) {
        modalFilter.style.display = "block";
      }

      elementRef.current.offsetHeight;

      fullscreenRef.current = false;

    };

    // Toggle fullscreen mode based on current state. First function fired on click
    const toggleFullscreen = () => {
      if (!fullscreenToggle) return;
      setIsHovered(false);
      if (fullscreenRef.current) {
        setIsFullscreen(false);
        setTimeout(() => {
          exitFullscreen();
        }, 200);
      } else {
        setIsFullscreen(true);
        enterFullscreen();
      }
    };

    return (
      <>
        <motion.div
          ref={elementRef}
          style={{
            ...imageStyles,
            
            backgroundColor: isFullscreen ? 'rgba(0, 0, 0, 0.8)' : 'transparent',
            backdropFilter: isFullscreen ? 'blur(10px)' : 'unset',           // Blur effect
            WebkitBackdropFilter: isFullscreen ? 'blur(10px)' : 'unset' ,  
            transition: "opacity 0.2s ease-in",
          }}
          className={`${imageClassName} ${styles.indiv_image}`}
          onClick={toggleFullscreen}
          onMouseEnter={() => {
            if (!isFocusOverlay) return;
            if (fullscreenRef.current) return;
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            if (!isFocusOverlay) return;
            if (fullscreenRef.current) return;
            setIsHovered(false);
          }}
        >
          <Image
            src={imageSrc}
            alt=""
            className={`
              ${styles.indiv_image} 
              ${imageClassName}
            `}
            placeholder={blur ? "blur" : undefined}
            quality={quality}
            style={{
              objectFit: isFullscreen ? 'contain' : 'cover'
            }}
          />

          <CloseButton
            isFullScreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        </motion.div>

        {/* Focus overlay  */}
        {isFocusOverlay && !fullscreenRef.current ? (
          <>
            <motion.div
              className={styles.hover_overlay}
              style={{opacity: isHovered && isFocusOverlay ? 0 : 1}}
              animate={{
                opacity: isHovered && !fullscreenRef.current ? 1 : 0,
              }}
            />
          </>
        ) : null}
      </>
    );
  }
);

FullscreenImageContainer.displayName = "fullscreen image container";

const CloseButton = ({ isFullScreen, toggleFullscreen }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: "10%",
        left: "50vw",
        zIndex: 400,
        pointerEvents: "auto",
      }}
      animate={{
        opacity: isFullScreen ? 1 : 0,
      }}
      transition={{
        delay: 1,
      }}
    >
      {isFullScreen && (
        <TulfaCloseButton height={60} width={60} onClick={toggleFullscreen} />
      )}
    </motion.div>
  );
};

export default FullscreenImageContainer;
