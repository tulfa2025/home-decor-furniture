'use client'
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { useState, useEffect, useRef } from "react";
import Image from 'next/image';
import styles from "./MaterialVar.module.scss";
import useAutoLoad from "@/hooks/use_autoload";
import { motion, AnimatePresence } from 'framer-motion'
import structureImages from "@/utils/structure_images";

/* KITCHEN ONDA MATERIAL VARIATIONS */
import kitchenCounterBlack from "../../assets/images/material_var/kitchen_onda_black.png"
import kitchenCounterBlue from "../../assets/images/material_var/kitchen_onda_blue.png"
import kitchenCounterGold from "../../assets/images/material_var/kitchen_onda_gold imperial.png"
import kitchenCounterGreen from "../../assets/images/material_var/kitchen_onda_green.png"
import kitchenCounterPearl from "../../assets/images/material_var/kitchen_onda_pearl royal.png"
import kitchenCounterRed from "../../assets/images/material_var/kitchen_onda_red.png"
import kitchenCounterWhite from "../../assets/images/material_var/kitchen_onda_white.png"
import kitchenCounterYellow from "../../assets/images/material_var/kitchen_onda_yellow.png"


const imageDataset = structureImages([
    kitchenCounterBlack,
    kitchenCounterBlue,
    kitchenCounterGold,
    kitchenCounterGreen,
    kitchenCounterPearl,
    kitchenCounterRed,
    kitchenCounterWhite,
    kitchenCounterYellow
])

const MaterialVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {

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


    const [currentImage, setCurrentImage] = useState(0);

    const [carouselDirection, setCarouselDirection] = useState(1)

    const handleSetCurrentImage = (i: number) => {

        setCarouselDirection(prev => {
            if (i > 0 && prev < 0) {
                return i
            } else if (i < 0 && prev > 0) {
                return i
            } else {
                return prev
            }
        })

        setCurrentImage(prev => {
            if (prev + i > imageDataset.order.length - 1) {
                return 0
            } else if (prev + i < 0) {
                return imageDataset.order.length - 1
            }
            return prev + i
        })

    }


    return (
        <div
            ref={elementRef}
        >
            <motion.section
                className={styles.material_container}
                ref={containerRef}
            >
                <AnimatePresence
                    mode='wait'
                    initial={true}
                >
                    <motion.div
                        initial={{ x: carouselDirection * -100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }} // Use animate to trigger the opacity change right away
                        transition={
                            {
                                duration: 0.2,
                                delay: 0.4,
                                type: "spring",
                                stiffness: 300,
                                damping: 25,
                                mass: 1,
                                velocity: 2
                            }
                        }
                        exit={{ x: carouselDirection * 100, opacity: 0 }}
                        className={styles.image_container}
                        key={currentImage}
                    >
                        <Image
                            src={imageDataset[currentImage].imageData}
                            alt=''
                            className={styles.material_image}
                            priority

                        />
                    </motion.div>
                </AnimatePresence>
                <div className={styles.material_content}>

                    <div className={styles.material_content_arrows}>
                        <button className={styles.material_content_arrow_disabled}
                            onClick={() => handleSetCurrentImage(-1)}>
                            <MdKeyboardArrowLeft className={styles.material_content_arrow_icon} />
                        </button>
                        <button
                            onClick={() => handleSetCurrentImage(1)}
                        >
                            <MdKeyboardArrowRight className={styles.material_content_arrow_icon} />
                        </button>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}

export default MaterialVar;