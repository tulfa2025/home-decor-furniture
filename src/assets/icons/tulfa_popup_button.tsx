'use client'


import popupButton from './tulfa-popup-button_plain.json'
import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion'
import styles from './tulfa_popup_button.module.scss'
import dynamic from 'next/dynamic';

const Lottie = dynamic(()=>import('lottie-react'),
{ssr: false}
)

const TulfaPopupButton = ({
   timer,
   text,
   height,
   width,
   textStyle,
   onClick
}) => {


   const [isVisible, setIsVisible] = useState(false);

   // Detect when the user is in viewport
   const [isInView, setIsInView] = useState(false);
   const elementRef = useRef(null);

   useEffect(() => {
      // IntersectionObserver logic to track if element is in view
      const observer = new IntersectionObserver(
         ([entry]) => {
            setIsInView(entry.isIntersecting); // Set inView status based on intersection
         },
         { threshold: 1 } // Trigger when 10% of the element is in view
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

      if (isInView) {
         setTimeout(() => {
            setIsVisible(true)
         }, timer)
      }


   }, [isInView])

   useEffect(()=>{
      return(()=>{
         elementRef.current = null
      })
   },[])


   const style = {
      height,
      width
   }

   return (
      <div
         ref={elementRef}
         
      >

         {isVisible &&

            <motion.button
               style={
                  {
                     position: 'relative',
                     height: height,
                     width: width,
                     zIndex: 20,
                     pointerEvents: 'auto'
                  }
               }
               onClick={onClick}
               className='trigger_header_button'
            >
               <Lottie
                  animationData={popupButton}
                  autoplay={true}
                  loop={false}
                  style={style}
               />
               <motion.p
                  className={styles.text_style}
                  style={textStyle}
                  initial={{
                     opacity: 0
                  }}
                  animate={{
                     opacity: 1
                  }}
                  transition={{
                     delay: 1.2,
                     duration: 1
                  }}

               >{text}
               </motion.p>


            </motion.button>
         }

      </div>
   )
}

export default TulfaPopupButton;

