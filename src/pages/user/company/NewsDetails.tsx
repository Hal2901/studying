import React, { useEffect, useState } from "react";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { listBreads } from "../../../utils/common";
import TitlePage from "../../../components/TitlePage";
import SliderProposeItem from "../../../components/SliderProposeItem";
import { initialTypeTopic } from "../../../types/topicType";
import { topicService } from "../../../services/toppic/topicService";
import { useNavigate, useParams } from "react-router-dom";
import Loading from "../../Loading";
import NoContent from "../../NoContent";
import { solutionService } from "../../../services/solution/solutionService";
import { SizePage } from "../../../utils/constants";
import { solutionType } from "../../../types/solutionType";
import { SwiperSlide } from "swiper/react";
import CardItem from "../../../components/CardItem";

const NewsDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<initialTypeTopic>();
  const [listSolutions, setListSolutions] = useState<solutionType[]>([]);
  const getDetailsTopic = async (id: number) => {
    try {
      setLoading(true);
      const data = await topicService.getDetailsTopic(id, {
        type: "NEWS",
      });
      setData(data);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleViewDetails = (id: number) => {
    navigate(`/giai-phap/${id}`);
  };

  const handleFetchData = async () => {
    try {
      const { total, data } = await solutionService.getListSolutions({
        page: 0,
        size: SizePage,
        sort: "id,desc",
      });
      setListSolutions((prevState) => {
        return [...prevState, ...data];
      });
    } catch (error) {
      setListSolutions([]);
    }
  };
  useEffect(() => {
    if (id) {
      getDetailsTopic(+id);
      handleFetchData();
    }
  }, [id]);
  return (
    <div>
      <Banner typeBanner="NEWS" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 lg:py-88 py-10">
        <p className="lg:text-40 text-3xl font-semibold mb-10">{data?.title}</p>
        {loading ? (
          <Loading />
        ) : data ? (
          <div
            className="ql-editor mb-10"
            dangerouslySetInnerHTML={{ __html: data.content! ?? "" }}
          ></div>
        ) : (
          <NoContent />
        )}
        {listSolutions.length > 0 && (
          <div>
            <TitlePage text="proposed_solutions" />
            <SliderProposeItem
              slidesPerView={1}
              breakpoints={{
                480: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
              }}
            >
              {listSolutions.map((item, index) => {
                return (
                  <SwiperSlide key={index}>
                    <CardItem
                      handleButton={() => handleViewDetails(item.id!)}
                      item={item}
                    />
                  </SwiperSlide>
                );
              })}
            </SliderProposeItem>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewsDetails;
