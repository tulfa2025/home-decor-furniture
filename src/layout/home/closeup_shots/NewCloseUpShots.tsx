"use client";
import styles from "./NewCloseUpShots.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  useRef,
  useState,
  useEffect,
  useMemo,
  useContext,
  useCallback,
} from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

/* CUSTOM COMPONENTS */
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
import ModalContainer from "@/components/modals/standard/ModalContainer";
import useInView from "@/hooks/use_inview";

/* IMAGES */
import modalImageSet from "./closeup_shots_images";
import DeviceContext from "@/context/deviceContext";
import useWindowSize from "@/hooks/use_window_size";

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

  // Ensure the ref is available before applying useScroll
  const scrollTargetRef = useRef(null);

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.05);
  const isPopupVisible = useInView(inViewRef, 0.75);


  const deviceContext = useContext(DeviceContext);

  // Cleanup
  useEffect(() => {
    return () => {
      if (scrollTargetRef.current) {
        scrollTargetRef.current = null;
      }

      if (inViewRef.current) {
        inViewRef.current = null;
      }
    };
  }, []);

  return (
    <>
      <LargeSlideContainer
        layoutName={layoutName}
        title="Close Up Shots"
        paragraph="Pinpoint your furniture's intricate design elements and craftmanship."
        zIndex={zIndex}
      >
        <div ref={inViewRef} className={styles.inview_trigger}></div>
        {isInView && (
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
          >
            <Image
              src="/images/closeup_shots/rug_one.webp"
              alt=""
              className={styles.background_image}
              ref={scrollTargetRef}
              quality={deviceContext === "Other" ? 50 : 10}
              width={3000}
              height={3000}
            />{" "}
          </motion.section>
        )}
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
