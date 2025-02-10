import { FaPlus } from "react-icons/fa";
import { LuExpand } from "react-icons/lu";
import { ReactElement, useRef } from "react";
import BasicArrow from "@/assets/icons/BasicArrow";
import { TulfaRightArrow } from "@/assets/icons/tulfa_nav_arrows";

import styles from "./Button.module.scss";

type ButtonProps = {
  text: "Take a closer look" | "Book a Demo";
  modifier: keyof typeof styles;
  buttonType?: number;
  onClick: () => void;
  containerStyles?: {};
  externalLink?: string;
};

export default function Button({
  text,
  modifier,
  buttonType,
  onClick,
  containerStyles,
  externalLink,
}: ButtonProps) {
  let CustomButton: ReactElement;

  switch (buttonType) {
    case 1:
      CustomButton = (
        <ButtonOne
          text={text}
          modifier={modifier}
          onClick={onClick}
          externalLink={externalLink}
        />
      );
      break;
    case 2:
      CustomButton = (
        <ButtonTwo
          text={text}
          modifier={modifier}
          onClick={onClick}
          externalLink={externalLink}
        />
      );
      break;

    case 3:
      CustomButton = (
        <ButtonThree
          text={text}
          modifier={modifier}
          onClick={onClick}
          externalLink={externalLink}
          version={1}
        />
      );
      break;
    case 4:
      CustomButton = (
        <ButtonThree
          text={text}
          modifier={modifier}
          onClick={onClick}
          externalLink={externalLink}
          version={2}
        />
      );
      break;
    case 5:
      CustomButton = (
        <ButtonThree
          text={text}
          modifier={modifier}
          onClick={onClick}
          externalLink={externalLink}
          version={1}
          arrow={false}
        />
      );
      break;
    default:
      break;
  }

  return (
    <div style={containerStyles} className="trigger_header_button">
      {CustomButton}
    </div>
  );
}

function ButtonOne({ text, modifier, onClick, externalLink }: ButtonProps) {
  // Toggle hover - prevent re renders
  const buttonRef = useRef(null);
  return (
    <button
      ref={buttonRef}
      className={`${styles.button_one_container} ${styles[modifier]}`}
      onClick={onClick}
    >
      <span className={styles.pop_span}>
        {externalLink ? (
          <a href="https://www.tulfa.com/contact-us">{text}</a>
        ) : (
          text
        )}
      </span>
      <div className={styles.pop_circle}>
        <LuExpand className={styles.pop_circle_icon} />
      </div>
    </button>
  );
}

function ButtonTwo({ text, modifier, onClick, externalLink }: ButtonProps) {
  // Toggle hover - prevent re renders
  const buttonRef = useRef(null);
  return (
    <button
      ref={buttonRef}
      className={`${styles.button_two_container} ${styles[modifier]}`}
      onClick={onClick}
      onMouseEnter={() => {
        buttonRef.current.classList.add(`${styles.button_two_hovered}`);
      }}
      onMouseLeave={() => {
        buttonRef.current.classList.remove(`${styles.button_two_hovered}`);
      }}
    >
      <FaPlus className={styles.button_icon} />
      {externalLink ? (
        <a href="https://www.tulfa.com/contact-us">{text}</a>
      ) : (
        text
      )}
    </button>
  );
}

function ButtonThree({
  text,
  modifier,
  onClick,
  externalLink,
  version,
  arrow=true
}: ButtonProps) {
  // Toggle hover - prevent re renders
  const buttonRef = useRef(null);

  let buttonStyle = "";
  let arrowFill = "";
  let arrowColor = "";

  switch (version) {
    case 1:
      buttonStyle = styles.button_three_container_ver_1;
      arrowFill = "none";

      arrowColor = "white";
      break;
    case 2:
      buttonStyle = styles.button_three_container_ver_2;
      arrowFill = "none";
      arrowColor = "white";
      break;
    default:
      break;
  }
  return (
    <button
      ref={buttonRef}
      className={`${buttonStyle} ${styles[modifier]}`}
      onClick={onClick}
    >
      <span className={styles.pop_span}>
        {externalLink ? (
          <a href="https://www.tulfa.com/contact-us">{text}</a>
        ) : (
          text
        )}
      </span>
      {arrow &&<TulfaRightArrow
        height={32}
        width={32}
        arrowFill={arrowFill}
        arrowColor={arrowColor}
      />}
    </button>
  );
}
