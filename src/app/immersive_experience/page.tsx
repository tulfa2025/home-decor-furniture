"use client";
import { motion } from "framer-motion";
import { Suspense } from "react";

/* CUSTOM COMPONENTS */
import layoutCollection from "@/layout/immersive/layout_collection_immersive_experience";
import PageTemplate from "@/components/page_template/PageTemplate";

export default function ImmersiveExperience() {
  return (
    <Suspense>
      <PageTemplate
        layoutCollection={layoutCollection}
        activePagePath="/immersive_experience"
      >
        {/* ALL PAGES */}
        <motion.div
          style={{
            zIndex: 9999,
            position: 'fixed',
            height:'100vh',
            width: '100vw',
            top: 0,
            left: 0,
            backgroundColor: 'white'
            
          }}
          initial={{
            opacity: 1
          }}
          animate={{
            opacity: 0,
            zIndex: -1
          }}
          transition={{
            delay: 2,
            transition: 0.5
          }}
        >

        </motion.div>
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
                pointerEvents: "none",
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
