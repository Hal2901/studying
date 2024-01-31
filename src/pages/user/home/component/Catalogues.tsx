import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import IcDownload from "../../../../assets/icons/IcDowload";
import { useDownloadFile } from "../../../../hooks/useDownloadFile";
import { bannerService } from "../../../../services/bannerService";
import { BannerData, typeBanner } from "../../../../types/BannerType";

interface PropsItem {
  item: { name: string; key: typeBanner };
}
const CatalogItem = memo(({ item }: PropsItem) => {
  const { t } = useTranslation();
  const { handleDownload } = useDownloadFile();
  const [dataBanners, setDataBanners] = useState<BannerData>();
  const getBanner = async (type: typeBanner) => {
    try {
      const data = await bannerService.getBannerByType(type);
      setDataBanners(data[0]);
    } catch (error) {}
  };

  useEffect(() => {
    getBanner(item.key);
  }, []);

  return (
    <div className="rounded-10 border border-border h-12 flex items-center justify-between font-medium pl-6">
      {item.name}
      <div
        className="w-12 h-full bg-main flex items-center justify-center rounded-r-10 cursor-pointer"
        onClick={() => handleDownload(dataBanners?.link!, item.name)}
      >
        <IcDownload />
      </div>
    </div>
  );
});

const Catalogues = () => {
  const listCatalogues: { name: string; key: typeBanner }[] = [
    { name: "E-Catalog", key: "E_CATALOG" },
    { name: "SC S Brochure", key: "SCS_BROCHURE" },
    { name: "Full Catalog", key: "FULL_CATALOG" },
    { name: "D/C Brouchure", key: "DC_BROCHURE" },
  ];
  return (
    <div className="sc1800:px-300 xl:px-[155px] bg-neutral-50 sm:px-100 px-5 py-[45px] ">
      <p className="font-semibold text-[32px] text-center leading-[40px] mb-[32px]">
        LS Simple Catalogue & Brochure
      </p>
      <div className="grid lg:grid-cols-4 xs:grid-cols-2 items-center gap-6">
        {listCatalogues.map((cata, index) => {
          return <CatalogItem key={index} item={cata} />;
        })}
      </div>
    </div>
  );
};

export default Catalogues;
