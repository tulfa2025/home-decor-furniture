'use client'
import Image from 'next/image';
import groupShotBackgroundImage from '../../../assets/images/group_shots/Firefly 20240929230829.png'
import { motion } from 'framer-motion'
import { TulfaUpArrow, TulfaDownArrow } from '@/assets/icons/tulfa_nav_arrows';
import { useState, useEffect, useRef } from 'react';
import useWindowSize from '@/hooks/use_window_size';
import styles from './LifeStyleScenesBranch.module.scss'

const LifeStyleCollection = () => {

    const [isHovered, setIsHovered ] = useState(false);

    const selectionArray = [
        "All",
        "Applications",
        "Armchairs",
        "Bathrooms",
        "Bedrooms",
        "Cabinets",
        "Chairs",
        "Custom",
        "Indoor",
        "Holidays",
        "Kitchen",
        "Lighting",
        "Living Room",
        "Office",
        "Outdoors",
        "Prints",
        "Velvets",
        "Leathers",
        "Plains",
        "Embroidery"
    ]

    const [ selectedIndex, setSelectedIndex ] = useState(0);

    const yValue = 100 * selectedIndex;

    const elementRef = useRef(null);

    
    // Calculate size of screen initially 
    const viewportSize = useWindowSize();
  
    useEffect(() => {
      const handleMouseMove = (event) => {
        if (elementRef.current) {
          const rect = elementRef.current.getBoundingClientRect();
          
          // Check if mouse is within the element's visual bounds
          if (
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom
          ) {
            setIsHovered(true);
          } else {
            setIsHovered(false);
          }
        }
      };
  
      // Add event listener for mouse move
      window.addEventListener('mousemove', handleMouseMove);
  
      // Cleanup the event listener when the component unmounts
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
      };
    }, []);

    return (
        <>

            <motion.div
                style={{
                    width: "20vw",
                    height: "100vh",
                    position: 'absolute',
                    zIndex: 10,
                    background: 'linear-gradient(90deg, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 2%, rgba(0,0,0,0) 100%)',
                    display: 'flex',
                    alignItems: "center",
                    y: 0,
                  }}

                  initial={{
                    opacity: 0
                  }}
                  animate={{
                    opacity: isHovered ? 1 : (viewportSize.width > 768 ? 0 : 1)
                  }}
                  ref={elementRef}
            >
                <div
                    style={{
                        height: "75%",
                        width: "100%",
                        backgroundColor: "fixed",
                        left: "10%",
                        position: 'absolute',
                        display: "flex",
                        justifyContent: "space-between"

                    }}
                >
                    {/* Tracker Bar */}

                    <motion.div className={styles.tracker_bar_container}>

                        <motion.div
                    

                            className={styles.tracker_bar_left}

                            animate={{
                                y: 40 * selectedIndex
                            }}
                            transition ={{
                                damping: 15,
                                type: "spring"
                            }}
                            
                        >


                        </motion.div>
                        
                    </motion.div>

                    {/* Content */}
                    <div
                        className={styles.selected_text_container}
                    >
                        {
                            selectionArray.map((selection, key)=>{
                                return (
                                <button
                                    key={key}
                                    style={{
                                        color: selectedIndex === key ? "white" : "#979797",
                                        minHeight: `clamp(40px, calc(100% / ${selectionArray.length}), 50px)`,
                                        
                                    }}
                                

                                    className={styles.selected_text}
                                    onClick={()=>{
                                        setSelectedIndex(key)
                                    }}
                                >
                                    {selection}
                                </button>)
                            })
                        }
                       

                    </div>

                </div>

            </motion.div>

            <motion.div

                
                animate={{
                    y: isHovered && viewportSize.width > 768 ? "-3vh" : 0
                }}
                initial={{
                    y:0,
                    
                }}
                transition={{
                    duration: 0.5
                }}
                style={{
                    height: '100%',
                    width: '100vw'
                }}
            >
                <Image
                    src={groupShotBackgroundImage}
                    alt=''
                    priority

                    style={{
                        objectFit: 'cover', // maintain aspect ratio but fill the container
                        height: '100%', // ensure image fills height
                        width: '100%', // ensure image fills width
                        objectPosition: viewportSize.width > 768 ? "50% 50%" :  "30% 50%",
                        transform: `scale(${viewportSize.width > 768 ? 1 : 1.3})`
                        


                    }}
                />
            </motion.div>

            {/* */}

            {
                viewportSize.width > 768 && <div
                style={{
                    position: 'absolute',
                    right: "20vw",
                    top: "50vh",
                    zIndex: 100,
                    display: "flex",
                    flexDirection: "column",
                    height: "100px",
                    justifyContent: "space-between"
                }}
            >
                <TulfaUpArrow
                    height={40}
                    width={40}
                    fill="white"
                />
                <TulfaDownArrow
                    height={40}
                    width={40}
                    fill="white"
                />
            </div>
            }
           

        </>
    )

}

export default LifeStyleCollection