import clsx from "clsx";
import { ReactNode, memo, useContext } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import IcDownload from "../assets/icons/IcDowload";
import IcPlusCircle from "../assets/icons/IcPlusCircle";
import { ModalContext } from "../context";
import { useDownloadFile } from "../hooks/useDownloadFile";
import RegisterSuccess from "../pages/user/partner/component/RegisterSuccess";
import { listProductVarian, productTypeRoot } from "../types/productType";
import { formatCurrency, getUrlImage } from "../utils/constants";
import { publicPath } from "../utils/routers";

type BoxType = {
  props: {
    text: string;
    icon: ReactNode;
    func: () => void;
    className?: string;
    maxWidth?: string;
  };
};

interface Props {
  item?: productTypeRoot;
  itemVarian?: listProductVarian;
  viewList?: boolean;
  onClickPr: () => void;
}
export const BoxButtonHandle = memo(({ props }: BoxType) => {
  const { t } = useTranslation();
  return (
    <div
      className={
        "h-12 border border-border rounded-10 flex flex-wrap justify-between overflow-hidden " +
        props.className
      }
    >
      <div
        className={
          "text-base px-6 flex items-center justify-center h-full " +
          (props?.maxWidth ?? "max-w-[calc(100%-_48px)]")
        }
      >
        {t(props.text)}
      </div>
      <div
        onClick={props.func}
        className="cursor-pointer w-12 h-full rounded-r-10 bg-main flex items-center justify-center"
      >
        {props.icon}
      </div>
    </div>
  );
});
const ProductCard = ({
  item,
  itemVarian,
  viewList = false,
  onClickPr,
}: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { setModal } = useContext(ModalContext);
  const { handleDownload, handleDownloadMultipleFile } = useDownloadFile();

  const handleRegisterSuccess = () => {
    setModal(<RegisterSuccess mdPr={true} />);
  };
  const handleAddFavorite = (item: any) => {
    const listProductFavorite = localStorage.getItem("productFavorite");
    if (listProductFavorite) {
      const listData = JSON.parse(listProductFavorite);

      const checkId = listData.filter(
        (favorite: any) => favorite.id === item.id
      );
      if (checkId.length > 0) {
        toast.warning(t("product_is_in_favorite"));
      } else {
        if (listData.length >= 20) {
          return toast.error(t("max_pr_favorite"));
        }
        localStorage.setItem(
          "productFavorite",
          JSON.stringify([...listData, item])
        );
        handleRegisterSuccess();
      }
      return;
    }
    localStorage.setItem("productFavorite", JSON.stringify([item]));
    handleRegisterSuccess();
  };

  const handleViewDetailProduct = (id: number) => {
    navigate(publicPath.product.index + "/" + id);
  };

  if (item) {
    return (
      <div
        className={clsx(
          "h-auto bg-white w-full p-6 gap-6 shadow-normal rounded-[4px]",
          {
            "min-h-[490px] flex flex-col": !viewList,
            "2xl:min-h-[230px] 2xl:grid 2xl:grid-cols-[200px_1fr] 2xl:items-center min-h-[490px] flex flex-col":
              viewList,
          }
        )}
      >
        <div
          className="w-full h-[145px]"
          onClick={() => handleViewDetailProduct(item.id!)}
        >
          <img
            src={
              item?.productImages[0]
                ? getUrlImage(item?.productImages[0].link)
                : ""
            }
            alt=""
            className="object-contain w-full h-full cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p
            className="text-base text-main font-bold break-words line-clamp-2 h-12"
            onClick={() => handleViewDetailProduct(item.id!)}
          >
            {item?.nameProduct}
          </p>
          <p className="text-base text-defaultText line-clamp-3 h-[72px]">
            {item?.infoProduct}
          </p>
          <p className="text-base text-defaultText font-medium">
            {t("suggest_price")}: &nbsp;
            <span className="text-danger">
              {parseInt(item.price)
                ? formatCurrency(item.price) + "VND"
                : item.price}
            </span>
          </p>
          <div
            className={clsx("grid gap-6", {
              "grid-cols-1": !viewList,
              "2xl:grid-cols-2 grid-cols-1": viewList,
            })}
          >
            <BoxButtonHandle
              props={{
                text: "file_document",
                icon: <IcDownload />,
                func: () =>
                  handleDownloadMultipleFile(
                    [
                      item.linkFile1,
                      item.linkFile2,
                      item.linkFile3,
                      item.linkFile4,
                    ],
                    "File tài liệu"
                  ),
              }}
            />
            <BoxButtonHandle
              props={{
                text: "list_favorite",
                icon: <IcPlusCircle />,
                func: () => handleAddFavorite(item),
              }}
            />
          </div>
        </div>
      </div>
    );
  } else if (itemVarian) {
    return (
      <div
        className={clsx(
          "h-auto bg-white w-full p-6 gap-6 shadow-normal rounded-[4px]",
          {
            "min-h-[490px] flex flex-col": !viewList,
            "2xl:min-h-[230px] 2xl:grid 2xl:grid-cols-[200px_1fr] 2xl:items-center min-h-[490px] flex flex-col":
              viewList,
          }
        )}
      >
        <div className="w-full h-[145px]" onClick={onClickPr}>
          <img
            src={
              itemVarian.productValues[0]
                ? getUrlImage(itemVarian.productValues[0].value)
                : ""
            }
            alt=""
            className="object-contain w-full h-full cursor-pointer"
          />
        </div>
        <div className="flex flex-col gap-4">
          <p
            className="text-base text-main h-12 font-bold break-words line-clamp-2"
            onClick={onClickPr}
          >
            {itemVarian?.productValues[1].value}
          </p>
          <p className="text-base text-defaultText line-clamp-3 h-[72px]">
            {itemVarian?.productValues[3].value}
          </p>
          <p className="text-base text-defaultText font-medium h-12 line-clamp-2">
            {t("suggest_price")}: &nbsp;
            <span className="text-danger">
              {Number(itemVarian?.productValues[2].value)
                ? formatCurrency(itemVarian?.productValues[2].value) + "VND"
                : itemVarian?.productValues[2].value}
            </span>
          </p>
          <div
            className={clsx("grid gap-6", {
              "grid-cols-1": !viewList,
              "2xl:grid-cols-2 grid-cols-1": viewList,
            })}
          >
            <BoxButtonHandle
              props={{
                text: "file_document",
                icon: <IcDownload />,
                func: () =>
                  handleDownload(
                    itemVarian.productValues[
                      itemVarian.productValues.length - 1
                    ].value,
                    "File tài liệu"
                  ),
              }}
            />
            <BoxButtonHandle
              props={{
                text: "list_favorite",
                icon: <IcPlusCircle />,
                func: () => handleAddFavorite(itemVarian),
              }}
            />
          </div>
        </div>
      </div>
    );
  }
  return;
};

export default ProductCard;
