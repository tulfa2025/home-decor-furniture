import { motion } from "framer-motion";
import styles from "./ProductVideosBanner.module.scss";

/* CUSTOM COMPONENTS */
import ShowCase from "@/components/showcase/ShowCase";
import VideoPlayer from "@/components/video/VideoPlayer";

const ProductVideosBanner = () => {
  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
        duration: 1,
      }}
      style={{
        height: '100vh'
      }}
    >
      {/* INITIAL SCENE */}

      <motion.div className={styles.video_scene_container}>
        <motion.div className={styles.video_scene_container_inner}>
          <div className={styles.showcase_container}>
            <ShowCase heading="Product Videos" />
          </div>

          <motion.div>
            <VideoPlayer
              src="/videos/lifestyle.mp4"
              type="video/mp4"
              loop={true}
              styleOverride={{
                zIndex: 0,
                position: "absolute",
                opacity: 0.7,
              }}
              isInView={true}
              autoplay={true}
            ></VideoPlayer>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default ProductVideosBanner;
