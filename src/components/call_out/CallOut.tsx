import styles from "./CallOut.module.scss";
import { motion } from "framer-motion";

type CallOutProps =
  | {
      heading:
        | "Close Up Shots"
        | "Group Shots"
        | "Product Exploded View"
        | "Dimension Images"
        | "Installation Images"
        | "Flat Lay Images";
      paragraph?: never;
      modifier?: never;
      calloutStyleType?: 0 | 1;
      animationValues?: {};
    }
  | {
      paragraph: string;
      heading?: never;
      modifier?: keyof typeof styles;
      calloutStyleType?: 0 | 1;
      animationValues?: {};
    };

export default function CallOut({
  overrideStyles,
  heading,
  paragraph,
  modifier,
  calloutStyleType,
  animationValues,
  overrideHeaderStyle,
  overrideParagraphStyle,
}: CallOutProps) {
  let calloutStyle = "";
  switch (calloutStyleType) {
    case 0:
      calloutStyle = styles.callout_style_1;
      break;
    case 1:
      calloutStyle = styles.callout_style_2;
      break;
    case 2:
      calloutStyle = styles.callout_style_3;
      break;
    default:
      break;
  }

  return (
    <motion.div
      className={`${styles.call_container} ${calloutStyle} ${overrideStyles}`}
      style={{
        ...animationValues,
      }}
    >
      {heading && (
        <h3 className={`${styles.call_heading} ${overrideHeaderStyle}`}>
          {heading}
        </h3>
      )}
      {paragraph && (
        <p
          className={`${styles.call_paragraph} ${overrideParagraphStyle} ${
            modifier ? styles[modifier] : ""
          } 
          `}
        >
          {paragraph}
        </p>
      )}
    </motion.div>
  );
}
