import { useEffect, useState } from "react";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { topicService } from "../../../services/toppic/topicService";
import { initialTypeTopic } from "../../../types/topicType";
import { listBreads } from "../../../utils/common";
import Loading from "../../Loading";
import NoContent from "../../NoContent";
import { useLocation } from "react-router-dom";

const GeneralPolicy = () => {
  const location = useLocation();

  const typePage = location.pathname.includes("case-study")
    ? "STUDY"
    : location.pathname.includes("sport-tournement")
    ? "SPORT_TOURNAMENT"
    : "POLICY";
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<initialTypeTopic>();
  const getDetailsTopic = async () => {
    try {
      setLoading(true);
      const { data } = await topicService.getDetailsTopicStudy({
        type: typePage,
      });
      if (data.length) {
        setData(data[0]);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDetailsTopic();
  }, [typePage]);
  return (
    <div>
      <Banner
        typeBanner={typePage === "SPORT_TOURNAMENT" ? "TOURNAMENT" : typePage}
      />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5  lg:py-88 py-10">
        <p className="lg:text-40 text-3xl font-semibold mb-10">
          {data?.title ?? ""}
        </p>
        {loading ? (
          <Loading />
        ) : data ? (
          <div
            className="ql-editor"
            dangerouslySetInnerHTML={{ __html: data.content! ?? "" }}
          ></div>
        ) : (
          <NoContent />
        )}
      </div>
    </div>
  );
};

export default GeneralPolicy;
