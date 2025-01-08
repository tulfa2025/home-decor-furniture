import styles from './Blur.module.scss';
import { motion } from 'framer-motion';

const BlurredBackdrop = ({ children, onClick }) => {
	return(<motion.div
		className={styles.blurred_backdrop}
		onClick={onClick}
	>
		{children ?? null}
	</motion.div>);
};

export default BlurredBackdrop;