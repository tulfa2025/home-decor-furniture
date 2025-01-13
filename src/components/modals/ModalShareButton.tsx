"use client";
import TulfaShareButton from "@/assets/icons/tulfa_share_icon";
import styles from "./modal_container.module.scss";
import { motion } from "framer-motion";
import { useState } from "react";
import {
  FBButton,
  IGButton,
  WhatsButton,
  LinkedButton,
  XButton,
  MessengerButton,
  LinkButton,
} from "@/assets/icons/social/SocialMedia";
import useWindowSize from "@/hooks/use_window_size";


const ModalShareButton = ({urlLink, handleIsToastOpen, appliedFilter}) => {
  const viewportSize = useWindowSize();

  let BUTTONSIZE;

  if (viewportSize.width > 960) {
    BUTTONSIZE = 40;
  } else if (viewportSize.width > 768) {
    BUTTONSIZE = 35;
  } else if (viewportSize.width > 300) {
    BUTTONSIZE = 30;
  }

  const [isOptionsActive, setIsOptionsActive] = useState(false);

  const shareData = {
    title: "Tulfa, Inc - Home, Decor, & Furniture.",
    text: "",
    url: urlLink,
  };

  const handleOnClick = async () => {
    if (navigator?.share && viewportSize.maxWidth < 960) {
      try {
        await navigator.share(shareData);
        /* ON SUCCESS HANDLER */
      } catch (err) {
        /* ON ERROR HANDLER */
        setIsOptionsActive((prev) => !prev);
        console.log(err);
      }
    } else {
      setIsOptionsActive((prev) => !prev);
    }
  };

  const handleCopyLink = async() => {
    if (viewportSize.maxWidth > 960) {
      try {
        /* ON SUCCESS HANDLER */
        handleIsToastOpen(true)
        await navigator.clipboard.writeText(`${urlLink}&filter=${appliedFilter}`);
        
      } catch (err) {
        /* ON ERROR HANDLER */
        console.log(err);
      }
    }
  };

  return (
    <div className={styles.share_container}>
      <motion.div
        className={styles.media_icons_container}
        animate={{
          opacity: isOptionsActive ? 1 : 0,
        }}
      >
        <h3 className={styles.share_header}>Share</h3>

        <motion.div 
          className={styles.media_icon_container_inner}
          animate={{
            display: isOptionsActive  ? 'flex' : 'none',
            pointerEvents: 'auto'
          }}
        >
          <LinkButton
            width={BUTTONSIZE}
            height={BUTTONSIZE}
            onClick={handleCopyLink}
          />
          <FBButton
            width={BUTTONSIZE}
            height={BUTTONSIZE}
            onClick={handleCopyLink}
          />
          {/* <MessengerButton
                        width={BUTTONSIZE}
                        height={BUTTONSIZE}
                    /> */}
          <IGButton
            width={BUTTONSIZE}
            height={BUTTONSIZE}
            onClick={handleCopyLink}
          />
          <LinkedButton
            width={BUTTONSIZE}
            height={BUTTONSIZE}
            onClick={handleCopyLink}
          />
          <XButton
            width={BUTTONSIZE}
            height={BUTTONSIZE}
            onClick={handleCopyLink}
          />
        </motion.div>
      </motion.div>
      <motion.div
        className={styles.share_button_container}
      >
        <TulfaShareButton
          height={40}
          width={40}
          handleClick={handleOnClick}
          fill={isOptionsActive ? "#433E99" : "none"}
        />
      </motion.div>
    </div>
  );
};

export default ModalShareButton;
