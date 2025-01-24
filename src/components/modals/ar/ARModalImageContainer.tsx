"use client";
import styles from "../standard/modal_container.module.scss";
import useWindowSize from "@/hooks/use_window_size";
import { memo, useMemo } from "react";
import Image from "next/image";

const ARModalImageContainer = memo(({ imageSet }) => {
  /* ARRAY OF IMAGES TO RENDER */
  let imageArray = [];
  /* DETERMINE NUMBER OF IMAGES TO RENDER */
  let imageNo;

  const viewportSize = useWindowSize();


  imageArray = [...imageSet];
  imageNo = imageArray.length;

  const memoizedComponents = [];
  let rowNumber = 1;
  let columnNumber = 1;
  let columnSpan = 1;

  let imageIndex = 0;

  const gridStyle = useMemo(
    () => ({
      gridTemplateRows: `repeat(${Math.ceil(imageNo / 1.5)}, ${
        viewportSize.height / (viewportSize.width > 960 ? 1 : 2)
      }px)`,
    }),
    [imageNo, viewportSize]
  );

  for (let i = 1; i < imageNo + 1; i++) {
    // Every first  image occupies a full row, so we check when we move to next row
    if (i > 1 && ((i-1) % 3 === 1 || (i-1) % 3 === 0)) {
      // Every third image starts a new row
      rowNumber ++
    }

    // Every image in a 5 image cycle occupies  particular column start and column span
    const checkColumnValue = (i + 2) % 3;

    switch (checkColumnValue) {
      case 0:
        columnNumber = 1;
        columnSpan = 12;
        break;
      case 1:
        columnNumber = 1;
        columnSpan = 9;
        break;
      case 2:
        columnNumber = 10;
        columnSpan = 3;
        break;
      default:
        break;
    }

    memoizedComponents.push(
      <div
        key={i}
        style={{
          gridArea: `${rowNumber} / ${columnNumber} / span 1 / span ${columnSpan}`,
        }}
        className={styles.modal_indiv_image_container}
      >
        <Image src={imageArray[imageIndex][0]} alt="" className={styles.modal_indiv_image}/>
      </div>
    );

    imageIndex = imageIndex + 1 >= imageArray.length ? 0 : imageIndex + 1
  }
  

  return (
    <div
      className={styles.modal_image_container}
      style={{
        gridTemplateRows: gridStyle.gridTemplateRows,
      }}
    >
      {/* Modal images normal size */}
      {memoizedComponents}
    </div>
  );
});

ARModalImageContainer.displayName = "ARModalImageContainer";

export default ARModalImageContainer;
