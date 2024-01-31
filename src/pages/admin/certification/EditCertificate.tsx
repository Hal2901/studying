import React, { ChangeEvent, useEffect, useState } from "react";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import GroupButton from "../../../components/admin/GroupButton";
import LabelInput from "../../../components/LabelInput";
import InputUploadFile from "../../../components/InputUploadFile";
import TextError from "../../../components/TextError";
import ImagePreview from "../../../components/ImagePreview";
import * as Yup from "Yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useHandleImage } from "../../../hooks/useHandleImage";
import { InputElement } from "../../../components/InputElement";
import IcUploadImgThin from "../../../assets/icons/IcUploadImgThin";
import IcDelete from "../../../assets/icons/IcDelete";
import { toast } from "react-toastify";
import { initialTypeTopic } from "../../../types/topicType";
import { useNavigate, useParams } from "react-router-dom";
import { topicService } from "../../../services/toppic/topicService";
import { uploadService } from "../../../services/uploadService";
import { getUrlImage } from "../../../utils/constants";

interface Props {
  type: 'add' | 'edit'
}

const EditCertificate = ({ type }: Props) => {
  const typePage = "CERTIFICATE";
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    preViewImage,
    handleChange: handleChangeFile,
    handleDelete,
    file: fileImg,
    handlePaste,
  } = useHandleImage("");
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
      link: Yup.string().required("require.empty"),
      title: Yup.string().required("require.empty").max(255, "max"),
      file: Yup.string().required('require.empty')
    }),
    onSubmit: async (value) => {
      try {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const result = await uploadService.uploadFile(formData);
          value.file = result.linkMedia;
        }

        if (fileImg) {
          const formData = new FormData();
          formData.append("file", fileImg);
          const result = await uploadService.uploadImages(formData);
          value.link = result[0].linkMedia;
        } else {
          value.link = preViewImage.split('/').reverse()[0]
        }

        const uploaded = await topicService.uploadTopic(
          { type: typePage },
          value
        );

        toast.success(
          id
            ? t("message.success.updated", { name: t('certificate') })
            : t("message.success.posted", { name: t('certificate') })
        );

        handleReset();
      } catch (error) {
        toast.error(
          id
            ? t("message.error.updated", { name: t('certificate') })
            : t("message.error.posted", { name: t('certificate') })
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

  const handleReset = () => {
    navigate(-1);
  };

  const handleUploadFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    setFieldValue("file", file.name);
    setFile(file);
    e.target.value = "";
  };
  const handleDeleteFile = () => {
    setFile(undefined);
    setFieldValue("file", "");
  };

  const getDetailsTopic = async (id: number) => {
    try {
      const data = await topicService.getDetailsTopic(id, { type: typePage });
      if (data) {
        setValues(data);
        if (data.link) {
          handlePaste(getUrlImage(data.link));
        }
      }
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('certificate') }))
    }
  };

  useEffect(() => {
    if (id) {
      getDetailsTopic(+id);
    }
  }, [id]);

  useEffect(() => {
    if (file || preViewImage) {
      setFieldValue("link", preViewImage);
    } else {
      setFieldValue('link', '')
    }
  }, [preViewImage, file]);

  return (
    <div>
      <TitleAdminPage text={"certificate_mn"} />

      <div className="my-10 flex flex-col gap-4">
        <div className="flex flex-wrap gap-6 items-center mb-6">
          <div>
            <LabelInput text="upload_img" subText="max_1_img" />
            <InputUploadFile onChange={handleChangeFile} imgSize={t('img_size', { size: '(424*302)' })} />
          </div>
          {preViewImage != "" && (
            <div>
              <LabelInput text="image_uploaded" />
              <ImagePreview
                imagePreview={preViewImage ?? ""}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
        {errors.link && touched.link && (
          <TextError text={errors.link} option={{ name: t("img") }} />
        )}
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
                  onChange={handleUploadFile}
                />
              </label>
            </div>

            <div>
              <LabelInput text="file_uploaded" />
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

          {errors.file && touched.file && (
            <TextError
              text={errors.file ?? ""}
              option={{ name: t("file") }}
            />
          )}
        </div>
      </div>

      <div className="mb-8">
        <GroupButton
          onCancel={handleReset}
          onSubmit={handleSubmit}
          disable={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditCertificate;
