"use client";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./ar_modal_container.module.scss";
import { useState, useEffect, useContext, useCallback } from "react";
import dynamic from "next/dynamic";
import SubheaderActiveContext from "@/context/subHeader";
import Toast from "../components/ShareToast";
import useWindowSize from "@/hooks/use_window_size";

/*  CUSTOM COMPONENTS */
import BlurredBackdrop from "../../backdrops/Blur";
import TulfaCloseButton from "@/assets/icons/tulfa_close_button";
import ModalShareButton from "../components/ModalShareButton";
import TitleBanner from "@/components/title_banner/title_banner";

/* DYNAMICALLY LOADED HEAVY COMPONENTS */
const ARModalImageContainer = dynamic(
  () => import("./ARModalImageContainer"),
  {
    ssr: false,
  }
);

const ARModalImageContainerMobile = dynamic(
  () => import("./ARModalImageContainerMobile"),
  {
    ssr: false,
  }
);
const ARModalContainer = ({
  ref,
  handleModalClose,
  isModalOpen,
  imageSet,
  urlLink = "",
}) => {
  const viewportSize = useWindowSize();


  const [isActive, setIsActive] = useContext(SubheaderActiveContext);

  useEffect(() => {
    if (isModalOpen) {
      setIsActive(false);
    } else {
      setIsActive(true);
    }
  }, [isModalOpen]);

  const [isToastOpen, setIsToastOpen] = useState(false);

  const handleIsToastOpen = (state) => {
    setIsToastOpen(state);
  };

  

  return (
    <>
      <AnimatePresence initial={true}>
        <div
          style={{
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            height: "100vh",
            width: "100vw",
            position: "absolute",
            top: 0,
            left: 0,
            pointerEvents: "auto",
          }}
          className="modal_container"
        >
          <motion.div
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: isModalOpen ? 1 : 0,
            }}
            exit={{
              opacity: 0,
              transition: {
                delay: 0,
              },
            }}
            className={styles.blur_backdrop}
          >
            <BlurredBackdrop
              onClick={() => {
                handleModalClose();
                setIsActive(true);
              }}
            />
          </motion.div>

          <motion.div
            className={`${styles.closeup_modal} ${
              isModalOpen ? "disable_global_scroll" : ""
            }`}
            initial={{
              opacity: 0,
              y: "100vh",
            }}
            animate={{
              opacity: isModalOpen ? 1 : 0,
              y: isModalOpen ? 0 : "100vh",
            }}
            transition={{
              duration: 1,
            }}
            exit={{
              opacity: 0,
              y: "100vh",
            }}
            ref={ref}
          >
            <div className={`${styles.closeup_card}  scroll_container`}>
              {/* CONTENT CONTAINER */}
              <div className={styles.closeup_modal_content}>
                {/* HEADER CONTAINER */}

                <div
                  className={styles.header_container}
                >
                  <TitleBanner 
                    title='AR View'
                    paragraph='Lorem ipsum dolor sit amet consectetur. Ut iaculis nisl in sit sodales tortor. Purus amet augue pellentesque dui volutpat amet at.'
                    bannerType='default'
                  />

                </div>

                {/* BUTTONS */}
                <motion.div
                  className={styles.modal_share_container}
                  animate={{
                    opacity: isModalOpen ? 1 : 0,
                  }}
                  transition={{
                    delay: 2,
                  }}
                >
                  <ModalShareButton
                    urlLink={urlLink}
                    appliedFilter={''}
                    handleIsToastOpen={handleIsToastOpen}
                  />

                  {isToastOpen && (
                    <Toast
                      onClose={handleIsToastOpen}
                      isToastOpen={isToastOpen}
                    />
                  )}
                </motion.div>

                <motion.div
                  initial={{
                    opacity: 0,
                    y: "100vh",
                  }}
                  animate={{
                    opacity: isModalOpen ? 1 : 0,
                    y: 0,

                    transition: {
                      duration: 1,
                      delay: isModalOpen ? 1 : 0,
                      opacity: {
                        duration: 0.5,
                        delay: isModalOpen ? 1.5 : 0,
                      },
                      y: { duration: 1 },
                    },
                  }}
                  exit={{
                    opacity: 0,
                    transition: {
                      opacity: { duration: 0.1 },
                      y: { duration: 0.1 },
                    },
                  }}
                  className={styles.exit_button_container}
                >
                  <TulfaCloseButton
                    height={42}
                    width={42}
                    onClick={() => {
                      handleModalClose();
                      setIsActive(true);
                    }}
                    className={styles.closeup_exit_button}
                    fill="#666666"
                    style={{
                      opacity: 0.6,
                    }}
                  />
                </motion.div>

                {/*Image Container */}
                {isModalOpen && viewportSize.width > 768 ? (
                  <ARModalImageContainer
                    imageSet={imageSet['top']}
                  />
                ) : (
                  <ARModalImageContainerMobile
                    imageSet={imageSet['top']}
                  />
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </AnimatePresence>
    </>
  );
};

export default ARModalContainer;
