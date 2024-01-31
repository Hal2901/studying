import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import IcArrowsNex from "../../assets/icons/IcArrowsNex";
import colors from "../../common/colors";
import { useSearchParamHook } from "../../hooks/useSearchParam";
import { productCategoriesService } from "../../services/product/productCategoriesService";
import { PrCategory } from "../../types/categoriesType";
import { getUrlImage } from "../../utils/constants";
import { publicPath } from "../../utils/routers";

interface subCateProps {
  item: {
    id: number;
    title: string;
    products: {
      id: number;
      nameProduct: string;
    }[];
  };
  onClose: () => void;
}

const SupCategoryItem = memo(({ item, onClose }: subCateProps) => {
  const { searchParams } = useSearchParamHook();
  const category = searchParams.get("productId");
  const idCategory = searchParams.get("danh-muc");
  const idSubCategory = searchParams.get("danh-muc-con");
  const navigate = useNavigate();
  const handleChoseCategory = (id?: number) => {
    navigate(
      id
        ? `${publicPath.product.index}?danh-muc=${idCategory}&danh-muc-con=${item.id}&productId=${id}`
        : `${publicPath.product.index}?danh-muc=${idCategory}&danh-muc-con=${item.id}`
    );
    onClose();
  };
  return (
    <div className="flex flex-col gap-4">
      <p
        className={clsx("text-lg text-defaultText font-medium", {
          "!text-main underline":
            idSubCategory && Number(idSubCategory) === item.id,
        })}
        onClick={() => handleChoseCategory()}
      >
        {item.title}
      </p>
      {
        <div className="flex flex-col gap-4">
          {item.products.map((pr, id) => {
            return (
              <p
                key={id}
                onClick={() => handleChoseCategory(pr.id)}
                className={clsx(
                  "text-base text-defaultText font-normal break-words",
                  {
                    "!text-main underline":
                      category && Number(category) === pr.id,
                  }
                )}
              >
                {pr.nameProduct}
              </p>
            );
          })}
        </div>
      }
    </div>
  );
});

const MenuProduct = ({ onClose }: { onClose: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { searchParams } = useSearchParamHook();
  const category = searchParams.get("danh-muc");
  const [dataProducts, setDataProducts] = useState<PrCategory[]>([]);
  const [subCategories, setSubcategories] = useState<PrCategory>();

  const handleChoseCategory = (item: PrCategory) => {
    navigate(`${publicPath.product.index}?danh-muc=${item.id}`);
  };
  const fetDataProductCategory = async () => {
    try {
      const { total, data } =
        await productCategoriesService.getListProductOfCategory();
      setDataProducts(data);
    } catch (error) {}
  };
  useEffect(() => {
    fetDataProductCategory();
  }, []);

  useEffect(() => {
    if (category && dataProducts.length > 0) {
      const detailCate = dataProducts.filter(
        (item) => item.id === Number(category)
      );
      setSubcategories(detailCate[0]);
    }
  }, [category, dataProducts]);
  return (
    <div className="w-screen h-400 menu bg-F5F5F5 z-50 grid grid-cols-3 pl-160 sc1800:top-[72px] top-[144px] left-0 fixed shadow-medium">
      <div className="border-r border-r-border py-12 flex flex-col gap-4 overflow-y-scroll hidden-scroll">
        <p className="text-2xl font-semibold text-defaultText border-l-4 border-l-main pl-3">
          {t("product")}
        </p>

        {dataProducts.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => handleChoseCategory(item)}
              className={clsx("text-base text-disabled w-fit cursor-pointer", {
                "text-main underline font-medium":
                  category && Number(category) === item.id!,
              })}
            >
              {item.title}
            </div>
          );
        })}
      </div>

      {subCategories && (
        <div className="border-r flex flex-col gap-6 pb-10 border-r-border py-12 px-6 overflow-y-scroll hidden-scroll">
          <div className="w-fit flex gap-2">
            <p
              className="text-base text-main font-medium w-fit underline capitalize"
              onClick={() => {
                navigate(publicPath.product.index);
                onClose();
              }}
            >
              {t("see_all")} {t("product")}
            </p>
            <IcArrowsNex color={colors.main} />
          </div>
          <p
            className={clsx(
              "text-2xl font-semibold text-defaultText pl-3 border-l-4 border-l-main "
            )}
          >
            {subCategories?.title}
          </p>

          <div className={clsx("grid grid-cols-2 gap-6")}>
            {subCategories.children &&
              subCategories.children.map((subCate, indexSub) => {
                return (
                  <SupCategoryItem
                    key={indexSub}
                    item={subCate}
                    onClose={onClose}
                  />
                );
              })}
          </div>
        </div>
      )}
      {subCategories?.link && (
        <div className="py-12 px-88">
          <img
            src={subCategories?.link ? getUrlImage(subCategories.link) : ""}
            alt=""
            className="w-full h-300 object-contain"
          />
        </div>
      )}
    </div>
  );
};

export default MenuProduct;
