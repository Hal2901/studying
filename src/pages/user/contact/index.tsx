import * as Yup from "Yup";
import { useFormik } from "formik";
import { useContext, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ModalContext } from "../../../context";
import { listBreads } from "../../../utils/common";
import { contactService } from "../../../services/contactService";
import { listIconContact } from "../../../utils/common";
import { listBranches } from "../../../utils/common";
import {
  BgContact,
  ContactBottom,
  ContactPerson,
  ContactRight,
  ContactTop,
  ContactTree,
  ImageContactCard,
} from "../../../assets/images";
import colors from "../../../common/colors";

import IcAddress from "../../../assets/icons/IcAddress";
import IcArrowsNex from "../../../assets/icons/IcArrowsNex";
import IcPhone from "../../../assets/icons/IcPhone";
import IcProxy from "../../../assets/icons/IcProxy";
import IcNews from "../../../assets/icons/IcNews";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { Button } from "../../../components/Button";
import { InputElement } from "../../../components/InputElement";
import LabelInput from "../../../components/LabelInput";
import { TextAreaElement } from "../../../components/TextAreaElement";
import OfficeItem from "./OfficeItem";
import { ContactType } from "../../../types/contactType";
import TextError from "../../../components/TextError";
import RegisterSuccess from "../partner/component/RegisterSuccess";

export default function Contact() {
  const { t } = useTranslation();
  const { setModal } = useContext(ModalContext);
  const navigationPrevRef = useRef(null);
  const navigationNextRef = useRef(null);
  const handleRegisterSuccess = () => {
    setModal(<RegisterSuccess />);
  };

  const formik = useFormik<ContactType>({
    initialValues: {
      id: undefined,
      fullname: "",
      phone: "",
      email: "",
      address: "",
      content: "",
      feedback: "",
    },
    validationSchema: Yup.object({
      fullname: Yup.string().trim().required("require.empty").max(255, "max"),
      phone: Yup.string()
        .trim()
        .required("require.empty")
        .matches(/([0-9])\b/g, "invalid_phone_number")
        .min(10, "min"),
      email: Yup.string()
        .email("invalid_email")
        .required("require.empty")
        .max(255, "max")
        .max(525, "max"),
      address: Yup.string().required("require.empty").max(525, "max"),
      content: Yup.string().trim().required("require.empty").max(525, "max"),
    }),
    onSubmit: async (value) => {
      try {
        const result = await contactService.addContact(value);
        handleRegisterSuccess();
        handleReset({
          id: undefined,
          fullname: "",
          phone: "",
          email: "",
          address: "",
          content: "",
          feedback: "",
        });

        toast.success(t("message.success.send", { name: t("contact") }));
      } catch (error) {
        toast.error(t("message.error.send", { name: t("contact") }));
      }
    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    handleReset,
    handleSubmit,
  } = formik;

  return (
    <div>
      <Banner typeBanner="CONTACT" />
      <Breadcrumb listBreads={listBreads} />
      <div
        style={{ backgroundImage: `url(${BgContact})` }}
        className="bg-no-repeat bg-bottom object-cover bg-white "
      >
        <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 lg:pt-88 pt-10 grid xl:grid-cols-[420px_1fr] grid-cols-1 2xl:gap-x-[116px] gap-6 items-center">
          <img
            src={ImageContactCard}
            alt=""
            className="w-full h-500 xl:order-1 order-2 object-contain"
          />
          <div className="xl:order-2 order-1 flex flex-col">
            <p className="font-semibold text-[32px] leading-[40px] mb-[32px]">
              {t("contact_title_page")}
            </p>
            <p className="mb-8">{t("contact_intro_page")}</p>
            <div className="grid xs:grid-cols-2 grid-cols-1 gap-4 ">
              {listIconContact.map((contact, indexC) => {
                return (
                  <div
                    key={indexC}
                    className="flex flex-wrap items-center gap-4"
                  >
                    <div className="rounded-1/2 bg-main flex items-center justify-center w-10 h-10">
                      {contact.type === "link-web" ? (
                        <IcProxy />
                      ) : contact.type === "address" ? (
                        <IcAddress />
                      ) : contact.type === "phone" ? (
                        <IcPhone />
                      ) : (
                        <IcNews color={colors.white} />
                      )}
                    </div>
                    {contact.type === "phone" ? (
                      <p className="w-[calc(100%_-_56px)] break-words">
                        <a href={`tel:${contact.text}`}>{contact.text}</a>
                      </p>
                    ) : contact.type === "link-web" ? (
                      <p className="w-[calc(100%_-_56px)] break-words">
                        <a href={contact.text}>{contact.text}</a>
                      </p>
                    ) : (
                      <p className="w-[calc(100%_-_56px)] break-words">
                        {t(contact.text)}
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        <div className="sc1800:pl-300 xl:pl-[155px] sm:pl-100 pl-5 py-8">
          <div className="flex flex-wrap items-center lg:pr-200 lg:justify-between gap-6 pr-5 mb-9">
            <p className="flex justify-center items-center lg:text-40 text-3xl font-semibold text-white">
              {t("represent_office")}
            </p>
            <div className="items-center gap-6 xs360:flex hidden">
              <button
                ref={navigationPrevRef}
                className="flex items-center justify-center  rotate-180 rounded-1/2 w-12 h-12 border border-white hover:bg-color_cyan"
              >
                <IcArrowsNex />
              </button>
              <button
                ref={navigationNextRef}
                className="flex items-center justify-center rounded-1/2 w-12 h-12 border border-white hover:bg-color_cyan"
              >
                <IcArrowsNex />
              </button>
            </div>
          </div>
          <div className="w-full">
            <Swiper
              modules={[Navigation, Pagination, Scrollbar, A11y]}
              spaceBetween={16}
              slidesPerView={1.1}
              breakpoints={{
                768: {
                  slidesPerView: 1.3,
                  spaceBetween: 24,
                },
                900: {
                  slidesPerView: 1.5,
                },
                1024: {
                  slidesPerView: 1.7,
                  spaceBetween: 24,
                },
                1280: {
                  slidesPerView: 2,
                },
                1536: {
                  slidesPerView: 2.5,
                },
              }}
              navigation={{
                prevEl: navigationPrevRef.current,
                nextEl: navigationNextRef.current,
              }}
              pagination={false}
              scrollbar={{ draggable: true }}
              onSwiper={(swiper: any) => {
                setTimeout(() => {
                  swiper.params.navigation.prevEl = navigationPrevRef.current;
                  swiper.params.navigation.nextEl = navigationNextRef.current;
                  swiper.navigation.init();
                  swiper.navigation.update();
                }, 300);
              }}
              onSlideChange={() => { }}
            >
              {listBranches.map((branch, index) => {
                return (
                  <SwiperSlide key={index}>
                    <OfficeItem index={index} item={branch} />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>
        </div>
      </div>

      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 lg:py-88 py-10 ">
        <p className="lg:text-40 text-3xl font-semibold mb-4 text-center">
          {t("live_contact_info")}
        </p>
        <p className="font-medium text-center mb-8">{t("troubleshooting")}</p>

        <div className="2xl:px-160 2xl:pt-100 2xl:pb-160 relative border-b">
          <div className="rounded-[30px] border border-defaultText lg:px-16 p-5 bg-[#E0E0E0] relative min-h-[500px]">
            <div className="absolute top-1/2 left-7 -translate-y-1/2 w-2 bg-[#BFBFBF] h-200 lg:block hidden "></div>
            <div className="lg:border lg:border-solid border-defaultText border-none xl:rounded-none rounded-10 overflow-hidden bg-white h-full">
              <div className="h-[55px] bg-[#9A8143] md:px-[72px] flex items-center justify-center text-white text-lg font-bold">
                {t("form_contact")}
              </div>

              <div className="lg:p-[72px] p-5">
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-6">
                  <div>
                    <LabelInput text="full_name" />
                    <InputElement
                      placeholder="input_full_name"
                      name="fullname"
                      value={values.fullname}
                      onChange={handleChange}
                    />
                    {errors.fullname && touched.fullname && (
                      <TextError
                        text={errors.fullname}
                        option={{ name: t("contact_form.name"), length: "255" }}
                      />
                    )}
                  </div>

                  <div>
                    <LabelInput text="phone_number" />
                    <InputElement
                      placeholder="input_phone_number"
                      name="phone"
                      maxLength={11}
                      value={values.phone}
                      onChange={handleChange}
                      onKeyDown={(e) => {
                        if (
                          [
                            "Backspace",
                            "Delete",
                            "Tab",
                            "Escape",
                            "Enter",
                            "ArrowLeft",
                            "ArrowRight",
                            "ArrowUp",
                            "ArrowDown",
                          ].indexOf(e.key) !== -1 ||
                          (["a", "c", "x", "z"].includes(
                            e.key.toLocaleLowerCase()
                          ) &&
                            e.ctrlKey === true) ||
                          /[0-9]/.test(e.key)
                        ) {
                          return;
                        } else {
                          e.preventDefault();
                        }
                      }}
                    />
                    {errors.phone && touched.phone && (
                      <TextError
                        text={errors.phone}
                        option={{ name: t("contact_form.phone"), length: 10 }}
                      />
                    )}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 grid-cols-1 gap-6 mb-6">
                  <div>
                    <LabelInput text="email" />
                    <InputElement
                      placeholder="input_email"
                      name="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                    {errors.email && touched.email && (
                      <TextError
                        text={errors.email}
                        option={{ name: "Email", length: "525" }}
                      />
                    )}
                  </div>
                  <div>
                    <LabelInput text="address" />
                    <InputElement
                      placeholder="input_address"
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                    />
                    {errors.address && touched.address && (
                      <TextError
                        text={errors.address}
                        option={{
                          name: t("contact_form.address"),
                          length: "525",
                        }}
                      />
                    )}
                  </div>
                </div>

                <div className="mb-6">
                  <LabelInput text="content_contact" />
                  <TextAreaElement
                    placeholder="input_content_contact"
                    name="content"
                    value={values.content}
                    onChange={handleChange}
                  />
                  {errors.content && touched.content && (
                    <TextError
                      text={errors.content}
                      option={{
                        name: t("contact_form.content"),
                        length: "525",
                      }}
                    />
                  )}
                </div>

                <div className="flex justify-center">
                  <Button
                    color="primary"
                    text="send"
                    className="px-6 py-3 !w-fit"
                    disabled={isSubmitting}
                    onClick={() => handleSubmit()}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="absolute top-0 left-10 z-[-1]">
            <img src={ContactTop} alt="" />
          </div>
          <div className="absolute top-0 right-10 z-[-1]">
            <img src={ContactRight} alt="" />
          </div>
          <div className="absolute bottom-0 right-10 z-[-1]">
            <img src={ContactBottom} alt="" />
          </div>
          <div className="absolute bottom-0 2xl:left-10 xl:-left-[12%] z-10 xl:block hidden">
            <img src={ContactTree} alt="" />
          </div>
          <div className="absolute bottom-0  2xl:right-10 xl:-right-[12%] z-10 xl:block hidden">
            <img src={ContactPerson} alt="" />
          </div>
        </div>
      </div>
    </div>
  );
}
