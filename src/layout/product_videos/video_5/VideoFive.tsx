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
          ? "videos/product/Tulfa - 3D Modeling _ CGI Walkthrough_compressed.jpg"
          : ''
      }
      layoutName={layoutName}
      zIndex={zIndex}
      videoSourceRef={
        deviceOS === "Other"
          ? "videos/product/Tulfa - 3D Modeling _ CGI Walkthrough_compressed.mp4"
          : ""
      }/></>)
}

export default VideoFive;