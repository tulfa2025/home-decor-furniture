"use client";
import styles from "./NewLIfeStyleScenes.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { useMemo, useRef, useState, useEffect } from "react";
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
import modalImageSet from "./lifestyle_scenes_images";

const NewLifeStyleScenes: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const memoizedImageSet = useMemo(()=>{
    return modalImageSet
  }, [])
  /*  MODAL RELATED LOGIC */
  //Scroll Block context
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filter = useFilter(setIsModalOpen, layoutName);

  const modalRef = useRef(null);
  const handleModalOpen = () => {
    setIsPopupVisible(false);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsPopupVisible(true);
    setIsModalOpen(false);
  };

  // Ensure the ref is available before applying useScroll
  const scrollTargetRef = useRef(null);

  /* DETECT POPUP */
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.5);
  /*POPUPBUTTON ANIMATION */
  useEffect(() => {
    if (isInView) {
      setIsPopupVisible(true);
    } else {
      setIsPopupVisible(false);
    }
  }, [isInView]);

  const pathName = usePathname();

  return (
    <>
      <LargeSlideContainer
        layoutName={layoutName}
        title="Lifestyle Scenes"
        paragraph="Showcase your furniture in thousands of beautifully designed room setups - without moving a thing or touching a camera."
        zIndex={zIndex}
        dynamicHeader={true}
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
      </LargeSlideContainer>
      {/* LIFESTYLE SCENES Modal */}
      {/* BUTTON TRIGGER */}
      <motion.div
        className={styles.closeup_button_container}
        initial={{
          opacity: 0,

        }}
        style={{
          display: isPopupVisible ? 'block' : 'none',
        }}
        whileInView={{
          opacity: isPopupVisible ? 1 : 0,
          transition: {
            delay: 0.5,
            duration: 0.1,
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
      {isModalOpen && (
        <ModalContainer
          ref={modalRef}
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          imageSet={memoizedImageSet}
          selectionArray={modalSelectionArrayLifestyle}
          differentSizes={true}
          random={false}
          filter={filter}
          urlLink={`${window.location.protocol}//${window.location.host}${pathName}?comp=${layoutName}`}
        />
      )}
    </>
  );
};

export default NewLifeStyleScenes;
