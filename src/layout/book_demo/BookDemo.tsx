"use client"

import Button from "@/components/button/Button";
import Image from 'next/image';
import bookDemoImage from "../../assets/images/book_demo/sector.png"
import { motion, useSpring, useTransform, useScroll } from 'framer-motion'
import { useRef, useEffect, useState } from "react";
import useInView from "@/hooks/use_inview";
import useWindowSize from "@/hooks/use_window_size";
import calculateScrollHeight from "@/utils/calculate_scrollheight";

import styles from "./BookDemo.module.scss";
const BookDemo = ({
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

    const scrollHeight = calculateScrollHeight(viewportSize.height,  4);

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


    /* WHOLE PAGE TRANSLATOIN */

    const transformShowcaseAnimationThree = useTransform(
        scrollY,
        [
            0,
            yPosition - (viewportSize.height),
            yPosition,
            yPosition + viewportSize.height + (scrollHeight * 0.5),
            yPosition + viewportSize.height + (scrollHeight * 1),
          ],
        [viewportSize.height * 2.4, viewportSize.height * 2.4, 0, 0, -viewportSize.height * 2.4]
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
                zIndex: isInView ? zIndex : -1

            }}
            ref={scrollTargetRef}
        ><motion.div
            style={{
                top: 0,
                position: 'fixed',
                height: '100vh',
                width: '100vw',
                y: springyTransformShowcaseAnimationThree
            }}
            ref={inViewRef}
        >
                <motion.section className={styles.book_container}>
                    <div className={styles.book_content}>
                        <Image
                            alt=''
                            src={bookDemoImage}
                            priority
                            className={styles.book_demo_image}
                        />
                        <div className={styles.book_inner_container}>
                            <h4 className={styles.book_content_heading}>
                                Book a Demo
                            </h4>
                            <p className={styles.book_content_paragraph}>
                                We have produced product visuals and immersive experiences for fortune 500 companies.
                                Are you spending more than $50k on your product content? Talk to us.
                            </p>
                            <Button
                                text="Book a Demo"
                                modifier="l-color"
                                buttonType={2}
                                externalLink="https://www.tulfa.com/contact-us"
                            />
                        </div>
                    </div>
                </motion.section>
            </motion.div>
        </motion.div>
    );
}

export default BookDemo;
