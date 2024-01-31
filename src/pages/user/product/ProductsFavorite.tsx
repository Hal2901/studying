import React, { useState } from "react";
import TitlePage from "../../../components/TitlePage";
import { BoxButtonHandle } from "../../../components/ProductCard";
import IcDownload from "../../../assets/icons/IcDowload";
import NoContent from "../../NoContent";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { formatCurrency, getUrlImage } from "../../../utils/constants";
import { Button } from "../../../components/Button";
import IcBagDelete from "../../../assets/icons/IcBagDelete";
import { useDownloadFile } from "../../../hooks/useDownloadFile";
import { toast } from "react-toastify";

const listNameColTable = [
  "image_product",
  "name_pr",
  "price_propose",
  "download",
  "delete",
];

const ProductsFavorite = () => {
  const listProductFavorite = localStorage.getItem("productFavorite");
  const { t } = useTranslation();
  const { handleDownloadMultipleFile } = useDownloadFile();
  const [listData, setListData] = useState<any[]>(
    listProductFavorite ? JSON.parse(listProductFavorite) : undefined
  );

  const handleDownloadAllFileDocument = () => {
    try {
      if (listData.length > 0) {
        let listFilesDownload: any[] = [];
        listData.forEach((item) => {
          if (item?.productValues) {
            listFilesDownload.push(
              item?.productValues[item?.productValues.length - 1].value
            );
          } else {
            const a = [
              item?.linkFile1,
              item?.linkFile2,
              item?.linkFile3,
              item?.linkFile4,
            ];
            listFilesDownload.push(...a);
          }
        });
        listFilesDownload.length > 0 &&
          handleDownloadMultipleFile(listFilesDownload, t("banner_document"));
      }
    } catch (error) {}
  };
  const handleDeletePrFavorite = (id: number) => {
    if (listProductFavorite) {
      const parserList = JSON.parse(listProductFavorite).filter(
        (item: any) => item?.id !== id
      );
      setListData(parserList.length > 0 ? parserList : undefined);
      parserList.length > 0
        ? localStorage.setItem("productFavorite", JSON.stringify(parserList))
        : localStorage.removeItem("productFavorite");

      toast.success(t("message.success.delete_product_intoFavorite"));
    }
  };
  return (
    <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5  lg:py-100 py-10">
      <div className="flex flex-wrap gap-4 items-center justify-between mb-10">
        <TitlePage text={"list_pr_favorite"} className="mb-0 md:max-w-[50%]" />
        <BoxButtonHandle
          props={{
            text: "download_all_document",
            className: "min-w-[280px]",
            maxWidth: "max-w-auto",
            icon: <IcDownload />,
            func: () => handleDownloadAllFileDocument(),
          }}
        />
      </div>

      {listData ? (
        <div className="w-full 2xl:overflow-hidden overflow-x-scroll">
          <table className="min-w-[1200px] w-full">
            <thead>
              <tr className="border-b ">
                {listNameColTable.map((name, index) => {
                  return (
                    <th
                      key={index}
                      className={clsx("py-5 text-left  pr-5", {
                        "w-200 ": index === 0,
                        "w-[450px]": index === 1,
                        "w-[250px] ": index === 2,
                      })}
                    >
                      {t(name)}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {listData.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="w-200 p-5 pl-0">
                    <img
                      src={getUrlImage(
                        item?.productValues
                          ? item?.productValues[0]?.value
                          : item?.productImages[0]?.link
                      )}
                      className="w-160 h-16 "
                    />
                  </td>
                  <td className="w-[450px] p-5 pl-0 text-main font-medium">
                    {item?.productValues
                      ? item?.productValues[1]?.value
                      : item?.nameProduct}
                  </td>
                  <td className="text-danger font-medium w-[250px]">
                    {Number(item?.productValues[2]?.value)
                      ? formatCurrency(item?.productValues[2]?.value) + "VND"
                      : item?.productValues[2]?.value}
                  </td>
                  <td className="p-5 pl-0">
                    <BoxButtonHandle
                      props={{
                        text: "download_document",
                        className: "w-250",
                        icon: <IcDownload />,
                        func: () =>
                          handleDownloadMultipleFile(
                            item?.productValues
                              ? [
                                  item?.productValues[
                                    item?.productValues.length - 1
                                  ]?.value,
                                ]
                              : [
                                  item?.linkFile1,
                                  item?.linkFile2,
                                  item?.linkFile3,
                                  item?.linkFile4,
                                ],
                            "File tài liệu"
                          ),
                      }}
                    />
                  </td>
                  <td className="">
                    <Button
                      color={"cancel"}
                      text={""}
                      onClick={() => handleDeletePrFavorite(item.id!)}
                      className="w-10 h-10 min-w-[40px]"
                      image={<IcBagDelete />}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <NoContent />
      )}
    </div>
  );
};

export default ProductsFavorite;
