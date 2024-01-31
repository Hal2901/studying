import { ReactNode, memo, useRef } from "react";
import { useTranslation } from "react-i18next";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperProps } from "swiper/react";
import IcArrowsNex from "../assets/icons/IcArrowsNex";
import colors from "../common/colors";

type Props = {
  spaceBetween?: number;
  slidesPerView?: number;
  typeCard?: "new" | "products";
  children?: ReactNode;
} & SwiperProps;
const SliderProposeItem = memo(
  ({
    spaceBetween = 16,
    slidesPerView = 3,
    children,
    typeCard = "new",
    ...props
  }: Props) => {
    const { t } = useTranslation();
    const navigationPrevRef = useRef(null);
    const navigationNextRef = useRef(null);
    return (
      <div className="w-full relative sm:pt-0 pt-10">
        <Swiper
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          spaceBetween={spaceBetween}
          slidesPerView={slidesPerView}
          {...props}
          navigation={{
            prevEl: navigationPrevRef.current,
            nextEl: navigationNextRef.current,
          }}
          onSwiper={(swiper: any) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            }, 300);
          }}
          onSlideChange={(swiper) => swiper}
          className="pb-10 px-1 pt-1"
        >
          {
            children
            // ??
            // [1, 2, 3, 4, 5, 6].map((news, index) => {
            //   return (
            //     <SwiperSlide key={index}>
            //       {typeCard === "new" ? (
            //         <CardItem
            //           handleButton={() => {}}
            //           item={{
            //             link: ,
            //             title: "Product Marketing: Monopoly Market",
            //             createdDate: "22 / 12 / 2024",
            //           }}
            //         />
            //       ) : (
            //         <ProductCard onClickPr={() => {}} />
            //       )}
            //     </SwiperSlide>
            //   );
            // })
          }
        </Swiper>
        <button
          ref={navigationPrevRef}
          className="flex items-center justify-center w-10 h-10 rounded-1/2 sm:border-none border rotate-180 p-3 absolute sm:top-1/2 top-0 sm:-translate-y-1/2 sm:-left-16 left-2 z-30"
        >
          <IcArrowsNex color={colors.disable_color} width={50} />
        </button>
        <button
          ref={navigationNextRef}
          className="flex items-center justify-center p-3 w-10 h-10 rounded-1/2 sm:border-none border absolute sm:top-1/2 top-0 sm:-translate-y-1/2 sm:-right-16 xs:right-3/4 right-[60%] z-30"
        >
          <IcArrowsNex width={50} color={colors.disable_color} />
        </button>
      </div>
    );
  }
);

export default SliderProposeItem;
