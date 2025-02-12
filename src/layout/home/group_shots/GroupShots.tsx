"use client";
import styles from "./GroupShots.module.scss";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import useInView from "@/hooks/use_inview";
/* CUSTOM PROPS */
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";

/* IMAGES */
import AutomaticCarousel from "@/components/carousel/automatic_carousel/AutomaticCarousel";

type ImageSet = {
  order: string[];
  [key: string]: {
    imageData: StaticImageData;
    imageName: string;
    buttonColor?: "dark" | "light";
    overrideStyle: {};
  };
};

const imageSet: ImageSet = {
  order: ["groupOne", "groupTwo", "groupThree", "groupFour"],
  groupOne: {
    imageName: "groupOne",
    imageData: "/images/group_shots/Group-shot_Plates_scene_1.webp",
    overrideStyle: {},
  },
  groupTwo: {
    imageName: "groupTwo",
    imageData: "/images/group_shots/Group-shot_Plates_scene_2.webp",
    overrideStyle: {},
  },
  groupThree: {
    imageName: "groupThree",
    imageData: "/images/group_shots/Group-shot_Plates_scene_3.webp",
    overrideStyle: {},
  },
  groupFour: {
    imageName: "groupFour",
    imageData: "/images/group_shots/Group-shot_Plates_scene_4.webp",
    overrideStyle: {},
  },
};

const GroupShots: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const changeTrackRef = useRef(null);
  const isTrackInView = useInView(changeTrackRef, 0.05);

  // Cleanup
  useEffect(() => {
    return () => {
      if (changeTrackRef.current) {
        changeTrackRef.current = null;
      }
    };
  }, []);

  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Group Shots"
      paragraph="Present your furniture items grouped together to show their compatibility and create a coherent look."
      zIndex={zIndex}
      dynamicHeader={true}
    >
      <div ref={changeTrackRef} className={styles.inview_trigger}></div>
      {isTrackInView && (
        <motion.section
          className={styles.video_container}
          
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 0.5
          }}
        >
          <AutomaticCarousel
            imageSet={imageSet}
            changeDelay={1000}
            transition={{
              duration: 0.5,
            }}
            paused={isTrackInView ? false : true}
          />
        </motion.section>
      )}
    </LargeSlideContainer>
  );
};

export default GroupShots;
