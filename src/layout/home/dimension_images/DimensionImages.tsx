'use client'
import styles from './DimensionImages.module.scss'
import Image from 'next/image'

import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";

/* DIMENSION IMAGES */
import fauxTreeSetting from '../../../assets/images/dimension_images/armchair_setting.webp'
import fauxTreeBlank from '../../../assets/images/dimension_images/Dimension Images 1.webp'
import { useContext } from 'react';
import DeviceContext from '@/context/deviceContext';

const DimensionImages: React.FC<LayoutProps> = ({
    layoutName,
    zIndex
}) => {

    const deviceContext = useContext(DeviceContext)


    return (
        <LargeSlideContainer
            layoutName={layoutName}
            title="Dimension Images"
            paragraph="Give your customers a clear view of how your furniture fits into their space with precise dimensions and scale indicators."
            dynamicHeader={false}
            zIndex={zIndex}
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
                        className={styles.measurement}
                        quality={deviceContext === 'Other' ? 50 : 20}
                    />
                </div>
                <div
                    className={styles.image_container}
                >
                    <Image
                        src={fauxTreeSetting}
                        alt=""
                        className={styles.setting}
                        quality={deviceContext === 'Other' ? 50 : 20}
                    />
                </div>

            </div>

        </LargeSlideContainer>

    );
}

export default DimensionImages;
