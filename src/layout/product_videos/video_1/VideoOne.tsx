"use client";
import VideoDemo from "@/components/video_demo/VIdeoDemo";

import DeviceContext from "@/context/deviceContext";
import { useContext } from "react";

/* VIDEOS */

let installationVidRef = "";
let posterSrc = "";

const VideoOne = ({ layoutName, zIndex }) => {
  const deviceOS = useContext(DeviceContext);

  if (deviceOS !== "Other") {
    installationVidRef =
      "videos/product/Mobile/Dresser_installaton_vertical view_compressed.mp4";
    posterSrc = "videos/product/Mobile/Dresser_installaton_vertical view_compressed.jpg";
    
  } else {
    
    installationVidRef = "videos/product/Dresser.mp4";
    posterSrc = "videos/product/Dresser.jpg";
  }

  return (
    <>
      <VideoDemo
        posterSrc={ deviceOS === "Other"
          ? "videos/product/Dresser.jpg"
          : "videos/product/Mobile/Dresser_installaton_vertical view_compressed-mobile.jpg"
      }
        layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={deviceOS === "Other"
          ? "videos/product/Dresser.mp4"
          :  "videos/product/Mobile/Dresser_installaton_vertical view_compressed.mp4"
      }
      videoId={1056104610}
      />
    </>
  );
};

export default VideoOne;
