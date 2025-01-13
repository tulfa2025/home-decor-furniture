'use client'
import styles from './GroupShots.module.scss'
import { motion } from 'framer-motion'
import { useRef } from 'react';
import useInView from '@/hooks/use_inview';
/* CUSTOM PROPS */
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";

/* IMAGES */
import AutomaticCarousel from '@/components/carousel/automatic_carousel/AutomaticCarousel';
import groupShoteOne from '../../assets/images/group_shots/Group-shot_Plates_scene_1.webp'
import groupShoteTwo from '../../assets/images/group_shots/Group-shot_Plates_scene_2.webp'
import groupShoteThree from '../../assets/images/group_shots/Group-shot_Plates_scene_3.webp'
import groupShoteFour from '../../assets/images/group_shots/Group-shot_Plates_scene_4.webp'

type ImageSet = {
    order: string[];
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
        buttonColor?: "dark" | "light",
        overrideStyle: {}
    };
}

const imageSet: ImageSet = {
    order: [
        "groupOne",
        "groupTwo",
        "groupThree",
        "groupFour",
    ],
    groupOne: {
        imageName: "groupOne",
        imageData: groupShoteOne,
        overrideStyle: {}
    },
    groupTwo: {
        imageName: "groupTwo",
        imageData: groupShoteTwo,
        overrideStyle: {}
    },
    groupThree: {
        imageName: "groupThree",
        imageData: groupShoteThree,
        overrideStyle: {}
    },
    groupFour: {
        imageName: "groupFour",
        imageData: groupShoteFour,
        overrideStyle: {}
    }
}


const GroupShots: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide,
    zIndex
}) => {

    const changeTrackRef = useRef(null);
    const isTrackInView = useInView(changeTrackRef, 0.85);


    return (
        <LargeSlideContainer
            layoutName={layoutName}
            handleLayoutLoad={handleLayoutLoad}
            handleChangeSlide={handleChangeSlide}
            title="Group Shots"
            paragraph="Present your furniture items grouped together to show their compatibility and create a coherent look."
            zIndex={zIndex}
            dynamicHeader={true}
        >
            <motion.section
                className={styles.video_container}
                ref={changeTrackRef}

            >
                <AutomaticCarousel
                    imageSet={imageSet}
                    changeDelay={1000}
                    transition={{
                        duration: 0.5
                    }}
                    paused={
                        isTrackInView ? false : true
                    }
                />

            </motion.section>
        </LargeSlideContainer>

    );
}

export default GroupShots;
