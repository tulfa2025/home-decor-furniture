'use client'
import styles from "./ProColBar.module.scss";
import ProductVariation from "@/components/variations/ProductVariations";
import {useMemo} from 'react'

/* PRODUCT COLOR IMAGES */

/* MAIN IMAGES */
import MainImageOrange from "../../assets/images/fabric_var/Fabric_Variation_01_Lifestyle.png";
import MainImageYellow from "../../assets/images/fabric_var/Fabric_Variation_04_Lifestyle.png";
import MainImagePorpoise from "../../assets/images//fabric_var/Fabric_Variation_02_Lifestyle.png";
import MainImageCaramel from "../../assets/images/fabric_var/Fabric_Variation_03_Lifestyle.png";

/* HOVER IMAGES */
import HoverImageOrange from "../../assets/images/fabric_var/Fabric_01_DarkOrange_Closeup.png";
import HoverImageYellow from "../../assets/images/fabric_var/Fabric_02_Yellow_Closeup.png";
import HoverImageCaramel from "../../assets/images/fabric_var/Fabric_03_Beige_Closeup.png";
import HoverImagePorpoise from "../../assets/images/fabric_var/Fabric_04_white_fur010000.png";
import { StaticImageData } from "next/image";

/**BACKGROUND IMAGE */
import backgroundImage from '../../assets/images/fabric_var/Fabrics_Silo .png'

const ProTextVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide,
    zIndex
}) => {

    /* Images under different categories */
    type ImageSet = {
        [key: string]: Array<[StaticImageData, string, StaticImageData]>
    };

    const imageSet = useMemo(()=>{
        /* RETRIEVE IMAGE URLS FROM STORAGE LOCATION, BUT DONT LOAD YET */

        const dynamicImageSet: ImageSet = {
            background: backgroundImage,
            top: [
                [MainImageOrange, "Orange Vermillion", HoverImageOrange],
                [MainImageYellow, "Turner's Yellow", HoverImageYellow],
                [MainImagePorpoise, "Porpoise", HoverImagePorpoise],
                [MainImageCaramel, "Butter Caramel", HoverImageCaramel]
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
            title="Texture Variations"
            paragraph="Lorem ipsum dolor sit amet consectetur. Arcu sollicitudin cursus et aliquet at vestibulum quis."
            zIndex={zIndex}
            dynamicHeader={true}
    />
    );
}

export default ProTextVar
