import React, { useEffect, useState } from "react";
import { debounce } from "lodash";
import Breadcrumb from "../../../components/Breadcrumb";
import Banner from "../../../components/Banner";
import { listBreads } from "../../../utils/common";
import { useTranslation } from "react-i18next";
import HistoryItem from "./component/HistoryItem";
import { initialTypeTopic } from "../../../types/topicType";
import { Params } from "../../../utils/constants";
import { topicService } from "../../../services/toppic/topicService";
import Loading from "../../Loading";
import NoContent from "../../NoContent";

const Histories = () => {
  const { t } = useTranslation();
  const [historyCol1, setHistoryCol1] = useState<any[]>();
  const [historyCol2, setHistoryCol2] = useState<any[]>();
  const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth >= 1024)
  const [listData, setListData] = useState<initialTypeTopic[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const param: Params = {
    type: "HISTORY",
    page: 0,
    sort: "id,asc",
  };

  type ColorType = 'pink' | 'blue' | 'gray' | 'gold';

  const getColor = (index: number) => {
    const colors: ColorType[] = ['blue', 'gray', 'pink', 'gold'];
    return colors[index % colors.length]; // Cycle through the colors array based on the index
  };

  const handleFetchData = async () => {
    try {
      setLoading(true);
      const { total, data } = await topicService.getListTopic(param);
      if (data) {
        setListData(data);
      }
    } catch (error) {
      setListData([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleFetchData();
  }, []);

  useEffect(() => {
    const list1: any = [];
    const list2: any = [];
    listData.forEach((item, index) => {
      index % 2 === 0 ? list2.push(item) : list1.push(item);
    });
    list1.length > 0 && setHistoryCol1(list1);
    list2.length > 0 && setHistoryCol2(list2);
  }, [listData]);

  useEffect(() => {
    const handleResize = debounce(() => {
      setIsLargeScreen(window.innerWidth >= 1024)
    }, 200)

    window.addEventListener('resize', handleResize)

    return () => {
      handleResize.cancel()
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <div>
      <Banner typeBanner="HISTORY" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 lg:py-88 py-10 flex flex-col items-center">
        <p className="lg:text-40 text-3xl font-semibold mb-10 text-center lg:max-w-[60%]">
          {t("history_title")}
        </p>

        {loading ? (
          <Loading />
        ) : listData.length === 0 ? (
          <NoContent />
        ) : (
          <div className="grid lg:grid-cols-2 grid-cols-1 relative">
            {isLargeScreen ? (
              <>
                <div className="lg:pt-160 pt-100">
                  {historyCol1?.map((item, index) => {
                    return (
                      <HistoryItem
                        key={index}
                        item={item}
                        reverse={true}
                        color={index % 2 === 0 ? "blue" : "gray"}
                        className="history_left"
                      />
                    );
                  })}
                </div>
                <div className="pt-10">
                  {historyCol2?.map((item, index) => {
                    return (
                      <HistoryItem
                        key={index}
                        item={item}
                        color={index % 2 === 0 ? "pink" : "gold"}
                        reverse={false}
                        className="history_right"
                      />
                    );
                  })}
                </div>
              </>
            ) : (
              <div>
                {listData?.map((item, index) => {
                  return (
                    <HistoryItem
                      key={index}
                      item={item}
                      color={getColor(index)}
                      reverse={false}
                      className="history_right"
                    />
                  );
                })}
              </div>
            )}

            <div className="absolute top-0 lg:left-1/2 left-0 w-1 bg-border -translate-x-1/2 h-full -z-[1]"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Histories;
