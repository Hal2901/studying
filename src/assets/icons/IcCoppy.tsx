import React from "react";
import { IconType } from "../../utils/common";
import colors from "../../common/colors";

const IcCoppy = ({
  width = 16,
  height = 16,
  color = colors.gray01,
}: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_632_25868)">
        <path
          d="M4.66406 6.44402C4.66406 5.97246 4.85139 5.52022 5.18483 5.18678C5.51827 4.85334 5.97051 4.66602 6.44206 4.66602H12.2194C12.4529 4.66602 12.6841 4.71201 12.8998 4.80136C13.1155 4.89071 13.3115 5.02168 13.4766 5.18678C13.6417 5.35188 13.7727 5.54789 13.8621 5.7636C13.9514 5.97932 13.9974 6.21053 13.9974 6.44402V12.2213C13.9974 12.4548 13.9514 12.686 13.8621 12.9018C13.7727 13.1175 13.6417 13.3135 13.4766 13.4786C13.3115 13.6437 13.1155 13.7747 12.8998 13.864C12.6841 13.9534 12.4529 13.9993 12.2194 13.9993H6.44206C6.20857 13.9993 5.97737 13.9534 5.76165 13.864C5.54593 13.7747 5.34993 13.6437 5.18483 13.4786C5.01972 13.3135 4.88876 13.1175 4.7994 12.9018C4.71005 12.686 4.66406 12.4548 4.66406 12.2213V6.44402Z"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2.67467 11.158C2.47023 11.0415 2.30018 10.873 2.18172 10.6697C2.06325 10.4663 2.00057 10.2353 2 10V3.33333C2 2.6 2.6 2 3.33333 2H10C10.5 2 10.772 2.25667 11 2.66667"
          stroke={color}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>
      <defs>
        <clipPath id="clip0_632_25868">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IcCoppy;
