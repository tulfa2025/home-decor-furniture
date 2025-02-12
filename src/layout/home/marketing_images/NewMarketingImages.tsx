"use client";
import styles from "./NewMarketingImages.module.scss";
import { motion } from "framer-motion";
import Image from "next/image";
import { useRef, useState, useEffect, useMemo, useContext } from "react";
import { usePathname } from "next/navigation";

/* CUSTOM PROPS */
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import ModalContainer from "@/components/modals/standard/ModalContainer";
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
import useFilter from "@/hooks/use_filter";
import useInView from "@/hooks/use_inview";

/* IMAGES */
import modalImageSet from "./marketing_images";
import DeviceContext from "@/context/deviceContext";
import scrollTransformValues from "@/utils/scrollTransformValues";
import useWindowSize from "@/hooks/use_window_size";

const NewMarketingImages: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const memoizedImageSet = useMemo(() => {
    return modalImageSet;
  }, []);
  /*  MODAL RELATED LOGIC */

  const viewportSize = useWindowSize();
  //Scroll Block context
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filter = useFilter(setIsModalOpen, layoutName);

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
  const isInView = useInView(inViewRef, 0.1);
  const isPopupVisible = useInView(inViewRef, 0.75);

  const pathName = usePathname();

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
        title="Marketing Images"
        paragraph="Lorem ipsum dolor sit amet sonsectetur. Id lacus enim amet aliquet phasellus porta notaque."
        zIndex={zIndex}
        scrollMap={scrollTransformValues.marketingImgs}
      >
        <div ref={inViewRef} className={styles.inview_trigger}></div>
        {isInView && (
          <motion.section
            className={styles.image_container}
            ref={scrollTargetRef}
            style={{
              filter: isModalOpen ? "blur(10px)" : "",
            }}
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            transition={{
              delay: 0.5
            }}
          >
            <Image
              src="/images/marketing_images/kv2.webp"
              alt=""
              className={styles.background_image_top}
              quality={deviceContext === "Other" ? 50 : 10}
              width={3000}
              height={2400}
            />
            <Image
              src="/images/marketing_images/mockup revista 2.webp"
              alt=""
              className={styles.background_image_bottom_left}
              quality={deviceContext === "Other" ? 50 : 10}
              width={3000}
              height={2400}
            />
            <Image
              src="/images/marketing_images/mockup laptop.webp"
              alt=""
              className={styles.background_image_bottom_right}
              quality={deviceContext === "Other" ? 50 : 10}
              width={3000}
              height={2400}
            />
          </motion.section>
        )}
      </LargeSlideContainer>
      {/* Marketing IMages SCENES Modal */}
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
          selectionArray={[]}
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

export default NewMarketingImages;
