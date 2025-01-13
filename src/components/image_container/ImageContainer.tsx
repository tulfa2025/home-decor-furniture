"use client";
import Image from "next/image";
import { memo, useRef, useEffect, useCallback, useState } from "react";
import styles from "./image_container.module.scss";
import { motion } from "framer-motion";
import TulfaCloseButton from "@/assets/icons/tulfa_close_button";

const ImageContainer = memo(
  ({
    imageSrc,
    fullscreenToggle,
    imageStyles,
    imageClassName,
    priority,
    hoverImageSrc,
    isFocusOverlay = false,
    blur = false,
  }) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const safariElementStyleRef = useRef(null);
    const fullscreenRef = useRef<boolean>(false);

    // Function to handle fullscreen changes (without re-rendering the component)
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        fullscreenRef.current = true;
      } else {
        fullscreenRef.current = false;
      }
    };

    // Request fullscreen mode with vendor prefixes (same as before)
    const enterFullscreen = () => {
      if (elementRef.current) {
        if (elementRef.current.requestFullscreen) {
          elementRef.current.requestFullscreen();
        } else if (elementRef.current.mozRequestFullScreen) {
          // Firefox
          elementRef.current.mozRequestFullScreen();
        } else if (elementRef.current.webkitRequestFullscreen) {
          // Chrome, Safari
          elementRef.current.webkitRequestFullscreen();
        } else if (elementRef.current.msRequestFullscreen) {
          // IE/Edge
          elementRef.current.msRequestFullscreen();
        } else {
          // Store previous stylings
          safariElementStyleRef.current = {
            position: elementRef.current.style.position,
            top: elementRef.current.style.top,
            left: elementRef.current.style.left,
            width: elementRef.current.style.width,
            height: elementRef.current.style.height,
            zIndex: elementRef.current.style.zIndex,
          };

          // Fallback: Simulate fullscreen with CSS
          elementRef.current.style.position = "fixed";
          elementRef.current.style.top = 0;
          elementRef.current.style.left = 0;
          elementRef.current.style.width = "100vw";
          elementRef.current.style.height = "100vh";
          elementRef.current.style.zIndex = 300;
        }
      }
    };

    // Exit fullscreen mode (same as before)
    const exitFullscreen = () => {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.mozCancelFullScreen) {
        // Firefox
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        // Chrome, Safari
        document.webkitExitFullscreen();
      } else if (document.msExitFullscreen) {
        // IE/Edge
        document.msExitFullscreen();
      } else {
        // Restore previous styles
        const prev = safariElementStyleRef.current;
        elementRef.current.style.position = prev.position;
        elementRef.current.style.top = prev.top;
        elementRef.current.style.left = prev.left;
        elementRef.current.style.width = prev.width;
        elementRef.current.style.height = prev.height;
        elementRef.current.style.zIndex = prev.zIndex;
    }
    };

    // Toggle fullscreen mode based on current state
    const toggleFullscreen = useCallback(() => {
      if (!fullscreenToggle) return;

      setIsHovered(false);
      if (fullscreenRef.current) {
        setIsFullscreen(false);
        exitFullscreen();
      } else {
        setIsFullscreen(true);
        enterFullscreen();
      }
    }, []);

    // Set up fullscreen change listener
    // Setup fullscreen event listeners without affecting component state
    useEffect(() => {
      document.addEventListener("fullscreenchange", handleFullscreenChange);
      document.addEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      ); // Safari
      document.addEventListener("mozfullscreenchange", handleFullscreenChange); // Firefox
      document.addEventListener("MSFullscreenChange", handleFullscreenChange); // IE/Edge

      return () => {
        document.removeEventListener(
          "fullscreenchange",
          handleFullscreenChange
        );
        document.removeEventListener(
          "webkitfullscreenchange",
          handleFullscreenChange
        );
        document.removeEventListener(
          "mozfullscreenchange",
          handleFullscreenChange
        );
        document.removeEventListener(
          "MSFullscreenChange",
          handleFullscreenChange
        );
      };
    }, []);

    const [isHovered, setIsHovered] = useState(false);
    const [isFullscreen, setIsFullscreen] = useState(false);

    return (
      <>
        <motion.div
          ref={elementRef}
          style={{
            ...imageStyles,
            opacity: isHovered && (hoverImageSrc || isFocusOverlay) ? 0 : 1,
            transition: "opacity 0.2s ease-in",
          }}
          className={`${imageClassName} ${styles.indiv_image}`}
          onClick={toggleFullscreen}
          onMouseEnter={() => {
            if (!hoverImageSrc && !isFocusOverlay) return;
            if (fullscreenRef.current) return;
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            if (!hoverImageSrc && !isFocusOverlay) return;
            setIsHovered(false);
          }}
        >
          <Image
            src={imageSrc}
            alt=""
            className={`${styles.indiv_image} ${imageClassName}`}
            placeholder={blur ? "blur" : undefined}
          />

          <CloseButton
            isFullScreen={isFullscreen}
            toggleFullscreen={toggleFullscreen}
          />
        </motion.div>

        {/* If alternative image */}
        {hoverImageSrc ? (
          <Image
            src={hoverImageSrc}
            alt=""
            style={{
              ...imageStyles,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.2s ease-out",
            }}
            className={`${imageClassName} ${styles.indiv_image_hover}`}
            onClick={toggleFullscreen}
            placeholder={blur ? "blur" : undefined}
          />
        ) : null}

        {/* Focus overlay  */}
        {isFocusOverlay && !fullscreenRef.current ? (
          <>
            <Image
              src={imageSrc}
              alt=""
              className={`${imageClassName} ${styles.indiv_image_hover}`}
            />
            <motion.div
              className={styles.hover_overlay}
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

ImageContainer.displayName = "image container";

const CloseButton = ({ isFullScreen, toggleFullscreen }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: "10%",
        left: "50vw",
        zIndex: 400,
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

export default ImageContainer;
