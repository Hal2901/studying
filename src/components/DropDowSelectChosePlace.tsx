import React, { ChangeEvent, ReactNode, memo } from "react";
import useClickFocus from "../hooks/useClickFocus";
import IcTooltip from "../assets/icons/IcTooltip";
import colors from "../common/colors";
import clsx from "clsx";
import { InputElement } from "./InputElement";

interface Props {
  value: string;
  placeholder: string;
  data: any;
  children?: ReactNode;
  className?: string;
  handleChangeInput: (e: ChangeEvent<HTMLInputElement>) => void;
  setAllPlace?: () => void;
}

const DropDowSelectChosePlace = memo(
  ({
    value,
    placeholder,
    children,
    className,
    handleChangeInput,
    setAllPlace,
  }: Props) => {
    const { handleClickInside, clickShow, setClickShow, ref1 } = useClickFocus();
    return (
      <div
        ref={ref1}
        className={clsx(
          "border border-border bg-white rounded-10 h-12 w-full cursor-pointer relative z-50",
          className
        )}
      >
        <div
          onClick={() => setAllPlace?.()}
          className="flex items-center justify-between h-full py-4 pr-6 bg-whiteFAFAFA rounded-10"
        >
          <InputElement
            className="!border-r-transparent rounded-r-none !border-transparent"
            value={value ?? ""}
            placeholder={placeholder}
            onChange={handleChangeInput}
          />
          <IcTooltip color={colors.disable_color} />
        </div>
        {clickShow && (
          <div
            className={
              "w-full border border-border rounded-10 bg-white  max-h-[200px] overflow-scroll hidden-scroll shadow-sm z-50"
            }
          >
            {children}
          </div>
        )}
      </div>
    );
  }
);

export default DropDowSelectChosePlace;
