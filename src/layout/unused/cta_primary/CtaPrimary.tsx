'use client'
import styles from "./CtaPrimary.module.scss";
import { motion, useTransform, useScroll, useMotionValueEvent, useSpring } from "motion/react"

import { useRef, useState, useEffect } from "react";


const CtaPrimary: React.FC = ({
    handleLayoutLoad
}) => {
    // reference to target scroll element
    const scrollRef = useRef(null);
    const [scrollStopped, setScrollStopped] = useState(false);

    // Track progress
    const { scrollYProgress } = useScroll({
        container: scrollRef
    });

    //Map scroll distance to size of introducing text
    const scale = useTransform(useSpring(scrollYProgress, {stiffness:200, damping: 100}), [0, 1], [200, 1]);

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        console.log(latest)
        if(latest >= 1 && !scrollStopped){
            handleLayoutLoad();
            setScrollStopped(true);
        }
    })

    return (
        <>
            
            <motion.div
                className={styles.cta_container}
                style={{
                    scale: scrollStopped ? 1 : scale
                }}

            >

                Introducing

            </motion.div>
            <div
                className={styles.cta_dummy_container}
                ref={scrollRef}
            >
                <motion.div>

                </motion.div>

            </div> 

        </>
    );
}

export default CtaPrimary;
