"use client";
import styles from "./ProColVar.module.scss";
import ProductVariation from "@/components/variations/ProductVariations";

const ProColVar: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {

    const imageSet: VariationsImageSet = {
      background: '/images/color_var/Website_pillow_lifestyle.jpg',
      backgroundStyling: styles.backgroundStyling,
      top: [
        ['/images/color_var/Red Organic.webp',  "Italiano Rose", '/images/color_var/Red Organic_B.webp'],
        ['/images/color_var/Brown.webp',  "Sugar Coated Almond", '/images/color_var/Brown_B.webp'],
        ['/images/color_var/Organic.webp',  "Park Avenue",  '/images/color_var/Organic_B.webp'],
        ['/images/color_var/Light Grey.webp',  "Greek Isles",'/images/color_var/Light Grey_B.webp'],
      ],
    };
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
