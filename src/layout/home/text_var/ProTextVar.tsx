"use client";
import styles from "./ProColVar.module.scss";
import ProductVariation from "@/components/variations/ProductVariations";

const ProTextVar: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  /* RETRIEVE IMAGE URLS FROM STORAGE LOCATION, BUT DONT LOAD YET */

  const imageSet: VariationsImageSet = {
    background: "/images/fabric_var/Fabrics_Silo .webp",
    backgroundStyling: styles.backgroundStyling,
    imageStyles: {
      objectFit: "cover",
    },
    top: [
      [
        "/images/fabric_var/Fabric_Variation_01_Lifestyle.webp",
        "Orange Vermillion",
        "/images/fabric_var/Fabric_01_DarkOrange_Closeup.webp",
      ],
      [
        "/images/fabric_var/Fabric_Variation_04_Lifestyle.webp",
        "Turner's Yellow",
        "/images/fabric_var/Fabric_02_Yellow_Closeup.webp",
      ],
      [
        "/images/fabric_var/Fabric_Variation_02_Lifestyle.webp",
        "Porpoise",
        "/images/fabric_var/Fabric_04_white_fur010000.webp",
      ],
      [
        "/images/fabric_var/Fabric_Variation_03_Lifestyle.webp",
        "Butter Caramel",
        "/images/fabric_var/Fabric_03_Beige_Closeup.webp",
      ],
    ],
  };

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
};

export default ProTextVar;
