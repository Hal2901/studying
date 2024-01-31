import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import "swiper/css/pagination";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import IcArrowsNex from "../../../../assets/icons/IcArrowsNex";
import colors from "../../../../common/colors";
import CardItem from "../../../../components/CardItem";
import { Button } from "../../../../components/Button";
import { topicService } from "../../../../services/toppic/topicService";
import { initialTypeTopic } from "../../../../types/topicType";
import { publicPath } from "../../../../utils/routers";

const HomeNew = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);

  const [news, setNews] = useState<initialTypeTopic[]>([]);
  const getNews = async () => {
    try {
      const { total, data } = await topicService.getListTopic({
        size: 20,
        sort: `id,desc`,
        type: "NEWS",
      });

      setNews(data);
    } catch (error) { }
  };

  const handleViewDetailNews = (id: number) => {
    navigate(`${publicPath.company.news}/${id}`);
  };

  useEffect(() => {
    getNews();
  }, []);
  return (
    <div className="w-full h-auto bg-white ">
      <div className="bg-main h-[220px]"></div>
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-16 -mt-[200px] lg:pb-[135px] pb-10">
        <p className="text-white lg:text-[68px] text-3xl font-medium leading-[100px]">
          {t("news")}
        </p>

        {news.length > 0 && (
          <div className="w-full relative">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              slidesPerView={1}
              spaceBetween={0}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 16,
                },
                992: {
                  slidesPerView: 3,
                  spaceBetween: 16,
                },
              }}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              onInit={(swiper: any) => {
                setTimeout(() => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }, 300);
              }}
              pagination={false}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper) => console.log(swiper)}
              onSlideChange={(swiper) => swiper}
              className="py-10"
            >
              {news.map((news, index) => {
                return (
                  <SwiperSlide key={index}>
                    <CardItem
                      scale={true}
                      handleButton={() => handleViewDetailNews(news.id!)}
                      textBtn="see_more"
                      item={news}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <button
              ref={navigationPrevRef}
              className="flex items-center justify-center  rotate-180 p-3 absolute top-1/2 -translate-y-1/2 -left-16 z-30"
            >
              <IcArrowsNex color={colors.disable_color} width={50} />
            </button>
            <button
              ref={navigationNextRef}
              className="flex items-center justify-center p-3 absolute top-1/2 -translate-y-1/2 -right-16 z-30"
            >
              <IcArrowsNex width={50} color={colors.disable_color} />
            </button>
            <Button
              className="w-max px-6 py-3 mx-auto"
              color="empty"
              text="see_all"
              image={<IcArrowsNex color={colors.main} />}
              onClick={() => {
                navigate("cong-ty/tin-tuc");
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeNew;
