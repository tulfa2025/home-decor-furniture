'use client'
import styles from "./ProColVar.module.scss";
import ProductVariation from "@/components/variations/ProductVariations";
import {useMemo} from 'react'

/* PRODUCT COLOR IMAGES */

/* MAIN IMAGES */
import MainImageOrange from "../../../assets/images/fabric_var/Fabric_Variation_01_Lifestyle.webp";
import MainImageYellow from "../../../assets/images/fabric_var/Fabric_Variation_04_Lifestyle.webp";
import MainImagePorpoise from "../../../assets/images//fabric_var/Fabric_Variation_02_Lifestyle.webp";
import MainImageCaramel from "../../../assets/images/fabric_var/Fabric_Variation_03_Lifestyle.webp";

const blurMainImageOrange = "/images/fabric_var/blur/Fabric_Variation_01_Lifestyle.webp";
const blurMainImageYellow = "/images/fabric_var/blur/Fabric_Variation_04_Lifestyle.webp";
const blurMainImagePorpoise = "/images//fabric_var/blur/Fabric_Variation_02_Lifestyle.webp";
const blurMainImageCaramel = "/images/fabric_var/blur/Fabric_Variation_03_Lifestyle.webp";

/* HOVER IMAGES */
import HoverImageOrange from "../../../assets/images/fabric_var/Fabric_01_DarkOrange_Closeup.webp";
import HoverImageYellow from "../../../assets/images/fabric_var/Fabric_02_Yellow_Closeup.webp";
import HoverImageCaramel from "../../../assets/images/fabric_var/Fabric_03_Beige_Closeup.webp";
import HoverImagePorpoise from "../../../assets/images/fabric_var/Fabric_04_white_fur010000.webp";

const blurHoverImageOrange = "/images/fabric_var/blur/Fabric_01_DarkOrange_Closeup.webp";
const blurHoverImageYellow = "/images/fabric_var/blur/Fabric_02_Yellow_Closeup.webp";
const blurHoverImageCaramel = "/images/fabric_var/blur/Fabric_03_Beige_Closeup.webp";
const blurHoverImagePorpoise = "/images/fabric_var/blur/Fabric_04_white_fur010000.webp";

/**BACKGROUND IMAGE */
import backgroundImage from '../../../assets/images/fabric_var/Fabrics_Silo .webp'

const ProTextVar: React.FC<LayoutProps> = ({
    layoutName,
    zIndex
}) => {


    const imageSet = useMemo(()=>{
        /* RETRIEVE IMAGE URLS FROM STORAGE LOCATION, BUT DONT LOAD YET */

        const dynamicImageSet: VariationsImageSet = {
            background: backgroundImage,
            backgroundStyling: styles.backgroundStyling,
            imageStyles: {
                objectFit: 'cover'
            },
            top: [
                [MainImageOrange, blurMainImageOrange, "Orange Vermillion", HoverImageOrange, blurHoverImageOrange],
                [MainImageYellow, blurMainImageYellow,"Turner's Yellow", HoverImageYellow, blurHoverImageYellow],
                [MainImagePorpoise, blurMainImagePorpoise, "Porpoise", HoverImagePorpoise, blurHoverImagePorpoise],
                [MainImageCaramel, blurMainImageCaramel, "Butter Caramel", HoverImageCaramel, blurHoverImageCaramel]
            ]
        }

        return dynamicImageSet;

    },[])

    return (
        <ProductVariation
            layoutName={layoutName}
            imageSet={imageSet}
            title="Texture Variations"
            paragraph="Lorem ipsum dolor sit amet consectetur. Arcu sollicitudin cursus et aliquet at vestibulum quis."
            zIndex={zIndex}
            dynamicHeader={true}
    />
    );
}

export default ProTextVar
