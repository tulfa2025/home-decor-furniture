import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./modal_container.module.scss";

const Toast = ({ onClose, isToastOpen }) => {
  useEffect(() => {
    setTimeout(() => {
      onClose(false);
    }, 1000); // Hide toast after 3 seconds
  }, []);

  const message = "Link copied successfully!";

  return (
    <AnimatePresence>
      <motion.div
        className={styles.toast_container}
        style={{
          position: "fixed",
          padding: "10px 20px",
          borderRadius: "25px",
          fontSize: "16px",
          display: message ? "block" : "none",
          zIndex: 2000,
        }}
        animate={{
          opacity: isToastOpen ? 1 : 0,
          y: isToastOpen ? "-5vh" : 0,
        }}
        transition={{
          damping: 40,
          duration: 0.5,
        }}
        exit={{
          opacity: isToastOpen ? 0 : 1,
          y: isToastOpen ? "-5vh" : "-10vh",
        }}
      >
        <div>{message}</div>
      </motion.div>
    </AnimatePresence>
  );
};

export default Toast;
