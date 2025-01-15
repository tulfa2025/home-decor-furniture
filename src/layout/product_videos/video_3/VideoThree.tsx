'use client'
import VideoDemo from "@/components/video_demo/VIdeoDemo"

/* VIDEOS */
const installationVidRef = 'videos/product/gaming_chair.mp4'


const VideoThree = ({
    layoutName,
    zIndex
})=>{
    return(<><VideoDemo   layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={installationVidRef}/></>)
}

export default VideoThree;