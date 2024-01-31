import { ChangeEvent, memo, useContext } from "react";
import { useTranslation } from "react-i18next";
import IcDelete from "../../../../assets/icons/IcDelete";
import IcEdit from "../../../../assets/icons/IcEdit";
import { ModalContext } from "../../../../context";
import { ConfirmModal } from "../../../../context/ConfirmModal";
import { CategorySolution } from "../../../../types/categoriesType";
import { categoriesSolutionTh } from "../../../../utils/common";
import EditCategorySolution from "./EditCategorySolution";
import { solutionCategoriesService } from "../../../../services/solution/solutionCategoriesService";
import { toast } from "react-toastify";
import { productCategoriesService } from "../../../../services/product/productCategoriesService";
import clsx from "clsx";

interface Props {
  typeTableList: "solution" | "product";
  data: CategorySolution[];
  listIdDelete: number[];
  setListIdDelete: (data: number[]) => void;
  onReload: () => void;
}
const CategoriesSolutionTable = memo(
  ({ data, onReload, setListIdDelete, typeTableList, listIdDelete }: Props) => {
    const { t } = useTranslation();
    const { setModal, closeModal } = useContext(ModalContext);
    const handleDeleteCategory = (id: number) => {
      const handleDeleteCategory = async () => {
        try {
          typeTableList === "solution"
            ? await solutionCategoriesService.deleteCategory(id)
            : await productCategoriesService.deleteCategory(id);
          toast.success(t("message.success.deleted", { name: t("cate") }));
          onReload();
        } catch (error) {
          toast.error(t("message.error.deleted", { name: t("cate") }));
        } finally {
          closeModal();
        }
      };
      setModal(<ConfirmModal onDelete={() => handleDeleteCategory()} />);
    };

    const handleEditCategory = (data?: any) => {
      setModal(
        <EditCategorySolution
          typeTableList={typeTableList}
          data={data}
          onReload={onReload}
        />
      );
    };
    const handleCheckAll = () => {
      const isFull = listIdDelete.length === data.length;
      const newListId = data.map((item) => item.id!);
      setListIdDelete(isFull ? [] : newListId);
    };
    const handleCheckInput = (e: ChangeEvent<HTMLInputElement>, id: number) => {
      const checkId = listIdDelete.includes(id);
      if (checkId) {
        setListIdDelete(listIdDelete.filter((item) => item !== id));
      } else {
        setListIdDelete([...listIdDelete, id]);
      }
    };
    return (
      <div>
        <div className="border-t border-l border-border grid grid-cols-[5%_40%_40%_15%]">
          <div className="border-b border-r border-border h-12 flex items-center justify-center px-4">
            <input
              type="checkbox"
              checked={
                listIdDelete.length > 0 && listIdDelete.length === data.length
              }
              onChange={handleCheckAll}
            />
          </div>
          {categoriesSolutionTh.map((tbTh, indexTh) => {
            return (
              <div
                key={indexTh}
                className={clsx(
                  "border-b border-r border-border h-12 flex items-center px-4",
                  {
                    "justify-center":
                      indexTh + 1 === categoriesSolutionTh.length,
                  }
                )}
              >
                {t(tbTh)}
              </div>
            );
          })}
        </div>
        {data.map((cate, indexC) => {
          return (
            <div
              key={indexC}
              className="border-t border-l border-border grid grid-cols-[5%_40%_40%_15%] min-h-[46px]"
            >
              <div className="border-b border-r border-border flex items-center justify-center px-4 py-2">
                <input
                  type="checkbox"
                  checked={listIdDelete.includes(cate.id!)}
                  onChange={(e) => handleCheckInput(e, cate.id!)}
                />
              </div>
              <div className="border-b border-r border-border flex items-center px-4 py-2">
                {cate?.title}
              </div>
              <div className="border-b border-r border-border flex items-center px-4 py-2 line-clamp-1">
                {cate?.children.map((item) => item.title).join(",  ")}
              </div>
              <div className="border-b border-r border-border flex items-center justify-center gap-2 px-4 py-2 cursor-pointer">
                <div onClick={() => handleEditCategory(cate)}>
                  <IcEdit />
                </div>
                <div onClick={() => handleDeleteCategory(cate.id!)}>
                  <IcDelete />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
);

export default CategoriesSolutionTable;
