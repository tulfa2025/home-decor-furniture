"use client";
import VideoDemo from "@/components/video_demo/VIdeoDemo";

import DeviceContext from "@/context/deviceContext";
import { useContext } from "react";

/* VIDEOS */

const VideoSix = ({ layoutName, zIndex }) => {
  const deviceOS = useContext(DeviceContext);

  return (
      <VideoDemo
        posterSrc={
          deviceOS === "Other"
            ? "videos/banner/sofa_video_compressed-desktop.jpg"
            : "videos/product/Mobile/Sofa_veritical view_compressed-mobile.jpg"
        }
        layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={
          deviceOS === "Other"
            ? "videos/banner/sofa_video_compressed.mp4"
            : "videos/product/Mobile/Sofa-banner-teaser_compressed.mp4"
        }
        
        
      />
  );
};

export default VideoSix;
