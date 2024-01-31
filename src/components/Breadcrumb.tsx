import React, { memo, useEffect, useState } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import IcHouse from "../assets/icons/IcHouse";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { publicRoutes } from "../utils/routers";
import { topicService } from "../services/toppic/topicService";
import { solutionService } from "../services/solution/solutionService";
import { productService } from "../services/product/productService";

interface Props {
  listBreads: { name: string; path: string }[];
}
const Breadcrumb = memo(({ listBreads }: Props) => {
  const [listBreadcrums, setListBreadcrums] = useState<
    { name: string; path: string }[]
  >([]);
  const location = useLocation();

  useEffect(() => {
    const pathName = location.pathname;
    const locationArr = pathName.split("/");
    const lastSegment = locationArr[locationArr.length - 1];
    const isNewsDetail =
      locationArr.includes("tin-tuc") && !isNaN(+lastSegment);
    const isSolutionDetail =
      locationArr.includes("giai-phap") && !isNaN(+lastSegment);
    const isProductDetail =
      locationArr.includes("san-pham") && !isNaN(+lastSegment);
    const detailName = publicRoutes.filter((plItem) =>
      plItem.path.includes(`/${locationArr[locationArr.length - 2]}`)
    );

    const buildInitialBreadcrumbs = () => {
      return locationArr.map((item, index) => {
        const plPath = publicRoutes.find((plItem) =>
          plItem.path.includes(`/${item}`)
        );
        if (plPath) {
          return {
            name: plPath.name,
            path: plPath.path,
          };
        } else {
          return {
            name:
              t("detail") + " " + (detailName[0] ? t(detailName[0].name) : ""),
            path: pathName,
          };
        }
      });
    };

    const updateBreadcrumbsDetail = async (type: "solution" | "news" | 'product') => {
      try {
        switch (type) {
          case "solution":
            const solutionItemDetails =
              await solutionService.getDetailsSolution(+lastSegment);
            setListBreadcrums((prevBreadcrumbs) => [
              ...prevBreadcrumbs.slice(0, -1),
              { name: solutionItemDetails.title, path: pathName },
            ]);
            break;
          case "news":
            const newsItemDetails = await topicService.getDetailsTopic(
              +lastSegment,
              { type: "NEWS" }
            );
            setListBreadcrums((prevBreadcrumbs) => [
              ...prevBreadcrumbs.slice(0, -1),
              { name: newsItemDetails.title, path: pathName },
            ]);
            break;

          case 'product':
            const productItemDetails = await productService.getDetailProduct(+lastSegment)
            setListBreadcrums((prevBreadcrumbs) => [
              ...prevBreadcrumbs.slice(0, -1),
              { name: productItemDetails.nameProduct, path: pathName }
            ])
            break
        }
      } catch (error) { }
    };

    const initialBreadcrumbs = buildInitialBreadcrumbs();
    setListBreadcrums(initialBreadcrumbs);

    if (isNewsDetail) {
      updateBreadcrumbsDetail("news");
    }

    if (isSolutionDetail) {
      updateBreadcrumbsDetail("solution");
    }

    if (isProductDetail) {
      updateBreadcrumbsDetail('product')
    }
  }, [location]);

  const { t } = useTranslation();
  return (
    <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 bg-whiteFAFAFA flex flex-wrap items-center gap-4 py-4">
      {listBreadcrums.map((item, index) => {
        return (
          <Link
            key={index}
            to={item.path}
            className={clsx("flex gap-3 pr-4 text-base text-main ", {
              "border-r-2  border-r-gray01 !text-gray01 ":
                index + 1 < listBreadcrums.length,
            })}
          >
            {index === 0 && <IcHouse />}
            {t(item.name)}
          </Link>
        );
      })}
    </div>
  );
});

export default Breadcrumb;
