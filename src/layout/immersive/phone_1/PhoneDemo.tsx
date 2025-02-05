"use client";
import VideoDemo from "@/components/video_demo/VIdeoDemo";

import DeviceContext from "@/context/deviceContext";
import scrollTransformValues from "@/utils/scrollTransformValues";
import { useContext } from "react";

/* VIDEOS */

const PhoneDemo = ({ layoutName, zIndex }) => {
  const deviceOS = useContext(DeviceContext);

  return (
    <>
      <VideoDemo
        posterSrc={"videos/immersive/phone_demo_compressed-desktop.jpg"}
        layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={
          deviceOS === "Other"
            ? "videos/immersive/phone_demo_compressed.mp4"
            : "videos/immersive/output_phone_demo_compressed.mp4"
        }
        scrollMap={scrollTransformValues.phoneDemo}
      />
    </>
  );
};

export default PhoneDemo;
