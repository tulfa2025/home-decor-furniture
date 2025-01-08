'use client'
import styles from './DimensionImages.module.scss'
import Image from 'next/image'

import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";

/* DIMENSION IMAGES */
import fauxTreeSetting from '../../assets/images/dimension_images/armchair_setting.png'
import fauxTreeBlank from '../../assets/images/dimension_images/Dimension  _1.png'

const DimensionImages: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide
}) => {


    return (
        <LargeSlideContainer
            layoutName={layoutName}
            handleChangeSlide={handleChangeSlide}
            handleLayoutLoad={handleLayoutLoad}
            title="Dimension Images"
            paragraph="Give your customers a clear view of how your furniture fits into their space with precise dimensions and scale indicators."
        >
            <div
                className={styles.flex_container}
            >
                
                <div
                    className={styles.image_container}
                >
                    <Image
                        src={fauxTreeBlank}
                        alt=""
                        className={`${styles.dimension_image} ${styles.measurement}`}
                    />
                </div>
                <div
                    className={styles.image_container}
                >
                    <Image
                        src={fauxTreeSetting}
                        alt=""
                        className={styles.dimension_image}
                    />
                </div>

            </div>

        </LargeSlideContainer>

    );
}

export default DimensionImages;
