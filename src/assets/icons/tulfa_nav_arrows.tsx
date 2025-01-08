'use client'
import React, { useState } from 'react';

const TulfaUpArrow = ({
    height,
    width,
    fill,
    arrowColor,
    handleClick
}) => {

    // const [isHovered, setIsHovered] = useState(false)

    return (
        <button
            className="disable_trigger_header_button"
        // onMouseEnter={()=>{
        // setIsHovered(true)}}
        // onMouseLeave={()=>{
        // setIsHovered(false)}}

        // style={{
        //     opacity: isHovered
        // }}
        >
            <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" width="40" height="40" rx="20" transform="rotate(90 40 0)" fill={fill} />
                <path d="M12.5 22.75L20 15.25L27.5 22.75" stroke="#433E99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
        </button>
    )
}

const TulfaDownArrow = ({
    height,
    width,
    fill,
    arrowColor,
    handleClick
}) => {

    return (
        <button
            onClick={handleClick}
            className="disable_trigger_header_button"
        >
            <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect y="40" width="40" height="40" rx="20" transform="rotate(-90 0 40)" fill={fill} />
                <path d="M27.5 17.25L20 24.75L12.5 17.25" stroke={arrowColor} stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>



        </button>
    )
}

const TulfaRightArrow = ({
    height,
    width,
    className,
    onClick
}) => {
    return (
        <button
            className={className}
            onClick={onClick}
        >
            <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="40" y="40" width="40" height="40" rx="20" transform="rotate(-180 40 40)" fill="#F5F5F7" />
                <g clip-path="url(#clip0_17_643)">
                    <path d="M17.25 12.5L24.75 20L17.25 27.5" stroke="#433E99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_17_643">
                        <rect width="18" height="12" fill="white" transform="matrix(0 -1 1 0 14 29)" />
                    </clipPath>
                </defs>
            </svg>
        </button>
    )
}

const TulfaLeftArrow = ({
    height,
    width,
    className,
    onClick
}) => {
    return (
        <button
            className={className}
            onClick={onClick}
        >
            <svg width={width} height={height} viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="40" height="40" rx="20" fill="#F5F5F7" />
                <g clip-path="url(#clip0_16_631)">
                    <path d="M22.75 27.5L15.25 20L22.75 12.5" stroke="#433E99" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
                </g>
                <defs>
                    <clipPath id="clip0_16_631">
                        <rect width="18" height="12" fill="white" transform="matrix(0 1 -1 0 26 11)" />
                    </clipPath>
                </defs>
            </svg>

        </button>
    )
}

export {
    TulfaUpArrow,
    TulfaDownArrow,
    TulfaRightArrow,
    TulfaLeftArrow
}