"use client";
import VideoDemo from "@/components/video_demo/VIdeoDemo";

import DeviceContext from "@/context/deviceContext";
import { useContext } from "react";

/* VIDEOS */

const VideoTwo = ({ layoutName, zIndex }) => {
  const deviceOS = useContext(DeviceContext);

  return (
    <>
      <VideoDemo
        posterSrc={
          deviceOS === "Other"
            ? "videos/product/Sofa exploded with lifestyle_compressed.jpg"
            : "videos/product/Mobile/2nd_Sofa_veritical view_compressed-mobile.jpg"
        }
        layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={
          deviceOS === "Other"
            ? "videos/product/Sofa exploded with lifestyle_compressed.mp4"
            : "videos/product/Mobile/2nd_Sofa_veritical view_compressed.mp4"
        }
      />
    </>
  );
};

export default VideoTwo;
