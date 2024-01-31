import React, { ChangeEvent, useEffect, useState } from "react";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import { useNavigate, useParams } from "react-router-dom";
import * as Yup from "Yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { InputElement } from "../../../components/InputElement";
import TextError from "../../../components/TextError";
import LabelInput from "../../../components/LabelInput";
import IcUploadImgThin from "../../../assets/icons/IcUploadImgThin";
import IcDelete from "../../../assets/icons/IcDelete";
import GroupButton from "../../../components/admin/GroupButton";
import { initialTypeTopic, topicType } from "../../../types/topicType";
import { uploadService } from "../../../services/uploadService";
import { topicService } from "../../../services/toppic/topicService";
import { toast } from "react-toastify";

interface Props {
  typePage: topicType;
  titlePage?: string;
  pathRedirect?: string;
  textBtnEdit?: string;
  textBtnDelete?: string;
}
const DocumentForm = ({ typePage }: Props) => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [file, setFile] = useState<File>();
  const formik = useFormik<initialTypeTopic>({
    initialValues: {
      id: null,
      file: "",
      title: "",
      link: "",
      description: "",
      content: "",
      createdDate: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("require.empty").max(255, "max"),
    }),
    onSubmit: async (value) => {
      try {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const result = await uploadService.uploadFile(formData);
          value.file = result.linkMedia;
        }
        const uploaded = await topicService.uploadTopic(
          { type: typePage },
          value
        );
        toast.success(
          id
            ? t("message.success.updated", { name: t('document') })
            : t("message.success.posted", { name: t('document') })
        );
        handleCancel();
      } catch (error) {
        toast.error(
          id ? t("message.error.updated", { name: t('document') }) : t("message.error.posted", { name: t('document') })
        );
      }
    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    setValues,
    setFieldValue,
    handleSubmit,
  } = formik;

  const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFieldValue("file", file.name);
    setFile(file);
    e.target.value = "";
  };
  const handleDeleteFile = () => {
    setFile(undefined);
    setFieldValue("file", "");
  };
  const handleCancel = () => {
    navigate(-1);
  };

  const getDetailsTopic = async (id: number) => {
    try {
      const data = await topicService.getDetailsTopic(id, { type: typePage });
      if (data) {
        setValues(data);
      }
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('document') }))
    }
  };

  useEffect(() => {
    if (id) {
      getDetailsTopic(+id);
    }
  }, [id]);
  return (
    <div>
      <TitleAdminPage text={id ? "Edit_document" : "add_document"} />

      <div className="my-10 flex flex-col gap-4">
        <div>
          <LabelInput text="title" />
          <InputElement
            placeholder="input_title"
            name="title"
            value={values.title}
            onChange={handleChange}
          />
          {errors.title && touched.title && (
            <TextError
              text={errors.title ?? ""}
              option={{ name: t("title"), length: 255 }}
            />
          )}
        </div>
        <div>
          <div className="grid grid-auto-fit-200 items-end gap-6 ">
            <div>
              <p className="mb-1 font-medium"> {t("upload_file_type")}</p>
              <label className="flex h-[110px] border-[2px] border-dashed flex-col items-center justify-center rounded-10">
                <div className="w-11 h-11 rounded-1/2 bg-border flex items-center justify-center mb-3">
                  <IcUploadImgThin />
                </div>
                <p className="text-active">{t("click_to_upload")}</p>
                <input
                  type="file"
                  accept=".xlsx,.xls, image/png, image/jpeg, .doc, .docx, .pdf"
                  hidden
                  onChange={handleChangeFile}
                />
              </label>
            </div>

            <div>
              <LabelInput text="file_uploaded" isRequire={false} />
              <div className="flex items-center h-[110px] justify-between gap-6 bg-whiteFAFAFA rounded-10 border px-4">
                {values.file ? (
                  <>
                    <div className="flex items-center overflow-hidden gap-4">
                      <div className="flex-shrink-0">
                        <IcUploadImgThin />
                      </div>
                      {values.file}
                    </div>
                    <div onClick={handleDeleteFile} className="cursor-pointer">
                      <IcDelete />
                    </div>
                  </>
                ) : (
                  t("no_file")
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-8">
        <GroupButton
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          disable={isSubmitting}
        />
      </div>
    </div>
  );
};

export default DocumentForm;
