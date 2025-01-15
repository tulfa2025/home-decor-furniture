"use client";
import styles from "./NewMarketingImages.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { useContext, useRef, useState, useEffect } from "react";
import ScrollContext from "@/context/scrollContext";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";

/* CUSTOM PROPS */
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
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
import modalImageSet from "./marketing_images";
import backgroundImageOne from '../../../assets/images/marketing_images/kv2.jpg'
import backgroundImageTwo from '../../../assets/images/marketing_images/mockup revista 2.jpg'
import backgroundImageThree from '../../../assets/images/marketing_images/mockup laptop.jpg'


const NewMarketingImages: React.FC<LayoutProps> = ({
  layoutName,
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
  const isInView = useInView(inViewRef, 0.4);
  /*POPUPBUTTON ANIMATION */
  useEffect(() => {
    setIsPopupVisible(true)
  }, [isInView]);

  const pathName = usePathname();

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
            filter: isModalOpen ? "blur(10px)" : "",
          }}
        >
          <Image
            src={backgroundImageOne}
            alt=""
            className={styles.background_image_top}
            ref={inViewRef}
          />
          <Image
            src={backgroundImageTwo}
            alt=""
            className={styles.background_image_bottom_left}
            
          />
          <Image
            src={backgroundImageThree}
            alt=""
            className={styles.background_image_bottom_right}
            
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
      {/* Marketing IMages SCENES Modal */}
      {isModalOpen && (
        <ModalContainer
          ref={modalRef}
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          imageSet={modalImageSet}
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
