"use client";
import styles from "./ProColVar.module.scss";
import ProductVariation from "@/components/variations/ProductVariations";
import { useMemo } from "react";

/* PRODUCT COLOR IMAGES */

/* MAIN IMAGES */
import MainImageRed from "../../../assets/images/color_var/Red Organic.webp";
import MainImageBrown from "../../../assets/images/color_var/Brown.webp";
import MainImageLGrey from "../../../assets/images/color_var/Light Grey.webp";
import MainImageOrganic from "../../../assets/images/color_var/Organic.webp";

const blurMainImageRed = "/images/color_var/blur/Red Organic.webp";
const blurMainImageBrown = "/images/color_var/blur/Brown.webp";
const blurMainImageLGrey = "/images/color_var/blur/Light Grey.webp";
const blurMainImageOrganic = "/images/color_var/blur/Organic.webp";

/* HOVER IMAGES */
import HoverImageRed from "../../../assets/images/color_var/Red Organic_B.webp";
import HoverImageBrown from "../../../assets/images/color_var/Brown_B.webp";
import HoverImageLGrey from "../../../assets/images/color_var/Light Grey_B.webp";
import HoverImageOrganic from "../../../assets/images/color_var/Organic_B.webp";

const blurHoverImageBrown = "/images/color_var/blur/Brown_B.webp";
const blurHoverImageRed = "/images/color_var/blur/Red Organic_B.webp";
const blurHoverImageLGrey = "/images/color_var/blur/Light Grey_B.webp";
const blurHoverImageOrganic = "/images/color_var/blur/Organic_B.webp";

/*BAKCGROUND IMAGE */
import backgroundImage from "../../../assets/images/color_var/Website_pillow_lifestyle.jpg";

const ProColVar: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const imageSet = useMemo(() => {
    /* RETRIEVE IMAGE URLS FROM STORAGE LOCATION, BUT DONT LOAD YET */

    const dynamicImageSet: VariationsImageSet = {
      background: backgroundImage,
      backgroundStyling: styles.backgroundStyling,
      top: [
        [MainImageRed, blurMainImageRed, "Italiano Rose", HoverImageRed, blurHoverImageRed],
        [MainImageBrown, blurMainImageBrown, "Sugar Coated Almond", HoverImageBrown, blurHoverImageBrown],
        [MainImageOrganic, blurMainImageOrganic, "Park Avenue", HoverImageOrganic, blurHoverImageOrganic],
        [MainImageLGrey, blurMainImageLGrey, "Greek Isles", HoverImageLGrey, blurHoverImageLGrey],
      ],
    };

    return dynamicImageSet;
  }, []);

  return (
    <ProductVariation
      layoutName={layoutName}
      imageSet={imageSet}
      title="Color Variations"
      paragraph="Lorem ipsum dolor sit amet consectetur. Arcu sollicitudin cursus et aliquet at vestibulum quis."
      zIndex={zIndex}
      dynamicHeader={true}
    />
  );
};

export default ProColVar;
