import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import IcArrowsNex from "../../../../assets/icons/IcArrowsNex";
import { BannerProductSp } from "../../../../assets/images";
import colors from "../../../../common/colors";
import { Button } from "../../../../components/Button";
import ProductCard from "../../../../components/ProductCard";
import { useNavigate } from "react-router-dom";
import { publicPath } from "../../../../utils/routers";
import { productTypeRoot } from "../../../../types/productType";
import { Params } from "../../../../utils/constants";
import { productService } from "../../../../services/product/productService";

export function ProductSpecial() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [listProducts, setListProducts] = useState<productTypeRoot[]>();
  const navigationPrevRef = useRef<HTMLButtonElement>(null);
  const navigationNextRef = useRef(null);
  const handleViewDetailProduct = (id: number) => {
    navigate(publicPath.product.index + "/" + id);
  };
  const fetchProducts = async (params: Params) => {
    const { total, data } = await productService.getProductStatus(params);
    setListProducts(data);
  };
  useEffect(() => {
    const params = {
      page: 0,
      size: 24,
      sort: "id,desc",
    };
    fetchProducts(params);
  }, []);
  return (
    <div
      style={{ backgroundImage: `url(${BannerProductSp}` }}
      className="w-full h-auto sm:py-[120px] py-100 sc1800:pl-300 xl:pl-[155px] sm:pl-100 pl-5  min-h-[700px] object-cover grid  xl:grid-cols-[424px_1fr] grid-cols-1 gap-10 xl:gap-9"
    >
      <div className="h-full flex flex-col gap-6 justify-between">
        <div className="sm:pr-0 pr-5">
          <p className="mt-5 text-white xs:text-40 text-3xl font-semibold leading-[52px] mb-[26px]">
            {t("list_product_special")}
          </p>
          <p className="mt-5 text-white text-base  mb-[26px]">
            {t("list_product_sub")}
          </p>
          {listProducts && (
            <div className="flex items-center gap-6">
              <button
                ref={navigationPrevRef}
                className="flex items-center justify-center  rotate-180 rounded-1/2  xl:w-14 xl:h-14 w-10 h-10 border border-white hover:bg-color_cyan"
              >
                <IcArrowsNex />
              </button>
              <button
                ref={navigationNextRef}
                className="flex items-center justify-center rounded-1/2  xl:w-14 xl:h-14 w-10 h-10 border border-white hover:bg-color_cyan"
              >
                <IcArrowsNex />
              </button>
            </div>
          )}
        </div>
        <Button
          color="empty"
          text="see_all"
          className="px-6 py-3 !w-fit !bg-white"
          image={<IcArrowsNex color={colors.text_main} />}
          onClick={() => navigate(publicPath.product.index)}
        />
      </div>
      {listProducts && (
        <div className="w-full overflow-hidden">
          <Swiper
            modules={[Navigation, Pagination, Scrollbar, A11y]}
            spaceBetween={10}
            slidesPerView={1.1}
            breakpoints={{
              375: {
                slidesPerView: 1.3,
              },
              480: {
                slidesPerView: 1.5,
                spaceBetween: 24,
              },
              768: {
                slidesPerView: 2.5,
                spaceBetween: 16,
              },
              1024: {
                slidesPerView: 3.5,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 2.5,
                spaceBetween: 16,
              },
              1536: {
                slidesPerView: 3.5,
                spaceBetween: 24,
              },
            }}
            navigation={{
              prevEl: navigationPrevRef.current,
              nextEl: navigationNextRef.current,
            }}
            pagination={false}
            scrollbar={{ draggable: true }}
            onSwiper={(swiper: any) => {
              setTimeout(() => {
                swiper.params.navigation.prevEl = navigationPrevRef.current;
                swiper.params.navigation.nextEl = navigationNextRef.current;
                swiper.navigation.init();
                swiper.navigation.update();
              }, 300);
            }}
            className="grid grid-cols-4 gap-6"
          >
            {listProducts.map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <ProductCard
                    item={item}
                    onClickPr={() => handleViewDetailProduct(item.id!)}
                  />
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      )}
    </div>
  );
}
