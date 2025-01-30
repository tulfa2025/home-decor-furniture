"use client";
import scrollTransformValues from "@/utils/scrollTransformValues";
import styles from "./config.module.scss";
import LargeSlideContainer from "@/components/large_slide_container/LargeSlideContainer";

const ProductConfig: React.FC<LayoutProps> = ({ layoutName, zIndex }) => {
  return (
    <LargeSlideContainer
      layoutName={layoutName}
      title="Product Configurator"
      paragraph="Lorem ipsum dolor sit amet consectetur. Nibh pulvinar ut quis sollicitudin etiam cursus tortor lorem. Lorem nunc facilisis tristique amet. Elementum laoreet aenean quam phasellus imperdiet. "
      dynamicHeader={false}
      bannerType="default"
      zIndex={zIndex}
      scrollMap={scrollTransformValues.productConfig}
    >
      <div className={styles.int_container}>
      {/* <iframe 
        src='https://xr.tulfa.com/p/7Zq7XSsg4sar6DGVoME6Tp/' 
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

export default ProductConfig;
