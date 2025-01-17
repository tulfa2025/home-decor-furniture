"use client";
import { Suspense } from "react";
import { motion } from "framer-motion";

/* CUSTOM COMPONENTS */
import layoutCollection from "@/layout/home/layout_collection_product_images";
import PageTemplate from "@/components/page_template/PageTemplate";

import DeviceContext from "@/context/deviceContext";
import getDeviceType from "@/utils/getDeviceContext";
import { useState, useEffect } from "react";

export default function Home() {
  /* DEVICE CONTEXT */
  const [deviceType, setDeviceType] = useState("");

  useEffect(() => {
    if (window) {
      setDeviceType(getDeviceType());
    }
  }, []);
  return (
    <Suspense>
      <DeviceContext.Provider value={deviceType}>
        <PageTemplate layoutCollection={layoutCollection} activePagePath="/">
          {/* ALL PAGES */}
          {layoutCollection.order.map((compName) => {
            const NextComp = layoutCollection[compName].component;

            const compLength = layoutCollection.order.length;

            return (
              <motion.div
                key={compName}
                id={compName}
                initial={{
                  opacity: 0,
                }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: compName * 1.0 }}
                style={{
                  height: "max-content",
                  minWidth: "100vw",
                  backgroundColor: "transparent",
                }}
              >
                <NextComp
                  layoutName={compName}
                  zIndex={compLength - compName}
                />
              </motion.div>
            );
          })}
        </PageTemplate>
      </DeviceContext.Provider>
    </Suspense>
  );
}
