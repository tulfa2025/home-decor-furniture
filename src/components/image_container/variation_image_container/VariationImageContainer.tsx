"use client";
import Image from "next/image";
import { memo, useContext, useEffect, useRef, useState } from "react";
import styles from "./variation_image_container.module.scss";
import { motion } from "framer-motion";
import DeviceContext from "@/context/deviceContext";

const VariationImageContainer = memo(
  ({
    imageSrc, // MainIMage, blurred, des, hover, hover blurred
    imageStyles,
    imageClassName,
    blur = false,
    quality = 75,
  }) => {
    const elementRef = useRef<HTMLDivElement | null>(null);
    const [isHovered, setIsHovered] = useState(false);

    const deviceContext = useContext(DeviceContext);

    // Cleanup
    useEffect(() => {
      return () => {
        if (elementRef.current) {
          elementRef.current = null;
        }
      };
    }, []);

    return (
      <>
        <motion.div
          ref={elementRef}
          style={{
            ...imageStyles,
            opacity: isHovered && imageSrc[3] ? 0 : 1,
            transition: "opacity 0.2s ease-in",
          }}
          className={`${imageClassName} ${styles.indiv_image}`}
          onMouseEnter={() => {
            if (!imageSrc[3]) return;
            if (deviceContext !== "Other") return;
            setIsHovered(true);
          }}
          onMouseLeave={() => {
            if (!imageSrc[3]) return;
            if (deviceContext !== "Other") return;
            setIsHovered(false);
          }}
        >
          <Image
            style={{
              ...imageStyles,
            }}
            src={imageSrc[0]}
            alt=""
            className={`
              ${styles.indiv_image} 
              ${imageClassName}
            `}
            placeholder={blur ? "blur" : undefined}
            quality={quality}
            blurDataURL={imageSrc[1]}
          />
        </motion.div>

        {/* If alternative image */}
        {imageSrc[3] && deviceContext === "Other" ? (
          <Image
            src={imageSrc[3]}
            alt=""
            style={{
              ...imageStyles,
              opacity: isHovered ? 1 : 0,
              transition: "opacity 0.2s ease-out",
            }}
            className={`${imageClassName} ${styles.indiv_image_hover}`}
            placeholder={blur ? "blur" : undefined}
            quality={quality}
            blurDataURL={imageSrc[4]}
          />
        ) : null}
      </>
    );
  }
);

VariationImageContainer.displayName = "variation image container";

export default VariationImageContainer;
