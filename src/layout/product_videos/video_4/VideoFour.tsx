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

  
    return(<VideoDemo   
      posterSrc={
        deviceOS === "Other"
          ? "videos/product/CHANDELIER-PROCESS-web-1_compressed.jpg"
          : 'videos/product/Mobile/Dinning Tabel_Vertical version_compressed-mobile.jpg'
      }
      layoutName={layoutName}
      videoId={1056103371}
      zIndex={zIndex}
      videoSourceRef={
        deviceOS === "Other"
          ? "videos/product/CHANDELIER-PROCESS-web-1_compressed.mp4"
          : "videos/product/Mobile/Dinning Tabel_Vertical version_compressed.mp4"
      }/>)
}

export default VideoFour;