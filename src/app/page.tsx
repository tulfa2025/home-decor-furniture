"use client";
import { Suspense } from "react";
import { motion } from "framer-motion";

/* CUSTOM COMPONENTS */
import layoutCollection from "@/layout/home/layout_collection_product_images";
import PageTemplate from "@/components/page_template/PageTemplate";

import DeviceContext from "@/context/deviceContext";

export default function Home() {
  return (
    <Suspense>
      <PageTemplate layoutCollection={layoutCollection} activePagePath="/">
        {/* ALL PAGES */}
        <motion.div
          style={{
            zIndex: 9999,
            position: "fixed",
            height: "100vh",
            width: "100vw",
            top: 0,
            left: 0,
            backgroundColor: "white",
          }}
          initial={{
            opacity: 1,
          }}
          animate={{
            opacity: 0,
            zIndex: -1,
          }}
          transition={{
            delay: 2,
            transition: 0.5,
          }}
        ></motion.div>

        {layoutCollection.order.map((compName) => {
          const NextComp = layoutCollection[compName].component;

          const compLength = layoutCollection.order.length;

          return (
            <motion.div
              key={compName}
              id={compName}
              style={{
                height: "max-content",
                minWidth: "100vw",
              }}
            >
              <NextComp layoutName={compName} zIndex={compLength - compName} />
            </motion.div>
          );
        })}
      </PageTemplate>
    </Suspense>
  );
}
