"use client";
import VideoDemo from "@/components/video_demo/VIdeoDemo";

/* VIDEOS */
const installationVidRef = 'videos/product_videos/Sofa exploded with lifestyle_compressed.mp4'

const VideoTwo = ({
    layoutName,
    zIndex
}) => {
  return (
    <>
      <VideoDemo
        layoutName={layoutName}
        zIndex={zIndex}
        videoSourceRef={installationVidRef}
      />
    </>
  );
};

export default VideoTwo;
