import React from "react";
import { IconType } from "../../utils/common";
import colors from "../../common/colors";

const ViewIcon = ({
  width = 25,
  height = 24,
  color = colors.disable_color,
}: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 25 24"
      fill="none"
    >
      <g clipPath="url(#clip0_842_35029)">
        <path
          d="M4.75 8V6C4.75 5.46957 4.96071 4.96086 5.33579 4.58579C5.71086 4.21071 6.21957 4 6.75 4H8.75"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.75 16V18C4.75 18.5304 4.96071 19.0391 5.33579 19.4142C5.71086 19.7893 6.21957 20 6.75 20H8.75"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.75 4H18.75C19.2804 4 19.7891 4.21071 20.1642 4.58579C20.5393 4.96086 20.75 5.46957 20.75 6V8"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M16.75 20H18.75C19.2804 20 19.7891 19.7893 20.1642 19.4142C20.5393 19.0391 20.75 18.5304 20.75 18V16"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.75 11V11.01"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.75 18L9.25 13C8.91307 12.391 8.74085 11.7047 8.75037 11.0088C8.75989 10.3129 8.95082 9.63149 9.30428 9.03197C9.65774 8.43245 10.1615 7.93552 10.7658 7.59029C11.3701 7.24506 12.054 7.06348 12.75 7.06348C13.446 7.06348 14.1299 7.24506 14.7342 7.59029C15.3385 7.93552 15.8423 8.43245 16.1957 9.03197C16.5492 9.63149 16.7401 10.3129 16.7496 11.0088C16.7591 11.7047 16.5869 12.391 16.25 13L12.75 18Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_842_35029">
          <rect
            width="24"
            height="24"
            fill="white"
            transform="translate(0.75)"
          />
        </clipPath>
      </defs>
    </svg>
  );
};

export default ViewIcon;
