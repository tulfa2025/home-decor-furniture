'use client'
import VideoDemo from "@/components/video_demo/VIdeoDemo"

/* VIDEOS */
const installationVidRef = 'videos/product_videos/Dresser Lifestyle+Installation Animation_compressed.mp4'

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