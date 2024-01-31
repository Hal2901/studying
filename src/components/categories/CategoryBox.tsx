import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import IcTooltip from "../../assets/icons/IcTooltip";
import colors from "../../common/colors";
import { solutionCategoriesService } from "../../services/solution/solutionCategoriesService";
import { CategoryParent, PrCategory } from "../../types/categoriesType";
import { productCategoriesService } from "../../services/product/productCategoriesService";
import { publicPath } from "../../utils/routers";

interface Props {
  nameCategory: string;
  typeCategory: string;
  onCloseMenu?: () => void;
}
const CategoryBox = memo(
  ({ nameCategory, typeCategory, onCloseMenu }: Props) => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams] = useSearchParams();
    const categoryId = searchParams.get("danh-muc");
    const [categoriesList, setCategoriesList] = useState<CategoryParent[]>([]);
    const [parentId, setParentId] = useState<number>();
    const [childId, setChildId] = useState<number>();

    const handleActiveCategory = (id: number, index: number) => {
      switch (index) {
        case 0:
          if (parentId === id) {
            navigate("");
          } else {
            navigate(`${publicPath.solution.index}?danh-muc=${id}`);
          }
          break;

        case 1:
          navigate(`${publicPath.solution.index}?danh-muc=${id}`);
          break;

        default:
          break;
      }
    };
    const getListCategories = async () => {
      try {
        const { total, data } =
          await solutionCategoriesService.getListCategories();
        setCategoriesList(data);
      } catch (error) {
        return;
      }
    };
    useEffect(() => {
      getListCategories();
    }, []);

    useEffect(() => {
      if (categoriesList.length > 0 && categoryId) {
        categoriesList.forEach((item) => {
          if (item.id === +categoryId) {
            setParentId(+categoryId);
            setChildId(undefined);
          } else {
            item.children.forEach((itemChild) => {
              if (itemChild.id === +categoryId) {
                setParentId(item.id);
                setChildId(+categoryId);
              }
            });
          }
        });
      } else {
        setParentId(undefined);
        setChildId(undefined);
      }
    }, [categoriesList, categoryId]);

    return (
      <div className="w-full flex flex-col gap-6">
        <div className="xl:block hidden h-14 py-3 bg-bg03">
          <p className="pl-4 border-l-4 border-l-main text-2xl text-defaultText font-semibold">
            {t(nameCategory)}
          </p>
        </div>

        <div>
          {categoriesList.map((itemCate, indexCate) => {
            return (
              <div key={indexCate}>
                <div
                  className="flex xL:gap-4 gap-2 xl:pl-0 px-8 mb-2"
                  onClick={() => handleActiveCategory(itemCate.id!, 0)}
                >
                  <span className="xl:block hidden">
                    <IcTooltip
                      color={
                        parentId === itemCate.id ? colors.main : colors.gray01
                      }
                    />
                  </span>
                  <p
                    className={clsx(
                      "xl:text-xl text-base xl:!text-defaultText xl:!no-underline text-disabled xl:font-medium font-normal",
                      {
                        "!text-active underline":
                          parentId === itemCate.id &&
                          location.pathname.includes(publicPath.solution.index),
                      }
                    )}
                  >
                    {itemCate.title}
                  </p>
                </div>
                <div
                  className={clsx("grid transition-all duration-500", {
                    "grid-rows-[1fr]": parentId === itemCate.id,
                    "grid-rows-[0fr]": parentId !== itemCate.id,
                  })}
                >
                  <div className="ml-8 overflow-hidden">
                    {itemCate.children.map((child1, indexChild1) => {
                      return (
                        <div
                          key={indexChild1}
                          className="flex items-center gap-4 xl:pl-0 pl-3"
                        >
                          <div
                            className={clsx(
                              "flex items-center w-full gap-4 min-h-[40px] xl:text-base text-sm text-disabled xl:!text-defaultText xl:!no-underline",
                              {
                                "!text-active":
                                  childId === child1.id &&
                                  location.pathname.includes(
                                    publicPath.solution.index
                                  ),
                              }
                            )}
                            onClick={() => {
                              handleActiveCategory(child1.id!, 1);
                              onCloseMenu?.();
                            }}
                          >
                            {typeCategory === "product" ? (
                              <IcTooltip color={colors.gray01} />
                            ) : (
                              <span
                                className={clsx(
                                  "xl:block hidden text-40 text-gray01",
                                  {
                                    "!text-main": childId === child1.id,
                                  }
                                )}
                              >
                                &#8729;
                              </span>
                            )}
                            {child1.title}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
);

export default CategoryBox;
