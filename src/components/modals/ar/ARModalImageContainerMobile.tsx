"use client";
import styles from "./ar_modal_container.module.scss";
import { memo } from "react";
import Image from "next/image";
import Button from "@/components/button/Button";

const ARModalImageContainerMobile = memo(({ imageSet }) => {
  /* ARRAY OF IMAGES TO RENDER */
  let imageArray = [];
  /* DETERMINE NUMBER OF IMAGES TO RENDER */
  let imageNo;

  if (imageSet.length > 0) {
    imageArray = [...imageSet];
  } else {
    return;
  }

  imageNo = imageArray.length;
  const memoizedComponents = [];

  for (let i = 0; i < imageNo; i++) {
    for (let j = 0; j < 5; j++) {
      switch (j) {
        case 0:
          memoizedComponents.push(
            <div
              key={i ** 2 + j}
              className={styles.modal_indiv_image_container}
            >
              <Image src={imageArray[i][j]} alt="" />
            </div>
          );
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          memoizedComponents.push(
            <div key={i ** 2 + j} className={styles.modal_ar_container}>
              <iframe
                src={imageArray[i][j]}
                allow="xr-spatial-tracking"
                height="100%"
                width="100%"
                style={{ border: "none" }}
              />
            </div>
          );
          break;
        case 4:
          memoizedComponents.push(
            <div className={styles.modal_ar_button_container}>
              <Button text="See In Your Device" buttonType={3} />
            </div>
          );
          break;
        default:
          break;
      }
    }
  }

  return (
    <div className={styles.modal_image_container_mobile}>
      {memoizedComponents}
    </div>
  );
});

ARModalImageContainerMobile.displayName = "ARModalImageContainerMobile";

export default ARModalImageContainerMobile;
