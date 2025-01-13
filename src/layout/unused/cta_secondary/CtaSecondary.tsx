'use client'
import styles from "./CtaSecondary.module.scss";
import Image from 'next/image';
import sofaImage from "../../assets/images/cta_secondary/sofa.png";
import useAutoLoad from "@/hooks/use_autoload";
import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from "react";


const CtaSecondary: React.FC<LayoutProps> = ({
  layoutName,
  handleLayoutLoad,
  handleChangeSlide
}) => {
  // Load next component
  const containerRef = useAutoLoad(layoutName, handleLayoutLoad, 0.5);

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
      if (isInView) { // Check if the element is in view before handling scroll
        if (e.deltaY > 0) {
          // Scrolled down
          handleChangeSlide(1); // Call function to handle slide change (scroll down)
        } else {
          // Scrolled up
          handleChangeSlide(-1); // Call function to handle slide change (scroll up)
        }
      }
    };

    if (isInView) {
      // Apply the event listener after a 2-second delay
      elementRef.current.addEventListener("wheel", myListener);
    } else {
      elementRef.current.removeEventListener("wheel", myListener);
    }

  }, [isInView]); // Re-run the effect when `isInView` changes

  return (
    <div
      ref={elementRef}
    >
      <motion.section
        ref={containerRef}
        className={styles.cta_container}
      >
        <motion.div
          className={styles.virtual_product_gradient_container}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 1
          }}
        >
          <div className={styles.gradient_one} />
          <div className={styles.gradient_two} />
          <div className={styles.gradient_three} />
          <div className={styles.gradient_four} />
          <div className={styles.gradient_five} />
          <div className={styles.gradient_six} />
          <div className={styles.gradient_seven} />
        </motion.div>
        <motion.h2
          className={styles.cta_heading}
          initial={{
            opacity: 0
          }}
          animate={{
            opacity: 1
          }}
          transition={{
            duration: 0.5
          }}
        >
          Virtual Product Photography
        </motion.h2>
        <motion.div
          initial={{
            transform: "translateY(5%)",
            opacity: 0
          }}
          animate={{
            transform: "translateY(0px)",
            opacity: 1
          }}
          transition={{
            duration: 1,
            delay: 1
          }}
          className={styles.image_container}
        >
          <Image
            alt=''
            src={sofaImage}
            className={styles.cta_image}
            sizes="100vw"
          />
        </motion.div>
      </motion.section>
    </div>

  );
}

export default CtaSecondary;
