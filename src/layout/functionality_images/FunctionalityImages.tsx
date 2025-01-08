'use client'
import PopUp from "@/components/pop_up/PopUp";
import Button from '@/components/button/Button'
import Image from 'next/image';
import backgroundImageRender from "../../assets/images/functionality_images/Renders/White Bakground render.jpg"
import useAutoLoad from "@/hooks/use_autoload";
import { motion } from 'framer-motion'
import styles from "./FunctionalityImages.module.scss";
import { useEffect, useState, useRef } from "react";


const FunctionalityImages: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {
    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 1);

    // Detect when the user is in viewport
    const [isInView, setIsInView] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        // IntersectionObserver logic to track if element is in view
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting); // Set inView status based on intersection
            },
            { threshold: 0.5 } // Trigger when 10% of the element is in view
        );

        if (elementRef.current) {
            observer.observe(elementRef.current); // Start observing the element
        }

        return () => {
            if (elementRef.current) {
                observer.unobserve(elementRef.current); // Clean up observer
            }
        };
    }, []);

    useEffect(() => {
        // Define the wheel event handler
        const myListener = (e) => {
            // Event handler logic her

            if (!isInView) {
                return
            }
            if (e.deltaY > 0) {
                // Scrolled down
                handleChangeSlide(1);

            } else {
                // Scrolled up
                handleChangeSlide(-1);
            }
        };
        
        if (isInView) {
            // Apply the event listener after a 2-second delay
            elementRef.current.addEventListener("wheel", myListener);
        } else {
            console.log(isInView)
            elementRef.current.removeEventListener("wheel", myListener);
        }


    }, [isInView]); // Dependency array includes handleChangeSlide to ensure it's fresh if it changes

    return (
        <div ref={elementRef}>
            <motion.section className={styles.functionality_container} ref={containerRef}>
                <div className={styles.functionality_content}>
                    <h3 className={styles.functionality_content_heading}>
                        Functionality Images
                    </h3>
                    <Image
                        src={backgroundImageRender}
                        className={styles.functionality_render}
                        alt=''
                        priority
                    />

                    <div
                        className={styles.functionality_button}
                    >
                        <Button
                            text="Take a closer look"
                            modifier="p-color"
                            buttonType={2}
                            onClick={() => { }}
                        />
                    </div>

                    {/* <PopUp
                    className=""
                /> */}

                </div>
            </motion.section>
        </div>
    );
}

export default FunctionalityImages;
