'use client'
/* IMAGES */
import ImageContainer from "@/components/image_container/ImageContainer"
import imageSeven from '../../assets/images/installation_images/7.png'
import styles from './FlipBook.module.scss'

import useWindowSize from "@/hooks/use_window_size";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import useInView from "@/hooks/use_inview";

import { useRef, useEffect, useState } from "react";
import { motion, useSpring, useTransform, useScroll } from 'framer-motion'

const FlipBook = ({
    layoutName,
    handleChangeSlide,
    zIndex
}) => {

    // Get scroll height
    const viewportSize = useWindowSize();

    // Detect when the user is in viewport for triggering events
    const inViewRef = useRef(null);
    const isInView = useInView(inViewRef, 0.1);


    const scrollTargetRef = useRef(null);
    const { scrollY } = useScroll({
        target: scrollTargetRef,
    });

    useEffect(() => {
        if (isInView) {
            handleChangeSlide(layoutName)
        }
    }, [isInView])

    const scrollHeight = calculateScrollHeight(viewportSize.height, (viewportSize.height > 960 ? 3 : 6));

    /* ANIMATION START AND END POSITION */
    const [yPosition, setYPosition] = useState(null);

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


    }, [scrollHeight])

    /* ANIMATIONS */
    /* BACKGROUND ANIMATIONS */
  const transformScaleAnimationOne = useTransform(
    scrollY,
    [
      0,
      yPosition,
      yPosition + viewportSize.height,
      yPosition + viewportSize.height + scrollHeight * 0.5, 
      yPosition + viewportSize.height + scrollHeight, 
    ],
    [1, 1, 1.5, 1.5, 1]
  );
  const springyTransformScaleAnimationOne = useSpring(
    transformScaleAnimationOne,
    {
      damping: 40,
    }
  );


    /* WHOLE PAGE TRANSLATOIN */

    const transformShowcaseAnimationThree = useTransform(
        scrollY,
        [
            0,
            yPosition,
            yPosition + viewportSize.height,
            yPosition + viewportSize.height + (scrollHeight * 0.7),
            yPosition + viewportSize.height + scrollHeight,
          ],
          [
            viewportSize.height * 2.4,
            viewportSize.height * 2.4,
            0,
            0,
            -viewportSize.height * 4.8,
          ]
    )

    const springyTransformShowcaseAnimationThree = useSpring(transformShowcaseAnimationThree, {
        damping: 40
    })
    return (
        <motion.div
            style={{
                height: scrollHeight,
                position: 'relative',
                top: 0,
                overflow: 'auto',
                zIndex:isInView ? zIndex : -1
                

            }}
            ref={scrollTargetRef}
        >
            <motion.div
                style={{
                    top: 0,
                    position: 'fixed',
                    height: '100vh',
                    width: '100vw',
                    y: springyTransformShowcaseAnimationThree
                }}
                ref={inViewRef}
            >
                <motion.section
                    className={styles.flip_container}
                    style={{
                        scale: springyTransformScaleAnimationOne
                    }}
                >
                    <ImageContainer
                        imageSrc={imageSeven}
                        imageClassName={styles.image_fit}
                    />
                </motion.section>
            </motion.div>
        </motion.div>
    )
}
export default FlipBook