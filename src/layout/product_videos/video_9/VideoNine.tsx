"use client";
import VideoDemo from "@/components/video_demo/VIdeoDemo";

import DeviceContext from "@/context/deviceContext";
import scrollTransformValues from "@/utils/scrollTransformValues";
import { useContext } from "react";

/* VIDEOS */

const VideoNine = ({ layoutName, zIndex }) => {
  const deviceOS = useContext(DeviceContext);

  return (
    <>
      <VideoDemo
        posterSrc={"videos/product/BABY CRIB-natural.png"}
        layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={
          deviceOS === "Other"
            ? "videos/product/BABY CRIB_compressed.mp4"
            : "videos/product/Mobile/BABY_CRIB_MOBILE.mp4"
        }
        videoId={1056102792}
        scrollMap={scrollTransformValues.demoTemplate
        }
      />
    </>
  );
};

export default VideoNine;
