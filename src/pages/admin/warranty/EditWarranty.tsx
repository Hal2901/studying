import { ChangeEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import * as Yup from "Yup";
import { useFormik } from "formik";
import clsx from "clsx";
import { WarrantyType } from "../../../types/WarrantyType";
import { guaranteeService } from "../../../services/guaranteeService";

import { InputElement } from "../../../components/InputElement";
import LabelInput from "../../../components/LabelInput";
import GroupButton from "../../../components/admin/GroupButton";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import TextError from "../../../components/TextError";
import NotFound from "../../NotFound";
import { Button } from "../../../components/Button";

interface Props {
  type: "view" | "add" | "edit";
}

// const initialWarranty = {
//   warrantyNumber: "",
//   startTime: "",
//   endTime: "",
//   projectName: "",
//   investorName: "",
//   address: "",
//   package: "",
//   lsiNumber: "",
//   installationCompany: "",
//   taxNumber: "",
//   supplierName: "",
//   orderNumber: "",
//   orderDate: ""
// }

const initialWarranty = {
  code: "",
  startDate: "",
  endDate: "",
  nameCompany: "",
  fullname: "",
  address: "",
  namePackage: "",
  codeLSI: "",
  vatLSI: "",
  nameLSI: "",
  numDistributor: "",
  dateDistributor: "",
  nameDistributor: "",
};

const EditWarranty = ({ type }: Props) => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const [loaded, setLoaded] = useState(false);

  // Formik
  const formik = useFormik<{ warranty: WarrantyType }>({
    initialValues: {
      warranty: { ...initialWarranty },
    },
    validationSchema: Yup.object({
      warranty: Yup.object({
        code: Yup.string().required("require.empty").max(255, "max"),

        // warrantyNumber: Yup.string().required("require.empty").max(255, "max"),
        // startTime: Yup.string().required("require.empty").max(255, "max"),
        // endTime: Yup.string().required("require.empty").max(525, "max"),
        // projectName: Yup.string().required("require.empty").max(255, "max"),
        // investorName: Yup.string().required("require.empty").max(255, "max"),
        // address: Yup.string().required("require.empty").max(255, "max"),
        // package: Yup.string().required("require.empty").max(255, "max"),
        // lsiNumber: Yup.string().required("require.empty").max(255, "max"),
        // installationCompany: Yup.string().required("require.empty").max(255, "max"),
        // taxNumber: Yup.string().required("require.empty").max(255, "max"),
        // supplierName: Yup.string().required("require.empty").max(255, "max"),
        // orderNumber: Yup.string().required("require.empty").max(255, "max"),
        // orderDate: Yup.string().required("require.empty").max(255, "max")
      }),
    }),
    onSubmit: async (value) => {
      try {
        switch (type) {
          case "add": {
            await guaranteeService.addGuarantee(value.warranty);
            toast.success(t("message.success.posted", { name: t("warranty") }));
            navigator(-1);
            break;
          }
          case "edit":
            const id = window.location.pathname.split("/").reverse()[0];
            value.warranty.id = id;
            await guaranteeService.addGuarantee(value.warranty);
            toast.success(
              t("message.success.updated", { name: t("warranty") })
            );
            navigator(-1);
            break;
        }
      } catch (error) {
        switch (type) {
          case "add":
            toast.error(t("message.error.posted", { name: t("warranty") }));
            break;

          case "edit":
            toast.error(t("message.error.updated", { name: t("warranty") }));
            break;
        }
      }
    },
  });
  const {
    values,
    errors,
    touched,
    handleChange: handleChangeInput,
    handleSubmit,
    setFieldValue,
    setValues,
  } = formik;

  // Chay lan dau
  useEffect(() => {
    switch (type) {
      case "add":
        setLoaded(true);
        break;
      case "view":
      case "edit":
        const id = window.location.pathname.split("/").reverse()[0];
        guaranteeService.getGuaranteeDetail(id).then((result: WarrantyType) => {
          setFieldValue("warranty", result);
          setLoaded(true);
        });
      default:
        break;
    }
  }, []);

  // Handle text input value
  const handleChangeKeyValue = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof values.warranty
  ) => {
    if (type === "view") {
      return;
    }

    values.warranty[field] = e.target.value;
    setValues(values); // Trigger update
  };
  // Cancel Btn
  const handleCancel = () => {
    navigator(-1);
  };

  return loaded ? (
    <div>
      <TitleAdminPage
        text={clsx(
          type === "add" && "add_warranty",
          type === "edit" && "edit_warranty",
          type === "view" && "view_warranty"
        )}
      />
      <div className="my-8"></div>
      <div>
        <div>
          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <LabelInput text="warranty_number" />
                <InputElement
                  placeholder="input_warranty_number"
                  value={values.warranty.code}
                  onChange={(e: any) => handleChangeKeyValue(e, "code")}
                  disabled={type === "view"}
                />
                {errors.warranty?.code && touched.warranty?.code && (
                  <TextError
                    text={errors.warranty?.code}
                    option={{ name: t("warranty_number"), length: 255 }}
                  />
                )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <LabelInput text="start_time" isRequire={false} />
                  <InputElement
                    value={values.warranty.startDate}
                    type="date"
                    onChange={(e: any) => handleChangeKeyValue(e, "startDate")}
                    disabled={type === "view"}
                  />
                  {errors.warranty?.startDate &&
                    touched.warranty?.startDate && (
                      <TextError
                        text={errors.warranty?.startDate}
                        option={{ name: t("start_time"), length: 255 }}
                      />
                    )}
                </div>
                <div>
                  <LabelInput text="end_time" isRequire={false} />
                  <InputElement
                    value={values.warranty.endDate}
                    type="date"
                    onChange={(e: any) => handleChangeKeyValue(e, "endDate")}
                    disabled={type === "view"}
                  />
                  {errors.warranty?.endDate && touched.warranty?.endDate && (
                    <TextError
                      text={errors.warranty?.endDate}
                      option={{ name: t("end_time"), length: 255 }}
                    />
                  )}
                </div>
              </div>
            </div>

            <TitleAdminPage text="info_project" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <LabelInput text="project_name" isRequire={false} />
                <InputElement
                  placeholder="input_project_name"
                  value={values.warranty.nameCompany}
                  onChange={(e: any) => handleChangeKeyValue(e, 'nameCompany')}
                  disabled={type === "view"}
                />
                {/* errors.warranty?.projectName && touched.warranty?.projectName && (
                  <TextError
                    text={errors.warranty?.projectName}
                    option={{ name: "tên dự án", length: 255 }}
                  />
                ) */}
              </div>

              <div>
                <LabelInput text="investor_name" isRequire={false} />
                <InputElement
                  placeholder="input_investor_name"
                  value={values.warranty.fullname}
                  onChange={(e: any) => handleChangeKeyValue(e, "fullname")}
                  disabled={type === "view"}
                />
                {errors.warranty?.fullname && touched.warranty?.fullname && (
                  <TextError
                    text={errors.warranty?.fullname}
                    option={{ name: t("investor_name"), length: 255 }}
                  />
                )}
              </div>

              <div>
                <LabelInput text="project_address" isRequire={false} />
                <InputElement
                  placeholder="input_address"
                  value={values.warranty.address}
                  onChange={(e: any) => handleChangeKeyValue(e, "address")}
                  disabled={type === "view"}
                />
                {errors.warranty?.address && touched.warranty?.address && (
                  <TextError
                    text={errors.warranty?.address}
                    option={{ name: t("address"), length: 255 }}
                  />
                )}
              </div>

              <div>
                <LabelInput text="package_name" isRequire={false} />
                <InputElement
                  placeholder="input_package_name"
                  value={values.warranty.namePackage}
                  onChange={(e: any) => handleChangeKeyValue(e, "namePackage")}
                  disabled={type === "view"}
                />
                {errors.warranty?.namePackage &&
                  touched.warranty?.namePackage && (
                    <TextError
                      text={errors.warranty?.namePackage}
                      option={{ name: t("package_name"), length: 255 }}
                    />
                  )}
              </div>
            </div>

            <TitleAdminPage text="info_LSI" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <LabelInput text="lsi_number" isRequire={false} />
                <InputElement
                  placeholder="input_lsi_number"
                  value={values.warranty.codeLSI}
                  onChange={(e: any) => handleChangeKeyValue(e, "codeLSI")}
                  disabled={type === "view"}
                />
                {errors.warranty?.codeLSI && touched.warranty?.codeLSI && (
                  <TextError
                    text={errors.warranty?.codeLSI}
                    option={{ name: t("lsi_number"), length: 255 }}
                  />
                )}
              </div>
              <div>
                <LabelInput
                  text="installation_company_name"
                  isRequire={false}
                />
                <InputElement
                  placeholder="input_installation_company_name"
                  name="name"
                  value={values.warranty.nameLSI}
                  onChange={(e: any) => handleChangeKeyValue(e, 'nameLSI')}
                  disabled={type === "view"}
                />
                {errors.warranty?.nameCompany &&
                  touched.warranty?.nameCompany && (
                    <TextError
                      text={errors.warranty?.nameCompany}
                      option={{
                        name: t("installation_company_name"),
                        length: 255,
                      }}
                    />
                  )}
              </div>

              <div>
                <LabelInput text="tax_number" isRequire={false} />
                <InputElement
                  placeholder="input_tax_number"
                  name="name"
                  value={values.warranty.vatLSI}
                  onChange={(e: any) => handleChangeKeyValue(e, "vatLSI")}
                  disabled={type === "view"}
                />
                {errors.warranty?.vatLSI && touched.warranty?.vatLSI && (
                  <TextError
                    text={errors.warranty?.vatLSI}
                    option={{ name: t("tax_code"), length: 255 }}
                  />
                )}
              </div>
            </div>

            <TitleAdminPage text="info_distributor" />
            <div className="grid grid-cols-2 gap-6">
              <div>
                <LabelInput text="supplier_name" isRequire={false} />
                <InputElement
                  placeholder="input_supplier_name"
                  name="name"
                  value={values.warranty.nameDistributor}
                  onChange={(e: any) =>
                    handleChangeKeyValue(e, "nameDistributor")
                  }
                  disabled={type === "view"}
                />
                {errors.warranty?.nameDistributor &&
                  touched.warranty?.nameDistributor && (
                    <TextError
                      text={errors.warranty?.nameDistributor}
                      option={{ name: t("supplier_name"), length: 255 }}
                    />
                  )}
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <LabelInput text="order_number" isRequire={false} />
                  <InputElement
                    placeholder="input_order_number"
                    name="name"
                    value={values.warranty.numDistributor}
                    type="number"
                    onChange={(e: any) =>
                      handleChangeKeyValue(e, "numDistributor")
                    }
                    disabled={type === "view"}
                  />
                  {errors.warranty?.numDistributor &&
                    touched.warranty?.numDistributor && (
                      <TextError
                        text={errors.warranty?.numDistributor}
                        option={{ name: t("order_number"), length: 255 }}
                      />
                    )}
                </div>
                <div>
                  <LabelInput text="order_date" isRequire={false} />
                  <InputElement
                    name="name"
                    type="date"
                    value={values.warranty.dateDistributor}
                    onChange={(e: any) =>
                      handleChangeKeyValue(e, "dateDistributor")
                    }
                    disabled={type === "view"}
                  />
                  {errors.warranty?.dateDistributor &&
                    touched.warranty?.dateDistributor && (
                      <TextError
                        text={errors.warranty?.dateDistributor}
                        option={{ name: t("order_date"), length: 255 }}
                      />
                    )}
                </div>
              </div>
            </div>
          </div>
          <div className="my-8">
            {type != "view" ? (
              <GroupButton onCancel={handleCancel} onSubmit={handleSubmit} />
            ) : (
              <div className="flex items-center gap-6 justify-end">
                <Button
                  color="empty"
                  text={"cancel_btn"}
                  className="px-6 py-3 !w-fit"
                  onClick={handleCancel}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <NotFound />
  );
};

export default EditWarranty;
