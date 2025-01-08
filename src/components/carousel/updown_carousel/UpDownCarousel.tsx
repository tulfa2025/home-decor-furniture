import { BsArrowDown, BsArrowUp } from "react-icons/bs";
import styles from "./UpDownCarousel.module.scss";
import Image from 'next/image';
import { StaticImageData } from "next/image";

type ImageSet = {
    [key: string]: {
        imageData: StaticImageData,
        imageName: string,
        buttonColor: "dark" | "light"
    },
    order: Array<string>
}

// Define UpDownCarousel component that accepts `imageSet` as a prop
interface UpDownCarouselProps {
    imageSet: ImageSet;
}

const UpDownCarousel: React.FC<UpDownCarouselProps> = ({ imageSet }) => {
    return (
        <div className={`${styles.carousel_container}`}>
            {
                imageSet.order.map((imageName: string, index:number)=>{
                    return(
                        <Image
                            key={index}
                            src={imageSet[imageName].imageData}
                            alt=''
                            className={styles.background_image}
                        />
                    )
                })
            }
            
            <div className={styles.carousel_arrows}>
                <button>
                    <BsArrowUp className={styles.carousel_arrow_up} />
                </button>
                <button>
                    <BsArrowDown className={styles.carousel_arrow_down} />
                </button>
            </div>
        </div>
    );
}

export default UpDownCarousel
