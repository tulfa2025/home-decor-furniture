
import {motion} from 'framer-motion'

const TulfaShareButton = ({
    height,
    width,
    handleClick,
    className,
    fill = "none"
}) => {

    return (
        <motion.button
            onClick={handleClick}
            className={`${className} disable_trigger_header_button`}
            style={{
                backgroundColor:"#666666",
                borderRadius: height/2,
                opacity: 0.5
            }}
            whileHover={{
                opacity: 0.8
            }}
        >
            <svg width={width} height={height} viewBox="0 0 45 45" fill={fill} xmlns="http://www.w3.org/2000/svg">
                <rect width="45" height="45" rx="22.5"/>
                <path d="M19.1667 20H18.3334C17.8914 20 17.4675 20.1756 17.1549 20.4882C16.8423 20.8007 16.6667 21.2246 16.6667 21.6667V28.3333C16.6667 28.7754 16.8423 29.1993 17.1549 29.5118C17.4675 29.8244 17.8914 30 18.3334 30H26.6667C27.1088 30 27.5327 29.8244 27.8453 29.5118C28.1578 29.1993 28.3334 28.7754 28.3334 28.3333V21.6667C28.3334 21.2246 28.1578 20.8007 27.8453 20.4882C27.5327 20.1756 27.1088 20 26.6667 20H25.8334M22.5001 24.1667V15M22.5001 15L20.0001 17.5M22.5001 15L25.0001 17.5" stroke="white" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </motion.button>
    )
}

export default TulfaShareButton;