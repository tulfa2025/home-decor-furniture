"use client";
import VideoDemo from "@/components/video_demo/VIdeoDemo";

import DeviceContext from "@/context/deviceContext";
import { useContext } from "react";

/* VIDEOS */

const PhoneDemo = ({ layoutName, zIndex }) => {
  const deviceOS = useContext(DeviceContext);

  return (
    <>
      <VideoDemo
        posterSrc={
          deviceOS === "Other"
            ? "videos/immersive/phone_demo_compressed-desktop.jpg"
            : ""
        }
        layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={
          deviceOS === "Other"
            ? "videos/immersive/phone_demo_compressed.mp4"
            : ""
        }
      />
    </>
  );
};

export default PhoneDemo;
