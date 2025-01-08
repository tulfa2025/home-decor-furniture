import styles from './title_banner.module.scss'

/* CUSTOM COMPONENTS */
import CallOut from '../call_out/CallOut';

const TitleBanner = ({
    title,
    paragraph
}) => {
  return (
    
      <div className={styles.large_slide_inner_container}>
        <CallOut
          heading={title}
          calloutStyleType={1}
          paragraph={paragraph}
          modifier="mw-623"
          overrideStyles={styles.callout_container}
          overrideParagraphStyle={styles.callout_paragraph}
          overrideHeaderStyle={styles.callout_header}
        />
      </div>
  );
};

export default TitleBanner
