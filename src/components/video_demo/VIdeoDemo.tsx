"use client";
import styles from "./VideoDemo.module.scss";
/* CUSTOM COMPONENTS */
import VideoPlayer from "../video/VideoPlayer";
import TulfaPlayButton from "@/assets/icons/tulfa_play_button";
// /* CUSTOM HOOKS */
/* CONTEXT */
import DemoTemplate from "../layout_templates/demo/DemoTemplate";
import DeviceContext from "@/context/deviceContext";
import { useContext } from "react";

import { motion } from "framer-motion";

const VideoDemo = ({
  zIndex = 0,
  layoutName,
  videoSourceRef,
  posterSrc,
  videoId = 1041177363,
  scrollMap = null,
}) => {
  const deviceOS = useContext(DeviceContext);

  return (
    <DemoTemplate
      zIndex={zIndex}
      layoutName={layoutName}
      scrollMap={scrollMap}
      headerStyleDefault={2}
      dynamicHeader={false}
    >
      <motion.section
        className={styles.video_container_outer}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        
        exit={{
          opacity: 0,
          transition:{
            duration: 1,
          }
        }}
      >
        <VideoPlayer
          src={videoSourceRef}
          type="video/mp4"
          altText=""
          onVideoComplete={() => {}}
          loop={true}
          styleOverride={{
            width: "100vw",
          }}
          isInView={true}
          autoplay={false}
          poster={posterSrc}
        />

        {/* PLAY BUTTON ON MOBIL */}
        <div className={styles.play_container}>
          {deviceOS !== "Other" ? (
            <TulfaPlayButton height={35} width={35} videoId={videoId} />
          ) : (
            <></>
          )}
        </div>
      </motion.section>
    </DemoTemplate>
  );
};

export default VideoDemo;
