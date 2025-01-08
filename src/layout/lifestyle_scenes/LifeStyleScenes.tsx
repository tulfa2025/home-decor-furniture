"use client";

import Image from "next/image";
import styles from "./LifeStyleScenes.module.scss";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import {
  useRef,
  useState,
  useMemo,
  useEffect,
  useContext,
  useCallback,
} from "react";
import ScrollContext from "@/context/scrollContext";

import { usePathname } from "next/navigation";

/* CUSTOM UTILS */
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import { modalSelectionArrayLifestyle } from "@/utils/constants";

/* CUSTOM COMPONENTS */
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
import ModalContainer from "@/components/modals/ModalContainer";
import ShowCase from "@/components/showcase/ShowCase";


/* CUSTOM HOOKS */
import useWindowSize from "@/hooks/use_window_size";
import useInView from "@/hooks/use_inview";
import usePopupPosition from "@/utils/calculate_popupbutton.loc";
import useFilter from "@/hooks/use_filter";

/* IMAEGS */
import backgroundImage from '../../assets/images/lifestyle_scenes/placeholder/image_two.png'
import modalImageSet from "./lifestyle_scenes_images";

const LifeStyleScenes: React.FC<LayoutProps> = ({
  layoutName,
  handleChangeSlide,
}) => {
  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.9);

  useEffect(() => {
    if (isInView) {
      handleChangeSlide(layoutName);
    }
  }, [isInView]);

  // Get scroll height
  const viewportSize = useWindowSize();
  const scrollHeight = calculateScrollHeight(viewportSize.height, 10);

  /* ANIMATION START AND END POSITION */
  const [yPosition, setYPosition] = useState(null);

  // Function to get the Y position of the element
  const getElementYPosition = () => {
    if (scrollTargetRefLife.current) {
      const yPos =
        scrollTargetRefLife.current.offsetTop + viewportSize.height * 2;
      setYPosition(yPos); // Update state with the Y position
    }
  };

  // Optionally, you can track the position on window resize or scroll
  useEffect(() => {
    // Get initial Y position when component mounts
    getElementYPosition();
  }, []);

  // Ensure the ref is available before applying useScroll
  const scrollTargetRefLife = useRef(null);

  const { scrollY } = useScroll({
    target: scrollTargetRefLife,
  });

  /* DETECT POPUP */
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    if (v > yPosition + scrollHeight * 0.1 && v < scrollHeight + viewportSize.height) {

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

  /* SHOWCASE ANIMATIONS */
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
    [viewportSize.height, 150, -250, -250, -viewportSize.height * 1.2]
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
      yPosition,
      yPosition + scrollHeight * 0.15,
      yPosition + scrollHeight * 0.5,
      yPosition + scrollHeight,
    ],
    [0, 1, 1, 0]
  );

  const transformShowcaseAnimationTwo = useTransform(
    scrollY,
    [yPosition, yPosition + scrollHeight * 0.15],
    [150, -250]
  );

  const springyTransformShowcaseAnimationTwo = useSpring(
    transformShowcaseAnimationTwo,
    {
      damping: 40,
    }
  );

  /* Calculate popup button position*/
  const popupPosition = usePopupPosition(viewportSize);

  /* LIFESTYLE SCENE BRANCH STATE */
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Scroll Block context
  const handleIsScrollBlocked = useContext(ScrollContext);

  const handleModalOpen = () => {
    handleIsScrollBlocked(true, modalRef);
    setIsModalOpen(true);
  };

  const handleModalClose = useCallback(() => {
    handleIsScrollBlocked(false, modalRef);
    setIsModalOpen(false);
  }, []);

  const filter = useFilter(setIsModalOpen, layoutName);

  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    [
      0,
      yPosition,
      yPosition + viewportSize.height,
      yPosition + viewportSize.height + scrollHeight * 0.5,
      yPosition + viewportSize.height + scrollHeight,
    ],
    [
      viewportSize.height * 2.4,
      viewportSize.height * 2.4,
      0,
      0,
      -viewportSize.height * 4.8,
    ]
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    {
      damping: 40,
    }
  );

  const pathName =  usePathname()

  const modalRef = useRef(null)

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
        ref={scrollTargetRefLife}
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
            <motion.section className={styles.lifestyle_container}>
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
                  src={backgroundImage}
                  alt=""
                  priority
                  className={styles.lifestyle_image}
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
                  heading="Lifestyle Scenes"
                  animationValues={{
                    y: springyTransformShowcaseAnimationOne,
                    opacity: transformOpacityAnimationTwo,
                  }}
                />
              </motion.div>

              {/* BUTTON TRIGGER */}
              <motion.div
                className={styles.lifestyle_button_container}
                style={{
                  opacity: transformOpacityAnimationTwo,
                }}
              >
                {isPopupVisible && (
                  <TulfaPopupButton
                    timer={1000}
                    height={60}
                    width={300}
                    textStyle={popupPosition.textStyle}
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
        selectionArray={modalSelectionArrayLifestyle}
        modalParagraph='Showcase your furniture in thousands of beautifully designed room setups - without moving a thing or touching a camera.'
        differentSizes={true}
        filter={filter}
        urlLink={`${window.location.protocol}//${window.location.host}${pathName}?comp=${layoutName}`}
      />
    </>
  );
};

export default LifeStyleScenes;
