'use client'
import styles from './InstallationImages.module.scss'
import LargeSlideContainer from '@/components/large_slide_container/LargeSlideContainer';

/* INSTALLATION IMAGES */
import imageOne from '../../../assets/images/installation_images/1.png'
import imageTwo from '../../../assets/images/installation_images/2.png'
import imageThree from '../../../assets/images/installation_images/3.png'
import imageFour from '../../../assets/images/installation_images/4.png'
import imageFive from '../../../assets/images/installation_images/5.png'
import imageSix from '../../../assets/images/installation_images/6.png'

import ImageContainer from '@/components/image_container/ImageContainer';

const InstallationImages: React.FC<LayoutProps> = ({
    layoutName,
    zIndex
}) => {

    const image_container_style = {
      position: 'relative',
      overflow: 'hidden',
      height: '100%',
      width: '100%',
        scale: 1.05
    }
  
    return (
        <>
        <LargeSlideContainer
            layoutName={layoutName}
            title="Installation Images"
            paragraph="Guide your customers with clear, step-by-step images for assembling and setting up the furniture."
            zIndex={zIndex}
        >
            <div
                className={styles.image_container}
            >
                <ImageContainer
                    imageSrc={imageSix}
                    imageStyles={
                        {
                            ...image_container_style
                        }}
                />
                <ImageContainer
                    imageSrc={imageFive}
                    imageStyles={
                        {
                            ...image_container_style,
                        }}
                />
                <ImageContainer
                    imageSrc={imageTwo}
                    imageStyles={
                        {
                            ...image_container_style
                        }}
                />
                <ImageContainer
                    imageSrc={imageThree
                    }
                    imageStyles={
                        {
                            ...image_container_style
                        }}
                />
                <ImageContainer
                    imageSrc={imageFour}
                    imageStyles={
                        {
                            ...image_container_style
                        }}
                />
                <ImageContainer
                    imageSrc={imageOne}
                    imageStyles={
                        {
                            ...image_container_style
                        }}
                />

            </div>
        </LargeSlideContainer>
        </>
        
    );
}

export default InstallationImages;
