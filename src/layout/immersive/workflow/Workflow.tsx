"use client";
import styles from "./Workflow.module.scss";
import Image from "next/image";
/* CUSTOM COMPONENTS */
/* CUSTOM HOOKS */
/* CONTEXT */
import MiscDemoTemplate from "@/components/layout_templates/misc_content_demo/MiscDemoTemplate";
import scrollTransformValues from "@/utils/scrollTransformValues";
import DeviceContext from "@/context/deviceContext";
import { useContext, useRef } from "react";
import { motion } from "framer-motion";
import useInView from "@/hooks/use_inview";

const Workflow = ({ zIndex = 0, layoutName }) => {
  const deviceContext = useContext(DeviceContext);
  const inViewRef = useRef(null);
  const isInView = useInView(inViewRef, 0.05);
  return (
    <MiscDemoTemplate
      zIndex={zIndex}
      layoutName={layoutName}
      scrollMap={scrollTransformValues.workflow}
    >
      <div ref={inViewRef} className={styles.inview_trigger}></div>
      {isInView && (
        <motion.div
          className={styles.image_container}
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
        >
          <Image
            className={styles.image}
            src="/images/immersive/tulfa-process.png"
            alt=""
            quality={deviceContext === "Other" ? 50 : 10}
            height={2400}
            width={3000}
          ></Image>
        </motion.div>
      )}
    </MiscDemoTemplate>
  );
};

export default Workflow;
