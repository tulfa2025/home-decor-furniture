'use client'
import { Manrope } from "next/font/google"
import styles from "./Testemonial.module.scss";
import Image from 'next/image';
import profileImage from "../../assets/images/testemonial/profile.png";
import useAutoLoad from "@/hooks/use_autoload";
import { motion } from 'framer-motion'
import { useEffect, useState, useRef } from "react";

const manrope = Manrope({
    weight: ["400", "500"],
    subsets: ["latin"]
})


const Testemonial: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {

    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 0.5);

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
        <div
            ref={elementRef}
        >
            <motion.section
                className={`${styles.testemonial_container} ${manrope.className}`}
                ref={containerRef}
                initial={{ transform: "translateY(20px)" }}
                whileInView={{ transform: "translateY(0px)" }}
                transition={{ type: "spring", delay: 2, stiffness: 100, damping: 50, mass: 0.1 }}
            >
                <div className={styles.testemonial_content}>
                    <div className={styles.testemonial_content_icon} />
                    <div className={styles.testemonial_content_card}>
                        <div className={styles.testemonial_content_card_icon} />
                        <div className={styles.testemonial_content_card_left}>
                            <p className={styles.testemonial_content_card_left_paragraph}>
                                Amet minim mollit non deserunt ullamco est sit aliqua dolor do amet sint.
                                Velit officia consequat duis enim velit mollit.
                                Exercitation veniam consequat sunt nostrud amet.
                            </p>
                            <div>
                                <h4 className={styles.testemonial_content_card_left_heading}>
                                    Jhon Doe
                                </h4>
                                <span className={styles.testemonial_content_card_left_span}>
                                    Chief Executive Officer - deWALT
                                </span>
                            </div>
                        </div>
                        <div className={styles.testemonial_content_card_right}>
                            <Image
                                src={profileImage}
                                alt=''
                                className={styles.testemonial_content_card_right_image}
                                priority
                            />
                        </div>
                    </div>
                </div>
            </motion.section>
        </div>
    );
}

export default Testemonial;