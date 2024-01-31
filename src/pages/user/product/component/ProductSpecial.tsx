import { useTranslation } from "react-i18next";
import { productSpecs } from "../../../../types/productType";
import SpecialItem from "./SpecialItem";

interface Props {
  dataSpecial: productSpecs[];
}

const ProductSpecial = ({ dataSpecial }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="w-full">
      <p className="font-semibold lg:text-40 text-xl mb-10">{t("special")}</p>
      <div>
        {dataSpecial &&
          dataSpecial.map((special, index) => {
            return <SpecialItem key={index} item={special} />;
          })}
      </div>
    </div>
  );
};

export default ProductSpecial;
