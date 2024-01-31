import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { Button } from "../../../components/Button";
import TitlePage from "../../../components/TitlePage";
import CategoryBox from "../../../components/categories/CategoryBox";
import { solutionService } from "../../../services/solution/solutionService";
import { solutionType } from "../../../types/solutionType";
import { listBreads } from "../../../utils/common";
import { Params, SizePage } from "../../../utils/constants";
import Loading from "../../Loading";
import NoContent from "../../NoContent";
import SolutionItem from "./component/SolutionItem";

export default function SolutionPage() {
  const [searchParams] = useSearchParams();
  const category = searchParams.get("danh-muc");
  const [loading, setLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<solutionType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const handleSetCurrentPage = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handleFetchData = async (params: Params) => {
    try {
      setLoading(true);
      const { total, data } = await solutionService.getListSolutions(params);
      setTotalPage(Math.ceil(total / SizePage));
      setListData((prevState) => {
        return currentPage > 1 ? [...prevState, ...data] : data;
      });
    } catch (error) {
      if (!category) {
        setListData([]);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const param: Params = {
      page: currentPage - 1,
      size: SizePage,
      sort: "id,desc",
      category: category ?? "",
    };
    handleFetchData(param);
  }, [currentPage, category]);
  return (
    <div>
      <Banner typeBanner="SOLUTION" />
      <Breadcrumb listBreads={listBreads} />

      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5  lg:py-88 py-10">
        <TitlePage text="list_solution" />
        <div className="min-h-screen grid lg:grid-cols-[300px_1fr] grid-cols-1 gap-6 max-h-screen overflow-y-scroll hidden-scroll pt-2">
          <div className="max-h-screen h-full overflow-y-scroll hidden-scroll shadow-md lg:block hidden">
            <CategoryBox nameCategory="solution" typeCategory="solution" />
          </div>

          {loading ? (
            <Loading />
          ) : listData.length === 0 ? (
            <NoContent />
          ) : (
            <div className="grid gap-y-10">
              {listData.map((item, index) => {
                return <SolutionItem key={index} item={item} />;
              })}
            </div>
          )}

          {currentPage < totalPage && (
            <div className="px-3">
              <Button
                color="empty"
                text="see_more"
                className="px-6 py-3"
                onClick={handleSetCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
