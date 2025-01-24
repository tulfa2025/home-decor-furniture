'use client'
/* CUSTOM COMPONENTS */
import CallOut from "../call_out/CallOut";
import styles from "./title_banner.module.scss";



const TitleBanner = ({ title, paragraph, bannerType }) => {
  let Callout: JSX.Element = <></>;

  switch (bannerType) {
    case "default":
      Callout = (
        <CallOut
          heading={title}
          calloutStyleType={1}
          paragraph={paragraph}
          modifier="mw-623"
          overrideStyles={styles.callout_container}
          overrideParagraphStyle={styles.callout_paragraph}
          overrideHeaderStyle={styles.callout_header}
        />
      );
      break;
    case 'main':
      Callout = (
        <CallOut
          heading={title}
          calloutStyleType={1}
          paragraph={paragraph}
          overrideStyles={styles.callout_container_main}
          overrideParagraphStyle={styles.callout_paragraph_main}
          overrideHeaderStyle={styles.callout_header_main}
        />
      );
      break
    default: 
      break
  }

  return (
    <div className={styles.large_slide_inner_container}>
      {Callout}
    </div>
  );
};

export default TitleBanner;
