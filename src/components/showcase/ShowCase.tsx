import PopUp from "@/components/pop_up/PopUp";
import { motion } from 'framer-motion'

import styles from "./ShowCase.module.scss";

type ShowCaseProps = {
    heading?: "Lifestyle Scenes";
    animationValues?: {
      
    }
}

export default function ShowCase({ heading, animationValues, style }: ShowCaseProps) {
    return (
        <motion.div className={
            styles.showcase
        }
            style={{
                ...animationValues,
                ...style
            }}
        
        >
            {heading && <h3 className={styles.showcase_heading}>{heading}</h3>}
            <div className={styles.showcase_pop}>
                {/* <PopUp /> */}
            </div>
        </motion.div>
    );
}
