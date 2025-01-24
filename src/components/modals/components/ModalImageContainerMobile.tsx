"use client";
import styles from "../standard/modal_container.module.scss";
import useWindowSize from "@/hooks/use_window_size";
import { memo } from "react";
import FullscreenImageContainer from "../../image_container/fullscreen_image_container/FullscreenImageContainer";

const ModalImageContainerMobile = memo(
  ({
    handleFullscreenToggle,
    imageSet,
    differentSizes,
    random,
    allImages,
    isFilter = false,
  }) => {
    /* ARRAY OF IMAGES TO RENDER */
    let imageArray = [];
    /* DETERMINE NUMBER OF IMAGES TO RENDER */
    let imageNo;

    if (allImages) {
      /* LOOP THROUGH ALL ARRAYS IN IMAGE SET TO EXTRACT IMAGE NO -- EXCEPT ORDER */
      const imageSetNames = Object.keys(imageSet);
      for (let imageSetName of imageSetNames) {
        if (imageSetName === "order" || imageSetName === "background") continue;

        const imageSubArray = imageSet[imageSetName];
        if (isFilter) {
          const firstThreeImages = imageSubArray.slice(0, 3);
          imageArray = [...imageArray, ...firstThreeImages];
        } else {
          imageArray = [...imageArray, ...imageSubArray];
        }
      }
    } else {
      imageArray = [...imageSet];
    }

    imageNo = imageArray.length;

    const viewportSize = useWindowSize();

    const memoizedComponents = [];

    let imageIndex = 0;

    for (let i = 1; i < imageNo + 1; i++) {
      memoizedComponents.push(
        <div key={i} className={styles.modal_indiv_image_container}>
          <FullscreenImageContainer
            alt=""
            imageSrc={imageArray[imageIndex]}
            imageClassName=""
            priority={false}
            imageStyles=""
            fullscreenToggle={true}
            isFocusOverlay={true}
            blur={true}
            quality={50}
            handleFullscreenToggle={handleFullscreenToggle}
            imageIndex={imageIndex}
          />
        </div>
      );

      if (random) {
        imageIndex = Math.floor(Math.random() * imageArray.length);
      } else {
        imageIndex = imageIndex + 1 >= imageArray.length ? 0 : imageIndex + 1;
      }
    }

    return (
      <div className={styles.modal_image_container_mobile}>
        {memoizedComponents}
      </div>
    );
  }
);

ModalImageContainerMobile.displayName = "ModalImageContainerMobile";

export default ModalImageContainerMobile;
