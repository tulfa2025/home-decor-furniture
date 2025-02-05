"use client";
import styles from "./ar_modal_container.module.scss";
import { memo, useEffect, useRef } from "react";
import Image from "next/image";
import Button from "@/components/button/Button";

const ARModalImageContainerMobile = memo(({ imageSet }) => {
  /* ARRAY OF IMAGES TO RENDER */
  let imageArray = [];
  /* DETERMINE NUMBER OF IMAGES TO RENDER */
  let imageNo;

  // Log timeouts  for each element
  const timeoutRefs = useRef({});
  // IntersectionObserver callback function
  const handleIntersection = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const iframeWrapper: Element = entry.target;

        // Clear timeout
        clearTimeout(timeoutRefs[iframeWrapper.id]);

        // Set new timeout
        timeoutRefs[iframeWrapper.id] = setTimeout(() => {
          const newIframe = iframeWrapper.querySelector("iframe");

          newIframe.style.display = "block";
          observer.unobserve(iframeWrapper); // Stop observing once loaded
        }, 700);
      }
    });
  };

  useEffect(() => {
    let observer = null;
    setTimeout(() => {
      const iframes = document.querySelectorAll(".ar-wrapper"); // Get all iframe elements
      // Create an IntersectionObserver to monitor iframe visibility
      observer = new IntersectionObserver(handleIntersection, {
        threshold: 0.75, // Adjust this threshold as needed (e.g., 25% visible to trigger loading)
      });
      iframes.forEach((iframe) => {
        observer.observe(iframe); // Start observing each iframe
      });
    }, 500);

    return () => {
      // Clean up observer when component unmounts
      if (observer) observer.disconnect();
    };
  }, []);

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
              <Image src={imageArray[i][j]} alt="" quality={1}/>
            </div>
          );
          break;
        case 1:
          break;
        case 2:
          break;
        case 3:
          memoizedComponents.push(
            <div
              key={i ** 2 + j}
              className={`${styles.modal_ar_container} ar-wrapper`}
            >
              <iframe
                src={imageArray[i][j]}
                allow="xr-spatial-tracking"
                height="100%"
                width="100%"
                style={{ border: "none", display: "none" }}
                loading="lazy"
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
    <div className={styles.modal_image_container_mobile} id="ar_container">
      {memoizedComponents}
    </div>
  );
});

ARModalImageContainerMobile.displayName = "ARModalImageContainerMobile";

export default ARModalImageContainerMobile;
