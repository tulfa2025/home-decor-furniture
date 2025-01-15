'use client'
import VideoDemo from "@/components/video_demo/VIdeoDemo"

/* VIDEOS */
const installationVidRef = 'videos/product_videos/Tulfa - 3D Modeling _ CGI - Home Décore & Furniture_compressed.mp4'


const VideoThree = ({
    layoutName,
    zIndex
})=>{
    return(<><VideoDemo   layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={installationVidRef}/></>)
}

export default VideoThree;