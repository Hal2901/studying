import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import DropdownSelect from "../../../../components/DropdownSelect";
import { Pagination } from "../../../../components/Paginnation";
import { productService } from "../../../../services/product/productService";
import {
  listProductVarian,
  productFilter,
  productKeys,
} from "../../../../types/productType";
import { Params, SizePage } from "../../../../utils/constants";
import Loading from "../../../Loading";
import TableProductVariation from "./TableProductVariation";
interface Props {
  data: {
    name: string;
    productKeys: productKeys[];
    productVariants: listProductVarian[];
  };
}
const ProductVariation = ({ data }: Props) => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [dataTable, setDataTable] = useState<listProductVarian[]>([]);
  const [listProductFilter, setListProductFilter] = useState<productFilter[]>(
    []
  );
  const [varianFilter, setVarianFilter] = useState<productFilter[]>([]);

  const getProductVarian = async (params: Params, dataFilter: any[]) => {
    try {
      setLoading(true);
      const { total, data } = await productService.getProductByVariant(
        params,
        dataFilter
      );
      setDataTable(data);
      setTotalPage(Math.ceil(total / SizePage));
    } catch (error) {
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
    }
  };
  const getFilterByProductId = async (params: Params) => {
    try {
      const { total, data } = await productService.getFilterByProductId(params);
      setListProductFilter((prevState) => [...prevState, ...data]);
    } catch (error) {
      setListProductFilter([]);
    }
  };

  const handleActiveProductFilter = (
    ValueFilter: productFilter,
    indexValue: number
  ) => {
    const value = ValueFilter.list[indexValue];
    if (varianFilter.length > 0) {
      const indexValue = varianFilter.findIndex(
        (it) => it.id === ValueFilter.id
      );
      if (indexValue >= 0) {
        const checkValue = varianFilter[indexValue].list.findIndex(
          (it) => it?.value === value?.value
        );
        const prFilterIndex = varianFilter[indexValue];
        if (checkValue >= 0) {
          if (varianFilter[indexValue].list.length === 1) {
            const newValueFilter = varianFilter.filter(
              (pr) => pr.id !== ValueFilter.id
            );
            setVarianFilter(newValueFilter);
            return;
          }
          prFilterIndex.list = prFilterIndex.list.filter(
            (vl) => vl.value !== value.value
          );
        } else {
          prFilterIndex.list.push(value);
        }
        const newProductFilter = varianFilter.map((pr) => {
          if (pr.id == ValueFilter.id) {
            return prFilterIndex;
          }
          return pr;
        });
        setVarianFilter(newProductFilter);
      } else {
        const newValueFilter = { ...ValueFilter };
        newValueFilter.list = [value];
        setVarianFilter([...varianFilter, newValueFilter]);
      }
    } else {
      const newValueFilter = { ...ValueFilter };
      newValueFilter.list = [value];
      setVarianFilter([newValueFilter]);
    }
  };

  useEffect(() => {
    if (id) {
      const params: any = {
        idProduct: id,
        page: currentPage - 1,
        size: SizePage,
        type: "ID_ASC",
      };
      getProductVarian(params, varianFilter);
    }
  }, [id, currentPage, varianFilter]);
  useEffect(() => {
    if (id) {
      getFilterByProductId({
        idProduct: +id,
        size: 20,
        page: 0,
      });
    }
  }, [id]);
  return (
    <div className="w-full mb-16">
      <div className="flex flex-col  gap-6">
        <div className="w-full">
          <p className="font-semibold lg:text-40 text-xl mb-2">
            {t("product_variation")}
          </p>
          <p className="sm:text-base text-sm">
            {t("description_variation", { name: data.name })}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 items-center w-full">
          {listProductFilter.map((item, index) => {
            return (
              <div
                key={index}
                style={{
                  zIndex: 20 - index,
                }}
              >
                <DropdownSelect
                  name={item.name}
                  key={index}
                  classOverlay="p-5 hidden-scroll"
                >
                  {item.list.map((child, idChild) => {
                    const prValue =
                      varianFilter &&
                      varianFilter.filter((pr) => pr.id === item.id);
                    const checked =
                      prValue &&
                      prValue.length > 0 &&
                      prValue[0].list.filter((vl) => vl.value === child.value)
                        .length > 0;
                    return (
                      <label
                        key={idChild}
                        className="flex items-center gap-2 w-full mb-2"
                      >
                        <input
                          checked={checked}
                          onChange={(e) =>
                            handleActiveProductFilter(item, idChild)
                          }
                          type="checkbox"
                          value={child.value}
                          className="w-5 h-5"
                        />
                        <div className="w-[calc(100%_-30px)] text-base font-normal line-clamp-1">
                          {child.value}
                        </div>
                      </label>
                    );
                  })}
                </DropdownSelect>
              </div>
            );
          })}
        </div>
      </div>

      <div className="my-9 overflow-x-scroll">
        {loading ? (
          <div className="h-200 w-full">
            <Loading />
          </div>
        ) : (
          <TableProductVariation
            data={{ ...data, productVariants: dataTable }}
          />
        )}
      </div>
      {totalPage > 1 && (
        <div className="flex justify-end">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
};

export default ProductVariation;
