import { useNavigate } from "react-router-dom";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import { useHandleImage } from "../../../hooks/useHandleImage";
import { ChangeEvent, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";
import { PartnerCompanyType } from "../../../types/PartnerType";
import * as Yup from "Yup";
import GroupButton from "../../../components/admin/GroupButton";
import { InputElement } from "../../../components/InputElement";
import TextError from "../../../components/TextError";
import ImagePreview from "../../../components/ImagePreview";
import InputUploadFile from "../../../components/InputUploadFile";
import LabelInput from "../../../components/LabelInput";
import clsx from "clsx";
import { uploadService } from "../../../services/uploadService";
import { partnerService } from "../../../services/partnerService";
import NotFound from "../../NotFound";
import { Button } from "../../../components/Button";
import { getUrlImage } from "../../../utils/constants";
import DropDowSelectChosePlace from "../../../components/DropDowSelectChosePlace";
import { Country, State } from "country-state-city";
import DropdownSelect from "../../../components/DropdownSelect";

interface Props {
  type: "view" | "add" | "edit";
}
type PartnerType = {
  name: string;
  type: string;
};
const typePartners: PartnerType[] = [
  {
    name: "distributor_partner",
    type: "Distributor",
  },
  {
    name: "AGENCY",
    type: "AGENCY",
  },
  {
    name: "LSI",
    type: "LSI",
  },
];
const initialPartnerCompany: PartnerCompanyType = {
  id: "",
  distributor: "",
  vat: "",
  link: "",
  email: "",
  phone: "",
  map: "",
  nation: "",
  city: "",
  namePartner: "",
  address: "",
  nameContact: "",
};

const EditPartner = ({ type }: Props) => {
  const { t } = useTranslation();
  const navigator = useNavigate();
  const [loaded, setLoaded] = useState(false);

  const listCountries = Country.getAllCountries();
  const [countries, setCountries] = useState(listCountries);
  const [cities, setCities] = useState<any[]>();
  const [countryName, setCountryName] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");
  // Formik
  const formik = useFormik<{ partner: PartnerCompanyType }>({
    initialValues: {
      partner: { ...initialPartnerCompany },
    },
    validationSchema: Yup.object({
      partner: Yup.object({
        // distributor: Yup.string().required("require.empty").max(255, "max"),
        distributor: Yup.string().required("require.empty"),

        vat: Yup.string().required("require.empty").max(255, "max"),
        email: Yup.string()
          .email("invalid_email")
          .required("require.empty")
          .max(525, "max"),
        phone: Yup.string()
          .required("require.empty")
          .matches(/([0-9])\b/g, "invalid_phone_number")
          .max(15, "max"),
        nation: Yup.string().trim().required("require.empty").max(255, "max"),
        city: Yup.string().trim().required("require.empty").max(255, "max"),
        map: Yup.string()
          .matches(
            /^<iframe src="https:\/\/www\.google\.com\/maps\/embed\?pb=[^"]*" [^>]*><\/iframe>$|^https:\/\/www\.google\.com\/maps\/embed\?pb=.+$/,
            "invalid_embeded_link_example"
          )
          .required("require.empty")
          .max(525, "max"),
        namePartner: Yup.string().required("require.empty").max(525, "max"),
        address: Yup.string().required("require.empty").max(525, "max"),
        nameContact: Yup.string().required("require.empty").max(525, "max"),
        link: Yup.string().required("require.empty"),
      }),
    }),
    onSubmit: async (value) => {
      try {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const linkImage = await uploadService.uploadImages(formData);
          value.partner.link = linkImage[0].linkMedia;
        }
        switch (type) {
          case "add": {
            if (!file) {
              return;
            }
            if (value.partner.map.startsWith("<iframe")) {
              const iframeTag = value.partner.map;
              const srcLink = iframeTag.match(/src="([^"]*)"/);
              if (srcLink) {
                value.partner.map = srcLink[1];
              } else {
                toast.error(t("invalid_embeded_link"));
                throw new Error(t("invalid_embeded_link"));
              }
            }

            await partnerService.addPartnerCompany(value.partner);
            toast.success(t("message.success.posted", { name: t("partner") }));
            navigator(-1);
            break;
          }
          case "edit": {
            const id = window.location.pathname.split("/").reverse()[0];
            value.partner.id = id;

            if (value.partner.map.startsWith("<iframe")) {
              const iframeTag = value.partner.map;
              const srcLink = iframeTag.match(/src="([^"]*)"/);
              if (srcLink) {
                value.partner.map = srcLink[1];
              } else {
                toast.error(t("invalid_embeded_link"));
                throw new Error(t("invalid_embeded_link"));
              }
            }

            await partnerService.addPartnerCompany(value.partner);
            toast.success(t("message.success.updated", { name: t("partner") }));
            navigator(-1);
            break;
          }
        }
      } catch (e) {
        switch (type) {
          case "add":
            toast.error(t("message.error.posted", { name: t("partner") }));
            break;

          case "edit":
            toast.error(t("message.error.updated", { name: t("partner") }));
            break;
        }
      }
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
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
        partnerService
          .getPartnerCompanyDetail(id)
          .then((result: PartnerCompanyType) => {
            setPreViewImage(result.link ?? "");

            const countries = Country.getCountryByCode(result.nation);
            const listCities = State.getStatesOfCountry(countries?.isoCode);
            const cityName = listCities.filter(
              (ct) => ct.isoCode === result.city
            );
            countries && setCountryName(countries?.name);
            cityName.length > 0 && setCityName(cityName[0].name);
            setFieldValue("partner", result);
            setLoaded(true);
          });
      default:
        break;
    }
  }, []);

  // Handle change img (buggy)
  const {
    preViewImage,
    handleChange,
    handleDelete,
    setPreViewImage,
    file,
    plainFiles,
    setPlainFiles,
  } = useHandleImage("", []);
  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    // if (plainFiles.length >= 1) {
    //   return toast.error(t("max_1_img"));
    // }
    handleChange(e);
  };
  useEffect(() => {
    const value = values.partner;
    // if (file) {
    value.link = preViewImage;
    // }
    setFieldValue("partner", value);
  }, [preViewImage]);
  // Handle text input value
  const handleChangeKeyValue = (
    e: ChangeEvent<HTMLInputElement>,
    field: keyof typeof values.partner
  ) => {
    if (type === "view") {
      return;
    }

    values.partner[field] = e.target.value;
    setValues(values); // Trigger update
  };
  // Button Group handler
  const handleCancel = () => {
    navigator(-1);
  };
  const handleSetPlaceValue = (value: any, index?: number) => {
    const company = { ...values.partner };
    if (index) {
      company.nation = value?.isoCode;
      company.city = "";
      setCountryName(value?.name);
      const listCities = State.getStatesOfCountry(value?.isoCode);
      setCities(listCities.length > 0 ? listCities : undefined);
      setCityName("");
    } else {
      company.city = value?.isoCode;
      setCityName(value?.name);
    }
    setFieldValue("partner", company);
  };

  return loaded ? (
    <div>
      <TitleAdminPage
        text={clsx(
          type === "add" && "create_partner",
          type === "edit" && "edit_partner"
        )}
      />
      <div className="my-8"></div>
      <div>
        <div className="flex flex-wrap gap-6 items-center mb-6">
          {type != "view" && (
            <div>
              <LabelInput text="upload_img" subText="max_1_img" />
              <InputUploadFile
                onChange={handleChangeImg}
                imgSize={t("img_size", { size: `(${t("unstable")}*40)` })}
              />
              {errors.partner?.link && touched.partner?.link && (
                <TextError
                  text={errors.partner?.link}
                  option={{ name: t("img") }}
                />
              )}
            </div>
          )}
          {preViewImage != "" && (
            <div>
              <LabelInput text="image_uploaded" />
              <ImagePreview
                imagePreview={
                  file ? preViewImage : getUrlImage(preViewImage) ?? ""
                }
                onDelete={() => {
                  type !== "view" && handleDelete();
                }}
              />
              {/* <div className="flex flex-wrap items-center gap-6">
                {plainFiles.map((plainImg, index) => {
                  return type != "view" ? (
                    <ImagePreview
                      key={index}
                      imagePreview={plainImg.link ?? ""}
                      onDelete={() => handleRemoveByIndex(index)}
                    />
                  ) : (
                    <img
                      key={index}
                      className="h-[190px] w-[340px] rounded-[4px] overflow-hidden relative group border object-cover"
                      src={plainImg.link}
                    ></img>
                  );
                })}
              </div> */}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-6">
          <div>
            <LabelInput text="distributor" />
            <DropdownSelect
              name={
                values.partner.distributor && values.partner.distributor !== ""
                  ? values?.partner?.distributor.includes("Distr")
                    ? "distributor_partner"
                    : values?.partner?.distributor
                  : "partner"
              }
              className="w-full xl:col-span-1 md:col-span-2 col-span-6"
            >
              {typePartners.map((partner, indexPartner) => {
                return (
                  <div
                    key={indexPartner}
                    className={clsx(
                      "h-12 w-full flex items-center px-6  hover:bg-active hover:text-white",
                      {
                        "bg-active text-white":
                          values.partner.distributor === partner.type,
                      }
                    )}
                    onClick={() => {
                      type !== "view" &&
                        setFieldValue("partner", {
                          ...values.partner,
                          distributor: partner.type,
                        });
                    }}
                  >
                    {t(partner.name)}
                  </div>
                );
              })}
            </DropdownSelect>
            {/* <InputElement
              placeholder="input_distributor"
              // value={values.partner.distributor}
              // onChange={(e: any) => handleChangeKeyValue(e,"distributor")}
              disabled={type === "view"}
            /> */}
            {errors.partner?.distributor && touched.partner?.distributor && (
              <TextError
                text={errors.partner?.distributor}
                option={{ name: t("distributor_partner"), length: 255 }}
              />
            )}
          </div>

          <div>
            <LabelInput text="name_partner" />
            <InputElement
              placeholder="input_name_partner"
              value={values.partner.namePartner}
              onChange={(e: any) => handleChangeKeyValue(e, "namePartner")}
              disabled={type === "view"}
            />
            {errors.partner?.namePartner && touched.partner?.namePartner && (
              <TextError
                text={errors.partner?.namePartner}
                option={{ name: t("partner_name"), length: 255 }}
              />
            )}
          </div>
          <div>
            <LabelInput text="address" />
            <InputElement
              placeholder="input_address"
              value={values.partner.address}
              onChange={(e: any) => handleChangeKeyValue(e, "address")}
              disabled={type === "view"}
            />
            {errors.partner?.address && touched.partner?.address && (
              <TextError
                text={errors.partner?.address}
                option={{ name: t("address"), length: 255 }}
              />
            )}
          </div>
          <div className="grid grid-cols-2 gap-6">
            <div>
              <LabelInput text="country" />
              <DropDowSelectChosePlace
                handleChangeInput={() => {}}
                setAllPlace={() => setCountries(listCountries)}
                placeholder="input_country"
                value={countryName}
                data={{}}
              >
                {countries &&
                  countries.map((country, indexCtry) => {
                    return (
                      <div
                        className={clsx(
                          "h-12 w-full flex items-center px-6  hover:bg-active hover:text-white",
                          {
                            "bg-active text-white":
                              country?.isoCode === values.partner.nation,
                          }
                        )}
                        key={indexCtry}
                        onClick={() => handleSetPlaceValue(country, 1)}
                      >
                        {country?.name}
                      </div>
                    );
                  })}
              </DropDowSelectChosePlace>
              {errors.partner?.nation && touched.partner?.nation && (
                <TextError
                  text={errors.partner?.nation}
                  option={{ name: t("country") }}
                />
              )}
            </div>

            <div>
              <LabelInput text="city" />
              <DropDowSelectChosePlace
                handleChangeInput={() => {}}
                setAllPlace={() => {
                  const listCities = State.getStatesOfCountry(
                    values.partner.nation
                  );
                  setCities(listCities.length > 0 ? listCities : undefined);
                }}
                placeholder="input_city"
                value={cityName}
                data={{}}
              >
                {cities && values.partner.nation ? (
                  cities.map((city, indexCity) => {
                    return (
                      <div
                        className={clsx(
                          "h-12 w-full flex items-center px-6  hover:bg-active hover:text-white",
                          {
                            "bg-active text-white":
                              city?.isoCode === values.partner.city,
                          }
                        )}
                        key={indexCity}
                        onClick={() => handleSetPlaceValue(city)}
                      >
                        {city?.name}
                      </div>
                    );
                  })
                ) : (
                  <div className="h-12 w-full flex items-center px-6  hover:bg-active hover:text-white">
                    {t("no_city")}
                  </div>
                )}
              </DropDowSelectChosePlace>
              {errors.partner?.city && touched.partner?.city && (
                <TextError
                  text={errors.partner?.city}
                  option={{ name: t("city") }}
                />
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            <div>
              <LabelInput text="tax_number" />
              <InputElement
                placeholder="input_tax_number"
                value={values.partner.vat}
                onChange={(e: any) => handleChangeKeyValue(e, "vat")}
                disabled={type === "view"}
              />
              {errors.partner?.vat && touched.partner?.vat && (
                <TextError
                  text={errors.partner?.vat}
                  option={{ name: t("tax_code"), length: 255 }}
                />
              )}
            </div>

            <div>
              <LabelInput text="contact_person" />
              <InputElement
                placeholder="input_contact_person"
                value={values.partner.nameContact}
                onChange={(e: any) => handleChangeKeyValue(e, "nameContact")}
                disabled={type === "view"}
              />
              {errors.partner?.nameContact && touched.partner?.nameContact && (
                <TextError
                  text={errors.partner?.nameContact}
                  option={{ name: t("person_contact"), length: 255 }}
                />
              )}
            </div>

            <div>
              <LabelInput text="partner_phone" />
              <InputElement
                placeholder="input_phone_number"
                value={values.partner.phone}
                onChange={(e: any) => handleChangeKeyValue(e, "phone")}
                disabled={type === "view"}
              />
              {errors.partner?.phone && touched.partner?.phone && (
                <TextError
                  text={errors.partner?.phone}
                  option={{ name: t("phone_number"), length: 15 }}
                />
              )}
            </div>

            <div>
              <LabelInput text="email" />
              <InputElement
                placeholder="input_email"
                value={values.partner.email}
                onChange={(e: any) => handleChangeKeyValue(e, "email")}
                disabled={type === "view"}
              />
              {errors.partner?.email && touched.partner?.email && (
                <TextError
                  text={errors.partner?.email}
                  option={{ name: t("email"), length: 255 }}
                />
              )}
            </div>
          </div>

          <div>
            <LabelInput text="google_map_link" />
            <InputElement
              placeholder="input_google_map_link"
              value={values.partner.map}
              onChange={(e: any) => handleChangeKeyValue(e, "map")}
              disabled={type === "view"}
            />
            {errors.partner?.map && touched.partner?.map && (
              <TextError
                text={errors.partner?.map}
                option={{ name: t("google_map_link"), length: 255 }}
              />
            )}
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
  ) : (
    <NotFound />
  );
};

export default EditPartner;
