'use client'
import styles from "./ProColBar.module.scss";
import ProductVariation from "@/components/variations/ProductVariations";
import {useMemo} from 'react'

/* PRODUCT COLOR IMAGES */

/* MAIN IMAGES */
import MainImageRed from "../../assets/images/color_var/Red Organic.png";
import MainImageBrown from "../../assets/images/color_var/Brown.png";
import MainImageLGrey from "../../assets/images/color_var/Light Grey.png";
import MainImageOrganic from "../../assets/images/color_var/Organic.png";

/* HOVER IMAGES */
import HoverImageRed from "../../assets/images/color_var/Red Organic_B.webp";
import HoverImageBrown from "../../assets/images/color_var/Brown_B.webp";
import HoverImageLGrey from "../../assets/images/color_var/Light Grey_B.webp";
import HoverImageOrganic from "../../assets/images/color_var/Organic_B.webp";
import { StaticImageData } from "next/image";

/*BAKCGROUND IMAGE */
import backgroundImage from '../../assets/images/color_var/Website_pillow_lifestyle.jpg'


const ProColVar: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad,
    handleChangeSlide,
    zIndex
}) => {

    /* Images under different categories */
    type ImageSet = {
        [key: string]: Array<[StaticImageData, string]>
        background: StaticImageData
    };

    const imageSet = useMemo(()=>{
        /* RETRIEVE IMAGE URLS FROM STORAGE LOCATION, BUT DONT LOAD YET */

        const dynamicImageSet: ImageSet = {
            background: backgroundImage,
            top: [
                [MainImageRed, "Italiano Rose", HoverImageRed],
                [MainImageBrown, "Sugar Coated Almond", HoverImageBrown],
                [MainImageOrganic, "Park Avenue", HoverImageOrganic],
                [MainImageLGrey, "Greek Isles", HoverImageLGrey]
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
            title="Color Variations"
            paragraph="Lorem ipsum dolor sit amet consectetur. Arcu sollicitudin cursus et aliquet at vestibulum quis."
            zIndex={zIndex}
        />
    );
}

export default ProColVar
