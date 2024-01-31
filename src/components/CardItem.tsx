import clsx from "clsx";
import { ReactNode, memo } from "react";
import IcArrowsNex from "../assets/icons/IcArrowsNex";
import colors from "../common/colors";
import { initialTypeTopic } from "../types/topicType";
import { getIdYoutube, getUrlImage, momentFormat } from "../utils/constants";
import { Button } from "./Button";

interface Props {
  item: initialTypeTopic;
  scale?: boolean;
  textBtn?: string;
  iconBtn?: ReactNode;
  isVideo?: boolean;
  handleButton: (data?: any) => void;
  handleForward?: (data?: any) => void;
}
const CardItem = memo(
  ({
    item,
    textBtn = "see_more",
    iconBtn,
    scale,
    isVideo = false,
    handleButton,
    handleForward,
  }: Props) => {
    return (
      <div
        className={clsx(
          "w-full xl:h-[490px] h-[450px]  flex flex-col gap-10  shadow-medium rounded-[4px] bg-white",
          {
            "hover:scale-105 hover:z-10 ease-linear duration-100": scale,
          }
        )}
      >
        <div className="h-1/2" onClick={() => handleForward?.(item)}>
          <img
            src={isVideo ? getIdYoutube(item.link!) : getUrlImage(item.link!)}
            alt=""
            className="w-full h-full rounded-t-[4px] object-contain"
          />
        </div>
        <div className="px-8 pb-10 flex flex-col gap-6">
          <p className="text-disabled text-sm opacity-80">
            {momentFormat(item?.createdDate!)}
          </p>
          <p className="md:text-xl text-base min-h-[50px] line-clamp-2">
            {item?.title}
          </p>

          <Button
            color="normal"
            text={textBtn}
            onClick={() => handleButton(item)}
            className="!h-8 px-4 !text-sm !font-normal rounded-[4px] !w-fit"
            image={iconBtn ?? <IcArrowsNex color={colors.disable_color} />}
          />
        </div>
      </div>
    );
  }
);

export default CardItem;
