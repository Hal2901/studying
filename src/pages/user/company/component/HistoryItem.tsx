import clsx from "clsx";
import React, { memo } from "react";
import { initialTypeTopic } from "../../../../types/topicType";
import { getUrlImage } from "../../../../utils/constants";

import StageHistoryBox from "./StageHistoryBox";

interface Props {
  item: initialTypeTopic
  reverse?: boolean;
  color: "pink" | "blue" | "gray" | "gold";
  className?: string;
}
const HistoryItem = memo(
  ({ item, reverse = false, color = "pink", className }: Props) => {
    const linkImg = getUrlImage(item.link ?? '')

    return (
      <div
        className={clsx(
          " flex flex-col gap-y-4 mb-16",
          {
            "sm:pl-[90px] pl-7 items-start": !reverse,
            "lg:pr-[90px] lg:pl-0 pl-[90px] lg:items-end items-start": reverse,
          },
          className
        )}
      >
        <div className="lg:block hidden">
          <StageHistoryBox reverse={reverse} text={item.description ?? ''} color={color} />
        </div>
        <div className="lg:hidden block">
          <StageHistoryBox reverse={false} text={item.description ?? ''} color={color} />
        </div>
        <p className={clsx("text-xl  font-medium", {
          'text-left': !reverse,
          "lg:text-right text-left": reverse,
        })}>{item.title}</p>
        <p
          className={clsx(" break-words sm:text-base text-sm", {
            "text-left": !reverse,
            "lg:text-right text-left": reverse,
          })}
        >
          {item.content}
        </p>
        <img
          src={linkImg}
          alt=""
          className="w-[424px] sm:h-[270px] h-[230px] rounded-[4px] object-cover"
        />
      </div>
    );
  }
);

export default HistoryItem;
