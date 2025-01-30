"use client";
import styles from "./devices.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import Image from "next/image";

import fauxTreeSetting from '../../../assets/images/immersive/device_lineup.png'
import scrollTransformValues from "@/utils/scrollTransformValues";

const Devices: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Lorem ipsum dolor sit"
      paragraph="Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis tristique amet. Elementum laoreet aenean quam phasellus imperdiet. "
      dynamicHeader={false}
      bannerType="main-ie"
      zIndex={zIndex}
      scrollMap={scrollTransformValues.devices}
      backgroundStyles={{
        background: 'transparent'
      }}
    >
      <div className={styles.int_container}>
        <Image src={fauxTreeSetting} alt="" className={styles.int} />
      </div>
    </LargeSlideContainer>
  );
};

export default Devices;
