"use client";
import styles from "./NewLIfeStyleScenes.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  useMemo,
  useState,
  useContext,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";

/* CUSTOM PROPS */
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import { modalSelectionArrayLifestyle } from "@/utils/constants";
import ModalContainer from "@/components/modals/standard/ModalContainer";

import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
import useFilter from "@/hooks/use_filter";

/* IMAGES */
import modalImageSet from "./lifestyle_scenes_images";
import scrollTransformValues from "@/utils/scrollTransformValues";
import DeviceContext from "@/context/deviceContext";
import useWindowSize from "@/hooks/use_window_size";

const NewLifeStyleScenes: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const memoizedImageSet = useMemo(() => {
    return modalImageSet;
  }, []);
  /*  MODAL RELATED LOGIC */
  //Scroll Block context
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filter = useFilter(setIsModalOpen, layoutName);

  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Detect when the user is in viewport for triggering events
  const pathName = usePathname();

  const deviceContext = useContext(DeviceContext);

  const viewportSize = useWindowSize();

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlePopup = useCallback((isPopupVisible) => {
    setIsPopupVisible(isPopupVisible);
  }, []);

  return (
    <>
      {/* <div ref={inViewRef} className={styles.inview_trigger}></div> */}
      <LargeSlideContainer
        layoutName={layoutName}
        title="Lifestyle Scenes"
        paragraph="Showcase your furniture in thousands of beautifully designed room setups - without moving a thing or touching a camera."
        zIndex={zIndex}
        dynamicHeader={true}
        scrollMap={scrollTransformValues.lifestyle}
        handlePopup={handlePopup}
      >
          <motion.section
            className={styles.image_container}
            style={{
              filter: isModalOpen ? "blur(10px)" : "",
            }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
              transition:{
                delay: 1,
                duration: 0.5
              }
            }}
          >
            <Image
              src="/images/lifestyle_scenes/image_two.webp"
              alt=""
              width={2912}
              height={1632}
              className={styles.background_image}
              quality={deviceContext === "Other" ? 50 : 25}
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
          display: isPopupVisible ? "block" : "none",
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
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          imageSet={memoizedImageSet}
          selectionArray={modalSelectionArrayLifestyle}
          differentSizes={true}
          random={false}
          filter={filter}
          urlLink={`${window.location.protocol}//${window.location.host}${pathName}?comp=${layoutName}`}
          viewportSize={viewportSize}
        />
      )}
    </>
  );
};

export default NewLifeStyleScenes;
