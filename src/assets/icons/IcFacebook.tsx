import { IconType } from "../../utils/common";
import colors from "../../common/colors";

export default function IcFacebook({
  width = 24,
  height = 24,
  color = colors.main
}: IconType) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Social Media Icon Square/Facebook">
        <rect id="Social Media Icon" width="24" height="24" rx="5" fill="#FAFAFA" />
        <path id="Facebook" d="M12.9762 18V12.5262H14.906L15.1949 10.393H12.9761V9.03102C12.9761 8.4134 13.1562 7.99252 14.0865 7.99252L15.273 7.99199V6.08405C15.0678 6.0581 14.3634 6 13.5441 6C11.8334 6 10.6623 6.99412 10.6623 8.81982V10.393H8.72754V12.5262H10.6623V17.9999H12.9762V18Z" fill={color} />
      </g>
    </svg>
  )
}