import * as Yup from "Yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { InputElement } from "../../../components/InputElement";
import LabelInput from "../../../components/LabelInput";
import GroupButton from "../../../components/admin/GroupButton";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import { topicService } from "../../../services/toppic/topicService";
import { initialTypeTopic } from "../../../types/topicType";
import TextError from "../../../components/TextError";
import { useEffect } from "react";

const EditVideo = () => {
  const typePage = "VIDEO";
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
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
    }),
    onSubmit: async (value) => {
      try {
        const uploadted = await topicService.uploadTopic(
          { type: typePage },
          value
        );
        toast.success(
          id
            ? t("message.success.updated", { name: t('video') })
            : t("message.success.posted", { name: t('video') })
        );
        handleCancel();
      } catch (error) {
        toast.error(
          id
            ? t("message.error.updated", { name: t('video') })
            : t("message.error.posted", { name: t('video') })
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

  const getDetailsTopic = async (id: number) => {
    try {
      const data = await topicService.getDetailsTopic(id, { type: typePage });
      if (data) {
        setValues(data);
      }
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('videos') }))
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  useEffect(() => {
    if (id) {
      getDetailsTopic(+id);
    }
  }, [id]);
  return (
    <div>
      <TitleAdminPage text={"add_video"} />
      <div className="my-10 flex flex-col gap-4">
        <div>
          <LabelInput text="link" />
          <InputElement
            placeholder="input_link"
            name="link"
            value={values.link}
            onChange={handleChange}
          />
          {errors.link && touched.link && (
            <TextError
              text={errors.link ?? ""}
              option={{ name: t("link"), length: 255 }}
            />
          )}
        </div>
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

export default EditVideo;
