import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import SolutionItem from "./SolutionItem";
import { solutionService } from "../../../../services/solution/solutionService";
import { solutionType } from "../../../../types/solutionType";

const Solution = () => {
  const { t } = useTranslation();
  const [solutions, setSolutions] = useState<solutionType[]>([]);
  const getSolutions = async () => {
    try {
      const { data } = await solutionService.getListSolutions({
        page: 0,
        size: 3,
        sort: `id,desc`,
      });
      setSolutions(data);
    } catch (error) {}
  };

  useEffect(() => {
    getSolutions();
  }, []);
  return (
    <div className="md:py-[120px] py-100">
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 mb-16 flex items-center gap-6">
        <div className="md:text-40 text-3xl text-defaultText break-words font-semibold 2xl:max-w-[60%] w-full border-l-[16px] border-l-color_cyan pl-10">
          {t("solution_has_been_implement")}
        </div>
      </div>
      {solutions.map((solution, index) => {
        return (
          <SolutionItem
            key={index}
            index={index}
            reverse={index % 2 != 0}
            item={solution}
          />
        );
      })}
    </div>
  );
};

export default Solution;
