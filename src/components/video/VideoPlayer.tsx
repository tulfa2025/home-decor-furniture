import React, { memo, useRef, useEffect } from "react";
import styles from "./VideoPlayer.module.scss";

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

    useEffect(() => {
      if (videoRef.current && isInView) {
        videoRef.current.play();
      } else if (videoRef.current && !isInView) {
        videoRef.current.pause();
      }
    }, [isInView]);

    return (
      <div className={styles.video_container} style={styleOverride}>
        <video
          ref={videoRef}
          muted
          preload="metadata"
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
