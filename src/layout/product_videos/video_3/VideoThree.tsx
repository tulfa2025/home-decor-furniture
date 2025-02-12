"use client";
import VideoDemo from "@/components/video_demo/VIdeoDemo";

import DeviceContext from "@/context/deviceContext";
import scrollTransformValues from "@/utils/scrollTransformValues";
import { useContext } from "react";

/* VIDEOS */

const VideoThree = ({ layoutName, zIndex }) => {
  const deviceOS = useContext(DeviceContext);
  return (
    <>
      <VideoDemo
        posterSrc={
          deviceOS === "Other"
            ? "videos/product/gaming_chair.jpg"
            : "videos/product/Mobile/Chair_Vertical_version_compressed-mobile.jpg"
        }
        layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={
          deviceOS === "Other"
            ? "videos/product/gaming_chair.mp4"
            : "videos/product/Mobile/Chair_Vertical_version_compressed.mp4"
        }
        scrollMap={scrollTransformValues.gross}
        videoId={1056106630}
      />
    </>
  );
};

export default VideoThree;
