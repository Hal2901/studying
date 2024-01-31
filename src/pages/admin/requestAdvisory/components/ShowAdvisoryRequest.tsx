import React, { ChangeEvent, useContext, useEffect, useState } from "react";
import * as Yup from "Yup";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { ModalContext } from "../../../../context";
import { useFormik } from "formik";
import { ContactType } from "../../../../types/contactType";
import { contactService } from "../../../../services/contactService";

import TitleAdminPage from "../../../../components/admin/TitleAdminPage";
import LabelInput from "../../../../components/LabelInput";
import { InputElement } from "../../../../components/InputElement";
import TextError from "../../../../components/TextError";
import GroupButton from "../../../../components/admin/GroupButton";
import { TextAreaElement } from "../../../../components/TextAreaElement";
import { ConfirmModal } from "../../../../context/ConfirmModal";
import IcQuestion from "../../../../assets/icons/IcQuestion";

interface Props {
  data: ContactType
  type: "view" | "add" | "edit"
  refresh: () => void
}

const initialContact: ContactType = {
  fullname: "",
  phone: "",
  email: "",
  address: "",
  content: "",
};

const ShowAdvisoryRequest = ({ data, type, refresh }: Props) => {
  const { t } = useTranslation()
  const [isResponded, setIsResponded] = useState(false)
  const { closeModal, setModal } = useContext(ModalContext);

  useEffect(() => {
    if (data.feedback) {
      setIsResponded(true)
    }
  }, [])

  // FORMIK
  const formik = useFormik<{ contact: ContactType }>({
    initialValues: {
      contact: type === "add" ? initialContact : { ...data },
    },
    validationSchema: Yup.object({
      contact: Yup.object({
        // fullname: Yup.string().required("require.empty").max(255, "max"),
        // phone: Yup.string().required("require.empty").max(11, "max"),
        // email: Yup.string().required("require.empty").max(525, "max"),
        // address: Yup.string().required("require.empty").max(525, "max"),
        // content: Yup.string().required("require.empty").max(525, "max"),
        feedback: Yup.string().required("require.empty").max(525, "max")
      })

    }),
    onSubmit: async (value) => {
      if (!isResponded) {
        setModal(
          <ConfirmModal
            onDelete={async () => {
              try {
                await contactService.editContact(value.contact)
                toast.success(t('message.success.replied', { name: t('advisory_request') }))
                refresh()
                closeModal()
              } catch (error) {
                toast.error(t('message.error.replied', { name: t('advisory_request') }))
              }
            }}

            onCancel={() => {
              setModal(<ShowAdvisoryRequest data={data} type={type} refresh={refresh} />)
            }}

            message="message_comfirm.responded"
            note="note.responded"
            icon={<IcQuestion width={120} height={120} />}
            cancelColor='empty'
            submitColor='primary'
          />
        )
      }
    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleSubmit,
    setFieldValue,
  } = formik;

  const handleChangeKeyValue = (
    e: ChangeEvent<HTMLInputElement>,
    name: keyof typeof values.contact
  ) => {
    if (type === "view") {
      return;
    }

    const value = values.contact;
    value[name] = e.target.value;
    setFieldValue("contact", value);
  };

  return (
    <div className="w-[60vw] max-h-[80vh] overflow-y-scroll hidden-scroll rounded-10 bg-white py-10 px-6">
      <TitleAdminPage
        className="!text-[32px] leading-[40px] mb-10 text-center uppercase !w-full"
        text={"request_advisory_replied"}
      />
      <div className="flex flex-col gap-6 mb-6">
        <TitleAdminPage text={"request_advisory_content"} />

        <div className="grid grid-cols-2 gap-6">
          <div>
            <LabelInput text="full_name" />
            <InputElement
              placeholder="input_full_name"
              value={values.contact.fullname}
              disabled
              onChange={(e: any) => handleChangeKeyValue(e, "fullname")}
            />
            {errors.contact?.fullname && touched.contact?.fullname && (
              <TextError
                text={errors.contact?.fullname}
                option={{ name: t('name'), length: 255 }}
              />
            )}
          </div>
          <div>
            <LabelInput text="phone_number" />
            <InputElement
              placeholder="input_phone_number"
              value={values.contact.phone}
              disabled
              onChange={(e: any) => handleChangeKeyValue(e, "phone")}
              onKeyDown={(e) => {
                if (["Backspace", "Delete", "Tab", "Escape", "Enter", "ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].indexOf(e.key) !== -1
                  || (['a', 'c', 'x', 'z'].includes(e.key.toLocaleLowerCase()) && e.ctrlKey === true)
                  || (/[0-9]/.test(e.key))) {
                  return
                } else {
                  e.preventDefault()
                }
              }}
            />
            {errors.contact?.phone && touched.contact?.phone && (
              <TextError
                text={errors.contact?.phone}
                option={{ name: t('phone_number'), length: 11 }}
              />
            )}
          </div>

          <div>
            <LabelInput text="email" />
            <InputElement
              placeholder="input_email"
              value={values.contact.email}
              disabled
              onChange={(e: any) => handleChangeKeyValue(e, "email")}
            />
            {errors.contact?.email && touched.contact?.email && (
              <TextError
                text={errors.contact?.email}
                option={{ name: t("email"), length: '525' }}
              />
            )}
          </div>

          <div>
            <LabelInput text="address" />
            <InputElement
              placeholder="input_address"
              value={values.contact.address}
              disabled
              onChange={(e: any) => handleChangeKeyValue(e, "address")}
            />
            {errors.contact?.address && touched.contact?.address && (
              <TextError
                text={errors.contact?.address}
                option={{ name: t('address'), length: '525' }}
              />
            )}
          </div>
        </div>


        <div>
          <LabelInput text="content" />
          <TextAreaElement
            placeholder="input_content"
            value={values.contact.content}
            disabled
            onChange={(e: any) => handleChangeKeyValue(e, "content")}
          />
          {errors.contact?.content && touched.contact?.content && (
            <TextError
              text={errors.contact?.content}
              option={{ name: t('description'), length: '525' }}
            />
          )}
        </div>

      </div>

      <div>
        <TitleAdminPage text={"customer_feedback_replied"} />

        <div className=" my-5">
          <LabelInput text="content" />
          <TextAreaElement
            placeholder="input_content"
            value={values.contact.feedback}
            disabled={type === 'view' || isResponded}
            onChange={(e: any) => handleChangeKeyValue(e, "feedback")}
          />
          {errors.contact?.feedback && touched.contact?.feedback && (
            <TextError
              text={errors.contact?.feedback}
              option={{ name: t("content"), length: '525' }}
            />
          )}
        </div>
      </div>

      {type != "view" && !isResponded && <div>
        <GroupButton
          textSubmit={t("send")}
          onCancel={closeModal}
          onSubmit={handleSubmit}
          disable={isSubmitting}
        />
      </div>}
    </div>
  );
};

export default ShowAdvisoryRequest