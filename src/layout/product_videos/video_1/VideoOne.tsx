'use client'
import VideoDemo from "@/components/video_demo/VIdeoDemo"

/* VIDEOS */
const installationVidRef = 'videos/product/Dresser.mp4'

const VideoOne = ({
    layoutName,
    zIndex
})=>{
    return(
    <>
        <VideoDemo
            layoutName={layoutName}
            zIndex={zIndex}
            videoSourceRef={installationVidRef}
        />
    </>)
}

export default VideoOne;