"use client";

import Image from "next/image";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import styles from "./CloseUpShots.module.scss";
import {
  useRef,
  useState,
  useEffect,
  useContext,
  useCallback,
} from "react";
import ScrollContext from "@/context/scrollContext";

/* CUSTOM COMPONENTS */
import ModalContainer from "@/components/modals/ModalContainer";
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
import ShowCase from "@/components/showcase/ShowCase";

/* CUSTOM HOOKS */
import useInView from "@/hooks/use_inview";
import useWindowSize from "@/hooks/use_window_size";
import calculateScrollHeight from "@/utils/calculate_scrollheight";

/*MODAL IMAGES */
import modalImageSet from "./closeup_shots_images";

const CloseUpShots: React.FC<LayoutProps> = ({
  layoutName,
  handleChangeSlide,
}) => {
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

  useEffect(() => {
    if (isInView) {
      handleChangeSlide(layoutName);
    }
  }, [isInView]);

  // Calculate size of screen initially
  const viewportSize = useWindowSize();
  const scrollHeight = calculateScrollHeight(viewportSize.height, 8);

  /* ANIMATION START AND END POSITION */
  const [yPosition, setYPosition] = useState(null);

  // Function to get the Y position of the element
  const getElementYPosition = () => {
    if (scrollTargetRef.current) {
      const yPos = scrollTargetRef.current.offsetTop + viewportSize.height * 2;
      setYPosition(yPos); // Update state with the Y position
    }
  };

  // Optionally, you can track the position on window resize or scroll
  useEffect(() => {
    // Get initial Y position when component mounts
    getElementYPosition();
  }, []);

  // Ensure the ref is available before applying useScroll
  const scrollTargetRef = useRef(null);

  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  /* DETECT POPUP */
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    if (
      v > yPosition + scrollHeight * 0.1 &&
      v < yPosition + scrollHeight + viewportSize.height
    ) {
      if (!isPopupVisible) {
        setIsPopupVisible(true);
      }
    } else {
      if (isPopupVisible) {
        setIsPopupVisible(false);
      }
    }
  });

  /* BACKGROUND ANIMATIONS */
  const transformScaleAnimationOne = useTransform(
    scrollY,
    [
      0,
      yPosition,
      yPosition + scrollHeight * 0.15,
      yPosition + scrollHeight * 0.3,
      yPosition + scrollHeight * 0.5,
    ],
    [2, 2, 1, 1, 1.5]
  );
  const springyTransformScaleAnimationOne = useSpring(
    transformScaleAnimationOne,
    {
      damping: 40,
    }
  );

  const translateAnimationOne = useTransform(
    scrollY,
    [
      yPosition,
      yPosition + scrollHeight * 0.2,
      yPosition + scrollHeight * 0.5,
      yPosition + scrollHeight,
    ],
    [150, -150, -150, -viewportSize.height]
  );
  const springyTranslateAnimationOne = useSpring(translateAnimationOne, {
    damping: 40,
  });

  /* CALLOUT ANIMATIONS */
  const transformOpacityAnimationOne = useTransform(
    scrollY,
    [
      0,
      yPosition + scrollHeight * 0.2,
      yPosition + scrollHeight * 0.25,
      yPosition + scrollHeight * 0.3,
      yPosition + scrollHeight * 0.5,
    ],
    [0, 0, 0.6, 0.6, 0]
  );

  const springyOpacityAnimationOne = useSpring(transformOpacityAnimationOne, {
    damping: 40,
  });

  const transformShowcaseAnimationOne = useTransform(
    scrollY,
    [
      0,
      yPosition + scrollHeight * 0.15,
      yPosition + scrollHeight * 0.3,
      yPosition + scrollHeight * 0.3,
      yPosition + scrollHeight * 0.5,
    ],
    [
      viewportSize.height,
      -viewportSize.height * 0.1,
      -250,
      -250,
      -viewportSize.height * 1.2,
    ]
  );

  const springyTransformShowcaseAnimationOne = useSpring(
    transformShowcaseAnimationOne,
    {
      damping: 40,
    }
  );

  /* BUTTON ANIMATION */
  const transformOpacityAnimationTwo = useTransform(
    scrollY,
    [
      0,
      yPosition + scrollHeight * 0.1,
      yPosition + scrollHeight * 0.25,
      yPosition + scrollHeight * 0.4,
      yPosition + scrollHeight * 0.6,
    ],
    [0, 0, 1, 1, 0]
  );

  /* LIFESTYLE SCENE BRANCH STATE */
  //Scroll Block context
  const handleIsScrollBlocked = useContext(ScrollContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);
  const handleModalOpen = () => {
    handleIsScrollBlocked(true, modalRef);
    setIsModalOpen(true);
  };

  const handleModalClose = useCallback(() => {
    handleIsScrollBlocked(false, modalRef);
    setIsModalOpen(false);
  }, []);
  /* Images under different categories */
  type ImageSet = {
    [key: string]: Array<string>;
  };

  /* WHOLE PAGE TRANSLATOIN */

  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    [
      0,
      yPosition,
      yPosition + viewportSize.height,
      yPosition + viewportSize.height + scrollHeight * 0.5,
      yPosition + viewportSize.height + scrollHeight * 0.55,
    ],
    [
      viewportSize.height * 2.4,
      viewportSize.height * 2.4,
      0,
      0,
      -viewportSize.height * 2.4,
    ]
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    {
      damping: 40,
    }
  );

  return (
    <>
      <motion.div
        animate={{
          opacity: true ? 1 : 0,
          duration: 1,
        }}
        style={{
          height: scrollHeight,
          position: "relative",
          top: 0,
          overflow: "auto",
        }}
        ref={scrollTargetRef}
      >
        <motion.div
          style={{
            top: 0,
            position: "fixed",
            height: "100vh",
            width: "100vw",
            y: springyTransformShowcaseAnimationThree,
          }}
          ref={inViewRef}
        >
          <motion.div className={styles.scroll_container}>
            <motion.section className={styles.close_container}>
              {/* BACKDROP OVERLAY */}

              <motion.div
                style={{
                  width: "100%",
                  height: "150vh",
                  position: "absolute",
                  top: -viewportSize.height * 0.3,
                  left: 0,
                  zIndex: 20,
                  backgroundColor: "rgb(0,0,0)",
                  opacity: springyOpacityAnimationOne,
                }}
              />

              {/* BACKGROUND IMAGE */}

              <motion.div
                style={{
                  width: "100%",
                  height: "100%",
                  scale: springyTransformScaleAnimationOne,
                  y: springyTranslateAnimationOne,
                }}
              >
                <Image
                  src={ImageOne}
                  alt=""
                  priority
                  className={styles.close_background}
                />
              </motion.div>

              {/* CALLOUT CONTAINER */}
              <motion.div
                style={{
                  width: "100%",
                  height: "100%",
                  position: "absolute",
                  top: 0,
                  left: 0,
                  zIndex: 30,
                }}
              >
                <ShowCase
                  heading="Close Up Shots"
                  animationValues={{
                    y: springyTransformShowcaseAnimationOne,
                    opacity: transformOpacityAnimationTwo,
                  }}
                />
              </motion.div>

              {/* BUTTON TRIGGER */}
              <motion.div
                className={styles.closeup_button_container}
                style={{
                  opacity: transformOpacityAnimationTwo,
                }}
              >
                {isPopupVisible && (
                  <TulfaPopupButton
                    timer={1000}
                    height={60}
                    width={300}
                    text={"Take a closer look"}
                    onClick={handleModalOpen}
                  />
                )}
              </motion.div>
            </motion.section>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* LIFESTYLE SCENES Modal */}
      <ModalContainer
        ref={modalRef}
        handleModalClose={handleModalClose}
        isModalOpen={isModalOpen}
        imageSet={modalImageSet}
        selectionArray={[]}
        differentSizes={true}
        random={false}
      />
    </>
  );
};

export default CloseUpShots;
