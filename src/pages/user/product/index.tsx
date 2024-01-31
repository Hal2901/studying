import clsx from "clsx";
import { useContext, useEffect, useState } from "react";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import colors from "../../../common/colors";
import CategoryProduct from "../../../components/categories/CategoryProduct";
import { productService } from "../../../services/product/productService";
import { listProductVarian, productTypeRoot } from "../../../types/productType";
import { Params, SizePage } from "../../../utils/constants";
import { publicPath } from "../../../utils/routers";
import { ModalContext } from "../../../context";

import IcHome from "../../../assets/icons/IcHome";
import ViewList from "../../../assets/icons/ViewList";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { Button } from "../../../components/Button";
import DropdownSelect from "../../../components/DropdownSelect";
import ProductCard from "../../../components/ProductCard";
import TitlePage from "../../../components/TitlePage";
import Loading from "../../Loading";
import NoContent from "../../NoContent";

export default function Products() {
  const { t } = useTranslation();
  const listFilter = [
    {
      name: t("product_A_Z"),
      filter: "NAME_ASC",
    },
    {
      name: t("product_Z_A"),
      filter: "NAME_DESC",
    },
    {
      name: t("price_l_h"),
      filter: "PRICE_ASC",
    },
    {
      name: t("price_h_l"),
      filter: "PRICE_DESC",
    },
    {
      name: t("latest_product"),
      filter: "ID_DESC",
    },
    {
      name: t("oldest_product"),
      filter: "ID_ASC",
    },
  ];
  const [searchParams] = useSearchParams();
  const location = useLocation();
  const categoryId = searchParams.get("danh-muc");
  const categoryIdChild = searchParams.get("danh-muc-con");
  const productId = searchParams.get("productId");
  const filterParam = searchParams.get("filter");
  const { productFilter, setProductFilter } = useContext(ModalContext);
  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [listProductsVarian, setListProductVarian] = useState<
    listProductVarian[]
  >([]);
  const [filter, setFilter] = useState(listFilter[4]);
  const [viewList, setViewList] = useState<boolean>(false);
  const navigate = useNavigate();
  const listBreads = [
    {
      name: "product",
      path: "/san-pham",
    },
  ];
  const handleViewDetailProduct = (id: number, idPrVariant?: number) => {
    if (idPrVariant) {
      localStorage.setItem("idPrVariantActive", idPrVariant.toString());
    }
    id && navigate(publicPath.product.index + "/" + id);
  };
  const handleViewMore = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevState) => prevState + 1);
    }
  };
  const fetchProducts = async (params: Params, dataFilter: any[]) => {
    try {
      setLoading(true);
      const { total, data } = await productService.getProductByVariant(
        params,
        dataFilter
      );
      setListProductVarian((prevState) => [...prevState, ...data]);
      setTotalPage(Math.ceil(total / SizePage));
    } catch (error) {
      setListProductVarian([]);
    } finally {
      setTimeout(() => setLoading(false), 200);
    }
  };
  useEffect(() => {
    setListProductVarian([]);
    setCurrentPage(1);
  }, [categoryIdChild, productId, productFilter, filter]);
  useEffect(() => {
    const params: any = {
      idProduct: productId ?? undefined,
      idCategory: categoryIdChild ?? undefined,
      type: filter.filter,
      page: currentPage - 1,
      size: SizePage,
    };
    const dataFilter = productFilter ?? [];
    fetchProducts(params, dataFilter);
  }, [filter, categoryIdChild, productId, currentPage, productFilter]);

  useEffect(() => {
    return () => {
      setProductFilter(undefined);
    };
  }, []);

  return (
    <div>
      <Banner typeBanner="PRODUCT" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5  lg:py-88 py-10">
        <div className="flex flex-wrap items-center lg:justify-between mb-6">
          <div className="2xl:w-1/2 w-full">
            <TitlePage text={productId ? "list_variation" : "list_pr"} />
          </div>
          <div className="2xl:w-1/2 w-full flex flex-wrap items-center justify-end gap-6 mb-8">
            <DropdownSelect
              name={t("sort") + filter.name}
              className="w-full xl:col-span-1 md:col-span-2 col-span-6 max-w-[300px]"
            >
              {listFilter.map((filterItem, indexFill) => {
                return (
                  <div
                    key={indexFill}
                    className={clsx("h-10 p-6 flex items-center", {
                      "text-main": filterItem.filter == filter.filter,
                      "border-b": indexFill + 1 != listFilter.length,
                    })}
                    onClick={() => {
                      setFilter(filterItem);
                      // setCurrentPage(1);
                    }}
                  >
                    {filterItem.name}
                  </div>
                );
              })}
            </DropdownSelect>

            <div className="flex items-center gap-4">
              <p>{t("view_mode")}</p>
              <div
                className={clsx(
                  "w-10 h-10 rounded-10 flex items-center justify-center border cursor-pointer",
                  { "bg-main": viewList }
                )}
                onClick={() => setViewList(true)}
              >
                <IcHome
                  color={viewList ? colors.white : colors.disable_color}
                />
              </div>
              <div
                className={clsx(
                  "w-10 h-10 rounded-10 flex items-center justify-center border cursor-pointer",
                  { "bg-main": !viewList }
                )}
                onClick={() => setViewList(false)}
              >
                <ViewList
                  color={!viewList ? colors.white : colors.disable_color}
                />
              </div>
            </div>
          </div>
        </div>
        {/* max-h-screen overflow-y-scroll hidden-scroll */}
        <div className="min-h-screen grid xl:grid-cols-[300px_1fr] grid-cols-1 gap-6 pt-2">
          <div className="xl:block hidden">
            <CategoryProduct />
          </div>
          {loading ? (
            <Loading />
          ) : (
            <>
              {listProductsVarian.length > 0 && (
                <div className="flex flex-col gap-6">
                  <div
                    className={clsx("grid gap-6", {
                      "sc1660:grid-auto-fill-270 grid-auto-fill-250": !viewList,
                      "2xl:grid-cols-1 grid-auto-fill-250": viewList,
                    })}
                  >
                    {listProductsVarian.map((item: any, index) => {
                      return (
                        <ProductCard
                          viewList={viewList}
                          key={index}
                          itemVarian={item}
                          onClickPr={() =>
                            handleViewDetailProduct(item.idProduct, item.id)
                          }
                        />
                      );
                    })}
                  </div>
                  {currentPage < totalPage && (
                    <div>
                      <Button
                        color="empty"
                        text="see_more"
                        className="px-6 py-3"
                        onClick={handleViewMore}
                      />
                    </div>
                  )}
                </div>
              )}
            </>
          )}
          {listProductsVarian.length === 0 && (
            <div>
              <NoContent />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
