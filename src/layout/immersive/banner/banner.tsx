"use client";
import scrollTransformValues from "@/utils/scrollTransformValues";
import styles from "./banner.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";

const Banner: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Immersive Experience"
      paragraph="Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis tristique amet. Elementum laoreet aenean quam phasellus imperdiet. "
      dynamicHeader={false}
      bannerType="main-ie"
      zIndex={zIndex}
      scrollMap={scrollTransformValues.immersive}
      backgroundStyle={{
        backgroundColor: 'transparent'
      }}
    >
      <div className={styles.int_container}>
      {/* <iframe 
        src='https://app.vectary.com/p/20tEclig6faVL7mlvKkfLJ' 
        allow="xr-spatial-tracking"
        height='100%'
        width='100%'
        style={{ border: 'none' }}
      /> */}
      <div
      style={{
        backgroundColor: 'black',
        height: '100%',
        width: '100%'
      }}>

      </div>
      </div>
    </LargeSlideContainer>
  );
};

export default Banner;
