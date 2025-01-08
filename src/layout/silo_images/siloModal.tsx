/* NO LONGER IN USE */

'use client'
import { motion } from 'framer-motion';
import { useState, useRef, useMemo } from 'react';
import { StaticImageData } from 'next/image';
import Image from 'next/image'
import styles from "./SiloImages.module.scss";
import useWindowSize from '@/hooks/use_window_size';
import TulfaCloseButton from "@/assets/icons/tulfa_close_button";
import { TulfaRightArrow, TulfaLeftArrow } from '@/assets/icons/tulfa_nav_arrows';

type ImageSet = {
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
        buttonColor?: "dark" | "light"
    },
    order: Array<string>
}

const SiloModal = ({ handleClose, modalOpen, imageSet }) => {
    // Animations based on state
    const dropIn = {
        hidden: {
            y: '100vh',
            opacity: 0
        },
        visible: {
            y: modalOpen ? '5vh' : '100vh',
            opacity: modalOpen ? 1 : 0,
            transition: {
                duration: 1, // Duration of the animation (in seconds)
                ease: 'easeInOut', // Easing function for smooth deceleration
                delay: 0.5
            },
        },
        exit: {
            opacity: 0,
            y: '100vh',
            transition: {
                duration: 1, // Duration of the animation (in seconds)
                ease: 'easeOut', // Easing function for smooth deceleration
            },
        },
    };

    const windowSize = useWindowSize();

    const findDisplacementValue = (baseSizeCoefficient: number, imageOneWidthFactor: number, imageTwoWidthFactor, gapSize: number, offset: number) => {

        const actualImageOneWidth = windowSize.width * baseSizeCoefficient * 0.125 * imageOneWidthFactor;
        const actualImageTwoWidth = windowSize.width * baseSizeCoefficient * 0.125 * imageTwoWidthFactor;

        if (baseSizeCoefficient === 4) {
            gapSize = gapSize * 2
        }
        const displacementSize = (actualImageOneWidth / 2) + (actualImageTwoWidth / 2) + gapSize - offset;

        return displacementSize

    }

    const imageBaseSizeCoefficient = useMemo(() => {

        let baseSizeCoefficient;

        if (windowSize.width > 768) {
            baseSizeCoefficient = 2
        } else {
            baseSizeCoefficient = 4
        }

        return baseSizeCoefficient
    }, [windowSize])

    const [displacementValue, setDisplacementValue] = useState(0);
    const currentIndex = useRef(0)
    const translateRight = () => {

        const newIndex = currentIndex.current - 1;

        if (newIndex < 0) {
            return
        }

        const imageName = imageSet.order[currentIndex.current];
        const imageWidth = imageSet[imageName].width

        const nextImageName = imageSet.order[newIndex];
        const nextImageWidth = imageSet[nextImageName].width;

        let offset = 0;
        if (newIndex === 0) {
            offset = windowSize.width * (0.8) * (0.15);
        }

        

        const displacement = findDisplacementValue(imageBaseSizeCoefficient, imageWidth, nextImageWidth, 20, offset)


        setDisplacementValue((prev) => {

            return prev + displacement
        }
        );

        currentIndex.current = newIndex;
    };

    const translateLeft = () => {
        const newIndex = currentIndex.current + 1;

        if (newIndex > imageSet.order.length) {
            return
        }

        const imageName = imageSet.order[currentIndex.current];
        const imageWidth = imageSet[imageName].width

        const nextImageName = imageSet.order[newIndex];
        const nextImageWidth = imageSet[nextImageName].width;

        let offset = 0;
        if (currentIndex.current === 0) {
            offset = windowSize.width * (0.8) * (0.15);
        }

        if(newIndex === imageSet.order.length - 1){
            offset = windowSize.width * (0.8) * (0.02);
        }

        const displacement = findDisplacementValue(imageBaseSizeCoefficient, imageWidth, nextImageWidth, 20, offset)

        setDisplacementValue((prev) => {

            return prev - displacement
        }
        );

        currentIndex.current = newIndex;
    };

    return (
        <>
            <motion.div
                onClick={(e) => e.stopPropagation()}
                variants={dropIn}
                initial='hidden'
                animate='visible'
                exit='exit'
                className={styles.silo_modal_container}
            >
                <div
                    className={styles.silo_card_container}
                >
                    <TulfaCloseButton
                        onClick={handleClose}
                        className={styles.silo_handle_close}
                        height={
                            windowSize.width > 768 ? 36 : 30
                        }
                        width={
                            windowSize.width > 768 ? 36 : 30
                        }
                    />
                    <div
                        className={styles.silo_text_container}
                    >
                        <p
                            className={styles.silo_text}
                        >
                            Ultra-high-definition images of your furniture shot from different
                            angles.
                        </p>
                    </div>

                    {/*CAROUSEL */}
                    <div
                        className={styles.silo_carousel_container}
                    >


                        {imageSet.order.map((imageName: string, index) => {
                            index = index + 1;
                            return (
                                <motion.div
                                    key={index}
                                    style={{
                                        x: displacementValue,
                                        transition: 'ease-in-out 0.5s',
                                        height: '45vh',
                                        width: `${imageSet[imageName].width * (imageBaseSizeCoefficient * 12.5)}vw`,
                                        overflow: 'hidden',
                                        position: 'relative',
                                        borderRadius: 40
                                    }}

                                >
                                    <Image

                                        src={imageSet[imageName].imageData}
                                        alt=''
                                        style={{
                                            objectFit: 'cover', // maintain aspect ratio but fill the container
                                            height: '100%', // ensure image fills height
                                            width: '100%', // ensure image fills width
                                            objectPosition: imageSet[imageName].overrideStyle.objectPosition, // center the image inside the container

                                        }}


                                    />

                                </motion.div>
                            );
                        })}

                    </div>

                    <div
                        className={styles.button_container}
                    >
                        <TulfaLeftArrow
                            height={windowSize.width > 768 ? 36 : 40}
                            width={windowSize.width > 768 ? 36 : 40}
                            onClick={translateRight}
                            className={
                                `${styles.invisi_button_left} trigger_header_button`
                            }

                        />
                        <TulfaRightArrow
                            height={windowSize.width > 768 ? 36 : 40}
                            width={windowSize.width > 768 ? 36 : 40}
                            className={
                                `${styles.invisi_button_right} trigger_header_button`
                            }
                            onClick={translateLeft}
                        />

                    </div>

                </div>
            </motion.div>
        </>
    );
};

export default SiloModal;
