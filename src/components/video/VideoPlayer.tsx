"use client";
import React, { memo, useRef, useEffect, useState } from "react";
import styles from "./VideoPlayer.module.scss";
import { usePathname } from 'next/navigation'


const VideoPlayer = memo(
  ({
    src,
    type,
    altText,
    onVideoComplete,
    loop,
    styleOverride,
    autoplay,
    isInView,
  }) => {
    // Create a reference to the video element
    const videoRef = useRef(null);
    const pathname = usePathname()

    useEffect(() => {
      if (videoRef.current && isInView) {
        videoRef.current.play();
      } else if (videoRef.current && !isInView) {
        videoRef.current.pause();
        videoRef.current.load(); // Apparently resets buffer
      }
    }, [isInView]);


    useEffect(() => {
      
      return (()=>{
        if (videoRef.current) {
          videoRef.current.pause();
          videoRef.current.load(); // Apparently resets buffer
          videoRef.current.remove()
        }
      })
    }, [pathname]);

    return (
      <div className={styles.video_container} style={styleOverride}>
        <video
          ref={videoRef}
          muted
          preload="none"
          autoPlay={autoplay}
          onEnded={onVideoComplete ?? null}
          loop={loop}
          className={styles.video}
          playsInline
        >
          <source src={src} type={type} />
          Your browser does not support the video tag.
          {altText}
        </video>
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
