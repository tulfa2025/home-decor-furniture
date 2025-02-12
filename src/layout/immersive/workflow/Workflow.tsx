"use client";
import styles from "./Workflow.module.scss";
import Image from "next/image";
/* CUSTOM COMPONENTS */
/* CUSTOM HOOKS */
/* CONTEXT */
import MiscDemoTemplate from "@/components/layout_templates/misc_content_demo/MiscDemoTemplate";
import workflow from "../../../assets/images/immersive/tulfa-process.png";
import scrollTransformValues from "@/utils/scrollTransformValues";
import DeviceContext from "@/context/deviceContext";
import { useContext } from "react";

const Workflow = ({ zIndex = 0, layoutName }) => {
  const deviceContext = useContext(DeviceContext);
  return (
    <MiscDemoTemplate
      zIndex={zIndex}
      layoutName={layoutName}
      scrollMap={scrollTransformValues.workflow}
    >
      <div className={styles.image_container}>
        <Image
          className={styles.image}
          src={workflow}
          alt=""
          quality={deviceContext === "Other" ? 50 : 10}
        ></Image>
      </div>
    </MiscDemoTemplate>
  );
};

export default Workflow;
