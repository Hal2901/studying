import { useTranslation } from "react-i18next";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Autoplay,
  Navigation,
  Pagination,
  Scrollbar,
  A11y,
} from "swiper/modules";
import { useEffect, useState } from "react";
import { getUrlImage } from "../../../../utils/constants";
import { BannerData, typeBanner } from "../../../../types/BannerType";
import { bannerService } from "../../../../services/bannerService";

export function BannerHome() {
  const { t } = useTranslation();
  const [dataBanners, setDataBanners] = useState<BannerData[]>([]);
  const getBanner = async (type: typeBanner) => {
    try {
      const data = await bannerService.getBannerByType(type);
      setDataBanners(data);
    } catch (error) {}
  };

  useEffect(() => {
    getBanner("HOME");
  }, []);
  return (
    <div className="w-full">
      <Swiper
        modules={[Autoplay, Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        slidesPerView={1}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        scrollbar={{ draggable: true }}
        onSwiper={(swiper) => {}}
        onSlideChange={() => {}}
      >
        {dataBanners.map((item, index) => {
          return (
            <SwiperSlide
              key={index}
              className="w-full 2xl:h-600 lg:h-[400px] md:h-300 h-200"
            >
              <img
                src={getUrlImage(item.link) ?? ""}
                alt=""
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
