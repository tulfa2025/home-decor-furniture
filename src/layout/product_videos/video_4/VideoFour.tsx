'use client'
import VideoDemo from "@/components/video_demo/VIdeoDemo"

import DeviceContext from "@/context/deviceContext";
import { useContext } from "react";

/* VIDEOS */


const VideoFour = ({
    layoutName,
    zIndex
})=>{

    const deviceOS = useContext(DeviceContext);

  
    return(<><VideoDemo   
      posterSrc={
        deviceOS === "Other"
          ? "videos/product/CHANDELIER-PROCESS-web-1_compressed.jpg"
          : ''
      }
      layoutName={layoutName}
      zIndex={zIndex}
      videoSourceRef={
        deviceOS === "Other"
          ? "videos/product/CHANDELIER-PROCESS-web-1_compressed.mp4"
          : ""
      }/></>)
}

export default VideoFour;