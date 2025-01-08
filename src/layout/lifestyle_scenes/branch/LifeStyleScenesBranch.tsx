import VideoPlayer from "@/components/video/VideoPlayer"
import { motion } from 'framer-motion'
import ShowCase from "@/components/showcase/ShowCase";
import { useRef, useEffect, useState } from 'react'
import CallOut from "@/components/call_out/CallOut";
import useWindowSize from "@/hooks/use_window_size";
import LifeStyleCollection from "./LIfeStyleCollection";

import styles from './LifeStyleScenesBranch.module.scss'

const LifeStyleBranch = () => {

    /* Initial Video Container Ref */
    const lifestyleContainerRef = useRef(null);

    const [isLifestyleContainerActive, setIsLifestyleContainerActive] = useState(true);

    const groupShotsContainerRef = useRef(null);

    const [isGroupContainerActive, setIsGroupContainerActive] = useState(false);

    const groupImagesRef = useRef(null);

    const [isGroupImagesActive, setIsGroupImagesActive] = useState(false);

    // Calculate size of screen initially 
    const viewportSize = useWindowSize();

    /*  */
    useEffect(() => {

        const lifestyleContainer = lifestyleContainerRef.current;

        const handlePageScrollTrigger = (e) => {
            /* Prevent default behaviour */
            e.preventDefault();

            if(coolDown.current){
                
                return
            }

            if(e.deltaY > 0){
                
                setIsLifestyleContainerActive(false);
                setIsGroupContainerActive(true);
                lifestyleContainer.removeEventListener("wheel", handlePageScrollTrigger);
                
            } 
        
        }


        if (lifestyleContainer && isLifestyleContainerActive) {
            lifestyleContainer.addEventListener("wheel", handlePageScrollTrigger)
        }

        return (() => {
            const lifestyleContainer = lifestyleContainerRef.current;

            if (lifestyleContainer) {
                lifestyleContainer.removeEventListener("wheel", handlePageScrollTrigger)
            }
        })

    }, [isLifestyleContainerActive])
    

    useEffect(() => {

        const groupShotsContainer = groupShotsContainerRef.current;

        const handlePageScrollTriggerTwo = (e) => {

            /* Prevent default behaviour */
            e.preventDefault();

            if(coolDown.current){
                return
            }

            if(e.deltaY > 0){
                setIsGroupContainerActive(false)
                setIsGroupImagesActive(true)
            } else {
                setIsLifestyleContainerActive(true);
                setIsGroupContainerActive(false);
                
            }
            groupShotsContainer.removeEventListener("wheel", handlePageScrollTriggerTwo)
        }

        if (isGroupContainerActive) {

            if (groupShotsContainer) {
                groupShotsContainer.addEventListener("wheel", handlePageScrollTriggerTwo)
            }

        }

        return (() => {
            const groupShotsContainer = groupShotsContainerRef.current;

            if (groupShotsContainer) {
                groupShotsContainer.removeEventListener("wheel", handlePageScrollTriggerTwo)
            }
        })

    }, [isGroupContainerActive])

    

    useEffect(() => {

        const groupImagesContainer = groupImagesRef.current;

        const handlePageScrollTriggerThree = (e) => {

            /* Prevent default behaviour */
            e.preventDefault();

            if(coolDown.current){
                return
            }

            if(e.deltaY > 0){
                return
            } else {
                setIsGroupImagesActive(false);
                setIsGroupContainerActive(true);
                groupImagesContainer.removeEventListener("wheel", handlePageScrollTriggerThree)
            }
        }

        if (isGroupImagesActive) {
            if (groupImagesContainer) {
                groupImagesContainer.addEventListener("wheel", handlePageScrollTriggerThree)
            }

        }


        return (() => {
            const groupImagesContainer = groupImagesRef.current;

            if (groupImagesContainer) {
                groupImagesContainer.removeEventListener("wheel", handlePageScrollTriggerThree)
            }
        })

    }, [isGroupImagesActive])


    const coolDown = useRef(null) 
    /* SCROLL COOLDOWN */
    useEffect(()=>{

        coolDown.current = setTimeout(()=>{
            coolDown.current = null
        }, 1000);

    }, [isGroupImagesActive, isGroupContainerActive, isLifestyleContainerActive]);


    const measurements = {
        lifestyleContainer: isGroupImagesActive ? -100 : -70
    }


    return (

        <div>

            <motion.div
                initial={{
                    opacity: 0
                }}
                animate={{
                    opacity: 1,
                    duration: 1
                }}

                style={{
                    height: isLifestyleContainerActive ? '100vh' : viewportSize.height * 3,
                    position: 'relative'
                }}

            >
                {/* INITIAL SCENE */}

                <motion.div
                    className={styles.video_scene_container}
                    
                    initial={{
                        scale: 1.2
                    }}
                    animate={{
                        transform: isLifestyleContainerActive ? `scale(1.2)` : `scale(1) translateY(${measurements.lifestyleContainer}vh)`,
                        opacity: isGroupImagesActive ? 0 : 1
                    }}
                    transition={{
                        duration: 0.7,
                    }}
                   
                    ref={lifestyleContainerRef}
                >
                    <motion.div
                        className={styles.video_scene_container_inner }

                    >
                        <div
                            className={styles.showcase_container}
                        >

                            <ShowCase
                                heading="Lifestyle Scenes"

                            />
                        </div>

                        <motion.div>
                            <VideoPlayer
                                src='/videos/lifestyle.mp4'
                                type="video/mp4"
                                loop={true}
                                styleOverride={{
                                    zIndex: 0,
                                    position: 'absolute',
                                    opacity: 0.7
                                }}
                            >
                            </VideoPlayer>
                        </motion.div>

                    </motion.div>
                </motion.div>

                {/* Group shots container */}
                <motion.div
                    ref={groupShotsContainerRef}
                    initial={{
                        transform: `translateY(30vh)`,
                        opacity: 0,
                        backgroundColor: 'white'
                    }}
                    animate={{
                        transform: isGroupImagesActive ? 'translateY(-30vh)' : 'translateY(30vh)',
                        opacity: isGroupImagesActive ? 0 : 1,
                        zIndex: 250,
                    }}
                    transition={{
                        opacity: {
                            duration: 0.3
                        },
                        transform: {
                            duration: 0.7
                        }
                    }}

                    style={{
                        width: '100%',
                        position: 'relative',
                    }}
                >
                     <CallOut
                        paragraph="Showcase your furniture in thousands of beautiful designed room setups - without moving a thing or touching the camera"
                        modifier="mw-768"
                        calloutStyleType={2}

                    />
                   

                </motion.div>

                 {/* GROUP SHOTS ELEMENT */}

                 <motion.div
                        style={{
                            height: '100vh',
                            zIndex: 200,
                            x: "5vw",
                            position: 'absolute'
                        }}
                        initial={{
                            scale: 1.2,
                        }}
                        animate={{
                            scale: isGroupImagesActive ? 1.1 : 1.2,
                            top: isGroupImagesActive ?  0 : '60vh',
                            transition: {
                                duration: 0.7
                            }
                        }}
                        ref={groupImagesRef}

                    >
                       <LifeStyleCollection/>

                    </motion.div>


            </motion.div >

        </div>

    )

}

export default LifeStyleBranch