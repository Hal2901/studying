import clsx from "clsx";
import React from "react";

interface Props {
  reverse?: boolean;
  text: string;
  color: "pink" | "blue" | "gray" | "gold";
}
const StageHistoryBox = ({ reverse = false, text, color }: Props) => {
  if (reverse)
    return (
      <div
        className={clsx("flex w-fit h-14 items-center", {
          "-mr-[102px]": reverse,
        })}
      >
        <div
          className={clsx(
            "h-full relative min-w-[350px] max-w-[400px] px-12  flex items-center justify-end text-white text-2xl",
            {
              "bg-[#ED164B]": color === "pink",
              "bg-active": color === "blue",
              "bg-[#8E8D90]": color === "gray",
              "bg-[#9A8143]": color === "gold",
            }
          )}
        >
          {text}
          <div className="absolute top-0 left-0 border-t-[29px] border-t-transparent border-b-[29px] border-b-transparent   border-l-[20px] border-l-white"></div>
        </div>

        <div
          className={clsx(
            "border-t-[13px] border-t-white border-l-[13px] border-b-[13px] border-b-white",
            {
              "border-l-[#ED164B]": color === "pink",
              "border-l-active": color === "blue",
              "border-l-[#8E8D90]": color === "gray",
              "border-l-[#9A8143]": color === "gold",
            }
          )}
        ></div>
        <div
          className={clsx("w-6 h-6 rounded-1/2 ml-5 z-10", {
            "bg-[#ED164B]": color === "pink",
            "bg-active": color === "blue",
            "bg-[#8E8D90]": color === "gray",
            "bg-[#9A8143]": color === "gold",
          })}
        ></div>
      </div>
    );
  return (
    <div
      className={clsx("flex w-fit h-14 items-center", {
        "sm:-ml-[102px] -ml-10": !reverse,
      })}
    >
      <div
        className={clsx("w-6 h-6 rounded-1/2 sm:mr-5 mr-1 z-10", {
          "bg-[#ED164B]": color === "pink",
          "bg-active": color === "blue",
          "bg-[#8E8D90]": color === "gray",
          "bg-[#9A8143]": color === "gold",
        })}
      ></div>
      <div
        className={clsx(
          "border-t-[13px] border-t-white border-l-[13px] border-l-white  border-b-[13px] border-b-white border-r-[13px]",
          {
            "border-r-[#ED164B]": color === "pink",
            "border-r-active": color === "blue",
            "border-r-[#8E8D90]": color === "gray",
            "border-r-[#9A8143]": color === "gold",
          }
        )}
      ></div>
      <div
        className={clsx(
          "h-full relative sm:min-w-[350px] min-w-[250px] max-w-[400px] px-7  flex items-center text-white sm:text-2xl text-base",
          {
            "bg-[#ED164B]": color === "pink",
            "bg-active": color === "blue",
            "bg-[#8E8D90]": color === "gray",
            "bg-[#9A8143]": color === "gold",
          }
        )}
      >
        {text}
        <div className="absolute top-0 right-0 border-t-[29px] border-t-transparent border-b-[29px] border-b-transparent   border-r-[20px] border-r-white"></div>
      </div>
    </div>
  );
};

export default StageHistoryBox;
