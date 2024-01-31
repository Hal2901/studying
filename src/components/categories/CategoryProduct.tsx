import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useSearchParams } from "react-router-dom";
import IcPlusAdd from "../../assets/icons/IcPlusAdd";
import IcTooltip from "../../assets/icons/IcTooltip";
import colors from "../../common/colors";
import { productCategoriesService } from "../../services/product/productCategoriesService";
import { productService } from "../../services/product/productService";
import { PrCategory } from "../../types/categoriesType";
import { productFilter } from "../../types/productType";
import { publicPath } from "../../utils/routers";
import { ModalContext } from "../../context";
import { Params } from "../../utils/constants";

const CategoryProduct = ({ onCloseMenu }: { onCloseMenu?: () => void }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { productFilter, handleActiveProductFilter, setProductFilter } =
    useContext(ModalContext);
  const [searchParams, setSearchParam] = useSearchParams();
  const categoryId = searchParams.get("danh-muc");
  const categoryIdChild = searchParams.get("danh-muc-con");
  const productId = searchParams.get("productId");
  const filterParam = searchParams.get("filter");
  const [categoriesList, setCategoriesList] = useState<PrCategory[]>([]);
  const [categoriesActive, setCategoriesActive] = useState<PrCategory[]>();
  const [listProductFilter, setListProductFilter] = useState<productFilter[]>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);

  const handleChoseCategory = (
    id: number,
    idParent?: number,
    prId?: boolean
  ) => {
    if (prId) {
      navigate(
        `${publicPath.product.index}?danh-muc=${categoryId}&danh-muc-con=${categoryIdChild}&productId=${id}`
      );
      if (productId && Number(productId) === id) {
        return;
      }
      setCurrentPage(1);
      setListProductFilter(undefined);
      setProductFilter(undefined);
      return;
    }
    if (idParent) {
      if (categoryIdChild && Number(categoryIdChild) === id) {
        navigate(``);
      } else {
        navigate(
          `${publicPath.product.index}?danh-muc=${idParent}&danh-muc-con=${id}`
        );
      }
    }
    setProductFilter(undefined);
  };

  // const handleFilter

  const handleFilter = (id: number) => {
    const rootParam = searchParams.toString();
    if (filterParam) {
      const checkIdFilter = filterParam.includes(`${id}`);
      if (checkIdFilter) {
        const newFilter = filterParam.split(",");
        const modifyFilter = newFilter.filter((item) => item !== id.toString());
        const newPath =
          modifyFilter.length > 0
            ? rootParam.slice(0, rootParam.indexOf("filter")) +
              `filter=${modifyFilter.join()}`
            : rootParam.slice(0, rootParam.indexOf("filter") - 1);

        setSearchParam(newPath);
      } else {
        setSearchParam(`${rootParam},${id}`);
      }
    } else {
      setSearchParam(`${rootParam}&filter=${id}`);
    }
  };

  const getListCategories = async () => {
    try {
      const { total, data } =
        await productCategoriesService.getListProductOfCategory();
      setCategoriesList(data);
    } catch (error) {}
  };
  const getFilterByProductId = async (params: Params) => {
    try {
      const { total, data } = await productService.getFilterByProductId(params);
      setListProductFilter((prevState) =>
        prevState ? [...prevState, ...data] : data
      );
      setTotalPage(Math.ceil(total / 5));
    } catch (error) {
      setListProductFilter(undefined);
    }
  };
  useEffect(() => {
    getListCategories();
  }, []);
  useEffect(() => {
    if (productId) {
      getFilterByProductId({
        idProduct: +productId,
        size: 5,
        page: currentPage - 1,
      });
    } else {
      setListProductFilter(undefined);
    }
  }, [productId, currentPage]);

  useEffect(() => {
    if (categoryId && categoryIdChild) {
      const data = categoriesList.filter(
        (item) => item.id === Number(categoryId)
      );
      data.length > 0 && setCategoriesActive(data);
    } else {
      setCategoriesActive(undefined);
    }
  }, [categoryId, categoryIdChild, categoriesList]);

  const handleViewMore = () => {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="w-full flex flex-col gap-6">
      {categoryId && categoryIdChild && listProductFilter && (
        <div className="xl:px-0 px-8">
          <div className="h-14 py-3 bg-bg03 mb-4">
            <p className="pl-4 border-l-4 border-l-main text-2xl text-defaultText font-semibold">
              {t("filter")}
            </p>
          </div>
          <div>
            {listProductFilter.map((filter, indexFilter) => {
              return (
                <div key={indexFilter} className="w-full mb-4 pb-4 border-b">
                  <div
                    className=" gap-2 xl:pl-4 xl:text-xl text-base flex items-center justify-between font-medium h-10 w-full cursor-pointer"
                    onClick={() => handleFilter(filter.id)}
                  >
                    {filter.name}
                    <IcPlusAdd color={colors.black} />
                  </div>
                  <div
                    className={clsx(
                      "grid transition-all duration-500 " +
                        (filterParam?.includes(filter.id.toString())
                          ? "grid-rows-[1fr]"
                          : "grid-rows-[0fr]")
                    )}
                  >
                    <div className="xl:pl-4  overflow-hidden">
                      {filter.list.map((obj, index) => {
                        const prValue =
                          productFilter &&
                          productFilter.filter((pr) => pr.id === filter.id);
                        const checked =
                          prValue &&
                          prValue.length > 0 &&
                          prValue[0].list.filter((vl) => vl.value === obj.value)
                            .length > 0;
                        return (
                          <label
                            key={index}
                            className="flex items-center xl:gap-4 gap-2 w-full"
                          >
                            <input
                              type="checkbox"
                              className="w-4 h-4"
                              checked={checked}
                              onChange={() =>
                                handleActiveProductFilter(filter, index)
                              }
                            />
                            <div className="text-base font-normal w-auto max-w-[calc(100%_-32px)]">
                              {obj.value}
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  </div>
                </div>
              );
            })}

            {currentPage < totalPage && (
              <div
                className="text-sm text-active text-center p-2 mt-2 cursor-pointer"
                onClick={handleViewMore}
              >
                {t("see_more")}
              </div>
            )}
          </div>
        </div>
      )}
      <div className="xl:block hidden h-14 py-3 bg-bg03 ">
        <p className="pl-4 border-l-4 border-l-main text-2xl text-defaultText font-semibold">
          {t("product")}
        </p>
      </div>
      <div
      // className="h-[310px] overflow-hidden"
      >
        {[...(categoriesActive ?? categoriesList)].map(
          (itemCate, indexCate) => {
            return (
              <div key={indexCate}>
                {itemCate.children.map((child, indexChild) => {
                  return (
                    <div key={indexChild} className="xl:mb-4 mb-2 accordion">
                      <div
                        className="flex xl:gap-4 gap-2 xl:pl-4 px-8 h-10 w-full items-center cursor-pointer"
                        onClick={() =>
                          handleChoseCategory(child.id, itemCate.id)
                        }
                      >
                        <span className="xl:block hidden">
                          <IcTooltip
                            color={
                              categoryIdChild &&
                              Number(categoryIdChild) === child.id
                                ? colors.main
                                : colors.gray01
                            }
                          />
                        </span>
                        <p
                          className={clsx(
                            "xl:text-xl text-base xl:!text-defaultText xl:!no-underline text-disabled xl:font-medium font-normal line-clamp-2",
                            {
                              "!text-active underline":
                                categoryIdChild &&
                                Number(categoryIdChild) === child.id,
                            }
                          )}
                        >
                          {child.title}
                        </p>
                      </div>
                      <div
                        className={clsx("grid transition-all duration-500", {
                          "grid-rows-[1fr]":
                            categoryIdChild &&
                            Number(categoryIdChild) === child.id,
                          "grid-rows-[0fr]":
                            categoryIdChild === undefined ||
                            Number(categoryIdChild) !== child.id,
                        })}
                      >
                        <div className="ml-8 overflow-hidden">
                          {child.products.map((product, indexProduct) => {
                            return (
                              <div
                                key={indexProduct}
                                className={clsx(
                                  "flex gap-4 xl:pl-4 pl-3 w-full min-h-[40px] items-center cursor-pointer xl:text-base text-sm text-disabled xl:!text-defaultText xl:!no-underline ",
                                  {
                                    "!text-active underline":
                                      productId &&
                                      Number(productId) === product.id,
                                  }
                                )}
                                onClick={
                                  () =>
                                    handleChoseCategory(
                                      product.id,
                                      undefined,
                                      true
                                    )
                                  // onCloseMenu?.();
                                }
                              >
                                <span
                                  className={clsx(
                                    "xl:block hidden text-40  text-gray01",
                                    {
                                      "!text-main":
                                        productId &&
                                        Number(productId) === product.id,
                                    }
                                  )}
                                >
                                  &#8729;
                                </span>
                                {product.nameProduct}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};

export default CategoryProduct;
