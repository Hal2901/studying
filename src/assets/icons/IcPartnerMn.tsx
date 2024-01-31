import React from "react";
import { IconType } from "../../utils/common";
import colors from "../../common/colors";
const IcPartnerMn = ({
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
      <g clipPath="url(#clip0_604_6228)">
        <path
          d="M19.4998 12.5717L11.9998 19.9997L4.49981 12.5717C4.00512 12.0903 3.61546 11.5117 3.35536 10.8723C3.09527 10.2329 2.97037 9.54664 2.98855 8.85662C3.00673 8.1666 3.16758 7.48782 3.46097 6.86303C3.75436 6.23823 4.17395 5.68094 4.6933 5.22627C5.21265 4.77159 5.82052 4.42938 6.47862 4.22117C7.13673 4.01296 7.83082 3.94327 8.51718 4.01649C9.20354 4.08971 9.86731 4.30425 10.4667 4.64659C11.0661 4.98894 11.5881 5.45169 11.9998 6.00569C12.4133 5.45571 12.9359 4.99701 13.5349 4.65829C14.1339 4.31958 14.7963 4.10814 15.4807 4.03721C16.1652 3.96628 16.8569 4.03739 17.5126 4.24608C18.1683 4.45477 18.7738 4.79656 19.2914 5.25005C19.8089 5.70354 20.2272 6.25897 20.5202 6.88158C20.8132 7.50419 20.9746 8.18057 20.9941 8.8684C21.0137 9.55622 20.8911 10.2407 20.6339 10.8789C20.3768 11.5172 19.9907 12.0955 19.4998 12.5777"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.9998 6L8.70685 9.293C8.51938 9.48053 8.41406 9.73484 8.41406 10C8.41406 10.2652 8.51938 10.5195 8.70685 10.707L9.24985 11.25C9.93985 11.94 11.0598 11.94 11.7498 11.25L12.7498 10.25C13.3466 9.65327 14.1559 9.31803 14.9998 9.31803C15.8438 9.31803 16.6531 9.65327 17.2498 10.25L19.4998 12.5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12.5 15.5L14.5 17.5"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 13L17 15"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_604_6228">
          <rect width="24" height="24" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IcPartnerMn;
