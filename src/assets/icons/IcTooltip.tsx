import React from "react";
import { IconType } from "../../utils/common";
import colors from "../../common/colors";
const IcTooltip = ({
  width = 16,
  height = 16,
  color = colors.white,
}: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
    >
      <g clipPath="url(#clip0_562_1494)">
        <path
          d="M12 6C12.568 6 12.8647 6.65733 12.522 7.082L12.4713 7.138L8.47132 11.138C8.35653 11.2528 8.20379 11.3217 8.04178 11.3319C7.87976 11.3421 7.71959 11.2928 7.59132 11.1933L7.52866 11.138L3.52866 7.138L3.47332 7.07533L3.43732 7.024L3.40132 6.96L3.38999 6.936L3.37199 6.89133L3.35066 6.81933L3.34399 6.784L3.33732 6.744L3.33466 6.706V6.62733L3.33799 6.58867L3.34399 6.54867L3.35066 6.514L3.37199 6.442L3.38999 6.39733L3.43666 6.30933L3.47999 6.24933L3.52866 6.19533L3.59132 6.14L3.64266 6.104L3.70666 6.068L3.73066 6.05667L3.77532 6.03867L3.84732 6.01733L3.88266 6.01067L3.92266 6.004L3.96066 6.00133L12 6Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_562_1494">
          <rect width="16" height="16" fill={color} />
        </clipPath>
      </defs>
    </svg>
  );
};

export default IcTooltip;
