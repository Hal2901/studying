import { IconType } from "../../utils/common";
import colors from "../../common/colors";

export default function IcSport({
  width = 24,
  height = 24,
  color = colors.white
}: IconType) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Frame" clipPath="url(#clip0_1665_7690)">
        <path id="Vector" d="M12.0002 5H15.5002C16.8263 5 18.0981 5.52678 19.0358 6.46447C19.9735 7.40215 20.5002 8.67392 20.5002 10C20.5002 11.3261 19.9735 12.5979 19.0358 13.5355C18.0981 14.4732 16.8263 15 15.5002 15H10.0002L5.98524 19.227C5.6418 19.5886 5.19014 19.8288 4.69832 19.9113C4.20651 19.9939 3.70118 19.9143 3.2585 19.6847C2.81582 19.4551 2.45977 19.0878 2.244 18.6382C2.02823 18.1886 1.96444 17.681 2.06224 17.192L3.69624 9.019C3.92305 7.88546 4.53563 6.86553 5.42974 6.13278C6.32384 5.40003 7.44423 4.99973 8.60024 5H12.0002Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_2" d="M14 14.9983L18.07 19.2823C18.4128 19.643 18.8632 19.8828 19.3538 19.9657C19.8444 20.0487 20.3487 19.9703 20.7909 19.7423C21.2332 19.5144 21.5896 19.1492 21.8067 18.7015C22.0238 18.2538 22.0899 17.7478 21.995 17.2593L20.395 9.02734" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_3" d="M8 9V11" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_4" d="M7 10H9" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_5" d="M14 10H16" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_1665_7690">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>
  )
}


