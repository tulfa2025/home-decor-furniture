'use client'
import CallOut from "@/components/call_out/CallOut";
import Image from 'next/image';
import { motion } from 'framer-motion'
import useAutoScroll from "@/hooks/use_autoscroll";

/* MATTRESS LAYER IMAGES */
import matressLayerOne from '../../assets/images/product_exploded_view/f.png'
import matressLayerTwo from '../../assets/images/product_exploded_view/g.png'
import matressLayerThree from '../../assets/images/product_exploded_view/third.png'
import matressLayerFour from '../../assets/images/product_exploded_view/gfh.png'
import matressLayerFive from '../../assets/images/product_exploded_view/ii.png'
import matressLayerSix from '../../assets/images/product_exploded_view/fgh.png'
import matressLayerSeven from '../../assets/images/product_exploded_view//bed0000.png'
import matressLayerEight from '../../assets/images/product_exploded_view/eighth.png'


import styles from "./ProductExplodedView.module.scss";

type LayoutProps = {
    layoutName: number
    handleLayoutLoad: () => void
}


const ProductExplodedView: React.FC<LayoutProps> = ({
    layoutName,
    handleLayoutLoad
}) => {

     // Detect whenuser scrolls into range
     const containerRef = useAutoScroll(layoutName, handleLayoutLoad);

    return (
        <motion.section className={styles.product_container} ref={containerRef}>
            <CallOut heading="Product Exploded View" />
            <div className={styles.product_mattres}>
                <Image
                    src={matressLayerOne}
                    alt=''
                    className={styles.product_mattres_layer_one}
                    priority
                />
                <Image
                    src={matressLayerTwo}
                    alt=''
                    className={styles.product_mattres_layer_two}
                />
                <Image
                    src={matressLayerThree}
                    alt=''
                    className={styles.product_mattres_layer_three}
                />
                <Image
                    src={matressLayerFour}
                    alt=''
                    className={styles.product_mattres_layer_four}
                />
                <Image
                    src={matressLayerFive}
                    alt=''
                    className={styles.product_mattres_layer_five}
                />
                <Image
                    src={matressLayerSix}
                    alt=''
                    className={styles.product_mattres_layer_six}
                />
                <Image
                    src={matressLayerSeven}
                    alt=''
                    className={styles.product_mattres_layer_seven}
                />
                <Image
                    src={matressLayerEight}
                    alt=''
                    className={styles.product_mattres_layer_eight}
                />
            </div>
            <CallOut paragraph="Let Your Customers See The Meticulous Design, Premium Materials, And The Skill That Goes Into Every Detail-From The Inside Out." modifier="mw-928" />
        </motion.section>
    );
}

export default ProductExplodedView;
