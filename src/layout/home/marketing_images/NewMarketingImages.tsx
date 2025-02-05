"use client";
import styles from "./NewMarketingImages.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useMemo, useContext } from "react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

/* CUSTOM PROPS */
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
const ModalContainer = dynamic(
  () => import("@/components/modals/standard/ModalContainer"),
  {
    ssr: false,
  }
);
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
import useFilter from "@/hooks/use_filter";
import useInView from "@/hooks/use_inview";

/* IMAGES */
import modalImageSet from "./marketing_images";
import backgroundImageOne from "../../../assets/images/marketing_images/kv2.webp";
import backgroundImageTwo from "../../../assets/images/marketing_images/mockup revista 2.webp";
import backgroundImageThree from "../../../assets/images/marketing_images/mockup laptop.webp";
import DeviceContext from "@/context/deviceContext";

const NewMarketingImages: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {

  const memoizedImageSet = useMemo(()=>{
    return modalImageSet
  }, [])
  /*  MODAL RELATED LOGIC */
  //Scroll Block context
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filter = useFilter(setIsModalOpen, layoutName);

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
  const isInView = useInView(inViewRef, 0.4);


  const pathName = usePathname();

  const deviceContext = useContext(DeviceContext)

  return (
    <>
      <LargeSlideContainer
        layoutName={layoutName}
        title="Marketing Images"
        paragraph="Lorem ipsum dolor sit amet sonsectetur. Id lacus enim amet aliquet phasellus porta notaque."
        zIndex={zIndex}
      >
        <motion.section
          className={styles.image_container}
          ref={scrollTargetRef}
          style={{
            filter: isModalOpen && deviceContext === 'Other' ? "blur(10px)" : "",
          }}
        >
          <Image
            src={backgroundImageOne}
            alt=""
            className={styles.background_image_top}
            ref={inViewRef}
            quality={deviceContext === 'Other' ? 50 : 20}
          />
          <Image
            src={backgroundImageTwo}
            alt=""
            className={styles.background_image_bottom_left}
            quality={deviceContext === 'Other' ? 50 : 20}
          />
          <Image
            src={backgroundImageThree}
            alt=""
            className={styles.background_image_bottom_right}
            quality={deviceContext === 'Other' ? 50 : 20}
          />
        </motion.section>
      </LargeSlideContainer>
      {/* Marketing IMages SCENES Modal */}
      {/* BUTTON TRIGGER */}
      <motion.div
        className={styles.closeup_button_container}
      >
        {isInView && (
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
          filter={filter}
          urlLink={`${window.location.protocol}//${window.location.host}${pathName}?comp=${layoutName}`}
        />
      )}
    </>
  );
};

export default NewMarketingImages;
