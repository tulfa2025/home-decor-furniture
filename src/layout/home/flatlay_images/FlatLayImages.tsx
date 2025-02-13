"use client";
import { motion } from "framer-motion";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import styles from "./FlatLayImages.module.scss";
import Image from "next/image";
/* FLATLAY IMAGES */
import { useContext } from "react";

import useWindowSize from "@/hooks/use_window_size";
import DeviceContext from "@/context/deviceContext";

const FlatLayImages: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  // Detect when the user is in viewport for triggering events
  const viewportSize = useWindowSize();

  const deviceContext = useContext(DeviceContext);

  const quality = deviceContext === "Other" ? 50 : 25;

  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Flat Lay Images"
      paragraph="Create mood boards to help interior designers to select elements to enhance their projects."
      zIndex={zIndex}
    >
      <motion.div
        className={styles.flex_container}
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        exit={{
          opacity: 0,
        }}
      >
        <motion.div
          className={styles.image_container}
          initial={{
            opacity: 1
          }}
          
        >
          <Image
            src={
              viewportSize.height > viewportSize.width
                ? "/images/flatlay_images/FlatLay-mobile-2.webp"
                : "/images/flatlay_images/FlatLay1.jpg"
            }
            alt=""
            className={styles.first_image}
            quality={quality}
            height={2400}
            width={3000}
          />
        </motion.div>
        <motion.div
          className={styles.image_container}
          initial={{
            opacity: 0
          }}
          whileInView={{
            opacity: 1,
          }}
          viewport={{
            amount: 0.9
          }}
          transition={{
            delay: 0.5
          }}
        >
          <Image
            src="/images/flatlay_images/scene1.png"
            alt=""
            className={styles.second_image}
            quality={quality}
            height={2400}
            width={3000}
          />
        </motion.div>
      </motion.div>
    </LargeSlideContainer>
  );
};

export default FlatLayImages;
