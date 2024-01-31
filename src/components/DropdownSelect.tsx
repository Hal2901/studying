import React, { ReactNode, memo } from "react";
import IcTooltip from "../assets/icons/IcTooltip";
import colors from "../common/colors";
import useMouseover from "../hooks/useMouseover";
import clsx from "clsx";
import { useTranslation } from "react-i18next";
interface Props {
  name: string;
  children?: ReactNode;
  className?: string;
  classOverlay?: string;
}

const DropdownSelect = memo(
  ({ name, children, className, classOverlay = "hidden-scroll" }: Props) => {
    const { t } = useTranslation();
    const { hoverShow, setHoverShow, ref } = useMouseover();
    return (
      <div
        ref={ref}
        className={clsx(
          "border border-border bg-white rounded-10 h-12 w-200 cursor-pointer relative z-50",
          className
        )}
      >
        <div className="flex items-center justify-between h-full py-4 px-6 bg-whiteFAFAFA rounded-10">
          <p className="line-clamp-1">{t(name) ?? name}</p>
          <IcTooltip color={colors.disable_color} />
        </div>
        {hoverShow && (
          <div
            className={
              "w-full border border-border rounded-10 bg-white  max-h-300 overflow-y-scroll shadow-sm z-50 " +
              classOverlay
            }
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

export default DropdownSelect;
