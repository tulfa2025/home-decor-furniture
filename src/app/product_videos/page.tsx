"use client";
import { motion } from "framer-motion";
import { Suspense } from "react";

/* CUSTOM COMPONENTS */
import layoutCollection from "@/layout/product_videos/layout_collection_product_videos";
import PageTemplate from "@/components/page_template/PageTemplate";

export default function ProductVideos() {

   


    return (
        <Suspense>
          <PageTemplate
            layoutCollection={layoutCollection}
            activePagePath='/product_videos'
          >
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
                  transition={{ duration: 1, delay: compName > 0 ? 2 : 0 }}
                  style={{
                    height: "max-content",
                    minWidth: "100vw",
                    backgroundColor: "transparent",
                    pointerEvents: 'none'
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