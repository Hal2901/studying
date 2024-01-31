import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ModalContext } from "../../../context";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../../components/admin/ProductCard";
import { useLanguage } from "../../../hooks/useLanguage";
import { useSearchParamHook } from "../../../hooks/useSearchParam";
import { initialTypeTopic } from "../../../types/topicType";
import { Params, SizePage } from "../../../utils/constants";
import { topicService } from "../../../services/toppic/topicService";
import { toast } from "react-toastify";

import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import IcPlusAdd from "../../../assets/icons/IcPlusAdd";
import { Button } from "../../../components/Button";
import { Pagination } from "../../../components/Paginnation";
import Loading from "../../Loading";
import NoContent from "../../NoContent";
import { ConfirmModal } from "../../../context/ConfirmModal";


export default function CertificationPage() {
  const { t } = useTranslation();
  const { isVN } = useLanguage();
  const navigate = useNavigate();
  const { setModal } = useContext(ModalContext);
  const { searchParams, setSearchParam } = useSearchParamHook();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState<number>((page && +page) || 1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [listData, setListData] = useState<initialTypeTopic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const param: Params = {
    type: "CERTIFICATE",
    page: currentPage - 1,
    size: SizePage,
    sort: "id,desc",
  };

  const handleAddCertificate = () => {
    navigate("them-chung-nhan");
  };

  const handleEdit = (id: number) => {
    navigate(`${id}`);
  };

  const handleReload = () => {
    if (currentPage === 1) {
      getListData(param);
    } else {
      setCurrentPage(1);
      setSearchParam("");
    }
  };

  const handleDelete = (id: number) => {
    const deleteTopic = async () => {
      try {
        await topicService.deleteTopic(id);
        handleReload();
        toast.success(t("message.success.deleted", { name: t('certificate') }));
      } catch (error) {
        toast.error(t("message.error.deleted", { name: t('certificate') }));
      }
    };
    setModal(
      <ConfirmModal
        onDelete={() => deleteTopic()}
        message="message_comfirm.certificate"
      />
    );
  };

  const getListData = async (param: Params) => {
    try {
      setLoading(true);
      const { total, data } = await topicService.getListTopic(param);
      if (data) {
        setListData(data);
        setTotalPage(Math.ceil(total / SizePage));
      }
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('certificate') }))
      setListData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getListData(param);
  }, [currentPage]);
  return (
    <div>
      <div className="flex items-center justify-between my-8">
        <TitleAdminPage text={"certificate_mn"} />
        <Button
          color="empty"
          text="add_certificate"
          className="px-6 py-3 !w-fit"
          imageLeft={<IcPlusAdd />}
          disabled={!isVN}
          onClick={handleAddCertificate}
        />
      </div>
      {loading ? (
        <Loading />
      ) : listData.length === 0 ? (
        <NoContent />
      ) : (
        <div className="grid grid-auto-fill-320 gap-x-6 gap-y-10">
          {listData.map((pr, indPr) => {
            return (
              <ProductCard
                textBtnEdit="edit_certificate"
                textBtnDelete="delete_certificate"
                key={indPr}
                item={pr}
                onEdit={() => handleEdit(pr.id!)}
                onDelete={() => handleDelete(pr.id!)}
              />
            );
          })}
        </div>
      )}
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
