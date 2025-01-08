'use client'
import styles from "./MarketingImages.module.scss";
import SliderCarousel from "@/components/carousel/slider-carousel/SliderCarousel"
import { StaticImageData } from "next/image";
import { motion, useTransform, useSpring, useScroll } from 'framer-motion'
import { useEffect, useRef, useState } from "react";
import CallOut from "@/components/call_out/CallOut";
import calculateScrollHeight from "@/utils/calculate_scrollheight";

import useInView from "@/hooks/use_inview";
import useWindowSize from "@/hooks/use_window_size";
import TulfaPopupButton from "@/assets/icons/tulfa_popup_button";

/* MARKETiNG IMAGES */
import marketingOneImage from '../../assets/images/marketing_images/first_source.png'
import marketingTwoImage from '../../assets/images/marketing_images/second_source.jpg'

/* PLACEHOLDER */
import marketingThreeImage from '../../assets/images/marketing_images/blank-sign-with-copy-space-for-your-text-message-o-2023-11-27-05-00-30-utc.jpg'
import marketingFourImage from '../../assets/images/marketing_images/blank-signage-sign-design-mockup-isolated-for-the-2023-11-27-05-31-09-utc.jpg'
import marketingFiveImage from '../../assets/images/marketing_images/digital-blank-billboard-with-copy-space-for-advert-2024-05-16-19-48-00-utc.jpg'
import marketingSixImage from '../../assets/images/marketing_images/large-billboard-with-lighting-setting-on-modern-bu-2023-12-11-23-33-26-utc.jpg'
import marketingSevenImage from '../../assets/images/marketing_images/large-billboard-with-lighting-setting-on-modern-bu-2023-12-11-23-33-26-utc.jpg'
import marketingEightImage from '../../assets/images/marketing_images/mockup revista 2.jpg'
import marketingNineImage from '../../assets/images/marketing_images/mockup laptop 2.jpg'
import marketingTenImage from '../../assets/images/marketing_images/mockup revista.jpg'
import marketingElevenImage from '../../assets/images/marketing_images/mockup tablet.jpg'
import marketingTwelveImage from '../../assets/images/marketing_images/mockup-of-blank-advertising-light-box-on-the-bus-s-2023-11-27-05-10-18-utc.jpg'
import marketingThirteenImage from '../../assets/images/marketing_images/workspace-mock-up-desktop-computer-on-table-copy-2024-05-02-15-35-45-utc.jpg'

type ImageSet = {
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
        buttonColor?: "dark" | "light"
    },
    order: Array<string>
}

const imageSet: ImageSet = {
    order: [
        "marketingOne",
        "marketingTwo",
        "marketingThree",
        "marketingFour",
        "marketingFive",
        'marketingSix',
        'marketingSeven',
        'marketingEight',
        'marketingNine',
        'marketingTen',
        'marketingEleven',
        'marketingTwelve',
        'marketingThirteen'
    ],
    marketingOne: {
        imageName: "marketingOne",
        imageData: marketingOneImage
    },
    marketingTwo: {
        imageName: "marketingTwo",
        imageData: marketingTwoImage
    },
    marketingThree: {
        imageName: "marketingThree",
        imageData: marketingThreeImage
    },
    marketingFour: {
        imageName: "marketingFour",
        imageData: marketingFourImage
    },
    marketingFive: {
        imageName: "marketingFive",
        imageData: marketingFiveImage
    },
    marketingSix: {
        imageName: "marketingSix",
        imageData: marketingSixImage
    },
    marketingSeven: {
        imageName: "marketingSeven",
        imageData: marketingSevenImage
    },
    marketingEight: {
        imageName: "marketingEight",
        imageData: marketingEightImage
    },
    marketingNine: {
        imageName: "marketingNine",
        imageData: marketingNineImage
    },
    marketingTen: {
        imageName: "marketingTen",
        imageData: marketingTenImage
    },
    marketingEleven: {
        imageName: "marketingEleven",
        imageData: marketingElevenImage
    },
    marketingTwelve: {
        imageName: "marketingTwelve",
        imageData: marketingTwelveImage
    },
    marketingThirteen: {
        imageName: "marketingThirteen",
        imageData: marketingThirteenImage
    }
}

const MarketingImages: React.FC<LayoutProps> = ({
    layoutName,
    handleChangeSlide,
    zIndex
}) => {
    // Get scroll height
    const viewportSize = useWindowSize();

    // Detect when the user is in viewport for triggering events
    const inViewRef = useRef(null);
    const isInView = useInView(inViewRef, 0.5);


    const scrollTargetRef = useRef(null);
    const { scrollY } = useScroll({
        target: scrollTargetRef,
    });

    useEffect(() => {
        if (isInView) {
            handleChangeSlide(layoutName)
        }
    }, [isInView])

    const scrollHeight = calculateScrollHeight(viewportSize.height, (viewportSize.width > 960 ? 4 : 8));

    /* ANIMATION START AND END POSITION */
    const [yPosition, setYPosition] = useState(null);

    // Function to get the Y position of the element
    const getElementYPosition = () => {
        if (scrollTargetRef.current) {

            const yPos = scrollTargetRef.current.offsetTop;
            setYPosition(yPos); // Update state with the Y position
        }
    };

    // Optionally, you can track the position on window resize or scroll
    useEffect(() => {
        // Get initial Y position when component mounts
        getElementYPosition();

    }, [scrollHeight])

    /* ANIMATIONS */


    /* WHOLE PAGE TRANSLATOIN */

    const transformShowcaseAnimationThree = useTransform(
        scrollY,
        [
            0,
            yPosition,
            yPosition + viewportSize.height,
            yPosition + viewportSize.height + scrollHeight * 0.15,
            yPosition + viewportSize.height + scrollHeight * 0.4, 
            yPosition + viewportSize.height + scrollHeight * 1, 
          ],
        [viewportSize.height * 2.4, viewportSize.height * 2.4, 0, 0, -viewportSize.height * 0.4, -viewportSize.height * 4.8]
    )

    const springyTransformShowcaseAnimationThree = useSpring(transformShowcaseAnimationThree, {
        damping: 40
    })
    return (
        <motion.div
            style={{
                height: scrollHeight,
                position: 'relative',
                top: 0,
                overflow: 'auto',
                backgroundColor: 'white',
                zIndex: isInView ? zIndex : -1

            }}
            ref={scrollTargetRef}
        >
            <motion.div
                style={{
                    top: 0,
                    position: 'fixed',
                    height: '100vh',
                    width: '100vw',
                    y: springyTransformShowcaseAnimationThree,
                    backgroundColor: 'white'
                }}
                ref={inViewRef}
            >
                <motion.section
                    className={styles.marketing_container}
                >
                    <div
                        className={styles.callout_container}
                    >
                        <CallOut
                            heading="Marketing Images"
                            calloutStyleType={1}
                            overrideStyles={styles.callout_container_inner}
                            overrideParagraphStyle={styles.callout_paragraph}
                            overrideHeaderStyle={styles.callout_header}
                        />

                    </div>

                    <div
                        className={styles.carousel_container}
                    >
                        <SliderCarousel
                            imageSet={imageSet}
                            isInView={isInView}


                        />

                    </div>

                    {/* BUTTON TRIGGER */}
                    <motion.div
                        className={styles.lifestyle_button_container}
                    />



                </motion.section>

            </motion.div>

            {/* POP BUTTON CONTAINER */}
            <div
                style={{
                    position: "absolute",
                    left: "calc(50vw - 110px)",
                    width: 400,
                    height: 60,
                    zIndex: 150,
                    bottom: "27%",
                }}


            >
                {/* {
                    isPopupVisible &&
                    <TulfaPopupButton
                        timer={1000}
                        height={60}
                        width={300}
                        // textStyle={popupPosition.textStyle}
                        text={"Take a closer look"}
                    />
                } */}
            </div>


        </motion.div>
    );
}

export default MarketingImages;
