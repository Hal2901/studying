import React from "react";
import { IconType } from "../../utils/common";
import colors from "../../common/colors";

const IcPolicy = ({
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
      <g id="Frame" clipPath="url(#clip0_1830_1746)">
        <path
          id="Vector"
          d="M11.9998 3C14.3357 5.06658 17.3843 6.14257 20.4998 6C20.9534 7.54302 21.0922 9.16147 20.908 10.7592C20.7237 12.3569 20.2202 13.9013 19.4272 15.3005C18.6343 16.6998 17.5682 17.9254 16.2923 18.9045C15.0164 19.8836 13.5566 20.5962 11.9998 21C10.443 20.5962 8.98331 19.8836 7.70738 18.9045C6.43144 17.9254 5.36534 16.6998 4.57243 15.3005C3.77952 13.9013 3.27597 12.3569 3.09171 10.7592C2.90745 9.16147 3.04624 7.54302 3.49983 6C6.61536 6.14257 9.664 5.06658 11.9998 3Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_2"
          d="M11 11C11 11.2652 11.1054 11.5196 11.2929 11.7071C11.4804 11.8946 11.7348 12 12 12C12.2652 12 12.5196 11.8946 12.7071 11.7071C12.8946 11.5196 13 11.2652 13 11C13 10.7348 12.8946 10.4804 12.7071 10.2929C12.5196 10.1054 12.2652 10 12 10C11.7348 10 11.4804 10.1054 11.2929 10.2929C11.1054 10.4804 11 10.7348 11 11Z"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          id="Vector_3"
          d="M12 12V14.5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_1830_1746">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IcPolicy;
