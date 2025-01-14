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
    hoverImageSrc,
    isFocusOverlay = false,
    blur = false,
    quality = 75,
  }) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const safariElementStyleRef = useRef(null);
    const fullscreenRef = useRef<boolean>(false);

    // Toggle fullscreen mode based on current state. First function fired on click
    const toggleFullscreen = () => {
      if (!fullscreenToggle) return;
      setIsHovered(false);
      if (fullscreenRef.current) {
        setIsFullscreen(false);
        setTimeout(()=>{
          exitFullscreen();
        }, 200)
      } else {
        setIsFullscreen(true);
        enterFullscreen();
      }
    }
  

    // Request fullscreen mode with vendor prefixes (same as before)
    const enterFullscreen = () => {
      if (elementRef.current) {
        if (elementRef.current.requestFullscreen) {
          // elementRef.current.requestFullscreen();

          // Fallback: Simulate fullscreen with CSS
          elementRef.current.style.position = "fixed";
          elementRef.current.style.top = 0;
          elementRef.current.style.left = 0;
          elementRef.current.style.width = "100vw";
          elementRef.current.style.height = "100vh";
          elementRef.current.style.zIndex = 1500;
          elementRef.current.style.pointerEvents = "auto";

          //Move modal away
          const modalFilter = document.getElementById('modal-filter-mobile');
          if(modalFilter){
            modalFilter.style.position = 'relative'
          }

          // TOGGLE FULL SCREEN REF
          fullscreenRef.current = true;
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

          // Fallback: Simulate fullscreen with CSS
          elementRef.current.style.position = "fixed";
          elementRef.current.style.top = 0;
          elementRef.current.style.left = 0;
          elementRef.current.style.width = "100vw";
          elementRef.current.style.height = "100vh";
          elementRef.current.style.zIndex = 1500;
          elementRef.current.style.pointerEvents = "auto";

          //Move modal away
          const modalFilter = document.getElementById('modal-filter-mobile');
          if(modalFilter){
            modalFilter.style.position = 'relative'
          }

          // TOGGLE FULL SCREEN REF
          fullscreenRef.current = true;
        }
      }
    };

    // Exit fullscreen mode (same as before)
    const exitFullscreen = () => {
      if (document.exitFullscreen) {
        // document.exitFullscreen();
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
        const modalFilter = document.getElementById('modal-filter-mobile');
        if(modalFilter){
          modalFilter.style.position = 'fixed'
        }

        elementRef.current.offsetHeight

        fullscreenRef.current = false;
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
        elementRef.current.style.top = "unset";
        elementRef.current.style.top = "unset";
        elementRef.current.style.left = "unset";
        elementRef.current.style.width = "100%";
        elementRef.current.style.height = "100%";
        elementRef.current.style.position = "relative";
        elementRef.current.style.pointerEvents = "auto";
        elementRef.current.style.zIndex = 300;

        //Move modal away
        const modalFilter = document.getElementById('modal-filter-mobile');
        if(modalFilter){
          modalFilter.style.position = 'fixed'
        }

        elementRef.current.offsetHeight

        fullscreenRef.current = false;
      }
    };

    // Function to handle fullscreen changes (without re-rendering the component)
    const handleFullscreenChange = () => {
      if (document.fullscreenElement) {
        fullscreenRef.current = true;
      } else {
        fullscreenRef.current = false;
      }
    };

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
            if (fullscreenRef.current) return;
            setIsHovered(false);
          }}
        >
          <Image
            src={imageSrc}
            alt=""
            className={`${styles.indiv_image} ${imageClassName}`}
            placeholder={blur ? "blur" : undefined}
            quality={quality}
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
            quality={quality}
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

  console.log(isFullScreen)
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

export default ImageContainer;
