import * as Yup from "Yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import ImagePreview from "../../../components/ImagePreview";
import { InputElement } from "../../../components/InputElement";
import InputUploadFile from "../../../components/InputUploadFile";
import LabelInput from "../../../components/LabelInput";
import QuillEditor from "../../../components/QuillEditor";
import TextError from "../../../components/TextError";
import GroupButton from "../../../components/admin/GroupButton";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import { useHandleImage } from "../../../hooks/useHandleImage";
import { topicService } from "../../../services/toppic/topicService";
import { uploadService } from "../../../services/uploadService";
import { initialTypeTopic } from "../../../types/topicType";
import { useEffect } from "react";
import { getUrlImage } from "../../../utils/constants";
const EditNew = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    preViewImage,
    handleChange: handleChangeFile,
    handleDelete,
    handlePaste,
    file,
  } = useHandleImage("");
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
      description: Yup.string().required("require.empty").max(255, "max"),
      content: Yup.string().required('require.empty')
    }),
    onSubmit: async (value) => {
      try {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const linkImages = await uploadService.uploadImages(formData);
          value.link = linkImages[0].linkMedia;
        }
        const uploaded = await topicService.uploadTopic(
          { type: "NEWS" },
          value
        );
        navigate(-1);
        toast.success(
          id
            ? t("message.success.updated", { name: t('news') })
            : t("message.success.posted", { name: t('news') })
        );
      } catch (error) {
        toast.error(
          id ? t("message.error.updated", { name: t('news') }) : t("message.error.posted", { name: t('news') })
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
  const handleCancel = () => {
    navigate(-1);
  };

  const getDetailsTopic = async (id: number) => {
    try {
      const data = await topicService.getDetailsTopic(id, { type: "NEWS" });
      if (data) {
        setValues(data);
        handlePaste(getUrlImage(data.link!));
      }
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('news') }))
    }
  };

  useEffect(() => {
    if (file) {
      setFieldValue("link", preViewImage);
    }
  }, [preViewImage]);

  useEffect(() => {
    if (id) {
      getDetailsTopic(+id);
    }
  }, [id]);

  return (
    <div>
      <TitleAdminPage text={id ? "edit_news" : "add_news"} />
      <div className="my-10 flex flex-col gap-4">
        <div className="flex flex-wrap gap-6 items-center mb-6">
          <div>
            <LabelInput text="upload_img" subText={t('max_img', { number: 1 })} />
            <InputUploadFile onChange={handleChangeFile} imgSize={t('img_size', { size: '(424 *272)' })} />
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
              option={{ name: t('title'), length: 255 }}
            />
          )}
        </div>
        <div>
          <LabelInput text="description" />
          <InputElement
            placeholder="input_description"
            name="description"
            value={values.description}
            onChange={handleChange}
          />
          {errors.description && touched.description && (
            <TextError
              text={errors.description ?? ""}
              option={{ name: t('description'), length: 255 }}
            />
          )}
        </div>

        <div>
          <LabelInput text="content" />
          <QuillEditor
            data={values.content ?? ""}
            onChange={(data) => {
              setFieldValue("content", data);
            }}
          />
          {errors.content && touched.content && (
            <TextError
              text={errors.content ?? ""}
              option={{ name: t("content") }}
            />
          )}
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

export default EditNew;
