'use client'
import VideoDemo from "@/components/video_demo/VIdeoDemo"

import DeviceContext from "@/context/deviceContext";
import { useContext } from "react";

/* VIDEOS */


const VideoFive = ({
    layoutName,
    zIndex
})=>{

    const deviceOS = useContext(DeviceContext);

  
    return(<VideoDemo   
      posterSrc={
        deviceOS === "Other"
          ? "videos/product/output_Solar shingle video_compressed-desktop.jpg"
          : "videos/product/Mobile/solar-shingles-preview_compressed-mobile.png"
      }
      layoutName={layoutName}
      zIndex={zIndex}
      videoId={1056106444}
      videoSourceRef={
        deviceOS === "Other"
          ? "videos/product/Solar shingle video_compressed.mp4"
          : "videos/product/Mobile/solar-shingles-preview_compressed.mp4"
      }/>)
}

export default VideoFive;