"use client";
import styles from "./NewCloseUpShots.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext, useRef, useState, useEffect } from "react";
import ScrollContext from "@/context/scrollContext";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

/* CUSTOM COMPONENTS */
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
const ModalContainer = dynamic(
  () => import("@/components/modals/ModalContainer"),
  {
    ssr: false,
  }
);
import useInView from "@/hooks/use_inview";

/* IMAGES */
import backgroundImage from "../../../assets/images/closeup_shots/rug_one.png";
import modalImageSet from "../closeup_shots_images";

const NewCloseUpShots: React.FC<LayoutProps> = ({
  layoutName,
  handleLayoutLoad,
  handleChangeSlide,
  zIndex,
}) => {
  const pathName = usePathname();
  /*  MODAL RELATED LOGIC */
  //Scroll Block context
  const handleIsScrollBlocked = useContext(ScrollContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);
  const handleModalOpen = () => {
    handleIsScrollBlocked(true, modalRef);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    handleIsScrollBlocked(false, modalRef);
    setIsModalOpen(false);
  };

  // Ensure the ref is available before applying useScroll
  const scrollTargetRef = useRef(null);

  /* DETECT POPUP */
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);
  /*POPUPBUTTON ANIMATION */
  useEffect(() => {
    const setPopupVisibleLifestyle = (e) => {
      if (!isInView) return;

      // For touch events or wheel events, check the deltaY or y position
      if (e instanceof WheelEvent) {
        // For wheel events, deltaY will indicate scroll direction
        if (e.deltaY > 0) {
          if (!isPopupVisible) setIsPopupVisible(true);
        }
      } else if (e instanceof TouchEvent) {
        // If taps slide then triggers popup
        if (!isPopupVisible) setIsPopupVisible(true);
      }
    };

    scrollTargetRef.current.removeEventListener(
      "wheel",
      setPopupVisibleLifestyle
    );
    scrollTargetRef.current.removeEventListener(
      "touchend",
      setPopupVisibleLifestyle
    );

    if (scrollTargetRef.current) {
      scrollTargetRef.current.removeEventListener(
        "wheel",
        setPopupVisibleLifestyle
      );
      scrollTargetRef.current.removeEventListener(
        "touchend",
        setPopupVisibleLifestyle
      );

      scrollTargetRef.current.addEventListener(
        "wheel",
        setPopupVisibleLifestyle
      );
      scrollTargetRef.current.addEventListener(
        "touchend",
        setPopupVisibleLifestyle
      );
    }
    return () => {
      if (scrollTargetRef.current) {
        scrollTargetRef.current.removeEventListener(
          "wheel",
          setPopupVisibleLifestyle
        );
        scrollTargetRef.current.removeEventListener(
          "touchend",
          setPopupVisibleLifestyle
        );
      }
    };
  }, [isInView]);

  return (
    <>
      <LargeSlideContainer
        layoutName={layoutName}
        handleLayoutLoad={handleLayoutLoad}
        handleChangeSlide={handleChangeSlide}
        title="Close Up Shots"
        paragraph="Pinpoint your furniture's intricate design elements and craftmanship."
        zIndex={zIndex}
      >
        <motion.section
          className={styles.image_container}
          ref={inViewRef}
          style={{
            filter: isModalOpen ? "blur(10px)" : "",
          }}
        >
          <Image
            src={backgroundImage}
            alt=""
            priority
            className={styles.background_image}
            ref={scrollTargetRef}
          />
        </motion.section>

        {/* BUTTON TRIGGER */}
        <motion.div
          className={styles.closeup_button_container}
          initial={{
            opacity: 0,
          }}
          whileInView={{
            opacity: isPopupVisible ? 1 : 0,
            transition: {
              duration: 0.5,
            },
          }}
          viewport={{
            amount: 0.5,
          }}
        >
          {isPopupVisible && (
            <TulfaPopupButton
              timer={0}
              height={60}
              width={300}
              text={"Take a closer look"}
              onClick={handleModalOpen}
            />
          )}
        </motion.div>
      </LargeSlideContainer>
      {/* LIFESTYLE SCENES Modal */}
      {isModalOpen && (
        <ModalContainer
          ref={modalRef}
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          imageSet={modalImageSet}
          selectionArray={[]}
          differentSizes={true}
          random={false}
          urlLink={`${window.location.protocol}//${
            window.location.host
          }${pathName}?comp=${layoutName + 1}`}
        />
      )}
    </>
  );
};

export default NewCloseUpShots;
