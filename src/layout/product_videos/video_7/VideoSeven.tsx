"use client";
import VideoDemo from "@/components/video_demo/VIdeoDemo";

import DeviceContext from "@/context/deviceContext";
import scrollTransformValues from "@/utils/scrollTransformValues";
import { useContext } from "react";

/* VIDEOS */

const VideoSeven = ({ layoutName, zIndex }) => {
  const deviceOS = useContext(DeviceContext);

  return (
      <VideoDemo
        posterSrc={
          deviceOS === "Other"
            ? "videos/product/Scene_2_compressed-desktop.jpg"
            : ""
        }
        layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={
          deviceOS === "Other"
            ? "videos/product/Scene_2_compressed.mp4"
            : ""
        }
        
      />
  );
};

export default VideoSeven;
