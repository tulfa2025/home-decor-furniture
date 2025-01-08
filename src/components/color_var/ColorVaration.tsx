'use client'
import styles from "./ColorVariation.module.scss";
import Image from 'next/image';
import { StaticImageData } from "next/image";
import { useCallback, useState } from "react";
import { motion, AnimatePresence } from 'framer-motion'

type ColorVarProps = {
    imageSet: ColorVarImageSet
}

type ColorVarImageSet = {
    [key: string]: {
        left: StaticImageData,
        right: StaticImageData,
        buttonColor: string
        buttonFilter: string

    }
};

const ColorVariation: React.FC<ColorVarProps> = ({
    imageSet
}) => {

    const [selectedColor, setSelectedColor] = useState<string>("red");

    const handleChangeColor = useCallback((color: string) => {
        setSelectedColor((prev) => {
            if (prev === color) {
                return prev
            } else {
                return color
            }
        })
    }, [])

    return (
        <AnimatePresence
            mode='wait'
            initial={true}
        >
            <div
                key={selectedColor}
                style={{
                    display: "flex"
                }}
            >

                <motion.div
                    className={styles.color_left}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }} // Use animate to trigger the opacity change right away
                    transition={{ duration: 0.5, delay: 0.4 }} // Delay the start of the animation
                    exit={{ opacity: 0 }}

                >
                    <Image
                        src={imageSet[selectedColor].left}
                        alt=''
                        className={styles.color_left_image}
                    />
                </motion.div>

                <div className={styles.color_left_filter}>
                    {
                        Object.keys(imageSet).map((color, index) => {
                            return (
                                <button
                                    className={
                                        `${imageSet[color].buttonColor} 
                                        disable_trigger_header_button`
                                    }
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation()
                                        e.preventDefault()
                                        handleChangeColor(color)
                                    }}
                                >
                                    <div className={imageSet[color].buttonFilter} />
                                </button>
                            )
                        })
                    }
                </div>

                <motion.div
                    className={styles.color_right}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }} // Use animate to trigger the opacity change right away
                    transition={{ duration: 0.5, delay: 0.4 }} // Delay the start of the animation
                    exit={{ opacity: 0 }}
                >
                    <Image
                        src={imageSet[selectedColor].right}
                        alt=''
                        className={styles.color_right_image}
                    />
                </motion.div>



            </div>
        </AnimatePresence>
    );
}

export default ColorVariation;