"use client";
import TulfaMenuButton from "@/assets/icons/tulfa_menu_button";
import styles from "./MenuPopup.module.scss";
import { motion } from "framer-motion";
import { useMemo, memo, useState, useEffect } from "react";
import useWindowSize from "@/hooks/use_window_size";

const MenuPopup = ({ layoutCollection, scrollDetails }) => {
  /* FILTER OUT SLIDE NAMES */
  const slidesList = useMemo(() => {
    const slides = [];
    const slideName = {};

    layoutCollection.order.forEach((componentIndex: number, index: number) => {
      const componentName = layoutCollection[componentIndex].layoutTag;

      if (slideName[componentName] === componentName) return;
      slides.push([componentName, layoutCollection[componentIndex].layoutName]);
      slideName[componentName] = componentName;
    });

    return slides;
  }, [layoutCollection]);

  const [isActive, setIsActive] = useState(false);

  const [currentSlide, setCurrentSlide] = useState(0);

  const viewportSize = useWindowSize();
  useEffect(() => {
    if (isActive) {
      setTimeout(() => {
        let scrollDistance;

        if (currentSlide === 0) {
          scrollDistance = 0;
        } else {
          scrollDistance =
            scrollDetails.scrollPositions[currentSlide] + viewportSize.height;
        }

        window.scrollTo({
          top: scrollDistance,
          behavior: "smooth",
        });
      }, 250);
    }
  }, [currentSlide, scrollDetails]);

  return (
    <div className={styles.menu_popup_container}>
      <motion.div className={styles.menu_popup_container_inner}>
        <motion.div
          className={styles.slide_container}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: isActive ? 1 : 0,
            display: isActive ? "flex" : "none",
          }}
        >
          {slidesList.map((componentDetails, index) => {
            if (
              componentDetails[0].toLowerCase() === "banner" ||
              componentDetails[0].toLowerCase() === "book a demo"
            ) {
              return <></>;
            }
            return (
              <motion.button
                key={index}
                initial={{
                  x: 0,
                  opacity: 0,
                }}
                animate={{
                  opacity: isActive ? 1 : 0,
                  transition: {
                    delay: index * 0.05,
                  },
                }}
                whileHover={{
                  x: -10,
                }}
                className={styles.button_container}
                onClick={() => {
                  setCurrentSlide(componentDetails[1]);
                }}
              >
                {componentDetails[0]}
              </motion.button>
            );
          })}
        </motion.div>
        <TulfaMenuButton
          height={50}
          width={50}
          onClick={() => {
            setIsActive((prev) => !prev);
          }}
        />
      </motion.div>
    </div>
  );
};

export default MenuPopup;
