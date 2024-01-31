import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import IcDownload from "../../../assets/icons/IcDowload";
import colors from "../../../common/colors";
import GeneralRenderCard from "../../../common/pages/GeneralRenderCard";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { ModalContext } from "../../../context";
import { useDownloadFile } from "../../../hooks/useDownloadFile";
import { topicService } from "../../../services/toppic/topicService";
import { initialTypeTopic } from "../../../types/topicType";
import { listBreads } from "../../../utils/common";
import { Params, SizePage, getUrlImage } from "../../../utils/constants";

const Certification = () => {
  const { t } = useTranslation();
  const { setModal } = useContext(ModalContext);
  const { handleDownload } = useDownloadFile();
  const [loading, setLoading] = useState<boolean>(false);
  const [listData, setListData] = useState<initialTypeTopic[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const handleChangeCurrentPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const param: Params = {
    type: "CERTIFICATE",
    page: currentPage - 1,
    size: SizePage,
    sort: "id,desc",
  };
  const handleViewCertification = (data: any) => {
    setModal(
      <div className="w-[70vw] h-[70vh] bg-white">
        <img
          src={getUrlImage(data?.link)}
          alt=""
          className="w-full h-full object-contain"
        />
      </div>
    );
  };

  const handleDownloadCertificate = (data: any) => {
    handleDownload(data.file!, "certificate");
  };
  const handleFetchData = async () => {
    try {
      setLoading(true);
      const { total, data } = await topicService.getListTopic(param);
      if (data) {
        setListData([...listData, ...data]);
        setTotalPage(Math.ceil(total / SizePage));
      }
    } catch (error) {
      setListData([]);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleFetchData();
  }, [currentPage]);

  return (
    <div>
      <Banner typeBanner="CERTIFICATE" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5  lg:py-88 py-10">
        {listData.length > 0 && (
          <GeneralRenderCard
            data={listData}
            loadding={loading}
            totalPage={currentPage < totalPage}
            handleBtn={handleDownloadCertificate}
            handleForwardOfContent={handleViewCertification}
            handleShowmore={handleChangeCurrentPage}
            textBtn="download_document"
            titlePage="list_certification"
            iconCard={
              <IcDownload color={colors.disable_color} width={20} height={20} />
            }
          />
        )}
      </div>
    </div>
  );
};

export default Certification;
