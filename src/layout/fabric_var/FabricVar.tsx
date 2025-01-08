import styles from "./FabricVar.module.scss";
import { StaticImageData } from "next/image";
import useAutoLoad from "@/hooks/use_autoload";
import { motion } from 'framer-motion'
import DropdownVar from "@/components/dropdown_var/DropdownVar";
import { useMemo, useEffect, useState, useRef } from "react";

/* FABRIC CHOICES */
import printsSample from "../../assets/images/fabric_var/print_sample.png";
import printsLeft from "../../assets/images/fabric_var/Prints_as.jpg"

import plainsSample from "../../assets/images/fabric_var/plains_sample.png";
import plainsLeft from "../../assets/images/fabric_var/Plains_as.jpg"

import lLeatherSample from "../../assets/images/fabric_var/light_leather_sample.png";
import lLeatherLeft from "../../assets/images/fabric_var/light_leather_right.tif"

import embroiderySample from "../../assets/images/fabric_var/embroidery_sample.png";
import embroideryLeft from "../../assets/images/fabric_var/Embroidery_as.jpg";

import velvetSample from "../../assets/images/fabric_var/velvet_sample.png";
import velvetLeft from "../../assets/images/fabric_var/Velvets_as.jpg";


type DropdownVarSet = {
    [key: string]: {
        left: {
            imageData: StaticImageData,
            width?: number
            height?: number
        },
        right: {
            imageData: StaticImageData,
            width?: number
            height?: number
        },
        choiceImage: {
            imageData: StaticImageData,
            width?: number
            height?: number
        }
        choiceName: string

    },

};




const FabricVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {


    // Detect whenuser scrolls into range
    const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 1)

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

    const dropDownVarSet: DropdownVarSet = useMemo(() => {

        const myObject = {
            embroidery: {
                left: {
                    imageData: embroideryLeft
                },
                right: {
                    imageData: embroiderySample
                },
                choiceImage: {
                    imageData: embroiderySample
                },
                choiceName: "Embroidery"
            },
            lLeather: {
                left: {
                    imageData: lLeatherLeft,
                    width: 128,
                    height: 128
                },
                right: {
                    imageData: lLeatherSample,
                    width: 128,
                    height: 128
                },
                choiceImage: {
                    imageData: lLeatherSample,
                    width: 128,
                    height: 128
                },
                choiceName: "Light Leather"
            },
            prints: {
                left: {
                    imageData: printsLeft
                },
                right: {
                    imageData: printsSample
                },
                choiceImage: {
                    imageData: printsSample
                },
                choiceName: "Prints"
            },
            plains: {
                left: {
                    imageData: plainsLeft

                },
                right: {
                    imageData: plainsSample
                },
                choiceImage: {
                    imageData: plainsSample
                },
                choiceName: "Plains"
            },
            velvets: {
                left: {
                    imageData: velvetLeft
                },
                right: {
                    imageData: velvetSample
                },
                choiceImage: {
                    imageData: velvetSample
                },
                choiceName: "Velvets"
            }
        }

        return myObject

    }, [])

    return (
        <div
            ref={elementRef}
        >
            <motion.section className={styles.variation_container} ref={containerRef}>
                <DropdownVar
                    variationSet={dropDownVarSet}
                    defaultVar={"prints"}
                />
            </motion.section>
        </div>
    );
}

export default FabricVar;
