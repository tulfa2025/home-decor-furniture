"use client";
import styles from "./friends.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";
import Image from "next/image";

import fauxTreeSetting from '../../../assets/images/immersive/Main.png'

const FriendsSofa: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="See It In Your Space"
      paragraph="Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis tristique amet. Elementum laoreet aenean quam phasellus imperdiet. "
      dynamicHeader={false}
      bannerType="default"
      zIndex={zIndex}
    >
      <div className={styles.int_container}>
        <Image src={fauxTreeSetting} alt="" className={styles.int} />
      </div>
    </LargeSlideContainer>
  );
};

export default FriendsSofa;
