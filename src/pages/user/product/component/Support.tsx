import { useTranslation } from "react-i18next";
import IcFile from "../../../../assets/icons/IcFile";
import { productSupportsType } from "../../../../types/productType";
interface Props {
  item: productSupportsType[];
}
const Support = ({ item }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <p className="font-semibold lg:text-40 text-xl mb-10">
        {t("product_support")}
      </p>
      <div className="pb-10">
        {item.map((sp, iSp) => {
          return (
            <div
              key={iSp}
              className="flex items-center gap-2 mb-5 cursor-pointer"
            >
              <IcFile />
              <a href={sp.pathLink} target="_blank" className="text-main">
                {sp.title}
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Support;
