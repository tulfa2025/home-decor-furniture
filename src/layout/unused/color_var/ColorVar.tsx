'use client'
import styles from "./ColorVar.module.scss";
import Image, { StaticImageData } from 'next/image';
import ColorVariation from "@/components/color_var/ColorVaration";
import useAutoLoad from "@/hooks/use_autoload";
import { motion } from 'framer-motion';
import { useEffect, useRef, useState } from "react";

/* LEFT IMAGES */
import leftImageRed from "../../assets/images/color_var/Red Organic.png";
import leftImageBrown from "../../assets/images/color_var/Brown.png";
import leftImageLGrey from "../../assets/images/color_var/Light Grey.png";
import leftImageOrganic from "../../assets/images/color_var/Organic.png";
import leftImagePGreen from "../../assets/images/color_var/Pine Green.png";

/* RIGHT IMAGES */
import rightImageRed from "../../assets/images/color_var/Red Organic_S.png";
import rightImageBrown from "../../assets/images/color_var/Brown_S.png";
import rightImageLGrey from "../../assets/images/color_var/Light Grey_S.png";
import rightImageOrganic from "../../assets/images/color_var/Organic_S.png";
import rightImagePGreen from "../../assets/images/color_var/Pine Green_S.png";


type ColorVarImageSet = {
    [key: string]: {
        left: StaticImageData,
        right: StaticImageData,
        buttonColor: string
        buttonFilter: string
    }
};

const colorVarImageSet: ColorVarImageSet = {
    red: {
        right: rightImageRed,
        left: leftImageRed,
        buttonColor: styles.color_left_filter_five,
        buttonFilter: styles.fifth_semicircle
    },
    brown: {
        right: rightImageBrown,
        left: leftImageBrown,
        buttonColor: styles.color_left_filter_one,
        buttonFilter: styles.first_semicircle
    },
    lGrey: {
        right: rightImageLGrey,
        left: leftImageLGrey,
        buttonColor: styles.color_left_filter_two,
        buttonFilter: styles.second_semicircle
    },
    organic: {
        right: rightImageOrganic,
        left: leftImageOrganic,
        buttonColor: styles.color_left_filter_three,
        buttonFilter: styles.third_semicircle
    },
    pGreen: {
        right: rightImagePGreen,
        left: leftImagePGreen,
        buttonColor: styles.color_left_filter_four,
        buttonFilter: styles.fourth_semicircle
    }

}



const ColorVar: React.FC<LayoutProps> = ({
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
            <motion.section className={styles.color_container} ref={containerRef}>
                <ColorVariation
                    imageSet={colorVarImageSet}
                />
            </motion.section>
        </div>
    );
}

export default ColorVar;
