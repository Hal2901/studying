import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import IcBagua from "../../../assets/icons/IcBagua";
import IcCard from "../../../assets/icons/IcCard";
import IcResource from "../../../assets/icons/IcResource";
import IcSetting from "../../../assets/icons/IcSetting";
import colors from "../../../common/colors";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { listBreads } from "../../../utils/common";
import ProductActionBox from "./component/ProductActionBox";
import ProductVariation from "./component/ProductVariation";

import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ShareIcon from "../../../assets/icons/ShareIcon";
import ViewIcon from "../../../assets/icons/ViewIcon";
import { Button } from "../../../components/Button";
import { useDownloadFile } from "../../../hooks/useDownloadFile";
import { productService } from "../../../services/product/productService";
import { productTypeRoot } from "../../../types/productType";
import {
  URL_FILE,
  formatCurrency,
  getUrlImage,
} from "../../../utils/constants";
import NoContent from "../../NoContent";
import ProductSpecial from "./component/ProductSpecial";
import Support from "./component/Support";
import { publicPath } from "../../../utils/routers";
import Loading from "../../Loading";
const listFilter = [
  { name: "product_variation", id: 1 },
  { name: "special", id: 2 },
  { name: "product_support", id: 3 },
];

const listBoxAction = [
  {
    icon: <IcCard />,
    text: "order_guide",
  },
  {
    icon: <IcSetting />,
    text: "setting",
  },
  {
    icon: <IcResource color={colors.main} />,
    text: "data_table",
  },
  {
    icon: <IcBagua />,
    text: "image_example",
  },
];
const ProductDetails = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const { handleDownload } = useDownloadFile();
  const [detailsId, setDetailsId] = useState<number>(listFilter[0].id);
  const [loading, setLoading] = useState<boolean>(false);
  const [urlImage, setUrlImage] = useState("");
  const [productDetail, setProductDetails] = useState<productTypeRoot>();

  const getProductDetails = async (id: number) => {
    try {
      setLoading(true);
      const result = await productService.getDetailProduct(id);
      setProductDetails(result);
      setUrlImage(result.productImages[0].link);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };
  const handleCopyUrlIntoClipBoard = (text: string, name: string) => {
    try {
      navigator.clipboard
        .writeText(text)
        .then(() => {
          toast.success(t("message.success.copy_url", { name }));
        })
        .catch((error) => {
          toast.error(t("message.error.copy_url", { name }));
        });
    } catch (error) {}
  };
  const handleFileProduct = (index: number, isDownload?: boolean) => {
    try {
      if (productDetail) {
        let link = "";
        let urlLink = "";
        let nameFile = "";

        switch (index) {
          case 0:
            link = productDetail.linkFile1;
            urlLink = productDetail?.linkPath1;
            nameFile = "File hướng dẫn đặt hàng";
            break;
          case 1:
            link = productDetail.linkFile2;
            urlLink = productDetail.linkPath2;
            nameFile = "File cài đặt";
            break;
          case 2:
            link = productDetail.linkFile3;
            urlLink = productDetail.linkPath3;
            nameFile = "File bảng dữ liệu";
            break;
          case 3:
            link = productDetail.linkFile4;
            urlLink = productDetail.linkPath4;
            nameFile = "File hình minh họa";
            break;
          default:
            break;
        }
        if (isDownload) {
          link && link !== "" && handleDownload(link, nameFile);
        } else {
          urlLink &&
            urlLink != "" &&
            handleCopyUrlIntoClipBoard(URL_FILE + urlLink, nameFile);
        }
      }
    } catch (error) {}
  };
  const handleViewOutlook = () => {
    window.open("https://outlook.com", "_blank");
  };
  useEffect(() => {
    if (id) {
      getProductDetails(+id);
    }
  }, [id]);

  return (
    <div>
      <Banner typeBanner="PRODUCT" />
      <Breadcrumb listBreads={listBreads} />
      {loading ? (
        <div className="h-screen">
          <Loading />
        </div>
      ) : productDetail ? (
        <div>
          <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5  lg:py-100 py-10">
            <div className="grid xl:grid-cols-2 grid-cols-1 gap-4">
              <div className="w-full flex flex-col gap-6 items-center justify-between overflow-hidden">
                <div className="xl:h-[528px] h-300 flex justify-center border">
                  <img
                    src={getUrlImage(urlImage) ?? ""}
                    alt=""
                    className=" object-contain max-h-full"
                  />
                </div>

                <div className="w-full">
                  <Swiper
                    spaceBetween={2}
                    slidesPerView={3}
                    breakpoints={{
                      480: {
                        slidesPerView: 4,
                        spaceBetween: 2,
                      },
                    }}
                    freeMode={true}
                    watchSlidesProgress={true}
                    modules={[FreeMode, Navigation, Thumbs]}
                    className="mySwiper"
                  >
                    {productDetail.productImages.map((item, index) => {
                      return (
                        <SwiperSlide
                          key={index}
                          className="h-16 cursor-pointer "
                        >
                          <img
                            onClick={() => setUrlImage(item.link)}
                            src={getUrlImage(item.link)}
                            alt=""
                            className={clsx("w-full object-contain h-full ", {
                              "border border-active": urlImage === item.link,
                            })}
                          />
                        </SwiperSlide>
                      );
                    })}
                  </Swiper>
                </div>
              </div>
              <div className="flex flex-col gap-6 xl:mt-0 mt-6">
                <p className="break-words text-main lg:text-3xl text-xl font-semibold">
                  {productDetail.nameProduct}
                </p>
                <p className="font-medium ">{t("infor_pr")}</p>
                <p className="break-words sm:text-base text-sm">
                  {productDetail.infoProduct}
                </p>
                <p className="font-medium">{t("document_technical")}</p>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
                  {[
                    productDetail.linkFile1,
                    productDetail.linkFile2,
                    productDetail.linkFile3,
                    productDetail.linkFile4,
                  ].map((item, index) => {
                    if (item && item !== "") {
                      return (
                        <ProductActionBox
                          key={index}
                          icon={listBoxAction[index].icon}
                          text={listBoxAction[index].text}
                          onCopy={() => handleFileProduct(index)}
                          onDownload={() => handleFileProduct(index, true)}
                        />
                      );
                    }
                    return;
                  })}
                  {/* {listBoxAction.map((action, index) => {
                    return (
                      <ProductActionBox
                        key={index}
                        icon={action.icon}
                        text={action.text}
                        onCopy={() => handleFileProduct(index)}
                        onDownload={() => handleFileProduct(index, true)}
                      />
                    );
                  })} */}
                </div>
                <div className="flex flex-wrap gap-6 items-center">
                  <Button
                    text={"view_partner"}
                    color="normal"
                    className="max-w-[173px]"
                    imageLeft={<ViewIcon />}
                    onClick={() => navigate(publicPath.partner.index)}
                  />
                  <Button
                    text={"share"}
                    color="primary"
                    className="max-w-[173px]"
                    imageLeft={<ShareIcon />}
                    onClick={handleViewOutlook}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 flex bg-whiteFAFAFA border-b border-b-border">
            {listFilter.map((btn, indexBtnn) => {
              return (
                <button
                  key={indexBtnn}
                  onClick={() => {
                    setDetailsId(btn.id);
                    navigate("");
                  }}
                  className={clsx(
                    "h-16 flex items-center justify-center font-medium w-200 md:text-base xs:text-sm text-xs",
                    {
                      "text-white bg-main": detailsId == btn.id,
                    }
                  )}
                >
                  {t(btn.name)}
                </button>
              );
            })}
          </div>
          <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5  lg:py-100 py-10">
            {detailsId === 1 && (
              <ProductVariation
                data={{
                  name: productDetail.nameProduct,
                  productKeys: productDetail.productKeys,
                  productVariants: productDetail.productVariants,
                }}
              />
            )}
            {detailsId === 2 && (
              <ProductSpecial dataSpecial={productDetail.productSpecs} />
            )}
            {detailsId === 3 && (
              <Support item={productDetail.productSupports} />
            )}
          </div>
        </div>
      ) : (
        <NoContent />
      )}
    </div>
  );
};

export default ProductDetails;
