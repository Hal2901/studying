import clsx from "clsx";
import React from "react";
import IcDelete from "../assets/icons/IcDelete";

interface Props {
  imagePreview: string;
  onDelete: () => void;
  className?: string;
}
const ImagePreview = ({ imagePreview = "", onDelete, className }: Props) => {
  return (
    <div
      className={clsx(
        "h-[190px] w-[340px] rounded-[4px] overflow-hidden relative group border",
        className
      )}
    >
      <img src={imagePreview} alt="" className="w-full h-full object-cover" />
      <div
        className="absolute top-5 right-5 z-10 cursor-pointer hidden group-hover:block"
        onClick={() => onDelete()}
      >
        <IcDelete />
      </div>
    </div>
  );
};

export default ImagePreview;
