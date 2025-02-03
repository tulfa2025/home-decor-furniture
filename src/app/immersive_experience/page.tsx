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
              transition={{ duration: 1, delay: (1 + compName) * 0.5 }}
              style={{
                height: "max-content",
                minWidth: "100vw",
                backgroundColor: "transparent",
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
