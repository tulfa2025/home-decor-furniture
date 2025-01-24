import styles from "../standard/modal_container.module.scss";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useContext } from "react";
import { TulfaDownArrow } from "@/assets/icons/tulfa_nav_arrows";
import ScrollContext from "@/context/scrollContext";


const ModalFiltersMobile = ({
  selectionArray,
  selectedIndex,
  handleSelectedIndex,
}) => {
  const [filterActivated, setFilterActivated] = useState(false);

  const handleIsScrollBlocked = useContext(ScrollContext);

  const filterRef = useRef(null)

  return (
    <div className={styles.modal_filters_mobile_container} id='modal-filter-mobile'>
      <div className={styles.selected_item_container}>
        {selectionArray[selectedIndex]}
      </div>

      <motion.div
        className={styles.arrow_selector_button}
      >
        <TulfaDownArrow
          height={40}
          width={40}
          fill="white"
          arrowColor="#2a266a"
          handleClick={() => {
            setFilterActivated((prev) => !prev);
            handleIsScrollBlocked(!filterActivated, filterRef)
          }}
          buttonStyles={styles.arrow_button_inner}
          animate={filterActivated}
        />
      </motion.div>

      {/* DROPDOWN BAR */}
      <motion.div
        animate={{
            y: filterActivated ? 0 : '100vh'
        }}
        transition={{
          type: "spring",
          damping: 20,
          duration: 0.1,
        }}
        className={`${styles.filter_bar} ${filterActivated ? 'disable_global_scroll' : ''}`}
        ref={filterRef}
      >
        {selectionArray.map((filter, index) => (
          <AnimatePresence key={index}>
            <motion.div
              initial={{
                opacity: 0,
              }}
              whileInView={{
                opacity: filterActivated ? 1 : 0,
                transition: {
                  duration: 0.1,
                  delay: 0.1
                },
              }}
              viewport={{
                amount: 0.3
              }}
            >
                <button
                    className={styles.filter_button}
                    onClick={()=>{
                        handleSelectedIndex(index)
                        setFilterActivated(false)
                        handleIsScrollBlocked(false, filterRef)
                    }}
                >
                    {filter}
                </button>
              
            </motion.div>
          </AnimatePresence>
        ))}
      </motion.div>
    </div>
  );
};

export default ModalFiltersMobile;
