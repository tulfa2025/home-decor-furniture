"use client";
import styles from "./devices.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import Image from "next/image";

import scrollTransformValues from "@/utils/scrollTransformValues";
import DeviceContext from "@/context/deviceContext";
import { useContext } from "react";
import { motion } from "framer-motion";

const Devices: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const deviceContext = useContext(DeviceContext);
  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Lorem ipsum dolor sit"
      paragraph="Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis tristique amet. Elementum laoreet aenean quam phasellus imperdiet. "
      dynamicHeader={false}
      bannerType="main-ie"
      zIndex={zIndex}
      scrollMap={scrollTransformValues.devices}
    >
      <motion.div
        className={styles.int_container}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
          transition: {
            delay: 1,
            duration: 0.5,
          },
        }}
      >
        <Image
          src="/images/immersive/cross-devices.png"
          alt=""
          className={styles.int}
          quality={deviceContext === "Other" ? 50 : 10}
          height={2400}
          width={3000}
        />
      </motion.div>
    </LargeSlideContainer>
  );
};

export default Devices;
