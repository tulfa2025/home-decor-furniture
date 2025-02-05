"use client";
import styles from "./NewCloseUpShots.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useMemo, useContext } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

/* CUSTOM COMPONENTS */
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
const ModalContainer = dynamic(
  () => import("@/components/modals/standard/ModalContainer"),
  {
    ssr: false,
  }
);
import useInView from "@/hooks/use_inview";

/* IMAGES */
import backgroundImage from "../../../assets/images/closeup_shots/rug_one.webp";
import modalImageSet from "./closeup_shots_images";
import DeviceContext from "@/context/deviceContext";

const NewCloseUpShots: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const memoizedImageSet = useMemo(()=>{
    return modalImageSet
  }, [])
  const pathName = usePathname();
  /*  MODAL RELATED LOGIC */
  //Scroll Block context
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);
  const handleModalOpen = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  // Ensure the ref is available before applying useScroll
  const scrollTargetRef = useRef(null);

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.5);

  const deviceContext = useContext(DeviceContext)

  return (
    <>
      <LargeSlideContainer
        layoutName={layoutName}
        title="Close Up Shots"
        paragraph="Pinpoint your furniture's intricate design elements and craftmanship."
        zIndex={zIndex}
      >
        <motion.section
          className={styles.image_container}
          ref={inViewRef}
          style={{
            filter: isModalOpen && deviceContext === 'Other' ? "blur(10px)" : "",
          }}
        >
          <Image
            src={backgroundImage}
            alt=""
            priority
            className={styles.background_image}
            ref={scrollTargetRef}
            quality={deviceContext === 'Other' ? 50 : 20}
          />
        </motion.section>
      </LargeSlideContainer>
      {/* LIFESTYLE SCENES Modal */}
      {/* BUTTON TRIGGER */}
      <motion.div
        className={styles.closeup_button_container}
      >
        {isInView&& (
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
