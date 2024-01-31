import React, { ChangeEvent, useEffect, useState } from "react";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { listBreads } from "../../../utils/common";
import TitlePage from "../../../components/TitlePage";
import { useTranslation } from "react-i18next";
import { InputElement } from "../../../components/InputElement";
import { Button } from "../../../components/Button";
import InfoProject from "./component/InfoProject";
import { guaranteeService } from "../../../services/guaranteeService";
import { WarrantyType } from "../../../types/WarrantyType";
import Loading from "../../Loading";
import NoContent from "../../NoContent";

const CheckWarrantyCertificate = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<WarrantyType>();

  const [codeFilter, setCodeFilter] = useState({
    code1: "",
    code2: "",
    code3: "",
  });

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  const handleFetchData = async () => {
    try {
      setLoading(true);
      const { data } = await guaranteeService.getGuarantees({
        page: 0,
        size: 1,
      });
      setData(data[0]);
    } catch (error) {
      setData(undefined);
    } finally {
      setLoading(false);
    }
  };
  const handleFilterGuarantee = async () => {
    try {
      if (
        codeFilter.code1 == "" &&
        codeFilter.code2 == "" &&
        codeFilter.code3 == ""
      )
        return;
      setLoading(true);
      const data = await guaranteeService.filterGuarantee(
        `${codeFilter.code1}${codeFilter.code2}${codeFilter.code3}`
      );
      setData(data);
    } catch (error) {
      setData(undefined);
    } finally {
      setLoading(false);
    }
  };
  const handleInputFilter = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const newCodeFilter = { ...codeFilter };
    switch (index) {
      case 0:
        newCodeFilter.code1 = value;
        break;
      case 1:
        newCodeFilter.code2 = value;
        break;
      case 2:
        newCodeFilter.code3 = value;
        break;
      default:
        break;
    }
    setCodeFilter(newCodeFilter);
  };
  useEffect(() => {
    // if (
    //   codeFilter.code1 == "" &&
    //   codeFilter.code2 == "" &&
    //   codeFilter.code3 == ""
    // ) {
    //   handleFetchData();
    // }
  }, [codeFilter]);
  return (
    <div>
      <Banner typeBanner="GUARANTEE" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 lg:py-88 py-10">
        <TitlePage text={"input_number_certificate"} className="!mb-4" />
        <p className="mb-4">{t("input_number_certificate_sub")}</p>
        <div className="flex flex-wrap items-center gap-6 pb-6 border-b border-border">
          <div className="font-semibold">LSCV:</div>
          <InputElement
            placeholder={isFocused ? '' : '-'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name={""}
            value={codeFilter.code1}
            maxLength={4}
            onChange={(e) => handleInputFilter(e, 0)}
            style={{ width: "100%", textAlign: "center" }}
            className="!w-[140px]"
          />
          <div className="text-defaultText sm:block hidden">-</div>
          <InputElement
            placeholder={isFocused ? '' : '-'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name={""}
            value={codeFilter.code2}
            maxLength={4}
            onChange={(e) => handleInputFilter(e, 1)}
            style={{ width: "100%", textAlign: "center" }}
            className="!w-[140px]"
          />
          <div className="text-defaultText sm:block hidden">-</div>
          <InputElement
            placeholder={isFocused ? '' : '-'}
            onFocus={handleFocus}
            onBlur={handleBlur}
            name={""}
            value={codeFilter.code3}
            maxLength={4}
            onChange={(e) => handleInputFilter(e, 2)}
            style={{ width: "100%", textAlign: "center" }}
            className="!w-[140px]"
          />
          <div className="text-defaultText sm:block hidden">-</div>
          <Button
            color="primary"
            text="checking"
            className="px-6 py-3 !w-fit !font-medium "
            disabled={loading}
            onClick={handleFilterGuarantee}
          />
        </div>

        {loading ? (
          <Loading />
        ) : data ? (
          <div className="mt-10 grid md:grid-cols-2 grid-cols-1 gap-6">
            <InfoProject name="info_project" typeBox="project" data={data} />
            <InfoProject name="info_LSI" typeBox={"LSI"} data={data} />
            <InfoProject
              name="info_distributor"
              typeBox={"distributor"}
              data={data}
            />
            <InfoProject
              name="info_guaratee"
              typeBox={"guaratee"}
              data={data}
            />
          </div>
        ) : (
          <NoContent />
        )}
      </div>
    </div>
  );
};

export default CheckWarrantyCertificate;
