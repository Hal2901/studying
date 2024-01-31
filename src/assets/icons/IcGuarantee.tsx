import React from "react";
import { IconType } from "../../utils/common";
import colors from "../../common/colors";
const IcGuarantee = ({
  width = 24,
  height = 24,
  color = colors.text_main,
}: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <g clipPath="url(#clip0_604_6176)">
        <path
          d="M6.706 6L3 12L6.706 18H7.765L16.235 6H17.295L21 12L17.294 18"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_604_6176">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IcGuarantee;
