'use client'
import React from 'react';

const BasicArrow = ({

}) => {

    // const [isHovered, setIsHovered] = useState(false)

    return (

        <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <mask
          id="mask0_4817_108"
          style={{ maskType: 'alpha' }}
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="25"
          height="25"
        >
          <rect
            y="25"
            width="25"
            height="25"
            transform="rotate(-90 0 25)"
            fill="url(#pattern0_4817_108)"
          />
        </mask>
        <g mask="url(#mask0_4817_108)">
          <rect
            y="25"
            width="25"
            height="25"
            transform="rotate(-90 0 25)"
            fill="white"
          />
        </g>
        <defs>
          <pattern
            id="pattern0_4817_108"
            patternContentUnits="objectBoundingBox"
            width="1"
            height="1"
          >
            <use
              href="#image0_4817_108"
              transform="scale(0.01)"
            />
          </pattern>
          <image
            id="image0_4817_108"
            width="100"
            height="100"
            href="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAAAXNSR0IArs4c6QAAAydJREFUeAHt3UFu01AYxPEWOEfVU8AKCbGCQ1RQ9kjcAYkrsII9rBBb9hULOAVHQLBCDHrIljyJ/Wwnhim8f6Qq+fySvPH8mlRd+eSEGw3QAA3QAA002ICkG5KeSfoo6UrS03KswSquxylLeqH92/Prka6xFJJuSvq+76FvZa2xOvKnK+lsBKM/dJZP2FgCSed9+yP3543VkT9dQPIGlgAQqyM/AJI3sASAWB35AZC8gSUAxOrID4DkDSwBIFZHfgAkb2AJALE68gMgeQNLAIjVkR8AyRtYAkCsjvwASN7AEgBideQHQPIGlgAQqyM/AJI3sASAWB35AZC8gSUAxOrID4DkDSwBIFZHfgAkb2AJALE68gMgeQNLAIjVkR8AyRtYAkCsjvwASN7AEgBideQHQPIGlgAQqyM/AJI3sASAWB35AZC8gSUAxOrID4DkDSwBIFZHfgAkb2AJALE68gMgeQNLAIjVkR8AyRtYAkCsjvwASN7AEgBideQHQPIGlgAQqyM/AJI3sASAWB35AZC8gSUAxOrID4DkDSwBIFZHfgAkb2AJALE68gMgeQNLAIjVkR8AyRtYAkCsjvwASN7AEgBideQHQP6CgaRbS7fZCmTNnkuz/fPPk/RE0hdJPyV9knR77qSOBZF0R9Ln7nJJZe/LuT2bWJf0sIMYXkqqXGntXq2AY0DKe0u/r+Y23LP8Mjyo7dnEmqS3w1YGj6soh4JMYPTbvmmi9NpJSnrftzFyP4lyCMgMRtn+XS1rE2uSHo1ADA+NoqwFWYBR9rxoovTaSUo6lfRqKDDyeA9lDchCjJLhtJa1mbUO5eUIxPBQQbnfl7IURNJdSV+HbzTy+DUXNe6b7e7XoiwBAWOn5LXjGpQ5EDDWtj/x/BUo5Z/JqdsFX1MTBR9yuLtwffler91+VBZra+Vl/M1YC7Pwk1IxmVwCYy1G//w/gAJGX+6h9xuigHEowu7rNkABY7fUY+cjUMA4tvyp1x+AAsZUmVsdX4ECxlalz73PAhQw5krcer3yzyMYW5e99P26T8qlpA/dz+NybOnreR4N0AAN0AAN/E8N/AKqa9/pkLfuHQAAAABJRU5ErkJggg=="
          />
        </defs>
      </svg>
    )
}

export default BasicArrow;