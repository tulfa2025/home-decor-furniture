"use client";
import VideoDemo from "@/components/video_demo/VIdeoDemo";

/* VIDEOS */
const installationVidRef = 'videos/product/Sofa exploded with lifestyle_compressed.mp4'

const VideoTwo = ({
    layoutName,
    zIndex
}) => {
  return (
    <>
      <VideoDemo
        posterSrc='videos/product/Sofa exploded with lifestyle_compressed.jpg'
        layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={installationVidRef}
      />
    </>
  );
};

export default VideoTwo;
