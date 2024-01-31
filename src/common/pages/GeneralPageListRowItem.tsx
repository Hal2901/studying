import React, {
  ChangeEvent,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import TitleAdminPage from "../../components/admin/TitleAdminPage";
import { InputElement } from "../../components/InputElement";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button";
import IcPlusAdd from "../../assets/icons/IcPlusAdd";
import { useTranslation } from "react-i18next";
import IcEdit from "../../assets/icons/IcEdit";
import IcDelete from "../../assets/icons/IcDelete";
import { Pagination } from "../../components/Paginnation";
import { ModalContext } from "../../context";
import { ConfirmModal } from "../../context/ConfirmModal";
import { topicService } from "../../services/toppic/topicService";
import { initialTypeTopic, topicType } from "../../types/topicType";
import { Params, SizePage } from "../../utils/constants";
import { useSearchParamHook } from "../../hooks/useSearchParam";
import { debounce } from "lodash";
import Loading from "../../pages/Loading";
import NoContent from "../../pages/NoContent";
import { toast } from "react-toastify";
import { useLanguage } from "../../hooks/useLanguage";
interface Props {
  typePage: topicType;
  titlePage?: string;
  pathRedirect?: string;
  textBtnEdit?: string;
  textBtnDelete?: string;
}

export default function GeneralPageListRowItem({
  typePage,
  titlePage = "list_documents",
  pathRedirect = "them-tai-lieu",
  textBtnDelete,
  textBtnEdit = "",
}: Props) {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { isVN } = useLanguage();
  const { setModal } = useContext(ModalContext);
  const { searchParams, setSearchParam } = useSearchParamHook();
  const page = searchParams.get("page");
  const [currentPage, setCurrentPage] = useState<number>((page && +page) || 1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [keySearch, setKeySearch] = useState<string>("");
  const [listData, setListData] = useState<initialTypeTopic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const param = {
    search: keySearch === "" ? null : keySearch,
    type: typePage,
    page: currentPage - 1,
    size: SizePage,
    sort: "id,desc",
  };

  const handleAdDocument = () => {
    navigate("them-tai-lieu");
  };
  const handleEditDocument = (id: number) => {
    navigate(`${id}`);
  };
  const handleReload = () => {
    if (currentPage === 1) {
      getListData(param);
    } else {
      setCurrentPage(1);
      setSearchParam("");
    }
    setKeySearch("");
  };
  const handleDeleteDocument = (id: number) => {
    const deleteTopic = async () => {
      try {
        await topicService.deleteTopic(id);
        handleReload();
        toast.success(t("message.success.deleted", { name: t('document') }));
      } catch (error) {
        toast.success(t("message.error.deleted", { name: t('document') }));
      }
    };
    setModal(
      <ConfirmModal
        onDelete={() => deleteTopic()}
        message="message_comfirm.document"
      />
    );
  };

  const handleChangeInputSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCurrentPage(1);
    setSearchParam("");
    setKeySearch(value);
    handleDebounce(value);
  };

  const handleDebounce = useCallback(
    debounce(
      (key: string) =>
        handleSearchData(key, {
          type: typePage,
          page: 0,
          size: SizePage,
          sort: "id,desc",
        }),
      1000
    ),
    []
  );

  const handleSearchData = async (key: string, params: Params) => {
    try {
      setLoading(true);
      const { total, data } = await topicService.searchTopics(key, params);
      setListData(data);
      setTotalPage(Math.ceil(total / SizePage));
    } catch (error) {
      setListData([]);
    } finally {
      setLoading(false);
    }
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
      setListData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (keySearch === "") {
      handleDebounce.cancel();
      getListData(param);
    }
  }, [currentPage, keySearch]);

  useEffect(() => {
    if (keySearch !== "") handleSearchData(keySearch, param);
  }, [currentPage]);

  return (
    <div>
      <TitleAdminPage text={titlePage} />
      <div className="flex items-center justify-between my-8">
        <div className="w-1/2">
          <InputElement
            placeholder="input_key_search"
            name="name"
            value={keySearch}
            reSearch={true}
            onChange={handleChangeInputSearch}
          />
        </div>
        <Button
          color="empty"
          text="add_document"
          className="px-6 py-3 !w-fit"
          disabled={!isVN}
          imageLeft={<IcPlusAdd />}
          onClick={handleAdDocument}
        />
      </div>
      <div>
        <div className="h-12 border-b grid grid-cols-[1fr_150px]">
          <div className="font-medium flex items-center">
            {t(typePage === "DOC" ? "name_docement" : "name_docement_tranning")}
          </div>
          <div className="font-medium flex items-center justify-center">
            {t("func")}
          </div>
        </div>

        {loading ? (
          <Loading />
        ) : listData.length === 0 ? (
          <NoContent />
        ) : (
          listData.map((pr, indPr) => {
            return (
              <div
                key={indPr}
                className="h-14 border-b grid grid-cols-[1fr_150px]"
              >
                <div className="flex items-center line-clamp-1">{pr.title}</div>
                <div className="flex items-center justify-center gap-4 cursor-pointer">
                  <div onClick={() => handleEditDocument(pr.id!)}>
                    <IcEdit />
                  </div>
                  <div onClick={() => handleDeleteDocument(pr.id!)}>
                    <IcDelete />
                  </div>
                </div>
              </div>
            );
          })
        )}
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
