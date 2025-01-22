'use client'
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

/* CUSTOM HOOKS */
import useGoTo from "@/hooks/use_goto";
import useWindowSize from "@/hooks/use_window_size";
import getDeviceType from '@/utils/getDeviceContext';

/* CUSTOM COMPONENTS */
import MenuPopup from "@/components/menu_popup/MenuPopup";
import SubHeader from "../sub_header/SubHeader";

/* CONTEXT */
import ScrollContext from "@/context/scrollContext";
import SubheaderActiveContext from "@/context/subHeader";
import SubheaderStyleContext from "@/context/subHeaderStyle";
import SlideContext from "@/context/changeSlide";
import DeviceContext from '@/context/deviceContext';
import toggleSpinner from '@/utils/toggle_spinner';

const PageTemplate = ({ children, layoutCollection, activePagePath }) => {
  /* HEADER STYLE */
  const [headerStyle, setHeaderStyle] = useState(2);

  /* SCROLL BLOCKING CONTROLS */
  const scrollingContainersRef = useRef([]);
  const handleIsScrollBlocked = (flag = false, elementRef = null) => {
    if (elementRef) {
      if (!flag) {
        // REMOVE TOPMOST SCROLLING ELEMENT
        scrollingContainersRef.current.shift();
        // setCurrentScrollTarget(scrollingContainersRef.current[0])
      } else {
        // ADD TOPMOST SCROLLING ELEMENT
        scrollingContainersRef.current.unshift(elementRef.current);
        // setCurrentScrollTarget(scrollingContainersRef.current[0])
      }
    }
  };

  /* CURRENT SLIDE CONTROLS */
  const [currentSlide, setCurrentSlide] = useState(0);

  // Times how long until actual current slide updates
  const currentSlideRef = useRef(null);

  /* IDENIFIES CURRENT SLIDE IN VIEW */
  const handleChangeSlide = (slideIndex: number) => {
    clearTimeout(currentSlideRef.current);
    setTimeout(() => {
      setCurrentSlide(slideIndex);
    }, 500);
  };

  const handleSubheaderActive = useState(true);
  const scrollContainerRef = useRef(null);

  /* GET WINDOW SIZE */
  const viewportSize = useWindowSize();

  /* SET SCROLL POSITIONS OF EACH SLIDE */
  const [scrollDetails, setScrollDetails] = useState({
    totalScrollHeight: 0,
    scrollPositions: [],
  });

  useEffect(() => {
    const scrollPositions = [];
    for (let i = 0; i < layoutCollection.order.length; i++) {
      const component = document.getElementById(`${i}`);
      scrollPositions.push(component?.offsetTop);
    }
    setScrollDetails({
      totalScrollHeight: scrollContainerRef.current.scrollHeight,
      scrollPositions: scrollPositions,
    });
  }, [viewportSize]);

  /* DETERMINE WHICH SLIDE TO LOAD FIRST */
  useGoTo(setCurrentSlide, scrollContainerRef, scrollDetails);


  /* DEVICE CONTEXT */
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    if (window) {
     
      setDeviceType(getDeviceType());

      
    }
  }, []);

  // Set any loading  spinner to norma
  useEffect(()=>{
    if(document){
      toggleSpinner(null)
    }
  }, [])

  return (
    <DeviceContext.Provider value={deviceType}>
    <SubheaderStyleContext.Provider value={[headerStyle, setHeaderStyle]}>
      <SubheaderActiveContext.Provider value={handleSubheaderActive}>
        <ScrollContext.Provider value={handleIsScrollBlocked}>
          <SubHeader activePage={activePagePath} />

          <motion.div
            style={{
              position: "relative",
              top: 0,
              left: 0,
              width: "100%",
              overflowX: "hidden",
              zIndex: 20,
            }}
            className="scroll-container"
            ref={scrollContainerRef}
          >
            <SlideContext.Provider value={handleChangeSlide}>
              {/* LAYOUT COLLECTION COMPONENTS GO HERE */}
              {children}
            </SlideContext.Provider>
            <MenuPopup
              layoutCollection={layoutCollection}
              scrollDetails={scrollDetails}
              scrollingContainersRef={scrollingContainersRef}
              currentSlide={currentSlide}
            />
          </motion.div>
        </ScrollContext.Provider>
      </SubheaderActiveContext.Provider>
    </SubheaderStyleContext.Provider>
    </DeviceContext.Provider>
  );
};

export default PageTemplate;
