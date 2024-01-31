import { IconType } from "../../../utils/common";
import colors  from "../../../common/colors";

const IcDeleteImg = ({
  width = 24,
  height = 24,
  color = colors.danger,
}: IconType) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
    >
      <rect width="24" height="24" fill="white" />
      <path
        d="M4.62598 7.40234H19.3736L18.0473 21.2497H5.95222L4.62598 7.40234Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M7.81152 2.75H16.1882"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
      <path
        d="M12 12L12 16.653"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
};

export default IcDeleteImg;
