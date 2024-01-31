import clsx from "clsx";
import { memo, useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import IcDownload from "../../../../assets/icons/IcDowload";
import IcPlusCircle from "../../../../assets/icons/IcPlusCircle";
import colors from "../../../../common/colors";
import { Button } from "../../../../components/Button";
import { ModalContext } from "../../../../context";
import { useDownloadFile } from "../../../../hooks/useDownloadFile";
import { listProductVarian, productKeys } from "../../../../types/productType";
import { getUrlImage } from "../../../../utils/constants";
import NoContent from "../../../NoContent";
import RegisterSuccess from "../../partner/component/RegisterSuccess";

export interface DataTable {
  info: {
    imageLink: string;
    title: string;
    description: string;
  };
  availability: string;
  category: string;
  type: string;
  enviroment: string;
  typeCap: string;
}
export interface PropsTable {
  data: {
    productKeys: productKeys[];
    productVariants: listProductVarian[];
  };
}
const TableProductVariation = memo(({ data }: PropsTable) => {
  const { t } = useTranslation();
  const { handleDownload } = useDownloadFile();
  const { setModal } = useContext(ModalContext);
  const IdVarianActive = localStorage.getItem("idPrVariantActive");
  const scrollInto = useRef<HTMLTableElement>(null);
  const handleRegisterSuccess = () => {
    setModal(<RegisterSuccess mdPr={true} />);
  };
  const handleAddFavorite = (item: any) => {
    const listProductFavorite = localStorage.getItem("productFavorite");
    if (listProductFavorite) {
      const listData = JSON.parse(listProductFavorite);

      const checkId = listData.filter(
        (favorite: any) => favorite.id === item.id
      );
      if (checkId.length > 0) {
        toast.warning(t("product_is_in_favorite"));
      } else {
        if (listData.length >= 20) {
          return toast.error(t("max_pr_favorite"));
        }
        localStorage.setItem(
          "productFavorite",
          JSON.stringify([...listData, item])
        );
        handleRegisterSuccess();
      }
      return;
    }
    localStorage.setItem("productFavorite", JSON.stringify([item]));
    handleRegisterSuccess();
  };

  useEffect(() => {
    if (scrollInto.current && IdVarianActive) {
      window.scrollTo({
        top: scrollInto?.current?.offsetTop,
        behavior: "smooth",
      });
    }
  }, [scrollInto, IdVarianActive]);
  return (
    <table
      ref={scrollInto}
      className="w-full border border-border border-collapse min-w-[1200px]"
    >
      <thead>
        <tr className="bg-active text-white h-16">
          {data?.productKeys.map((keys, indexKey) => {
            return (
              <th key={indexKey} className="min-w-[200px] p-5">
                {keys.name}
              </th>
            );
          })}
          <th className="min-w-[200px] p-5">{t("func")}</th>
        </tr>
      </thead>
      <tbody>
        {data.productVariants.length > 0 ? (
          data.productVariants.map((item, index) => {
            return (
              <tr
                key={index}
                className={clsx("border-b", {
                  "bg-bg_varian":
                    IdVarianActive && Number(IdVarianActive) === item.id,
                })}
              >
                {item.productValues.map((value, indexV) => {
                  return (
                    <td key={indexV} className="min-w-[200px] p-5 border-r">
                      {indexV === 0 ? (
                        <div className="flex w-full justify-center items-center">
                          <img
                            src={getUrlImage(value.value) ?? ""}
                            alt=""
                            className="border border-border w-[120px] h-16"
                          />
                        </div>
                      ) : (
                        value.value ?? ""
                      )}
                    </td>
                  );
                })}
                <td className="min-w-[200px] p-5">
                  <div className="flex items-center justify-center gap-2">
                    <Button
                      text=""
                      color="normal"
                      className="!min-w-fit !w-12 !h-12 !bg-white"
                      image={<IcDownload color={colors.gray01} />}
                      onClick={() =>
                        handleDownload(
                          item.productValues[item.productValues.length - 1]
                            .value,
                          "thông số"
                        )
                      }
                    />
                    <Button
                      text=""
                      color="normal"
                      className="!min-w-fit !w-12 !h-12 !bg-white"
                      image={<IcPlusCircle color={colors.gray01} />}
                      onClick={() => handleAddFavorite(item)}
                    />
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={data?.productKeys.length + 1}>
              <NoContent className="!min-h-[100px]" />
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
});

export default TableProductVariation;
