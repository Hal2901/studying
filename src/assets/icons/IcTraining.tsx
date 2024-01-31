import React from "react";
import { IconType } from "../../utils/common";
import colors from "../../common/colors";

const IcTraining = ({
  width = 24,
  height = 24,
  color = colors.white,
}: IconType) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="Frame" clipPath="url(#clip0_1830_14293)">
        <path
          id="Vector"
          d="M3 18.9987C4.36817 18.2088 5.92017 17.793 7.5 17.793C9.07983 17.793 10.6318 18.2088 12 18.9987C13.3682 18.2088 14.9202 17.793 16.5 17.793C18.0798 17.793 19.6318 18.2088 21 18.9987"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M3 5.99874C4.36817 5.20883 5.92017 4.79297 7.5 4.79297C9.07983 4.79297 10.6318 5.20883 12 5.99874C13.3682 5.20883 14.9202 4.79297 16.5 4.79297C18.0798 4.79297 19.6318 5.20883 21 5.99874"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M3 6V19"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_4"
          d="M12 6V19"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_5"
          d="M21 6V19"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1830_14293">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IcTraining;
