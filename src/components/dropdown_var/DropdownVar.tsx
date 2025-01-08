'use client'
import styles from "./DropdownVar.module.scss";
import Image from 'next/image';
import { StaticImageData } from "next/image";
import { useCallback, useState, memo, useMemo } from "react";
import { motion, AnimatePresence } from 'framer-motion'


type DropdownVarProps = {
    variationSet: DropdownVarSet
    defaultVar: string
}

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

    }
};

const MemoizedImage = memo(({ src, alt, width, height, style }) => {
    return (
        <Image src={src} alt={alt} width={width} height={height} style={style} />
    );
});

MemoizedImage.displayName = "Memoized Image"

const SelectionPopUp = ({ variationSet, handleChangeVar, handleShowChoice }) => {
    return (
        <motion.div
            className={styles.variation_selection_box}
            key='choice-view'
            onClick={() => {
                handleShowChoice(false)
            }}
            initial={{
                y: '-25vh',
                opacity: 0,
            }}
            animate={{
                opacity: 1,
                y: '0',
                transition: {
                    duration: 0.5,
                    delay: 1.5,
                    ease: 'easeOut',
                },
            }}
            exit={{
                opacity: 0,
                y: '-25vh',
                transition: {
                    duration: 0.5,
                    ease: 'easeOut',
                },
            }}
        >
            {
                Object.keys(variationSet).map((variation, index) => {
                    return (

                        <button
                            key={index}
                            onClick={() => {
                                handleChangeVar(variation)
                            }}
                        >
                            <div
                                className={styles.variation_choice_name_container}
                            >
                                <span className={styles.variation_span}>
                                    {variationSet[variation].choiceName}
                                </span>
                            </div>
                            <div className={styles.variation_figure}>
                                <MemoizedImage
                                    src={variationSet[variation].choiceImage.imageData}
                                    alt=''
                                    width={variationSet[variation].choiceImage.width}
                                    height={variationSet[variation].choiceImage.height}
                                    style={{
                                        minWidth: "100%",
                                        height: "auto",
                                        objectFit: "contain"
                                    }}
                                />

                            </div>

                        </button>

                    )
                })
            }
        </motion.div>
    )
}


const DropdownVar: React.FC<DropdownVarProps> = ({
    variationSet,
    defaultVar
}) => {

    const [selectedVar, setSelectedVar] = useState<string>(defaultVar);

    const handleChangeVar = useCallback((variation: string) => {
        setSelectedVar((prev) => {
            if (prev === variation) {
                return prev
            } else {
                return variation
            }
        })
    }, [])

    // Show fabric choice view on hover
    const [choiceViewActive, setChoiceViewActive] = useState(false);

    const handleShowChoice = useCallback((active: boolean) => {
        setChoiceViewActive(active);
    }, []);

    return (
        <>
            <AnimatePresence
                mode='wait'
                initial={true}
            >
                <div
                    key={selectedVar}
                    style={{
                        display: "flex",
                        width: "100%",
                        height: "100%"
                    }}
                >
                    <motion.div
                        className={styles.variation_left}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }} // Use animate to trigger the opacity change right away
                        transition={{ duration: 0.5, delay: 0.4 }} // Delay the start of the animation
                        exit={{ opacity: 0 }}
                        onMouseEnter={() => {
                            handleShowChoice(false);
                        }}

                    >
                        <Image
                            src={variationSet[selectedVar].left.imageData}
                            className={styles.variation_left_image}
                            alt=''
                            width={variationSet[selectedVar].left.width}
                            height={variationSet[selectedVar].left.height}
                        />
                    </motion.div>

                    <motion.div
                        className={styles.variation_right}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }} 
                        transition={{ duration: 0.5, delay: 0.4 }}
                        exit={{ opacity: 0 }}
                        onMouseEnter={() => {
                            handleShowChoice(true);
                        }}
                    >
                        <Image
                            src={variationSet[selectedVar].right.imageData}
                            alt=''
                            className={styles.variation_right_image}
                            width={variationSet[selectedVar].right.width}
                            height={variationSet[selectedVar].right.height}
                        />
                    </motion.div>


                </div>

            </AnimatePresence >

            {/* SELECTION POPUP */}
            <AnimatePresence
                mode='wait'
                initial={true}
            >
                {choiceViewActive && <SelectionPopUp
                    variationSet={variationSet}
                    handleChangeVar={handleChangeVar}
                    handleShowChoice={handleShowChoice}
                />}
            </AnimatePresence>
        </>
    );
}

export default DropdownVar;