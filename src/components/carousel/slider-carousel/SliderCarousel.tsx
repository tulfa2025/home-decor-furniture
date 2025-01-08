'use client'
import styles from "./SliderCarousel.module.scss";
import ImageContainer from "@/components/image_container/ImageContainer";
import { StaticImageData } from "next/image";
import {motion, useMotionValue} from 'framer-motion'
import {useState, useMemo, useRef, useEffect} from 'react'
import useWindowSize from "@/hooks/use_window_size";

type ImageSet = {
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
        buttonColor?: "dark" | "light"
    },
    order: Array<string>
}

// Define SliderCarousel component that accepts `imageSet` as a prop
interface SliderCarouselProps {
    imageSet: ImageSet;
}

const DRAG_BUFFER = 50;

const SliderCarousel: React.FC<SliderCarouselProps> = ({ imageSet, isInView }) => {

    const [imageIndex, setImageIndex] = useState(1);
    const [dragging, setDragging] = useState(false);

    const dragX = useMotionValue(0)

    const onDragStart = ()=>{
        setDragging(true)
    }

    const onDragEnd = ()=>{
        setDragging(false)

        const x = dragX.get();

        if(x <= -DRAG_BUFFER && imageIndex < imageSet.order.length - 1){
            setImageIndex((prev)=> prev+1)
        } else if (x >= DRAG_BUFFER && imageIndex > 0 ){
            setImageIndex((prev)=> prev-1)
        }
    }

    /* Width of one image container */
    const viewportSize = useWindowSize();
    const imageContainerWidth = useMemo(()=>{

        /* 80% viewport width */
        return viewportSize.width * 0.7

    }, [viewportSize, isInView])

    // This effect runs on mount and whenever the window resizes
    const [position, setPosition] = useState();
    const firstFlexItemRef = useRef(null)
    useEffect(() => {

        
        const updatePosition = () => {
            if (firstFlexItemRef.current) {
                const rect = firstFlexItemRef.current.getBoundingClientRect();
                // Set the position of the absolutely positioned element
                const right = rect.right - (imageContainerWidth * 1.25) - 30

                setPosition(right);
            }
        };

    
        updatePosition();
        
        
    }, [viewportSize])    


    return (
        <motion.div 
            className={`${styles.carousel_container}`}
            drag='x'
            dragConstraints={{
                left:0,
                right: 0
            }}
            initial={{
                translateX: 0
            }}
            animate={{
               translateX: position ? `-${((imageIndex * imageContainerWidth) + ((imageIndex) * 30)) + (position / 2)}px` : 0
            }}
            transition={{
                duration: 0.3,
                damping: 40
            }}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            style={{
                x: dragX,
             
            }}
        >
            {
                imageSet.order.map((imageName: string, index:number)=>{
                    return(
                        <div
                            key={index}
                            className={styles.slider_image_container}
                            style={{
                                minWidth: imageContainerWidth
                            }}
                            ref={index === 0 ? firstFlexItemRef : null}
                        >
                            <ImageContainer
                                
                                imageSrc={imageSet[imageName].imageData}
                                alt=''
                                imageStyles={{
                                    pointerEvents: "none"
                                }}
                            />
                        </div>
                    )
                })
            }
        </motion.div>
    );
}

export default SliderCarousel
