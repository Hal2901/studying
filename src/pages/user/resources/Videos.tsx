import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import IcYtb from "../../../assets/icons/IcYtb";
import GeneralRenderCard from "../../../common/pages/GeneralRenderCard";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { topicService } from "../../../services/toppic/topicService";
import { initialTypeTopic } from "../../../types/topicType";
import { listBreads } from "../../../utils/common";
import { Params, SizePage } from "../../../utils/constants";

const Videos = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<initialTypeTopic[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const handleChangeCurrentPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handeViewVideoYoutube = (item: any) => {
    window.open(item.link!);
  };

  const param: Params = {
    type: "VIDEO",
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

  return (
    <div>
      <Banner typeBanner="VIDEO" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5  lg:py-88 py-10">
        <GeneralRenderCard
          isVideo={true}
          iconCard={<IcYtb />}
          data={listData}
          loadding={loading}
          totalPage={currentPage < totalPage}
          handleBtn={handeViewVideoYoutube}
          handleForwardOfContent={() => {}}
          handleShowmore={handleChangeCurrentPage}
          textBtn="see_video"
          titlePage="list_video"
        />
      </div>
    </div>
  );
};

export default Videos;
