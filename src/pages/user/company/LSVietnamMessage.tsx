import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { listBreads } from "../../../utils/common";
import { useTranslation } from "react-i18next";
import InfoPerson from "./component/InfoPerson";
import { ImageVNChairman } from "../../../assets/images";



export default function LSVietnamMessage() {
  const { t } = useTranslation();

  const data = {
    imageLink: ImageVNChairman,
    title: t('chairmanVN_quote'),
    messages: t('chairmanVN_msg'),
  }

  return (
    <div>
      <Banner typeBanner="INTRO" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 flex flex-col">
        <div>
          <InfoPerson data={data} fromManager={true} />
        </div>
      </div>
    </div>
  );
};
