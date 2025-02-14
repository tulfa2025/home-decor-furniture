"use client";
import styles from "./InstallationImages.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import { motion } from "framer-motion";
import Image from "next/image";

import useWindowSize from "@/hooks/use_window_size";
import { useContext, useRef } from "react";
import DeviceContext from "@/context/deviceContext";
import useInView from "@/hooks/use_inview";

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

  const deviceContext = useContext(DeviceContext);


  return (
    <>
      <LargeSlideContainer
        layoutName={layoutName}
        title="Installation Images"
        paragraph="Guide your customers with clear, step-by-step images for assembling and setting up the furniture."
        zIndex={zIndex}
      >
        <motion.div
          className={styles.image_container}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          exit={{
            opacity: 0,
            transition:{
              delay: 1,
              duration: 0.5
            }
          }}
          transition={{
            duration: 0.25,
            delay: 0.25
          }}
        >
          <Image
            alt=""
            src="/images/installation_images/6.webp"
            style={{
              ...image_container_style,
            }}
            quality={deviceContext === "Other" ? 50 : 1}
            width={3840}
            height={2560}
          />
          <Image
            alt=""
            src="/images/installation_images/5.webp"
            style={{
              ...image_container_style,
            }}
            quality={deviceContext === "Other" ? 50 : 1}
            width={3840}
            height={2560}
          />
          <Image
            alt=""
            src="/images/installation_images/2.webp"
            style={{
              ...image_container_style,
            }}
            quality={deviceContext === "Other" ? 50 : 1}
            width={3840}
            height={2560}
          />
          <Image
            alt=""
            src="/images/installation_images/3.webp"
            style={{
              ...image_container_style,
            }}
            quality={deviceContext === "Other" ? 50 : 1}
            width={3840}
            height={2560}
          />

          {viewportSize.width > 768 ? (
            <>
              <Image
                alt=""
                src="/images/installation_images/4.webp"
                style={{
                  ...image_container_style,
                }}
                quality={deviceContext === "Other" ? 50 : 1}
                width={3840}
                height={2560}
              />
              <Image
                alt=""
                src="/images/installation_images/1.webp"
                style={{
                  ...image_container_style,
                }}
                quality={deviceContext === "Other" ? 50 : 1}
                width={3840}
                height={2560}
              />
            </>
          ) : null}
        </motion.div>
      </LargeSlideContainer>
    </>
  );
};

export default InstallationImages;
