"use client";
import styles from "./Workflow.module.scss";
import Image from "next/image";
/* CUSTOM COMPONENTS */
/* CUSTOM HOOKS */
/* CONTEXT */
import MiscDemoTemplate from "@/components/layout_templates/misc_content_demo/MiscDemoTemplate";
import workflow from '../../../assets/images/immersive/workflow.png'

const Workflow = ({
  zIndex = 0,
  layoutName
}) => {

  return (
    <MiscDemoTemplate zIndex={zIndex} layoutName={layoutName}>
      <Image
        className={styles.image}
        src={workflow}
        alt=''
      >

      </Image>
    </MiscDemoTemplate>
  );
};

export default Workflow;
