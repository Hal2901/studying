import { IconType } from "../../utils/common";
import colors from "../../common/colors";

export default function IcYoutube({
  width = 24,
  height = 24,
  color = colors.main
}: IconType) {
  return (
    <svg width={width} height={height} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="Social Media Icon Square/YouTube">
        <g id="Group 73">
          <rect id="Social Media Icon" width="24" height="24" rx="5" fill="#FAFAFA" />
          <path id="YouTube" d="M12.2928 16.6528L9.5847 16.6022C8.70787 16.5845 7.82885 16.6198 6.96921 16.437C5.66151 16.164 5.56886 14.8254 5.47192 13.7026C5.33835 12.124 5.39006 10.5168 5.64213 8.95144C5.78443 8.07309 6.34446 7.54898 7.21051 7.49194C10.1341 7.28496 13.0771 7.30949 15.9942 7.40606C16.3023 7.41491 16.6124 7.46329 16.9162 7.51837C18.4158 7.78698 18.4523 9.30391 18.5495 10.5809C18.6465 11.871 18.6056 13.1678 18.4203 14.4492C18.2716 15.5101 17.9872 16.3998 16.787 16.4857C15.2831 16.598 13.8138 16.6884 12.3057 16.6596C12.3058 16.6528 12.2971 16.6528 12.2928 16.6528ZM10.7007 13.9668C11.834 13.3019 12.9456 12.648 14.0724 11.9875C12.937 11.3226 11.8275 10.6687 10.7007 10.0082V13.9668Z" fill={color} />
        </g>
      </g>
    </svg>

  )
}