import React from "react";
import { IconType } from "../../utils/common";
import colors from "../../common/colors";
const IcYtb = ({
  width = 20,
  height = 20,
  color = colors.disable_color,
}: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 20 20"
      fill="none"
    >
      <g clipPath="url(#clip0_739_3484)">
        <path
          d="M1.66602 6.66683C1.66602 5.78277 2.01721 4.93493 2.64233 4.30981C3.26745 3.68469 4.11529 3.3335 4.99935 3.3335H14.9993C15.8834 3.3335 16.7312 3.68469 17.3564 4.30981C17.9815 4.93493 18.3327 5.78277 18.3327 6.66683V13.3335C18.3327 14.2176 17.9815 15.0654 17.3564 15.6905C16.7312 16.3156 15.8834 16.6668 14.9993 16.6668H4.99935C4.11529 16.6668 3.26745 16.3156 2.64233 15.6905C2.01721 15.0654 1.66602 14.2176 1.66602 13.3335V6.66683Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.33398 7.5L12.5007 10L8.33398 12.5V7.5Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_739_3484">
          <rect width="20" height="20" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IcYtb;
