import * as Yup from "Yup";
import clsx from "clsx";
import { Country, State } from "country-state-city";
import { useFormik } from "formik";
import { debounce } from "lodash";
import { ChangeEvent, useCallback, useContext, useState } from "react";
import { useTranslation } from "react-i18next";
import { partnerService } from "../../../services/partnerService";
import { listBreads } from "../../../utils/common";
import { ModalContext } from "../../../context";
import { toast } from "react-toastify";
import { PartnerType } from "../../../types/PartnerType";

import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { Button } from "../../../components/Button";
import DropDowSelectChosePlace from "../../../components/DropDowSelectChosePlace";
import { InputElement } from "../../../components/InputElement";
import LabelInput from "../../../components/LabelInput";
import TextError from "../../../components/TextError";
import TitlePage from "../../../components/TitlePage";
import RegisterSuccess from "./component/RegisterSuccess";

const initialValuesForm = {
  id: undefined,
  feedback: "",
  company: {
    nameCompany: "",
    representative: "",
    web: "",
    nation: "",
    city: "",
    address: "",
  },
  person: {
    namePerson: "",
    phone: "",
    fax: "",
    email: "",
    position: "",
    part: "",
  },
};

const RegisterToBecomeAPartner = () => {
  const { t } = useTranslation();
  const { setModal } = useContext(ModalContext);

  const listCountries = Country.getAllCountries();
  // const listCities = State.getStatesOfCountry("VN");
  // const getDetailCountry = Country.getCountryByCode("VN");
  // const getDetailCitiyOfCountry = State.getStateByCodeAndCountry("44", "VN");

  const [countries, setCountries] = useState(listCountries);
  const [cities, setCities] = useState<any[]>();
  const [countryName, setCountryName] = useState<string>("");
  const [cityName, setCityName] = useState<string>("");

  const handleFilterCountry = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setCountryName(value);
    if (value != "") {
      handleDebounce(value);
    } else {
      handleDebounce.cancel();
      setCountries(listCountries);
      setFieldValue("company", { ...values.company, nation: "" });
    }
  };

  const handleFilterCities = (e: ChangeEvent<HTMLInputElement>) => {
    if (values.company.nation === "") return;
    const value = e.target.value;
    setCityName(value);
    if (value != "") {
      handleDebounce(value, true);
    } else {
      handleDebounce.cancel();
      const listCities = State.getStatesOfCountry(values.company.nation);
      setCities(listCities.length > 0 ? listCities : undefined);
      setFieldValue("company", { ...values.company, city: "" });
    }
  };

  const handleRegisterSuccess = () => {
    setModal(<RegisterSuccess />);
  };

  const formik = useFormik<PartnerType>({
    initialValues: {
      id: undefined,
      feedback: "",
      company: {
        nameCompany: "",
        representative: "",
        web: "",
        nation: "",
        city: "",
        address: "",
      },
      person: {
        namePerson: "",
        phone: "",
        fax: "",
        email: "",
        position: "",
        part: "",
      },
    },
    validationSchema: Yup.object({
      company: Yup.object({
        nameCompany: Yup.string().required("require.empty").max(255, "max"),
        representative: Yup.string().required("require.empty").max(255, "max"),
        web: Yup.string().required("require.empty").max(255, "max"),
        nation: Yup.string().required("require.empty").max(255, "max"),
        city: Yup.string().required("require.empty").max(255, "max"),
        address: Yup.string().required("require.empty").max(255, "max"),
      }),
      person: Yup.object({
        namePerson: Yup.string().required("require.empty").max(255, "max"),
        phone: Yup.string()
          .required("require.empty")
          .matches(/([0-9]{10})\b/g, "invalid_phone_number")
          .max(10, "max"),
        fax: Yup.string().required("require.empty").max(255, "max"),
        position: Yup.string().required("require.empty").max(255, "max"),
        part: Yup.string().required("require.empty").max(255, "max"),
        email: Yup.string().required("require.empty").email("invalid_email"),
      }),
    }),
    onSubmit: async (value: any) => {
      try {
        const requestRegistered = await partnerService.addPartner({
          ...value,
          feedback: null,
        });
        resetFormValue();
        handleRegisterSuccess();
      } catch (error) {
        toast.error(t('message.error.send', { name: t('partner_request') }))
      }
    },
  });

  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
    setErrors,
    setFieldValue,
    handleSubmit,
  } = formik;

  const resetFormValue = () => {
    setValues({
      id: undefined,
      feedback: "",
      company: {
        nameCompany: "",
        representative: "",
        web: "",
        nation: "",
        city: "",
        address: "",
      },
      person: {
        namePerson: "",
        phone: "",
        fax: "",
        email: "",
        position: "",
        part: "",
      },
    });
    setErrors({});
    setCountries(listCountries);
    setCities(undefined);
    setCountryName("");
    setCityName("");
  };

  const handleDebounce = useCallback(
    debounce((value: string, isCity?: boolean) => {
      if (isCity) {
        const cloneCities = State.getStatesOfCountry(values.company.nation);
        const newCities = cloneCities.filter((item) => {
          return item?.name.includes(value);
        });
        setCities(newCities);
      } else {
        const cloneCountries = [...listCountries];
        const newCountries = cloneCountries.filter((item) => {
          return item?.name.includes(value);
        });
        setCountries(newCountries);
      }
    }, 1000),
    [values]
  );

  const handleChangeFiedOfValues = (
    e: ChangeEvent<HTMLInputElement>,
    isPersion?: boolean
  ) => {
    const newValueForm: any = { ...values };
    const name = e.target.name;
    const value = e.target.value;
    if (isPersion) {
      newValueForm.person[name] = value;
    }
    newValueForm.company[name] = value;
    setValues(newValueForm);
  };

  const handleSetPlaceValue = (value: any, index?: number) => {
    const company = { ...values.company };
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
    setFieldValue("company", company);
  };

  return (
    <div>
      <Banner typeBanner="PARTNER_REGISTER" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 lg:py-88 py-10">
        <TitlePage text={"partner_program"} className="!mb-4" />
        <p className="mb-10">{t("register_partner_sub")}</p>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-10">
          <p className="text-2xl font-semibold mt-10 mb-8 md:col-span-2">
            {t("info_company")}
          </p>
          <div>
            <LabelInput text="company_name" />
            <InputElement
              placeholder={`input_company_name`}
              name="nameCompany"
              value={values.company.nameCompany}
              onChange={handleChangeFiedOfValues}
            />
            {errors.company?.nameCompany && touched.company?.nameCompany && (
              <TextError
                text={errors.company?.nameCompany}
                option={{ name: t("company_name") }}
              />
            )}
          </div>
          <div>
            <LabelInput text="repesen_name" />
            <InputElement
              placeholder={`input_repesen_name`}
              name="representative"
              value={values.company.representative}
              onChange={handleChangeFiedOfValues}
            />
            {errors.company?.representative &&
              touched.company?.representative && (
                <TextError
                  text={errors.company?.representative}
                  option={{ name: t("repesen_name") }}
                />
              )}
          </div>
          <div>
            <LabelInput text="network_page" />
            <InputElement
              placeholder={`input_network_page`}
              name="web"
              value={values.company.web}
              onChange={handleChangeFiedOfValues}
            />
            {errors.company?.web && touched.company?.web && (
              <TextError
                text={errors.company?.web}
                option={{ name: t("network_page") }}
              />
            )}
          </div>
          <div>
            <LabelInput text="country" />
            <DropDowSelectChosePlace
              handleChangeInput={handleFilterCountry}
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
                            country?.isoCode === values.company.nation,
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
            {errors.company?.nation && touched.company?.nation && (
              <TextError
                text={errors.company?.nation}
                option={{ name: t('country') }}
              />
            )}
          </div>
          <div>
            <LabelInput text="city" />
            <DropDowSelectChosePlace
              handleChangeInput={handleFilterCities}
              setAllPlace={() => {
                const listCities = State.getStatesOfCountry(
                  values.company.nation
                );
                setCities(listCities.length > 0 ? listCities : undefined);
              }}
              placeholder="input_city"
              value={cityName}
              data={{}}
            >
              {cities && values.company.nation ? (
                cities.map((city, indexCity) => {
                  return (
                    <div
                      className={clsx(
                        "h-12 w-full flex items-center px-6  hover:bg-active hover:text-white",
                        {
                          "bg-active text-white":
                            city?.isoCode === values.company.city,
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
                  {t('no_city')}
                </div>
              )}
            </DropDowSelectChosePlace>
            {errors.company?.city && touched.company?.city && (
              <TextError
                text={errors.company?.city}
                option={{ name: t('city') }}
              />
            )}
          </div>
          <div>
            <LabelInput text="address_company" />
            <InputElement
              placeholder={`input_address_company`}
              name="address"
              value={values.company.address}
              onChange={handleChangeFiedOfValues}
            />
            {errors.company?.address && touched.company?.address && (
              <TextError
                text={errors.company?.address}
                option={{ name: t('address') }}
              />
            )}
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-6">
          <p className="text-2xl font-semibold mt-10 mb-8 md:col-span-2">
            {t("info_individual")}
          </p>
          <div>
            <LabelInput text="name" />
            <InputElement
              placeholder={`input_name`}
              name="namePerson"
              value={values.person.namePerson}
              onChange={(e) => handleChangeFiedOfValues(e, true)}
            />
            {errors.person?.namePerson && touched.person?.namePerson && (
              <TextError
                text={errors.person.namePerson}
                option={{ name: t('full_name') }}
              />
            )}
          </div>
          <div>
            <LabelInput text="phone_number" />
            <InputElement
              placeholder={`input_phone_number`}
              name="phone"
              value={values.person.phone}
              onChange={(e) => handleChangeFiedOfValues(e, true)}
            />
            {errors.person?.phone && touched.person?.phone && (
              <TextError
                text={errors.person.phone}
                option={{ name: t('phone_number'), length: 10 }}
              />
            )}
          </div>
          <div>
            <LabelInput text="fax_number" />
            <InputElement
              placeholder={`input_fax_number`}
              name="fax"
              value={values.person.fax}
              onChange={(e) => handleChangeFiedOfValues(e, true)}
            />
            {errors.person?.fax && touched.person?.fax && (
              <TextError text={errors.person.fax} option={{ name: t("fax") }} />
            )}
          </div>
          <div>
            <LabelInput text="position" />
            <InputElement
              placeholder={`input_position`}
              name="position"
              value={values.person.position}
              onChange={(e) => handleChangeFiedOfValues(e, true)}
            />
            {errors.person?.position && touched.person?.position && (
              <TextError
                text={errors.person.position}
                option={{ name: t('position') }}
              />
            )}
          </div>
          <div>
            <LabelInput text="part_name" />
            <InputElement
              placeholder={`input_part_name`}
              name="part"
              value={values.person.part}
              onChange={(e) => handleChangeFiedOfValues(e, true)}
            />
            {errors.person?.part && touched.person?.part && (
              <TextError
                text={errors.person.part}
                option={{ name: t("part_name") }}
              />
            )}
          </div>
          <div>
            <LabelInput text="email" />
            <InputElement
              placeholder={`input_email`}
              name="email"
              value={values.person.email}
              onChange={(e) => handleChangeFiedOfValues(e, true)}
            />
            {errors.person?.email && touched.person?.email && (
              <TextError
                text={errors.person.email}
                option={{ name: t("email") }}
              />
            )}
          </div>
        </div>
        <p>
          {t('notice_on_privacy')} [ &nbsp;
          <span className="underline text-active cursor-pointer">
            {t('privacy_rights')}
          </span>
          &nbsp; ] {t('of ours')}
        </p>

        <div className="mt-8 flex gap-6">
          <Button
            color="danger"
            text="cancel"
            className="px-6 py-3 !w-fit !font-medium "
            type="reset"
            onClick={resetFormValue}
          />
          <Button
            color="primary"
            text="confirm"
            className="px-6 py-3 !w-fit !font-medium "
            disabled={isSubmitting}
            onClick={() => handleSubmit()}
          />
        </div>
      </div>
    </div>
  );
};

export default RegisterToBecomeAPartner;
