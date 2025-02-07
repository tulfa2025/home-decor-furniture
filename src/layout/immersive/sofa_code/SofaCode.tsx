"use client";
import styles from "./sofa_code.module.scss";
import Image from "next/image";
import { useRef, useState, useEffect, useContext } from "react";
import {
  useScroll,
  useTransform,
  motion,
  useSpring,
  useMotionValueEvent,
} from "motion/react";
/* CUSTOM CONTEXT */
import useWindowSize from "@/hooks/use_window_size";
import useInView from "@/hooks/use_inview";
import SlideContext from "@/context/changeSlide";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import SubheaderStyleContext from "@/context/subHeaderStyle";

/* CUSTOM COMPONENT */
import CallOut from "@/components/call_out/CallOut";

/*Images */
import ipad from "../../../assets/images/immersive/Ipad 1.png";
import sofa from "../../../assets/images/immersive/dr.png";
import qr from "../../../assets/images/immersive/image 12.png";
import useScrollTransform from "@/hooks/use_scrolltransform";
import scrollTransformValues, {
  scrollSpringProperties,
} from "@/utils/scrollTransformValues";
import DeviceContext from "@/context/deviceContext";
import ThreeDSofa from "../3d_sofa/ThreeDSofa";
import ARIcon from "@/assets/icons/arIcon";

const SofaCode: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  // Get scroll height
  const viewportSize = useWindowSize();

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

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
    scrollTransformValues.sofaCode
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

  const deviceContext = useContext(DeviceContext);

  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
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
          {/* MOBILE DEVICE */}
          {deviceContext !== "Other" ? (
            <>
              <div className={styles.left_container}>
                <Image className={styles.immersive_image} src={ipad} alt="" />

                <Image className={styles.sofa} src={sofa} alt="" />

                <Image className={styles.qr} src={qr} alt="" />
              </div>
              <div className={styles.right_container}>
                <CallOut
                  heading="Immersive Experience"
                  paragraph="Scan this QR Code with your phone to view the object in your space. The experience launches directly from your browser."
                  overrideStyles={styles.callout_container_outer}
                  overrideParagraphStyle={styles.callout_paragraph}
                  calloutStyleType={1}
                />
              </div>
            </>
          ) : (
            <>
              <ThreeDSofa />
              <div>
                <ARIcon
                  onClick={()=>{
                    setIsModalOpen(!isModalOpen)
                  }}
                />
              </div>
              {
                isModalOpen && (
                  <div
                    className={styles.modalPopup}
                  >
                    <h3
                      className={styles.headerContainer}  
                    >
                      Augmented Reality
                    </h3>
                    <Image
                      src=''
                      alt=''
                    />
                    <span>
                      Point your camera at the QR code. Tap the banner that appears on your screen.

                    </span>
                    <button
                      onClick={()=>{
                        setIsModalOpen(false)
                      }}
                    >
                      Close
                    </button>
                  </div>
                )
               }
            </>
          )}
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default SofaCode;
