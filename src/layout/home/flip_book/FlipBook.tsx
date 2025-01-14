'use client'
/* IMAGES */
import imageSeven from '../../../assets/images/installation_images/7.png'
import styles from './FlipBook.module.scss'

import useWindowSize from "@/hooks/use_window_size";
import calculateScrollHeight from "@/utils/calculate_scrollheight";
import useInView from "@/hooks/use_inview";

import { useRef, useEffect, useState, useContext } from "react";
import { motion, useSpring, useTransform, useScroll } from 'framer-motion'

import SlideContext from "@/context/changeSlide";
import Image from 'next/image';

const FlipBook = ({
    layoutName,
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


    const handleChangeSlide = useContext(SlideContext)
    useEffect(() => {
        if (isInView) {
            handleChangeSlide(layoutName)
        }
    }, [isInView])

    const scrollHeight = calculateScrollHeight(viewportSize.height, 3);

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


    }, [scrollHeight])

    /* ANIMATIONS */
    /* BACKGROUND ANIMATIONS */
  const transformScaleAnimationOne = useTransform(
    scrollY,
    [
      0,
      yPosition,
      yPosition + viewportSize.height,
      yPosition + viewportSize.height + scrollHeight * 0.4, 
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
            viewportSize.width > 768 ? yPosition - viewportSize.height : yPosition - scrollHeight * 0.7,
            viewportSize.width > 768 ? yPosition : yPosition - viewportSize.height,
            yPosition + viewportSize.height + scrollHeight * 0.7,
            yPosition + viewportSize.height + scrollHeight * 1.1,
          ],
          [
            viewportSize.height * 2.4,
            viewportSize.height * 2.4,
            0,
            0,
            -viewportSize.height * 2.4,
          ]
    )

    const springyTransformShowcaseAnimationThree = useSpring(transformShowcaseAnimationThree, {
        damping: 40,
        stiffness: 100
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
                    <Image
                        alt=''
                        src={imageSeven}
                        className={styles.image_fit}
                    />
                </motion.section>
            </motion.div>
        </motion.div>
    )
}
export default FlipBook