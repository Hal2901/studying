import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { topicService } from "../../../../services/toppic/topicService";
import { initialTypeTopic } from "../../../../types/topicType";
import {
  Params,
  getCurrentIdYt,
  getUrlImage,
} from "../../../../utils/constants";
import { publicPath } from "../../../../utils/routers";

import IcArrowsNex from "../../../../assets/icons/IcArrowsNex";
import IcPlus from "../../../../assets/icons/IcPlus";
import { ImageDotsBlue } from "../../../../assets/images";
import { Button } from "../../../../components/Button";

export function Introduce() {
  const navigate = useNavigate();
  const [listData, setListData] = useState<initialTypeTopic>();
  const [loading, setLoading] = useState<boolean>(false);
  const renderPlus = (count: number) => {
    const listPlusE: any = [];
    for (let i = 1; i <= count; i++) {
      listPlusE.push(<IcPlus key={i} />);
    }
    return listPlusE;
  };

  const param: Params = {
    type: "INTRODUCE",
    page: 0,
    sort: "id,desc",
  };

  const handleFetchData = async () => {
    try {
      setLoading(true);
      const { total, data } = await topicService.getListTopic(param);
      if (data) {
        setListData(data[0]);
      }
    } catch (error) {
      setListData(undefined);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    handleFetchData();
  }, []);
  return (
    <div className="sc1800:px-300 xl:px-[155px] lg:px-100 xs:px-10 px-5 pb-[88px] bg-white">
      <div className="relative z-10">
        <div className="w-full grid xl:grid-cols-2 grid-cols-1 gap-y-10 pb-10 xl:mt-[120px] mt-14">
          <div className="grid  sm:grid-cols-2 grid-cols-1 gap-6 h-full xl:pl-12">
            <div className="flex flex-col gap-6 items-center justify-center h-full">
              <img
                src={listData ? getUrlImage(listData.link!) : ""}
                alt=""
                className="w-full h-[430px] object-cover"
              />

              <div className="w-full xl:h-160 lg:h-[240px] sm:h-200 h-300">
                <iframe
                  className="w-full h-full"
                  src={
                    listData?.videoLink1?.includes("https://www.youtube.com/")
                      ? `https://www.youtube.com/embed/${getCurrentIdYt(
                          listData.videoLink1
                        )}?si=UWpWlRAlpKSN_uVH`
                      : listData?.videoLink1 ?? ""
                  }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>

            <div className="flex flex-col gap-6 items-center justify-center h-full">
              <img
                src={listData ? getUrlImage(listData.file!) : ""}
                alt=""
                className="w-full h-[290px] object-cover"
              />

              <div className="w-full  xl:h-160 lg:h-[240px] sm:h-200 h-300">
                <iframe
                  className="w-full h-full"
                  src={
                    listData?.videoLink2?.includes("https://www.youtube.com/")
                      ? `https://www.youtube.com/embed/${getCurrentIdYt(
                          listData.videoLink2
                        )}?si=UWpWlRAlpKSN_uVH`
                      : listData?.videoLink2 ?? ""
                  }
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center relative">
            <div className="sm:px-12 px-5 py-14 h-fit relative">
              <div
                className={
                  "lg:block hidden absolute -z-[1] top-[-80px] -right-20 "
                }
              >
                <img
                  src={ImageDotsBlue}
                  className="w-[164px] h-[164px]"
                  alt=""
                />
                {/* <IcImageAbsolute /> */}
              </div>

              <div className="bg-[#F2F5F8] h-full xl:w-[200%] w-full absolute top-0 right-0 z-[-1]"></div>
              <p className="2xl:text-40 text-2xl line-clamp-2 font-semibold text-[#262626] mb-5">
                {listData?.title}
              </p>
              <p className="text-[#262626] text-base mb-8">
                {listData?.content}
              </p>
              <Button
                color="primary"
                text="see_more"
                className="px-6 py-3 !w-fit"
                image={<IcArrowsNex />}
                onClick={() => navigate(publicPath.company.index)}
              />
              <div className="flex items-center justify-end gap-4 mt-[10px]">
                {renderPlus(6)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
