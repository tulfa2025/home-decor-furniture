"use client";
import styles from "./ar_silo.module.scss";
import Image from "next/image";
import { useRef, useState, useEffect, useContext } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
import dynamic from "next/dynamic";
import { usePathname } from "next/navigation";
/* CUSTOM CONTEXT */
import useWindowSize from "@/hooks/use_window_size";
import useInView from "@/hooks/use_inview";
import SlideContext from "@/context/changeSlide";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import SubheaderStyleContext from "@/context/subHeaderStyle";
/* CUSTOM COMPONENT */
import CallOut from "@/components/call_out/CallOut";
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";
const ARModalContainer = dynamic(
  () => import("@/components/modals/ar/ARModalContainer"),
  {
    ssr: false,
  }
);

/*Images */
import mockup from "../../../assets/images/immersive/mockup.png";
import usePopupPosition from "@/utils/calculate_popupbutton.loc";
import modalImageSet from "./ar_silo_images";
import useScrollTransform from "@/hooks/use_scrolltransform";
import scrollTransformValues, { scrollSpringProperties } from "@/utils/scrollTransformValues";
import useFilter from "@/hooks/use_filter";

const ARSilo: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  // Get scroll height
  const viewportSize = useWindowSize();
  const pathName = usePathname();

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.2);

  const scrollTargetRef = useRef(null);
  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  /* CHANGE SLIDE CONTEXT */
  const handleChangeSlide = useContext(SlideContext);

  useEffect(() => {
    if (isInView) {
      handleChangeSlide(layoutName);
    }
  }, [isInView]);

  const scrollHeight = calculateScrollHeight(viewportSize.height, 1);

  /* MODAL TRIGGER */
  const [isModalOpen, setIsModalOpen] = useState(false);

  const modalRef = useRef(null);
  const handleModalOpen = () => {
    setIsPopupVisible(false);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsPopupVisible(true);
    setIsModalOpen(false);
  };

  /* IF modal filter in path name then set open */
  useFilter(setIsModalOpen, layoutName);

  /* ANIMATION START AND END POSITION */
  const [yPosition, setYPosition] = useState(0);

  // Function to get the Y position of the element
  const getElementYPosition = () => {
    if (scrollTargetRef.current) {
      const yPos = scrollTargetRef.current.offsetTop;
      setYPosition(yPos); // Update state with the Y position
    }
  };

  // Optionally, you can track the position on window resize or scroll
  useEffect(() => {
    // Get initial Y position when component mounts
    getElementYPosition();
  }, [scrollHeight]);

  /* WHOLE PAGE TRANSLATOIN */
  const [input, transform] = useScrollTransform(
    scrollHeight,
    viewportSize,
    yPosition,
    scrollTransformValues.arSilo
  );
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    input,
    transform
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    scrollSpringProperties
  );

  /* DETECT POPUP */
  /* Calculate popup button position*/
  const popupPosition = usePopupPosition(viewportSize);

  const [isPopupVisible, setIsPopupVisible] = useState(false);

  useEffect(() => {
    if (isInView) {
      setIsPopupVisible(true);

      
    } else {
      setIsPopupVisible(false);
    }
  }, [isInView]);

  const timeoutRef= useRef(null)

  useEffect(()=>{
    if(!hasAnimatedRef.current && isInView){

    
      timeoutRef.current =setTimeout(()=>{
        hasAnimatedRef.current = true
      }, 2000)
    } else {
      clearTimeout(timeoutRef.current)

    }
  },[isInView])

  // Subheadr scroll
  const [headerStyle, setHeaderStyle] = useContext(SubheaderStyleContext);
  /* SET HEADER STYLE AT DIFFERNT INTERVALS */
  useMotionValueEvent(scrollY, "change", (v) => {
    if (isInView) {
      if (v > yPosition) {
        setHeaderStyle(0);
      }
    }
  });

  const hasAnimatedRef = useRef(false)

  return (
    <>
      <motion.div
        style={{
          height: scrollHeight,
          position: "relative",
          top: 0,
          overflow: "auto",
          zIndex: isInView ? zIndex : -1,
        }}
        ref={scrollTargetRef}
      >
        <motion.div
          style={{
            top: 0,
            position: "fixed",
            height: "100vh",
            width: "100vw",
            y: springyTransformShowcaseAnimationThree,
          }}
          ref={inViewRef}
        >
          {/* CONTENT AQUI */}
          <motion.section className={styles.container}>
            <motion.div 
              className={styles.left_container}
              initial={{
                opacity: hasAnimatedRef.current  ? 1 : 0
              }}
              animate={{
                opacity: isInView ? 1 : 0,
                transition:{
                  delay: 1
                }
              }}
              >


              <CallOut
                heading="Lorem ipsum dolor sit amet."
                paragraph="Lorem ipsum dolor sit amet consectetur. Congue dui semper eu egestas posuere vehicula sodales mi."
                overrideStyles={styles.callout_container_outer}
                overrideHeaderStyle={styles.callout_header}
                overrideParagraphStyle={styles.callout_paragraph}
                calloutStyleType={1}
              />
            </motion.div>
            <motion.div 
              className={styles.right_container}
              initial={{
                transform: !hasAnimatedRef.current ? 'translateX(-50vw)' : 'translateX(0)'
              }}
              animate={{
                transform: 
                isInView 
                && !hasAnimatedRef.current
                ? 'translateX(0)' :  (hasAnimatedRef.current ? 'translateX(0)' : 'translateX(-50vw)')
              }}
              transition={{
                delay: 0.8,
                duration: 0.45,
                ease: "easeIn"
              }}

            >
              <Image className={styles.immersive_image} src={mockup} alt="" />
            </motion.div>
          </motion.section>
        </motion.div>
      </motion.div>

      {/* BUTTON TRIGGER */}
      <motion.div className={styles.popup_button_container} s>
        {isPopupVisible && (
          <TulfaPopupButton
            timer={0}
            height={60}
            width={300}
            textStyle={popupPosition.textStyle}
            text={"Take a closer look"}
            onClick={handleModalOpen}
          />
        )}
      </motion.div>
      {isModalOpen && (
        <ARModalContainer
          ref={modalRef}
          handleModalClose={handleModalClose}
          isModalOpen={isModalOpen}
          imageSet={modalImageSet}
          selectionArray={[]}
          random={false}
          urlLink={`${window.location.protocol}//${window.location.host}${pathName}?comp=${layoutName}`}
        />
      )}
    </>
  );
};

export default ARSilo;
