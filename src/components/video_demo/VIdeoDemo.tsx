"use client";
import styles from "./VideoDemo.module.scss";
/* CUSTOM COMPONENTS */
import VideoPlayer from "../video/VideoPlayer";
import TulfaPlayButton from "@/assets/icons/tulfa_play_button";
// /* CUSTOM HOOKS */
/* CONTEXT */
import DemoTemplate from "../layout_templates/demo/DemoTemplate";
import DeviceContext from "@/context/deviceContext";
import { useContext, useRef } from "react";
import useInView from "@/hooks/use_inview";

const VideoDemo = ({
  zIndex = 0,
  layoutName,
  videoSourceRef,
  posterSrc,
  videoId = 1041177363,
  scrollMap = null
}) => {
  const deviceOS = useContext(DeviceContext);

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.75);

  return (
    <DemoTemplate 
      zIndex={zIndex} 
      layoutName={layoutName} 
      scrollMap={scrollMap}
      headerStyleDefault={2}
      dynamicHeader={false}  
    >
      <div
      ref={inViewRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw'
        }}
      ></div>
      <VideoPlayer
        src={videoSourceRef}
        type="video/mp4"
        altText=""
        onVideoComplete={() => {}}
        loop={true}
        styleOverride={{
          width: "100vw",
        }}
        isInView={isInView}
        autoplay={false}
        poster={posterSrc}
      />

      {/* PLAY BUTTON ON MOBIL */}
      <div className={styles.play_container}>
        {deviceOS !== "Other" ? (
          <TulfaPlayButton height={25} width={25} videoId={videoId} />
        ) : (
          <></>
        )}
      </div>
    </DemoTemplate>
  );
};

export default VideoDemo;
