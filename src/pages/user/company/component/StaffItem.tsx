import clsx from "clsx";
import React, { memo } from "react";
import { initialTypeTopic } from "../../../../types/topicType";
import { getUrlImage } from "../../../../utils/constants";

interface Props {
  item: initialTypeTopic;
}
const StaffItem = memo(({ item }: Props) => {
  return (
    <div
      className={clsx(
        "w-full h-auto  flex flex-col gap-10 rounded-[4px] group overflow-hidden bg-white"
      )}
    >
      <div className="sc1800:h-[460px] h-300">
        <img
          src={getUrlImage(item.link!)}
          alt=""
          className="w-full h-full object-cover transition ease-in-out delay-100 rounded-t-[4px] grayscale group-hover:grayscale-0 cursor-pointer"
        />
      </div>
      <div className="flex flex-col gap-2">
        <div className="w-fit">
          <p className="text-disabled font-medium uppercase transition ease-in-out delay-100 group-hover:text-black">
            {item?.title}
          </p>
          <div className="w-3/5 h-[1px] bg-defaultText my-2"></div>
        </div>
        <p className="text-xl text-main transition ease-in-out delay-100 group-hover:text-danger">
          {item?.description}
        </p>
      </div>
    </div>
  );
});

export default StaffItem;
