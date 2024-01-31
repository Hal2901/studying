import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GeneralRenderCard from "../../../common/pages/GeneralRenderCard";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { topicService } from "../../../services/toppic/topicService";
import { initialTypeTopic } from "../../../types/topicType";
import { listBreads } from "../../../utils/common";
import { Params, SizePage } from "../../../utils/constants";
import { publicPath } from "../../../utils/routers";

const News = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<initialTypeTopic[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const handleChangeCurrentPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const param: Params = {
    type: "NEWS",
    page: currentPage - 1,
    size: SizePage,
    sort: "id,desc",
  };
  const handleFetchData = async () => {
    try {
      setLoading(true);
      const { total, data } = await topicService.getListTopic(param);
      if (data) {
        setListData([...listData, ...data]);
        setTotalPage(Math.ceil(total / SizePage));
      }
    } catch (error) {
      setListData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleFetchData();
  }, [currentPage]);
  const handleViewCertification = (data: any) => {
    navigate(`${publicPath.company.news}/${data.id}`);
  };
  return (
    <div>
      <Banner typeBanner="NEWS" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 lg:py-88 py-10">
        <GeneralRenderCard
          data={listData}
          loadding={loading}
          totalPage={currentPage < totalPage}
          handleBtn={handleViewCertification}
          handleShowmore={handleChangeCurrentPage}
          textBtn="see_more"
          titlePage="list_news"
        />
      </div>
    </div>
  );
};

export default News;
