"use client";
import styles from "../standard/modal_container.module.scss";
import useWindowSize from "@/hooks/use_window_size";
import { memo, useMemo } from "react";
import FullscreenImageContainer from "../../image_container/fullscreen_image_container/FullscreenImageContainer";

const ModalImageContainer = memo(
  ({
    imageSet,
    differentSizes,
    random,
    allImages,
    isFilter = false,
    handleFullscreenToggle,
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
      if (differentSizes) {
        // Every third image occupies a full row, so we check when we move to next row
        if (i >= 3) {
          // Every third image starts a new row
          if (i % 3 === 0 || i % 3 === 1) {
            rowNumber++; // Move to the next row after every third image
          }
        }

        // Every image in a 5 image cycle occupies  particular column start and column span
        const checkColumnValue = (i + 5) % 6;

        switch (checkColumnValue) {
          case 0:
            columnNumber = 1;
            columnSpan = 7;
            break;
          case 1:
            columnNumber = 8;
            columnSpan = 5;
            break;
          case 2:
            columnNumber = 1;
            columnSpan = 12;
            break;
          case 3:
            columnNumber = 1;
            columnSpan = 5;
            break;
          case 4:
            columnNumber = 6;
            columnSpan = 7;
            break;
          case 5:
            columnNumber = 1;
            columnSpan = 12;
            break;
          default:
            break;
        }
      } else {
        // Every odd numbered image occupies a new row
        if (i >= 2) {
          // Every odd numbered image starts a new row and resets column number
          if (i % 2 !== 0) {
            rowNumber++;
            columnNumber = 1;
          } else {
            columnNumber = 7;
          }
        }

        // Every image occupies the same amount of space
        columnSpan = 6;
      }

      memoizedComponents.push(
        <div
          key={i}
          style={{
            gridArea: `${rowNumber} / ${columnNumber} / span 1 / span ${columnSpan}`,
          }}
          className={styles.modal_indiv_image_container}
        >
          <FullscreenImageContainer
            alt=""
            imageSrc={imageArray[imageIndex]}
            imageClassName=""
            imageStyles=""
            fullscreenToggle={true}
            isFocusOverlay={true}
            blur={true}
            quality={60}
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
  }
);

ModalImageContainer.displayName = "ModalImageContainer";

export default ModalImageContainer;
