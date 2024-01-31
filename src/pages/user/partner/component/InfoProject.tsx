import clsx from "clsx";
import React, { memo } from "react";
import { useTranslation } from "react-i18next";
import { WarrantyType } from "../../../../types/WarrantyType";
import { momentFormat } from "../../../../utils/constants";

interface Props {
  typeBox: "project" | "LSI" | "guaratee" | "distributor";
  name: string;
  data: WarrantyType;
}
const InfoProject = memo(({ name, typeBox, data }: Props) => {
  const { t } = useTranslation();
  return (
    <div className="w-full border border-border rounded-[4px] overflow-hidden">
      <div
        className={clsx("h-14 flex items-center gap-2 sm:px-6 px-4", {
          "bg-main": typeBox === "project",
          "bg-[#ED164B]": typeBox === "LSI",
          "bg-[#9A8143]": typeBox === "distributor",
          "bg-[#90979D]": typeBox === "guaratee",
        })}
      >
        <div className="w-3 h-3 rounded-1/2 bg-white"></div>
        <p className="text-lg font-bold text-white">{t(name)}</p>
      </div>
      <div
        className={clsx("sm:px-[45px] px-8 py-6", {
          "bg-bgProject": typeBox === "project",
          "bg-bgPinkOpacity": typeBox === "LSI",
          "bg-bgDistributor": typeBox === "distributor",
          "bg-bgGuaratee": typeBox === "guaratee",
        })}
      >
        <ul className="flex flex-col gap-6 list-disc">
          {typeBox === "project" && (
            <>
              <li>
                {t("investor_name")} :&nbsp;
                <span className="font-medium">{data.fullname}</span>
              </li>
              <li>
                {t("project_name")} :&nbsp;
                <span className="font-medium">{data.namePackage}</span>
              </li>
              <li>
                {t("address")} :&nbsp;
                <span className="font-medium">{data.address}</span>
              </li>
              <li>
                {t("package_name")} :&nbsp;
                <span className="font-medium">{data.nameDistributor}</span>
              </li>
            </>
          )}
          {typeBox === "LSI" && (
            <>
              <li>
                {t("lsi_number")} :&nbsp;
                <span className="font-medium">{data.codeLSI}</span>
              </li>
              <li>
                {t("installation_company_name")} :&nbsp;
                <span className="font-medium">{data.nameCompany}</span>
              </li>
              <li>
                {t("tax_code")} :&nbsp;
                <span className="font-medium">{data.vatLSI}</span>
              </li>
            </>
          )}
          {typeBox === "distributor" && (
            <>
              <li>
                {t("supplier_name")} :&nbsp;
                <span className="font-medium">{data.nameDistributor}</span>
              </li>
              <li>
                {t("order_number")} :&nbsp;
                <span className="font-medium">{data.numDistributor}</span>
              </li>
              <li>
                {t("order_date")} :&nbsp;
                <span className="font-medium">{data.dateDistributor}</span>
              </li>
            </>
          )}
          {typeBox === "guaratee" && (
            <>
              <li>
                {t("warranty_number")} : &nbsp;
                <span className="font-medium">{data.code}</span>
              </li>
              <li>
                {t("time_warranty")} :&nbsp;
                <span className="font-medium">
                  {momentFormat(data.startDate)} - {momentFormat(data.endDate)}
                </span>
              </li>
            </>
          )}
        </ul>
      </div>
    </div>
  );
});

export default InfoProject;
