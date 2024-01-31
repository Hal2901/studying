import { IconType } from "../../utils/common";
import colors from "../../common/colors";

export default function IcBrochureCatalog({
  width = 24,
  height = 24,
  color = colors.white
}: IconType) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Frame" clipPath="url(#clip0_1596_10786)">
        <path id="Vector" d="M14 3V7C14 7.26522 14.1054 7.51957 14.2929 7.70711C14.4804 7.89464 14.7348 8 15 8H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_2" d="M5 12V5C5 4.46957 5.21071 3.96086 5.58579 3.58579C5.96086 3.21071 6.46957 3 7 3H14L19 8V12" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_3" d="M5 18H6.5C6.89782 18 7.27936 17.842 7.56066 17.5607C7.84196 17.2794 8 16.8978 8 16.5C8 16.1022 7.84196 15.7206 7.56066 15.4393C7.27936 15.158 6.89782 15 6.5 15H5V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_4" d="M17 18H19" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_5" d="M20 15H17V21" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path id="Vector_6" d="M11 15V21H12C12.5304 21 13.0391 20.7893 13.4142 20.4142C13.7893 20.0391 14 19.5304 14 19V17C14 16.4696 13.7893 15.9609 13.4142 15.5858C13.0391 15.2107 12.5304 15 12 15H11Z" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip0_1596_10786">
          <rect width="24" height="24" fill={color} />
        </clipPath>
      </defs>
    </svg>

  )
}


