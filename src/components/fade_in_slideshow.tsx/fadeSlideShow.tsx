// import styles from "./AutomaticCarousel.module.scss";
import Image from 'next/image';
import { StaticImageData } from "next/image";
import { motion } from 'framer-motion';
import { useEffect, useState, memo, useRef } from 'react';

type ImageSet = {
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
    },
    order: Array<string>
}

// Define AutomaticCarousel component that accepts `imageSet` as a prop
interface FadeInCarouselProps {
    imageSet: ImageSet;
    changeDelay: number;
    transition: {}
}

const FadeInCarousel: React.FC<FadeInCarouselProps> = memo(({ imageSet, changeDelay, transition }) => {

    const [currentIndex, setCurrentIndex] = useState(0);

    const timeoutRef = useRef(null)

    useEffect(() => {

        clearTimeout(timeoutRef.current)
       timeoutRef.current = setTimeout(() => {
            setCurrentIndex(prev => {

                const imageSetLength = imageSet.order.length;

                if (prev + 1 > imageSetLength - 1) {
                    return 0
                } else {
                    return prev + 1
                }
            })
        }, changeDelay)
    }, [currentIndex])

    return (

        <>
            {
                imageSet.order.map((imageName: string, index: number) => {
                    return (
                        <motion.div
                            initial={{
                                opacity: 0
                            }}
                            animate={{
                                opacity: currentIndex === index ? 1 : 0
                            }}
                            transition={transition}
                            key={index}
                            style={{
                                height:'100%',
                                width: '100%',
                                position: 'absolute',
                                backgroundColor: 'transparent',
                                display: 'flex',
                                alignItems: 'center',
                                transform: imageSet[imageName].overrideStyle.transform
                            }}
                        >
                            <Image
                               
                                src={imageSet[imageName].imageData}
                                alt=''
                                style={{
                                    height: '100%',
                                    width: '100%',
                                    objectFit: 'cover'
                                }}

                            />
                        </motion.div>
                    )
                })
            }
        </>

    );
})

FadeInCarousel.displayName = "FadeInCarousel"

export default FadeInCarousel