'use client'
import styles from "./ProSizeVar.module.scss";
import ProductVariation from "@/components/variations/ProductVariations";
import {useMemo} from 'react'

/* PRODUCT SIZE IMAGES */
import sixLights from "../../assets/images/size_var/6set_light_off.webp";
import eightLights from "../../assets/images/size_var/8set_light_off.webp";
import tenLights from "../../assets/images/size_var/10set_light_off.webp";
import twelveLights from "../../assets/images/size_var/12set_light_off.webp";

/* HOVER IMAGES */
import sixLightsHover from "../../assets/images/size_var/6set_light_on.webp";
import eightLightsHover from "../../assets/images/size_var/8set_light_on.webp";
import tenLightsHover from "../../assets/images/size_var/10set_light_on.webp";
import twelveLightsHover from "../../assets/images/size_var/12set_light_on.webp";
import { StaticImageData } from "next/image";

/* BACKGROUN IMAGE */
import backgroundImage from '../../assets/images/size_var/Chandelier_Lifestyle_website_new.png'


const ProSizeVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide,
    zIndex
}) => {

    /* Images under different categories */
    type ImageSet = {
        [key: string]: Array<[StaticImageData, string]>
        background: StaticImageData,
        backgroundStyling: string
    };

    const imageSet = useMemo(()=>{
        /* RETRIEVE IMAGE URLS FROM STORAGE LOCATION, BUT DONT LOAD YET */

        const dynamicImageSet: ImageSet = {
            background: backgroundImage,
            backgroundStyling: styles.backgroundStyling,
            top: [
                [sixLights, "Six Lights", sixLightsHover],
                [eightLights, "Eight Lights", eightLightsHover],
                [tenLights, "Ten Lights", tenLightsHover],
                [twelveLights, "Twelve Lights", twelveLightsHover]
            ]
        }

        return dynamicImageSet;

    },[])

    return (
        <ProductVariation
            layoutName={layoutName}
            handleChangeSlide={handleChangeSlide}
            handleLayoutLoad={handleLayoutLoad}
            imageSet={imageSet}
            title="Size Variations"
            paragraph="Lorem ipsum dolor sit amet consectetur. Arcu sollicitudin cursus et aliquet at vestibulum quis."
            zIndex={zIndex}
            dynamicHeader={true}
        />
    );
}

export default ProSizeVar
