// import styles from "./AutomaticCarousel.module.scss";
import Image from "next/image";
import { StaticImageData } from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState, memo, useRef } from "react";

type ImageSet = {
  [key: string]: {
    imageData: StaticImageData;
    imageName: string;
  };
  order: Array<string>;
};

// Define AutomaticCarousel component that accepts `imageSet` as a prop
interface AutomaticCarouaProps {
  imageSet: ImageSet;
  changeDelay: number;
  transition: {};
  paused: boolean
}

const AutomaticCarousel: React.FC<AutomaticCarouaProps> = memo(
  ({ imageSet, changeDelay, transition, paused }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    const timeoutRef = useRef(null);

    useEffect(() => {
      if(paused)return
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(() => {
        setCurrentIndex((prev) => {
          const imageSetLength = imageSet.order.length;

          if (prev + 1 > imageSetLength - 1) {
            return 0;
          } else {
            return prev + 1;
          }
        });
      }, changeDelay);
    }, [currentIndex, paused]);

    return (
      <AnimatePresence initial={true}>
        {imageSet.order.map((imageName: string, index: number) => {
          if (currentIndex !== index) return null;
          return (
            <motion.div
              key={imageName}
              initial={{
                opacity: 0,
              }}
              animate={{
                opacity: 1,
                transition: transition,
              }}
              exit={{
                opacity: 0,
                transition: {
                  duration: 0.1,
                  delay: 0.6,
                },
              }}
              style={{
                height: "100%",
                width: "100%",
                position: "absolute",
                backgroundColor: "transparent",
                display: "flex",
                alignItems: "center",
                transform: imageSet[imageName].overrideStyle.transform,
              }}
            >
              <Image
                src={imageSet[imageName].imageData}
                alt=""
                objectPosition="0 0"
                style={{
                  height: "100%",
                  width: "100%",
                  objectFit: "cover",
                }}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    );
  }
);

AutomaticCarousel.displayName = "AutomaticCaroua";

export default AutomaticCarousel;
