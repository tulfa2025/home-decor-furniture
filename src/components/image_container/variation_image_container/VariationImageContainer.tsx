"use client";
import Image from "next/image";
import { memo, useRef, useState } from "react";
import styles from "./variation_image_container.module.scss";
import { motion } from "framer-motion";

const VariationImageContainer = memo(
  ({
    imageSrc,
    imageStyles,
    imageClassName,
    hoverImageSrc,
    blur = false,
    quality = 75,
  }) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    return (
      <>
        <motion.div
          ref={elementRef}
          style={{
            ...imageStyles,
            opacity: isHovered && hoverImageSrc ? 0 : 1,
            transition: "opacity 0.2s ease-in",
          }}
          className={`${imageClassName} ${styles.indiv_image}`}
          onMouseEnter={() => {
            if (!hoverImageSrc) return;
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            if (!hoverImageSrc) return;
            setIsHovered(false);
          }}
        >
          <Image
          style={{
            ...imageStyles
          }}
            src={imageSrc}
            alt=""
            className={`
              ${styles.indiv_image} 
              ${imageClassName}
            `}
            placeholder={blur ? "blur" : undefined}
            quality={quality}
          />
        </motion.div>

        {/* If alternative image */}
        {hoverImageSrc ? (
          <Image
            src={hoverImageSrc}
            alt=""
            style={{
              ...imageStyles,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.2s ease-out",
            }}
            className={`${imageClassName} ${styles.indiv_image_hover}`}
            placeholder={blur ? "blur" : undefined}
            quality={quality}
          />
        ) : null}
      </>
    );
  }
);

VariationImageContainer.displayName = "variation image container";

export default VariationImageContainer;
