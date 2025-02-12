"use client";
import styles from "./ProSizeVar.module.scss";
import ProductVariation from "@/components/variations/ProductVariations";

import scrollTransformValues from "@/utils/scrollTransformValues";

const ProSizeVar: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const imageSet: VariationsImageSet = {
    background: "/images/size_var/Chandelier_Lifestyle_website.webp",
    backgroundStyling: styles.backgroundStyling,
    top: [
      [
        "/images/size_var/6set_light_off.webp",
        "Six Lights",
        "/images/size_var/6set_light_on.webp",
      ],
      [
        "/images/size_var/8set_light_off.webp",
        "Eight Lights",
        "/images/size_var/8set_light_on.webp",
      ],
      [
        "/images/size_var/10set_light_off.webp",
        "Ten Lights",
        "/images/size_var/10set_light_on.webp",
      ],
      [
        "/images/size_var/12set_light_off.webp",
        "Twelve Lights",
        "/images/size_var/12set_light_on.webp",
      ],
    ],
  };

  return (
    <ProductVariation
      layoutName={layoutName}
      imageSet={imageSet}
      title="Size Variations"
      paragraph="Lorem ipsum dolor sit amet consectetur. Arcu sollicitudin cursus et aliquet at vestibulum quis."
      zIndex={zIndex}
      dynamicHeader={true}
      scrollMap={scrollTransformValues.sizeVar}
    />
  );
};

export default ProSizeVar;
