"use client";
import { motion } from "framer-motion";
import { useState, useMemo, useCallback, useRef, memo, Suspense } from "react";
import Image from "next/image";
import styles from "./FullScreenCarousel.module.scss";
import TulfaCloseButton from "@/assets/icons/tulfa_close_button";
import {
  TulfaRightArrow,
  TulfaLeftArrow,
} from "@/assets/icons/tulfa_nav_arrows";

const FullScreenCarousel = memo(
  ({ fullscreenIndex, imageSet, handleFullscreenToggle, appliedFilter }) => {
    const [currentImageIndex, setImageIndex] = useState(fullscreenIndex);
    const imageSetLengthRef = useRef(0);

    const handleSetCurrentIndex = useCallback(
      (direction: number) => {
        if (direction + currentImageIndex >= imageSetLengthRef.current) {
          setImageIndex(0);
        } else if (direction + currentImageIndex < 0) {
          setImageIndex(imageSetLengthRef.current - 1);
        } else {
          setImageIndex((prev) => prev + direction);
        }
      },
      [imageSet, currentImageIndex]
    );

    const memoizedImageSet = useMemo(() => {
      if (appliedFilter === "all") {
        if (imageSet["top"].length > 0) {
          imageSetLengthRef.current = imageSet["top"].length;
          return imageSet["top"];
        } else {
          let imageArray = [];
          const imageSetNames = Object.keys(imageSet);
          for (let imageSetName of imageSetNames) {
            if (imageSetName === "order" || imageSetName === "background")
              continue;

            const firstThreeImages = imageSet[imageSetName].slice(0, 3);
            imageArray = [...imageArray, ...firstThreeImages];
          }

          imageSetLengthRef.current = imageArray.length;
          return imageArray;
        }
      } else {
        imageSetLengthRef.current = imageSet[appliedFilter].length;
        return imageSet[appliedFilter];
      }
    }, [imageSet]);
    return (
      <div className={styles.fullscreen_container}>
        <Image
          className={styles.fullscreen_image}
          alt=""
          src={memoizedImageSet[currentImageIndex][0]}
          quality={60}
          placeholder="blur"
          blurDataURL={memoizedImageSet[currentImageIndex][1]}
          priority
        />
        <CloseButton handleFullscreenToggle={handleFullscreenToggle} />
        <motion.div
          className={styles.arrow_container}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            delay: 1,
          }}
        >
          <TulfaLeftArrow
            height={40}
            width={40}
            className=""
            onClick={() => {
              handleSetCurrentIndex(-1);
            }}
          />
          <TulfaRightArrow
            height={40}
            width={40}
            className=""
            onClick={() => {
              handleSetCurrentIndex(1);
            }}
          />
        </motion.div>
      </div>
    );
  }
);

FullScreenCarousel.displayName = "Fullscreen Carousel";

const CloseButton = ({ handleFullscreenToggle }) => {
  return (
    <motion.div
      style={{
        position: "absolute",
        bottom: "10%",
        left: "calc(50vw - 20px)",
        zIndex: 400,
        pointerEvents: "auto",
      }}
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 1,
      }}
    >
      <TulfaCloseButton
        height={40}
        width={40}
        onClick={() => {
          handleFullscreenToggle(0);
        }}
      />
    </motion.div>
  );
};

export default FullScreenCarousel;
