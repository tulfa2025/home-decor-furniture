"use client";
import styles from "./NewLIfeStyleScenes.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext, useRef, useState, useEffect } from "react";
import ScrollContext from "@/context/scrollContext";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

/* CUSTOM PROPS */
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import backgroundImage from "../../../assets/images/lifestyle_scenes/placeholder/image_two.png";
import { modalSelectionArrayLifestyle } from "@/utils/constants";
const ModalContainer = dynamic(
  () => import("@/components/modals/ModalContainer"),
  {
    ssr: false,
  }
);
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
import useFilter from "@/hooks/use_filter";
import useInView from "@/hooks/use_inview";

/* IMAGES */
import modalImageSet from "../lifestyle_scenes_images";

const NewLifeStyleScenes: React.FC<LayoutProps> = ({
  layoutName,
  handleLayoutLoad,
  handleChangeSlide,
  zIndex
}) => {
  /*  MODAL RELATED LOGIC */
  //Scroll Block context
  const handleIsScrollBlocked = useContext(ScrollContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filter = useFilter(setIsModalOpen, layoutName);

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
      // For touch events (e.g., touchmove), check the vertical movement
      if (e.touches[0].clientY > e.changedTouches[0].clientY) {
        if (!isPopupVisible) setIsPopupVisible(true);
      } 
    }

      
    };

    scrollTargetRef.current.removeEventListener(
      "wheel",
      setPopupVisibleLifestyle
    );
    scrollTargetRef.current.removeEventListener(
      "touchmove",
      setPopupVisibleLifestyle
    );

    if (scrollTargetRef.current) {
      scrollTargetRef.current.removeEventListener(
        "wheel",
        setPopupVisibleLifestyle
      );
      scrollTargetRef.current.removeEventListener(
        "touchmove",
        setPopupVisibleLifestyle
      );

      scrollTargetRef.current.addEventListener(
        "wheel",
        setPopupVisibleLifestyle
      );
      scrollTargetRef.current.addEventListener(
        "touchmove",
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
          "touchmove",
          setPopupVisibleLifestyle
        );
      }
    };
  }, [isInView]);

  const pathName = usePathname();

  return (
    <>
      <LargeSlideContainer
        layoutName={layoutName}
        handleLayoutLoad={handleLayoutLoad}
        handleChangeSlide={handleChangeSlide}
        title="Lifestyle Scenes"
        paragraph="Showcase your furniture in thousands of beautifully designed room setups - without moving a thing or touching a camera."
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
            opacity:0 
          }}
          whileInView={{
            opacity: isPopupVisible ? 1 : 0,
            transition: {
              delay: 0.5,
              duration: 0.1
            }
          }}
          viewport={{
            amount: 0.5
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
          selectionArray={modalSelectionArrayLifestyle}
          differentSizes={true}
          random={false}
          filter={filter}
          urlLink={`${window.location.protocol}//${window.location.host}${pathName}?comp=${layoutName + 1}`}
        />
      )}
    </>
  );
};

export default NewLifeStyleScenes;
