"use client";
import styles from "./NewCloseUpShots.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  useState,
  useMemo,
  useContext,
  useCallback,
} from "react";
import { usePathname } from "next/navigation";

/* CUSTOM COMPONENTS */
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
import ModalContainer from "@/components/modals/standard/ModalContainer";

/* IMAGES */
import modalImageSet from "./closeup_shots_images";
import DeviceContext from "@/context/deviceContext";
import useWindowSize from "@/hooks/use_window_size";
import scrollTransformValues from "@/utils/scrollTransformValues";

const NewCloseUpShots: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const memoizedImageSet = useMemo(() => {
    return modalImageSet;
  }, []);
  const pathName = usePathname();

  const viewportSize = useWindowSize();
  /*  MODAL RELATED LOGIC */
  //Scroll Block context
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Modal open and close handlers using useCallback to prevent unnecessary re-creations
  const handleModalOpen = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
  }, []);

  const deviceContext = useContext(DeviceContext);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  const handlePopup = useCallback((isPopupVisible) => { setIsPopupVisible(isPopupVisible)}, []);

  return (
    <>
      <LargeSlideContainer
        layoutName={layoutName}
        title="Close Up Shots"
        paragraph="Pinpoint your furniture's intricate design elements and craftmanship."
        zIndex={zIndex}
        handlePopup={handlePopup}
        scrollMap={scrollTransformValues.closeUp}
      >
        
        <motion.section
          className={styles.image_container}
          style={{
            filter:
              isModalOpen && deviceContext === "Other" ? "blur(10px)" : "",
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
          transition={{
            duration: 0.25,
          }}
        >
          <Image
            src="/images/closeup_shots/rug_one.webp"
            alt=""
            className={styles.background_image}
            quality={deviceContext === "Other" ? 50 : 25}
            width={3000}
            height={3000}
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
      {isModalOpen && (
        <ModalContainer
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          imageSet={memoizedImageSet}
          selectionArray={[]}
          differentSizes={true}
          random={false}
          urlLink={`${window.location.protocol}//${
            window.location.host
          }${pathName}?comp=${layoutName + 1}`}
          viewportSize={viewportSize}
        />
      )}
    </>
  );
};

export default NewCloseUpShots;
