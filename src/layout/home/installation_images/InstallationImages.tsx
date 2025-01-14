"use client";
import styles from "./InstallationImages.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";

/* INSTALLATION IMAGES */
import imageOne from "../../../assets/images/installation_images/1.png";
import imageTwo from "../../../assets/images/installation_images/2.png";
import imageThree from "../../../assets/images/installation_images/3.png";
import imageFour from "../../../assets/images/installation_images/4.png";
import imageFive from "../../../assets/images/installation_images/5.png";
import imageSix from "../../../assets/images/installation_images/6.png";

import Image from "next/image";

import useWindowSize from "@/hooks/use_window_size";

const InstallationImages: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const image_container_style = {
    position: "relative",
    overflow: "hidden",
    height: "100%",
    width: "100%",
    scale: 1.05,
    objectFit: "cover",
  };

  const viewportSize = useWindowSize();

  return (
    <>
      <LargeSlideContainer
        layoutName={layoutName}
        title="Installation Images"
        paragraph="Guide your customers with clear, step-by-step images for assembling and setting up the furniture."
        zIndex={zIndex}
      >
        <div className={styles.image_container}>
          <Image
            alt=""
            src={imageSix}
            style={{
              ...image_container_style,
            }}
          />
          <Image
            alt=""
            src={imageFive}
            style={{
              ...image_container_style,
            }}
          />
          <Image
            alt=""
            src={imageTwo}
            style={{
              ...image_container_style,
            }}
          />
          <Image
            alt=""
            src={imageThree}
            style={{
              ...image_container_style,
            }}
          />

          {viewportSize.width > 768 ? (
            <>
              <Image
                alt=""
                src={imageFour}
                style={{
                  ...image_container_style,
                }}
              />
              <Image
                alt=""
                src={imageOne}
                style={{
                  ...image_container_style,
                }}
              />
            </>
          ) : null}
        </div>
      </LargeSlideContainer>
    </>
  );
};

export default InstallationImages;
