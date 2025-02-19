"use client";
import Link from "next/link";
import styles from "./SubHeader.module.scss";
import TulfaSubheaderStyleOne from "@/assets/icons/tulfa_icon_1";
import TulfaSubheaderStyleTwo from "@/assets/icons/tulfa_icon_2";
import { AnimatePresence, motion } from "framer-motion";
import { useRef, useState, useContext, useEffect } from "react";
import useWindowSize from "@/hooks/use_window_size";
import { TulfaDownArrow } from "@/assets/icons/tulfa_nav_arrows";

import SubheaderActiveContext from "@/context/subHeader";
import SubheaderStyleContext from "@/context/subHeaderStyle";

type SubHeaderProps = {
  activePage:
    | "/"
    | "/"
    | "/immersive_experience"
    | "/case_studies"
    | "/faqs";
};

export default function SubHeader({ activePage }: SubHeaderProps) {
  const navLinks = [
    { href: "/", label: "Product Images" },
    { href: "/product_videos", label: "Product Videos" },
    { href: "/immersive_experience", label: "Immersive Experience" },
  ];

  const [headerStyleType, setHeaderStyle] = useContext(SubheaderStyleContext);

  let headerStyle = "";
  let headerFontColor = "";
  let headerLinkActivated = "";
  let headerLinkDisabled = "";
  let TulfaIcon: JSX.Element = "";
  let arrowFill = "";
  let headerDropdownBar = "";
  let arrowColor: "";

  switch (headerStyleType) {
    case 0:
      headerStyle = styles.subheader_style_1;
      headerFontColor = styles.subheader_font_color_1;
      headerLinkActivated = styles.subheader_nav_activated_1;
      headerLinkDisabled = styles.subheader_nav_disabled_1;
      headerDropdownBar = styles.dropdown_bar_1;
      TulfaIcon = TulfaSubheaderStyleOne;
      arrowFill = "transparent";
      arrowColor = "#2A266A";

      break;
    case 1:
      headerStyle = styles.subheader_style_2;
      headerFontColor = styles.subheader_font_color_2;
      headerLinkActivated = styles.subheader_nav_activated_2;
      headerLinkDisabled = styles.subheader_nav_disabled_2;
      TulfaIcon = TulfaSubheaderStyleTwo;
      break;
    case 2:
      headerStyle = styles.subheader_style_3;
      headerFontColor = styles.subheader_font_color_1;
      headerLinkActivated = styles.subheader_nav_activated_2;
      headerLinkDisabled = styles.subheader_nav_disabled_2;
      headerDropdownBar = styles.dropdown_bar_2;
      TulfaIcon = TulfaSubheaderStyleTwo;
      arrowFill = "transparent";
      arrowColor = "white";
      break;
    default:
      break;
  }

  /* SCROLLING */
  const headerRef = useRef(null);
  /* DEVICE SIZE  */
  const viewportSize = useWindowSize();

  /* Is dropdownactivated */
  const [headerActivated, setHeaderActivated] = useState(false);

  /* Is header visible */
  const [isActive, setIsActive] = useContext(SubheaderActiveContext);

  useEffect(() => {
    return () => {
      headerRef.current = null;
    };
  }, []);

  return (
    <>
      <motion.header
        ref={headerRef}
        className={`${styles.subheader_container} ${headerStyle}`}
        initial={{ top: -5 }}
        animate={{ top: isActive ? -5 : "-65px" }}
        transition={{
          type: "spring",
          damping: 20,
          velocity: 100,
        }}
      >
        <div className={styles.subheader_inner_container}>
          <motion.div className={styles.subheader_heading_container}>
            <h3 className={`${styles.subheader_heading} ${headerFontColor}`}>
              {/* LOGO SVG HELLO*/}
              <TulfaIcon
                height={30}
                width={120}
                button={true}
                link="https://www.tulfa.com"
              />
            </h3>
          </motion.div>

          <motion.nav className={styles.subheader_nav}>
            {/* LAPTOPS */}
            {viewportSize.width > 1024 && (
              <div>
                {navLinks.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    className={
                      activePage === href
                        ? headerLinkActivated
                        : headerLinkDisabled
                    }
                    tabIndex={-1}
                  >
                    {label}
                  </Link>
                ))}
              </div>
            )}

            {/* MOBILE DEVICES */}
            {viewportSize.width <= 1024 && (
              <>
                <motion.div
                  className={styles.dropdown_arrow}
                  initial={{
                    rotate: 0,
                  }}
                  animate={{
                    rotate: headerActivated ? 180 : 0,
                  }}
                >
                  <TulfaDownArrow
                    height={30}
                    width={30}
                    fill={arrowFill}
                    arrowColor={arrowColor}
                    handleClick={() => {
                      setHeaderActivated((prev) => !prev);
                    }}
                  />
                </motion.div>
              </>
            )}

            <button className={styles.book_demo}>
              <a href="https://www.tulfa.com/contact-us">Book a demo</a>
            </button>
          </motion.nav>

          {/* DROPDOWN BAR */}
          <motion.div
            className={`${styles.dropdown_bar} ${headerDropdownBar}`}
            animate={{
              transform: headerActivated
                ? `translateY(${(navLinks.length - 1) * 75}px)`
                : `translateY(-${navLinks.length * 50}px)`,
            }}
            transition={{
              type: "spring",
              damping: 20,
              duration: 0.1,
            }}
          >
            {navLinks.map(({ href, label }) => (
              <AnimatePresence key={href}>
                <motion.div
                  initial={{
                    opacity: 0,
                  }}
                  whileInView={{
                    opacity: headerActivated ? 1 : 0,
                    transition: {
                      duration: 0.1,
                    },
                  }}
                  viewport={{
                    margin: "-30px",
                  }}
                  className={`${styles.link_container_style}`}
                >
                  <Link
                    href={href}
                    tabIndex={-1}
                    className={`${
                      activePage === href
                        ? headerLinkActivated
                        : headerLinkDisabled
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              </AnimatePresence>
            ))}
          </motion.div>
        </div>
      </motion.header>
    </>
  );
}
