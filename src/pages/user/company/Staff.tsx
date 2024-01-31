import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { SwiperSlide } from "swiper/react";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import SliderProposeItem from "../../../components/SliderProposeItem";
import { topicService } from "../../../services/toppic/topicService";
import { initialTypeTopic } from "../../../types/topicType";
import { listBreads } from "../../../utils/common";
import { Params } from "../../../utils/constants";
import Loading from "../../Loading";
import NoContent from "../../NoContent";
import StaffItem from "./component/StaffItem";

const Staff = () => {
  const { t } = useTranslation();
  const [listData, setListData] = useState<initialTypeTopic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const param: Params = {
    type: "EMPLOYEE",
    page: 0,
    sort: "id,desc",
  };

  const handleFetchData = async () => {
    try {
      setLoading(true);
      const { total, data } = await topicService.getListTopic(param);
      if (data) {
        setListData(data);
      }
    } catch (error) {
      setListData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <div>
      <Banner typeBanner="EMPLOYEE" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 lg:py-88 py-10 flex flex-col items-center">
        <p className="lg:text-40 text-3xl font-semibold mb-10 text-center 2xl:max-w-[60%]">
          {t("staff_of_company")}
        </p>
        {loading ? (
          <Loading />
        ) : listData.length === 0 ? (
          <NoContent />
        ) : (
          <SliderProposeItem
            slidesPerView={1}
            breakpoints={{
              480: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1280: {
                slidesPerView: 6,
              },
            }}
          >
            {listData.map((staff, index) => {
              return (
                <SwiperSlide key={index}>
                  <StaffItem item={staff} />
                </SwiperSlide>
              );
            })}
          </SliderProposeItem>
        )}
      </div>
    </div>
  );
};

export default Staff;
