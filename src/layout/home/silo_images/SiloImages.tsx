"use client";

import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValueEvent,
} from "framer-motion";
import { useRef, useState, useEffect, useContext, useMemo } from "react";
import styles from "./SiloImages.module.scss";
import { modalSelectionArraySilo } from "@/utils/constants";
import { usePathname } from "next/navigation";
import Image from "next/image";
import dynamic from "next/dynamic";

/*CUSTOM COMPONENTS */
const ModalContainer = dynamic(
  () => import("@/components/modals/standard/ModalContainer"),
  {
    ssr: false,
  }
);
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";

/* CUSTOM HOOKS */
import useInView from "@/hooks/use_inview";
import useFilter from "@/hooks/use_filter";
import useWindowSize from "@/hooks/use_window_size";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import usePopupPosition from "@/utils/calculate_popupbutton.loc";
import useScrollTransform from "@/hooks/use_scrolltransform";
import scrollTransformValues, { scrollSpringProperties } from "@/utils/scrollTransformValues";
/* Images */
import backgroundImage from "../../../assets/images/silo_images/np_A_cute_pink_and_blue_patterned_chair_with_wooden_le.webp";
import modalImageSet from "./image_sources_silo";

/* CONTEXT */
import SubheaderStyleContext from "@/context/subHeaderStyle";
import SlideContext from "@/context/changeSlide";
import DeviceContext from "@/context/deviceContext";

const SiloImages: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  // Get scroll height
  const viewportSize = useWindowSize();
  const pathName = usePathname();

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.5);

  const scrollTargetRef = useRef(null);
  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  /* CHANGE SLIDE CONTEXT */
  const handleChangeSlide = useContext(SlideContext);

  useEffect(() => {
    if (isInView) {
      handleChangeSlide(layoutName);
    }
  }, [isInView]);

  const scrollHeight = calculateScrollHeight(viewportSize.height, 2);

  /* MODAL TRIGGER */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);
  const handleModalOpen = () => {
    setIsPopupVisible(false);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsPopupVisible(true);
    setIsModalOpen(false);
  };

  /* Filters set for this modal */
  const filter = useFilter(setIsModalOpen, layoutName);

  /* ANIMATION START AND END POSITION */
  const [yPosition, setYPosition] = useState(0);

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
  const [input, transform] = useScrollTransform(
    scrollHeight,
    viewportSize,
    yPosition,
    scrollTransformValues.silo
  );
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    input,
    transform
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    scrollSpringProperties
  );

  /* DETECT POPUP */
  /* Calculate popup button position*/
  const popupPosition = usePopupPosition(viewportSize);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsPopupVisible(true);
    } else {
      setIsPopupVisible(false);
    }
  }, [isInView]);

  const [headerStyle, setHeaderStyle] = useContext(SubheaderStyleContext);

  /* SET HEADER STYLE AT DIFFERNT INTERVALS */
  useMotionValueEvent(scrollY, "change", (v) => {
    if (isInView) {
      if (v > yPosition) {
        setHeaderStyle(0);
      }
    }
  });

  // Memoize images
  const memoizedImageSet = useMemo(() => {
    return modalImageSet;
  }, []);

  const deviceContext = useContext(DeviceContext)

  return (
    <>
      <motion.div
        style={{
          height: scrollHeight,
          position: "relative",
          top: 0,
          overflow: "auto",
          zIndex: isInView ? zIndex : -1,
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
                Ultra-high-definition images of your furniture shot from
                different angles.
              </p>
            </div>

            <div
              className={styles.silo_image_container}
              style={{
                filter: isModalOpen ? "blur(10px)" : "",
              }}
            >
              <motion.div className={styles.silo_image_container_inner}>
                <Image
                  src={backgroundImage}
                  alt=""
                  className={styles.silo_image}
                  quality={deviceContext === 'Other' ? 50 : 20}
                />
              </motion.div>
            </div>
          </motion.section>
        </motion.div>
      </motion.div>

      {/* MODAL CONTAINER */}
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
      {isModalOpen && (
        <ModalContainer
          ref={modalRef}
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          imageSet={memoizedImageSet}
          selectionArray={modalSelectionArraySilo}
          random={false}
          filter={filter}
          urlLink={`${window.location.protocol}//${window.location.host}${pathName}?comp=${layoutName}`}
        />
      )}
    </>
  );
};

export default SiloImages;
