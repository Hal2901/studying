import { useNavigate, useSearchParams } from "react-router-dom";
import IcArrowsNex from "../../../../assets/icons/IcArrowsNex";
import colors from "../../../../common/colors";
import { Button } from "../../../../components/Button";
import { solutionType } from "../../../../types/solutionType";
import { getUrlImage, momentFormat } from "../../../../utils/constants";

interface Props {
  item: solutionType;
}
const SolutionItem = ({ item }: Props) => {
  const navigate = useNavigate();
  const handleViewDetails = (id: number) => {
    navigate(`/giai-phap/${id}`);
  };
  return (
    <div className="w-full xs:h-[270px] h-auto max-h-[400px] flex flex-wrap bg-white shadow-normal">
      <img
        src={getUrlImage(item.link)}
        alt=""
        className="xs:w-[45%] w-full xs:h-full h-200  object-cover xs:rounded-l-10 xs:rounded-tr-none rounded-t-10"
      />
      <div className="xs:w-[55%] w-full xs:h-full  xs:p-10 p-5 flex flex-col justify-between">
        <div>
          <p className="text-xs text-disabled mb-4">
            {momentFormat(item.createdDate!)}
          </p>
          <p className="text-xl font-medium break-words line-clamp-2">
            {item.title}
          </p>
        </div>
        <Button
          color="normal"
          text="see_more"
          className="!h-8 px-4 !text-sm  !font-normal rounded-[4px] !w-fit"
          image={<IcArrowsNex color={colors.disable_color} />}
          onClick={() => handleViewDetails(item.id!)}
        />
      </div>
    </div>
  );
};

export default SolutionItem;
