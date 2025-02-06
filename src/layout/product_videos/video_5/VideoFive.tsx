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

  
    return(<><VideoDemo   
      posterSrc={
        deviceOS === "Other"
          ? "videos/product/output_Solar shingle video_compressed-desktop.jpg"
          : "videos/product/output_Solar shingle video_compressed-natural.jpg"
      }
      layoutName={layoutName}
      zIndex={zIndex}
      videoSourceRef={
        deviceOS === "Other"
          ? "videos/product/Solar shingle video_compressed.mp4"
          : "videos/product/output_Solar shingle video_compressed.mp4"
      }/></>)
}

export default VideoFive;