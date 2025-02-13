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

  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Group Shots"
      paragraph="Present your furniture items grouped together to show their compatibility and create a coherent look."
      zIndex={zIndex}
      dynamicHeader={true}
    >
      <motion.section
        className={styles.video_container}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
        transition={{
          duration: 0.5,
        }}
      >
        <AutomaticCarousel
          imageSet={imageSet}
          changeDelay={1000}
          transition={{
            duration: 0.5,
          }}
        />
      </motion.section>
    </LargeSlideContainer>
  );
};

export default GroupShots;
