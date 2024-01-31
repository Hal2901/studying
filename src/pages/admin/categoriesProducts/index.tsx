import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import IcPlusAdd from "../../../assets/icons/IcPlusAdd";
import { Button } from "../../../components/Button";
import { Pagination } from "../../../components/Paginnation";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import { ModalContext } from "../../../context";
import { useLanguage } from "../../../hooks/useLanguage";
import { useSearchParamHook } from "../../../hooks/useSearchParam";
import { productCategoriesService } from "../../../services/product/productCategoriesService";
import { CategorySolution } from "../../../types/categoriesType";
import { SizePage } from "../../../utils/constants";
import CategoriesSolutionTable from "../categoriesSolution/component/CategoriesSolutionTable";
import EditCategorySolution from "../categoriesSolution/component/EditCategorySolution";

export default function CategoriesProducts() {
  const { setModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const { isVN } = useLanguage();
  const { searchParams } = useSearchParamHook();
  const page = searchParams.get("page");
  const [categoriesList, setCategoriesList] = useState<CategorySolution[]>([]);
  const [currentPage, setCurrentPage] = useState<number>((page && +page) || 1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [listIdDelete, setListIdDelete] = useState<number[]>([]);
  const requestParam = {
    page: currentPage - 1,
    size: SizePage,
  };
  const handleEditCategory = (data?: any) => {
    setModal(
      <EditCategorySolution
        typeTableList="product"
        data={data}
        onReload={handleReload}
      />
    );
  };
  const getListCategories = async () => {
    try {
      const { total, data } = await productCategoriesService.getListCategories(
        requestParam
      );
      setCategoriesList(data);
      setTotalPage(Math.ceil(total / SizePage));
    } catch (error) {
      return;
    }
  };
  const handleReload = () => {
    if (currentPage === 1) {
      getListCategories();
    } else {
      setCurrentPage(1);
      navigate("");
    }
  };
  useEffect(() => {
    getListCategories();
  }, [currentPage]);
  return (
    <div>
      <div className="flex items-center justify-between">
        <TitleAdminPage text="category" />
        <Button
          color="empty"
          text="add_category"
          className="px-6 py-3 !w-fit"
          disabled={!isVN}
          imageLeft={<IcPlusAdd />}
          onClick={() => handleEditCategory()}
        />
      </div>

      <div className="py-8">
        <CategoriesSolutionTable
          typeTableList="product"
          listIdDelete={listIdDelete}
          data={categoriesList}
          setListIdDelete={setListIdDelete}
          onReload={handleReload}
        />
      </div>
      {totalPage > 1 && (
        <div className="my-8 flex justify-end ">
          <Pagination
            currentPage={currentPage}
            totalPages={totalPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  );
}
