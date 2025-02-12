"use client";
import styles from "./devices.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import Image from "next/image";

import fauxTreeSetting from '../../../assets/images/immersive/device_lineup.png'
import scrollTransformValues from "@/utils/scrollTransformValues";
import DeviceContext from "@/context/deviceContext";
import { useContext } from "react";

const Devices: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  const deviceContext = useContext(DeviceContext)
  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Lorem ipsum dolor sit"
      paragraph="Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis tristique amet. Elementum laoreet aenean quam phasellus imperdiet. "
      dynamicHeader={false}
      bannerType="main-ie"
      zIndex={zIndex}
      scrollMap={scrollTransformValues.devices}
    >
      <div className={styles.int_container}>
        <Image 
        src={fauxTreeSetting} alt="" className={styles.int} 
        quality={deviceContext === 'Other' ? 50 : 10}/>
      </div>
    </LargeSlideContainer>
  );
};

export default Devices;
