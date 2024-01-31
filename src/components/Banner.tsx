import React, { memo, useEffect, useState } from "react";
import { getUrlImage } from "../utils/constants";
import { bannerService } from "../services/bannerService";
import { BannerData, typeBanner } from "../types/BannerType";

interface Props {
  typeBanner: typeBanner;
}

const Banner = memo(({ typeBanner }: Props) => {
  const [dataBanners, setDataBanners] = useState<BannerData[]>([]);
  const getBanner = async (type: typeBanner) => {
    try {
      const data = await bannerService.getBannerByType(type);
      setDataBanners(data);
    } catch (error) { }
  };

  useEffect(() => {
    getBanner(typeBanner);
  }, []);
  return (
    <div className="w-full h-200">
      {
        dataBanners[0] && (
          <img
            src={getUrlImage(dataBanners[0].link)}
            alt=""
            className="w-full h-full xs:object-cover object-fill "
          />
        )
        // ) : (
        //   <img
        //     src={''}
        //     alt=""
        //     className="w-full h-full object-cover "
        //   />
        // )
      }
    </div>
  );
});

export default Banner;
