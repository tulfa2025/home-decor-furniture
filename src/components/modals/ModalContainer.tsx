"use client";
import { motion, AnimatePresence } from "framer-motion";
import styles from "./modal_container.module.scss";
import { useState, useEffect, useContext, useCallback } from "react";
import dynamic from "next/dynamic";
import SubheaderActiveContext from "@/context/subHeader";
import Toast from "./ShareToast";
import useWindowSize from "@/hooks/use_window_size";

/*  CUSTOM COMPONENTS */
import BlurredBackdrop from "../backdrops/Blur";
import TulfaCloseButton from "@/assets/icons/tulfa_close_button";
import ModalFilters from "./ModalSelector";
import ModalShareButton from "./ModalShareButton";
import ModalFiltersMobile from "./ModalFiltersMobile";
import FullscreenImageContainer from "../image_container/fullscreen_image_container/FullscreenImageContainer";

/* DYNAMICALLY LOADED HEAVY COMPONENTS */
const ModalImageContainer = dynamic(() => import("./ModalImageContainer"), {
  ssr: false,
});

const ModalImageContainerMobile = dynamic(
  () => import("./ModalImageContainerMobile"),
  {
    ssr: false,
  }
);

const FullScreenCarousel = dynamic(() => import("../carousel/fullscreen_carousel/FullScreenCarousel"), {
  ssr: false,
});

const ModalContainer = ({
  ref,
  handleModalClose,
  isModalOpen,
  imageSet,
  selectionArray,
  differentSizes = false,
  random = false,
  filter = "",
  urlLink = "",
}) => {
  const viewportSize = useWindowSize();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [appliedFilter, setAppliedFilter] = useState("all");

  const handleSelectedIndex = (selectedIndex: number) => {
    setSelectedIndex(selectedIndex);
    
  };

  useEffect(()=>{

    if(isModalOpen && selectionArray.length > 0){
      setAppliedFilter(selectionArray[selectedIndex].toLowerCase());
    }
  }, [selectedIndex])

  useEffect(() => {
    if (selectionArray.length > 0 && filter) {
      const index = selectionArray.findIndex((selection: string) => {
        if (selection.toLowerCase() === filter) {
          return true;
        }
      });

      if (index >= 0) {
        setSelectedIndex(index);
      }
    }
  }, [filter]);

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

  /* FULSCREEN TRIGGER */
  const [isFullScreen, setIsFullScreen ] = useState(false);
  const [fullscreenIndex, setFullscreenIndex] = useState(0)
  const handleFullscreenToggle = useCallback((imageIndex: number)=>{
    setIsFullScreen(prev=>!prev)
    setFullscreenIndex(imageIndex)
  }, [fullscreenIndex])

  console.log('Modal re rendered')

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
              <div className={styles.closeup_modal_header}>
                {/* HEADER IMAGE CONTAINER */}
                <div className={styles.closeup_modal_header_image}>
                  <FullscreenImageContainer
                    imageSrc={imageSet.background}
                    imageStyle={{
                      height: "100%",
                      width: "100%",
                      objectFit: "cover",
                      borderTopLeftRadius: 23,
                      borderTopRightRadius: 23,
                    }}
                    alt=""
                    imageClassName=""
                    fullscreenToggle={false}
                    blur={true}
                  />

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
                      appliedFilter={appliedFilter}
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
                      height={40}
                      width={40}
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
                </div>

                {/* CALLOUT ? OPTIONS CONTAINER */}
                <div className={styles.closeup_modal_header_banner}>
                  {selectionArray.length > 0 &&
                    (viewportSize.width > 768 ? (
                      <ModalFilters
                        selectionArray={selectionArray}
                        selectedIndex={selectedIndex}
                        handleSelectedIndex={handleSelectedIndex}
                        filter={filter}
                      />
                    ) : (
                      <></>
                    ))}
                </div>

                {/*Image Container */}
                {isModalOpen && viewportSize.width > 768 ? (
                  <ModalImageContainer
                    
                    imageSet={
                      selectionArray.length > 0 && appliedFilter !== "all"
                        ? imageSet[appliedFilter]
                        : imageSet
                    }
                    differentSizes={differentSizes}
                    random={random}
                    allImages={
                      selectionArray.length > 0 && appliedFilter !== "all"
                        ? false
                        : true
                    }
                    isFilter={selectionArray.length > 0 ? true : false}
                    handleFullscreenToggle={handleFullscreenToggle}
                  />
                ) : (
                  <ModalImageContainerMobile
                    imageSet={
                      selectionArray.length > 0 && appliedFilter !== "all"
                        ? imageSet[appliedFilter]
                        : imageSet
                    }
                    differentSizes={differentSizes}
                    random={random}
                    allImages={
                      selectionArray.length > 0 && appliedFilter !== "all"
                        ? false
                        : true
                    }
                    isFilter={selectionArray.length > 0 ? true : false}
                    handleFullscreenToggle={handleFullscreenToggle}
                  />
                )}
              </div>
            </div>
            {/* MOBILE FILTER */}
            {selectionArray.length > 0 &&
              (viewportSize.width < 768 ? (
                <ModalFiltersMobile
                  selectionArray={selectionArray}
                  selectedIndex={selectedIndex}
                  handleSelectedIndex={handleSelectedIndex}
                  filter={filter}
                />
              ) : (
                <></>
              ))}
          </motion.div>
        </div>
      </AnimatePresence>

      {/* Fullscreen carousel */}
      {
        isFullScreen ? 
        <FullScreenCarousel
          fullscreenIndex={fullscreenIndex}
          imageSet={imageSet}
          appliedFilter={appliedFilter}
          handleFullscreenToggle={handleFullscreenToggle }

        >

        </FullScreenCarousel> : <></>
      }
    </>
  );
};

export default ModalContainer;
