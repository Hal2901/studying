import React from "react";
import { IconType } from "../../utils/common";
import colors from "../../common/colors";

const ShareIcon = ({
  width = 25,
  height = 24,
  color = colors.white,
}: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
    >
      <g clipPath="url(#clip0_842_35023)">
        <path
          d="M8.75 9H7.75C7.21957 9 6.71086 9.21071 6.33579 9.58579C5.96071 9.96086 5.75 10.4696 5.75 11V19C5.75 19.5304 5.96071 20.0391 6.33579 20.4142C6.71086 20.7893 7.21957 21 7.75 21H17.75C18.2804 21 18.7891 20.7893 19.1642 20.4142C19.5393 20.0391 19.75 19.5304 19.75 19V11C19.75 10.4696 19.5393 9.96086 19.1642 9.58579C18.7891 9.21071 18.2804 9 17.75 9H16.75"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.75 14V3"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.75 6L12.75 3L15.75 6"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_842_35023">
          <rect
            width="24"
            height="24"
            fill={color}
            transform="translate(0.75)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ShareIcon;
