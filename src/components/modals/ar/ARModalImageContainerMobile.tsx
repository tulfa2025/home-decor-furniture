"use client";
import styles from "../standard/modal_container.module.scss";
import { memo } from "react";
import Image from "next/image";

const ARModalImageContainerMobile = memo(
  ({
    imageSet,
  }) => {
    /* ARRAY OF IMAGES TO RENDER */
    let imageArray = [];
    /* DETERMINE NUMBER OF IMAGES TO RENDER */
    let imageNo;

    if (imageSet.length > 0 ) {
      imageArray = [...imageSet];
    } else {
      return
    }

    imageNo = imageArray.length;
    const memoizedComponents = [];

    let imageIndex = 0;

    for (let i = 1; i < imageNo + 1; i++) {
      memoizedComponents.push(
        <div key={i} className={styles.modal_indiv_image_container}>
          <Image 
            src={imageArray[imageIndex]}
            alt=''
          />
        </div>
      );
    }

    return (
      <div className={styles.modal_image_container_mobile}>
        {memoizedComponents}
      </div>
    );
  }
);

ARModalImageContainerMobile.displayName = "ARModalImageContainerMobile";

export default ARModalImageContainerMobile;
