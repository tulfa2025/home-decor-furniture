"use client";
import styles from "./ar_modal_container.module.scss";
import useWindowSize from "@/hooks/use_window_size";
import { memo, useMemo } from "react";
import Image from "next/image";
import ThreeDScene from "@/components/3dscene/three_d_scene";

const ARModalImageContainer =({ imageSet }) => {
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
      gridTemplateRows: `repeat(${Math.ceil((imageNo * 3) / 1.5)}, ${
        viewportSize.height / (viewportSize.width > 960 ? 1 : 2)
      }px)`,
    }),
    [imageNo, viewportSize]
  );

  for (let i = 1; i < imageNo + 1; i++) {
    // Every first  image occupies a full row, so we check when we move to next row

    for (let j = 1; j < 4; j++) {
      const checkColumnValue = (j + 2) % 3;

      switch (checkColumnValue) {
        case 0:
          columnNumber = 1;
          columnSpan = 12;
          memoizedComponents.push(
            <div
              style={{
                gridArea: `${rowNumber} / ${columnNumber} / span 1 / span ${columnSpan}`,
              }}
              className={styles.modal_indiv_image_container}
              key={i ** 2 + j + 100}
            >
              <Image
                src={imageArray[imageIndex][0]}
                alt=""
                className={styles.modal_indiv_image}
              />
            </div>
          );
          rowNumber++;
          break;
        case 1:
          columnNumber = 1;
          columnSpan = 9;
          memoizedComponents.push(
            <div
            key={i ** 2 + j + 4}
              style={{
                gridArea: `${rowNumber} / ${columnNumber} / span 1 / span ${columnSpan}`,
              }}
              className={styles.modal_indiv_image_container}
            >
              {/* THREE JS MODEL GOES HERE */}
              {/* <iframe
                src={imageArray[imageIndex][3]}
                allow="xr-spatial-tracking"
                height="100%"
                width="100%"
                style={{ border: "none" }}
                loading="lazy"
              /> */}
              <ThreeDScene 
              glbRef={imageArray[imageIndex][4]}
              followMouse={false}
              cameraPosition={
                [0,3,5]
              }
              modelRotation={[
                0,
                Math.PI,
                0
              ]}

              initialPosition={[
                0,0,-2
              ]}
              enableRotateMouse={true}
              enableZoom={true}
              pathToBackground='/glb/immersive/bg-3d-model.webp'
              blurSrc={imageArray[imageIndex][1]}
            />
            </div>
          );
          break;
        case 2:
          columnNumber = 10;
          columnSpan = 3;
          memoizedComponents.push(
            <div
              key={i ** 2 + j + 50}
              style={{
                gridArea: `${rowNumber} / ${columnNumber} / span 1 / span ${columnSpan}`,
              }}
              className={styles.modal_qr_container}
            >
              <div
                className={styles.modal_inner}
              >
                <div className={styles.modal_qr_inner_container}>
                  <Image
                    src={imageArray[imageIndex][2]}
                    alt=""
                    className={styles.modal_qr_image}
                  />
                </div>

                <div className={styles.modal_qr_content}>
                  Scan this QR Code with your phone to view the object in your
                  space. The experience launches directly from your browser
                </div>
              </div>
            </div>
          );
          rowNumber++;
          break;
        default:
          break;
      }
    }

    // CHeck if iFrame or image

    imageIndex = imageIndex + 1 >= imageArray.length ? 0 : imageIndex + 1;
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

export default ARModalImageContainer;
