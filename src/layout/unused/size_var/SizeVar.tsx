'use client'
import styles from "./SizeVar.module.scss";
import Image from 'next/image';
import largeImage from "../../assets/images/size_var/large_drive.png";
import mediumImage from "../../assets/images/size_var/medium_drive.png";
import smallImage from "../../assets/images/size_var/small_drive.png";
import useAutoLoad from "@/hooks/use_autoload";
import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from "react";


const SizeVar: React.FC<LayoutProps> = ({
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

        if(isInView){
             // Apply the event listener after a 2-second delay
            elementRef.current.addEventListener("wheel", myListener);
        }else{
            elementRef.current.removeEventListener("wheel", myListener);
        }

       

    }, [isInView]); // Dependency array includes handleChangeSlide to ensure it's fresh if it changes

    return (
        <div
            ref={elementRef}
        >
            <motion.section className={styles.size_container} ref={containerRef}>
                <div className={styles.size_group}>
                    <div className={styles.size_group_content}>
                        <span className={styles.size_group_content_span_large}>L</span>
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.5 }}
                            viewport={{ once: true, amount: 0.75 }}
                        >
                            <Image
                                src={largeImage}
                                placeholder='blur'
                                alt=''
                                className={styles.size_group_content_image_large}
                                priority
                            />
                        </motion.div>
                    </div>
                    <div className={styles.size_group_content}>
                        <span className={styles.size_group_content_span_medium}>M</span>
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 0.75 }}
                            viewport={{ once: true, amount: 0.75 }}
                        >
                            <Image
                                src={mediumImage}
                                placeholder='blur'
                                alt=''
                                className={styles.size_group_content_image_medium}

                            />
                        </motion.div>
                    </div>
                    <div className={styles.size_group_content}>
                        <span className={styles.size_group_content_span_small}>S</span>
                        <motion.div
                            initial={{ y: 100, opacity: 0 }}
                            whileInView={{ y: 0, opacity: 1 }}
                            transition={{ duration: 1, delay: 1 }}
                            viewport={{ once: true, amount: 0.75 }}
                        >
                            <Image
                                src={smallImage}
                                placeholder='blur'
                                alt=''

                            />
                        </motion.div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}

export default SizeVar
