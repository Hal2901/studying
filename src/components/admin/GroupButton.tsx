import clsx from "clsx";
import React, { memo } from "react";
import { Button } from "../Button";

interface Props {
  textCancel?: string;
  textSubmit?: string;
  onCancel: () => void;
  onSubmit: () => void;
  className?: string;
  disable?: boolean;
}
const GroupButton = memo(
  ({
    textCancel = "cancel_btn",
    textSubmit = "save",
    onCancel,
    onSubmit,
    className,
    disable = false,
  }: Props) => {
    return (
      <div className={clsx("flex items-center gap-6 justify-end", className)}>
        <Button
          color="empty"
          text={textCancel}
          className="px-6 py-3 !w-fit"
          onClick={onCancel}
        />
        <Button
          color="primary"
          disabled={disable}
          text={textSubmit}
          className="px-6 py-3 !w-fit"
          onClick={onSubmit}
        />
      </div>
    );
  }
);

export default GroupButton;
