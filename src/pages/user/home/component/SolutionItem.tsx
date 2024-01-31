import clsx from "clsx";
import { useNavigate } from "react-router-dom";
import IcArrowMap from "../../../../assets/icons/IcArrowMap";
import IcArrowsNex from "../../../../assets/icons/IcArrowsNex";
import {
  ElipSolution,
  ImageDotsBlue,
  ImageDotsGray,
} from "../../../../assets/images";
import { Button } from "../../../../components/Button";
import { solutionType } from "../../../../types/solutionType";
import { getUrlImage } from "../../../../utils/constants";
import { publicPath } from "../../../../utils/routers";

interface Props {
  item: solutionType;
  reverse: boolean;
  index: number;
}
const SolutionItem = ({ item, reverse, index }: Props) => {
  const navigate = useNavigate();
  const handleMapArrows = () => {
    const listArrows = [];
    for (let i = 1; i <= 9; i++) {
      listArrows.push(<IcArrowMap key={i} />);
    }
    return listArrows;
  };
  return (
    <div className="w-full sc1800:px-300 xl:px-[155px] sm:px-100 px-5 grid lg:grid-cols-5 grid-cols-1 lg:gap-12 gap-y-10 relative lg:pb-20 lg:mb-16 mb-10">
      <div
        className={clsx(
          "col-span-3 xs:h-[450px] h-300 relative z-20 bg-white",
          {
            "lg:order-2": reverse,
          }
        )}
      >
        <img
          src={getUrlImage(item.link!) ?? ""}
          alt=""
          className="w-full h-full object-cover"
        />
        <div
          className={clsx("absolute -z-[1] -bottom-20 xl:block hidden", {
            "-left-20": !reverse,
            "-right-20": reverse,
          })}
        >
          <img
            src={!reverse ? ImageDotsBlue : ImageDotsGray}
            alt=""
            className="w-[164px] h-[164px]"
          />
          {/* <IcImageAbsolute
            color={!reverse ? colors.color_0082C5 : colors.disable_color}
          /> */}
        </div>
      </div>
      <div
        className={clsx(
          "col-span-2 flex h-full flex-col gap-6  justify-center relative",
          { "items-end order-1": reverse }
        )}
      >
        <div
          className={clsx(
            "absolute lg:-bottom-5 lg:-b z-[-1] text-[150px] font-bold text-[#F5F5F5]",
            {
              "right-5": !reverse,
              "left-5": reverse,
            }
          )}
        >
          0{index + 1}
        </div>
        <div
          className={clsx("flex item-center justify-start", {
            "rotate-180": reverse,
          })}
        >
          {handleMapArrows()}
        </div>
        <p
          className={clsx(
            "xs:text-[32px] text-2xl leading-[40px] font-semibold line-clamp-5",
            {
              "text-right": reverse,
            }
          )}
        >
          {item.title}
        </p>
        <p className={clsx("", { "text-right": reverse })}>
          {item.description}
        </p>
        <Button
          color="primary"
          text="see_more"
          className="px-6 py-3 !w-fit"
          image={<IcArrowsNex />}
          onClick={() => navigate(`${publicPath.solution.index}/${item.id!}`)}
        />
      </div>
      <div
        className={clsx("absolute xl:block hidden", {
          "-top-16 right-[80px] w-200 h-200": index == 0,
          "top-1/2 -translate-y-1/2 left-[80px] w-124 h-124": index == 1,
          "bottom-16 right-[80px] w-[158px] h-[158px]": index == 2,
        })}
      >
        <img src={ElipSolution} alt="" className="w-full h-full" />
      </div>
    </div>
  );
};

export default SolutionItem;
