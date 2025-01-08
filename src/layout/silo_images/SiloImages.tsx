"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useCallback, useEffect, useContext } from "react";
import styles from "./SiloImages.module.scss";
import { modalSelectionArraySilo } from "@/utils/constants";
import ScrollContext from "@/context/scrollContext";
import { usePathname } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

/*CUSTOM COMPONENTS */
const ModalContainer = dynamic(() => import("@/components/modals/ModalContainer"), {
  ssr: false,
});
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";

/* CUSTOM HOOKS */
import useInView from "@/hooks/use_inview";
import useFilter from "@/hooks/use_filter";
import useWindowSize from "@/hooks/use_window_size";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import usePopupPosition from "@/utils/calculate_popupbutton.loc";

/* Images */
import backgroundImage from "../../assets/images/silo_images/Product silos banner.jpg";
import modalImageSet from "./image_sources_silo";


const SiloImages: React.FC<LayoutProps> = ({
  layoutName,
  handleChangeSlide,
  zIndex
}) => {
  // Get scroll height
  const viewportSize = useWindowSize();
  const pathName = usePathname();

  //Scroll Block context
  const handleIsScrollBlocked = useContext(ScrollContext);

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

  const scrollTargetRef = useRef(null);
  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  useEffect(() => {
    if (isInView) {
      handleChangeSlide(layoutName);
    }
  }, [isInView]);

  const scrollHeight = calculateScrollHeight(viewportSize.height, 4);

  /* MODAL TRIGGER */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);
  const handleModalOpen = () => {
    handleIsScrollBlocked(true, modalRef);
    setIsModalOpen(true);
  };

  const handleModalClose = useCallback(() => {
    handleIsScrollBlocked(false, modalRef);
    setIsModalOpen(false);
  }, [modalRef]);

  /* Filters set for this modal */
  const filter = useFilter(setIsModalOpen, layoutName);

  /* ANIMATION START AND END POSITION */
  const [yPosition, setYPosition] = useState(null);

  // Function to get the Y position of the element
  const getElementYPosition = () => {
    if (inViewRef.current) {
      const yPos = inViewRef.current.offsetTop;
      setYPosition(yPos); // Update state with the Y position
    }
  };

  // Optionally, you can track the position on window resize or scroll
  useEffect(() => {
    // Get initial Y position when component mounts
    getElementYPosition();
  }, [scrollHeight]);

  /* WHOLE PAGE TRANSLATOIN */
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    [
      0,
      yPosition,
      yPosition + viewportSize.height,
      yPosition + viewportSize.height + scrollHeight * 0.9,
      yPosition + viewportSize.height + scrollHeight,
    ],
    [
      viewportSize.height * 1.2,
      viewportSize.height * 1.2,
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

  /* DETECT POPUP */
  /* Calculate popup button position*/
  const popupPosition = usePopupPosition(viewportSize);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useMotionValueEvent(scrollY, "change", (v) => {
    if (
      v > yPosition + scrollHeight * 0.1 &&
      v < scrollHeight + viewportSize.height
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

  return (
    <motion.div
      style={{
        height: scrollHeight,
        position: "relative",
        top: 0,
        overflow: "auto",
        zIndex: isInView ? zIndex : -1
      }}
      ref={scrollTargetRef}
      id="silo_images"
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
        <motion.section className={styles.silo_container}>
          <div className={styles.silo_content}>
            <h3 className={styles.silo_content_heading}>Product Silos</h3>
            <p className={styles.silo_content_text}>
              Ultra-high-definition images of your furniture shot from different
              angles.
            </p>
          </div>

          <div className={styles.silo_image_container}
            style={{
              filter: isModalOpen ? 'blur(10px)' : ''
            }}
          >
            <motion.div 
              className={styles.silo_image_container_inner}
              
            >
              <Image
                src={backgroundImage}
                alt=""
                className={styles.silo_image}
                quality={100}
                unoptimized={true}
              />
            </motion.div>
          </div>

          {/* BUTTON TRIGGER */}
          <motion.div className={styles.popup_button_container} s>
            {isPopupVisible && (
              <TulfaPopupButton
                timer={0}
                height={60}
                width={300}
                textStyle={popupPosition.textStyle}
                text={"Take a closer look"}
                onClick={handleModalOpen}
              />
            )}
          </motion.div>
        </motion.section>
        {/* MODAL CONTAINER */}
        {isModalOpen && <ModalContainer
          ref={modalRef}
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          imageSet={modalImageSet}
          selectionArray={modalSelectionArraySilo}
          random={false}
          filter={filter}
          urlLink={`${window.location.protocol}//${window.location.host}${pathName}?comp=${layoutName + 1}`}
        />}
      </motion.div>
    </motion.div>
  );
};

export default SiloImages;
