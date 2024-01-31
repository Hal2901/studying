import React from "react";
import { IconType } from "../../utils/common";
import colors from "../../common/colors";
const IcProxy = ({
  width = 24,
  height = 24,
  color = colors.white,
}: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_741_40347)">
        <path
          d="M19.5001 7.00002C18.6763 5.767 17.5605 4.75666 16.2521 4.05882C14.9436 3.36098 13.483 2.99727 12.0001 3.00002C10.5198 2.99911 9.06209 3.36374 7.75652 4.06154C6.45095 4.75933 5.33787 5.76869 4.51611 7.00002"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.4998 3C10.7205 4.2486 10.1067 5.5932 9.67383 7"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 3C13.2801 4.2485 13.8945 5.5931 14.328 7"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.5001 17C18.6763 18.233 17.5605 19.2434 16.2521 19.9412C14.9436 20.639 13.483 21.0027 12.0001 21C10.5198 21.0009 9.06209 20.6363 7.75652 19.9385C6.45095 19.2407 5.33787 18.2313 4.51611 17"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.4998 21C10.7205 19.7514 10.1067 18.4068 9.67383 17"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 21C13.2801 19.7515 13.8945 18.4069 14.328 17"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 10L3 14L4.5 10L6 14L7 10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17 10L18 14L19.5 10L21 14L22 10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.5 10L10.5 14L12 10L13.5 14L14.5 10"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_741_40347">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IcProxy;
