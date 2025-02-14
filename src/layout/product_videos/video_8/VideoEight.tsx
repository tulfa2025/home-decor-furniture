"use client";
import VideoDemo from "@/components/video_demo/VIdeoDemo";

import DeviceContext from "@/context/deviceContext";
import scrollTransformValues from "@/utils/scrollTransformValues";
import { useContext } from "react";

/* VIDEOS */

const VideoEight = ({ layoutName, zIndex }) => {
  const deviceOS = useContext(DeviceContext);

  return (
      <VideoDemo
        posterSrc={
          deviceOS === "Other"
            ? "videos/product/Gross_compressed-desktop.jpg"
            : "videos/product/Gross_compressed-desktop.jpg"
        }
        layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={
          deviceOS === "Other"
            ? "videos/product/Gross_compressed.mp4"
            : "videos/product/Gross_compressed.mp4"
        }
        videoId={1024593444}
        scrollMap={scrollTransformValues.gross}
      />
  );
};

export default VideoEight;
