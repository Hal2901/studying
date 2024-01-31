import { ChangeEvent, useCallback, useEffect, useState } from "react";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { Pagination } from "../../../components/Paginnation";
import TitlePage from "../../../components/TitlePage";
import { useSearchParamHook } from "../../../hooks/useSearchParam";
import { topicService } from "../../../services/toppic/topicService";
import { initialTypeTopic } from "../../../types/topicType";
import { listBreads } from "../../../utils/common";
import { Params, SizePage } from "../../../utils/constants";
import Loading from "../../Loading";
import NoContent from "../../NoContent";
import ListDocuments from "./component/ListDocuments";
import { InputElement } from "../../../components/InputElement";
import { debounce } from "lodash";
import { useTranslation } from "react-i18next";

interface Props {
  typePage?: "DOC" | "TRAINING";
}
const Resources = ({ typePage = "DOC" }: Props) => {
  const { t } = useTranslation();
  const { searchParams, setSearchParam } = useSearchParamHook();
  const page = searchParams.get("page");
  const [loading, setLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<initialTypeTopic[]>([]);
  const [currentPage, setCurrentPage] = useState<number>((page && +page) || 1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [totalElements, setTotalElements] = useState<number>(1);
  const [keySearch, setKeySearch] = useState<string>("");
  const param: Params = {
    type: typePage,
    page: currentPage - 1,
    size: SizePage,
    sort: "id,desc",
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
      setTotalElements(total);
    } catch (error) {
      setListData([]);
    } finally {
      setLoading(false);
    }
  };
  const handleFetchData = async () => {
    try {
      setLoading(true);
      const { total, data } = await topicService.getListTopic(param);
      if (data) {
        setListData(data);
        setTotalPage(Math.ceil(total / SizePage));
        setTotalElements(total);
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
      handleFetchData();
    }
  }, [currentPage, keySearch]);

  useEffect(() => {
    if (keySearch !== "") handleSearchData(keySearch, param);
  }, [currentPage]);
  return (
    <div>
      <Banner typeBanner={typePage} />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5  lg:py-88 py-10">
        <div className="flex md:flex-nowrap flex-wrap items-center md:justify-between mb-4">
          <TitlePage
            text={
              typePage === "DOC" ? "list_documents" : "list_documents_training"
            }
          />
          <div className="md:w-1/2 w-full">
            <InputElement
              placeholder="input_key_search"
              name="name"
              value={keySearch}
              reSearch={true}
              onChange={handleChangeInputSearch}
            />
          </div>
        </div>
        {totalElements >= 1 && keySearch != "" && (
          <div className="my-4 text-right text-black">
            <span className="font-bold"> {totalElements}</span>{" "}
            {t("result_search")}
          </div>
        )}

        {loading ? (
          <Loading />
        ) : listData.length === 0 ? (
          <NoContent />
        ) : (
          <ListDocuments data={listData} />
        )}
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
    </div>
  );
};

export default Resources;
