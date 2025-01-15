import { motion } from "framer-motion";
import styles from "./ProductVideosBanner.module.scss";
import { useRef, useState, useEffect } from "react";
import { useScroll, useSpring, useTransform } from "framer-motion";

/* CUSTOM COMPONENTS */
import ShowCase from "@/components/showcase/ShowCase";
import VideoPlayer from "@/components/video/VideoPlayer";
import CallOut from "@/components/call_out/CallOut";

/* CUSTOM HOOKS */
import useWindowSize from "@/hooks/use_window_size";
import useInView from "@/hooks/use_inview";
import calculateScrollHeight from "@/utils/calculate_scrollheight";

const ProductVideosBanner: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  // Get scroll height
  const viewportSize = useWindowSize();

  // Detect when the user is in viewport for triggering events
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.1);

  const scrollTargetRef = useRef(null);
  const { scrollY } = useScroll({
    target: scrollTargetRef,
  });

  const scrollHeight = calculateScrollHeight(viewportSize.height, 1.5);

  /* ANIMATION START AND END POSITION */
  const [yPosition, setYPosition] = useState(0);

  // Function to get the Y position of the element
  const getElementYPosition = () => {
    if (inViewRef.current) {
      const yPos = inViewRef.current.offsetTop;
      setYPosition(yPos); // Update state with the Y position
    }
  };

  // Optionally, you can track the position on window resize or scroll
  useEffect(() => {
    // Get initial Y position when component mounts
    getElementYPosition();
  }, [scrollHeight]);

  /* WHOLE PAGE TRANSLATOIN */
  const transformShowcaseAnimationThree = useTransform(
    scrollY,
    [0, yPosition + scrollHeight * 0.5, yPosition + scrollHeight],
    [0, 0, -viewportSize.height * 2.4]
  );

  const springyTransformShowcaseAnimationThree = useSpring(
    transformShowcaseAnimationThree,
    {
      damping: 40,
      stiffness: 150,
    }
  );
  return (
    <motion.div
      style={{
        height: scrollHeight,
        position: "relative",
        top: 0,
        overflow: "auto",
        zIndex: zIndex,
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
        {/* INITIAL SCENE */}

        <motion.section className={styles.video_scene_container}>
          <motion.div className={styles.video_scene_container_inner}>
            <div className={styles.showcase_container}>
              <ShowCase heading="Product Videos" />
            </div>

            <motion.div>
              <VideoPlayer
                src="/videos/product/Kitchen-3D-Rendering_compressed.mp4"
                type="video/mp4"
                loop={true}
                styleOverride={{
                  zIndex: 0,
                  position: "absolute",
                  opacity: 0.7,
                }}
                isInView={viewportSize.width > 768 ? isInView : false}
                autoplay={false}
                poster="/videos/product/Kitchen-3D-Rendering_compressed.jpg"
              ></VideoPlayer>
            </motion.div>
          </motion.div>

          {/* CONTENT */}
          <div className={styles.callout_container}>
            <CallOut
              calloutStyleType={2}
              paragraph="Lorem ipsum dolor sit amet consectetur. Duis tincidunt ultrices dictum eget ullamcorper."
              overrideStyles={styles.callout_container_inner}
              overrideParagraphStyle={styles.callout_paragraph}
            />
          </div>
        </motion.section>
      </motion.div>
    </motion.div>
  );
};

export default ProductVideosBanner;
