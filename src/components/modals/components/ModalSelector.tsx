import styles from '../standard/modal_container.module.scss';
import { motion } from 'framer-motion';
import { useMemo, useEffect, useState, useRef } from 'react';
import useWindowSize from '@/hooks/use_window_size';

const ModalFilters = ({ selectionArray, selectedIndex, handleSelectedIndex }) => {

    
    const windowSize = useWindowSize();

    const containerWidth = useMemo(()=>{

        return windowSize.width * 0.8 * 0.8;

    }, [windowSize]);


    // This effect runs on mount and whenever the window resizes
    const [position, setPosition] = useState({ left: 0, top: 0 });
    const firstFlexItemRef = useRef(null)
    useEffect(() => {
        const updatePosition = () => {
            if (firstFlexItemRef.current) {
                const rect = firstFlexItemRef.current.getBoundingClientRect();
                // Set the position of the absolutely positioned element
                setPosition({
                    left: rect.left,
                    top: rect.top,
                });
            }
        };

        // Run on component mount
        updatePosition();
    }, [windowSize])

    const offSetX = useMemo(()=>{

        const filterPosition = (windowSize.width - containerWidth) / 2;

        if(position.left > filterPosition){
            return  position.left - filterPosition - 30
        } else {
            return 0
        }


    }, [windowSize, position])


    return (

        <div
            className={styles.modal_button_container}
        >
            <motion.div
                className={styles.modal_button_container_inner}
                initial={{ opacity: 0 }}  // Start with opacity 0
                whileInView={{ opacity: 1 }}  // Animate to opacity 1 when in view
                transition={{ delay: 1,
                    duration: 0.5
                 }}  // Add a 1-second delay before starting the opacity change
                viewport={{ once: true }}  // Make sure animation happens only once when it comes into view
            >
                {
                    selectionArray.map((selection, key) => {
                        return (
                            <motion.button

                                ref={key === 0 ? firstFlexItemRef : null}
                                key={key}
                                className={`${styles.modal_filter_button} disable_trigger_header_button`}
                                onClick={(e) => {
                                    e.preventDefault()
                                    handleSelectedIndex(key)
                                }}
                                style={{
                                    backgroundColor: "#433E99",
                                    width: (containerWidth / selectionArray.length)
                                }}

                                transition={{
                                    duration: 0.1
                                }}
                            >
                                <motion.span
                                    animate={{
                                        color: selectedIndex === key ? "#433E99" :  "#ffffff" , // Set the text color based on selection
                                    }}
                                    transition={{
                                        color: {
                                            duration: 0.2, // Adjust duration for smooth color change
                                            ease: "easeInOut" // Smooth easing for color transition
                                        }
                                    }}

                                    className={styles.modal_button_text}

                                >

                                    {selection}
                                </motion.span>
                            </motion.button>)
                    })
                }

                {/* bACKGROUND HIGHLIGH */}
                <motion.div
                    className={styles.background_highlight}
                    style={{
                   
                        width: (containerWidth / selectionArray.length) - 10
                    }}

                    animate={{
                        x: offSetX + (selectedIndex * ((containerWidth / selectionArray.length) + 20)),
                       
                    }}
                    transition={{
                        damping: 20,
                        type: "spring"
                    }}
                >

                </motion.div>
            </motion.div>



        </div>
    )
}

export default ModalFilters;