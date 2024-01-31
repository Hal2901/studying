import * as Yup from "Yup";
import { useFormik } from "formik";
import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useLanguage } from "../../../hooks/useLanguage";
import { InputElement } from "../../../components/InputElement";
import LabelInput from "../../../components/LabelInput";
import QuillEditor from "../../../components/QuillEditor";
import TextError from "../../../components/TextError";
import GroupButton from "../../../components/admin/GroupButton";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import { topicService } from "../../../services/toppic/topicService";
import { initialTypeTopic } from "../../../types/topicType";

export default function CaseStudyMngt({
  typePage = "STUDY",
}: {
  typePage?: "STUDY" | "POLICY";
}) {
  const { t } = useTranslation();
  const { isVN } = useLanguage()
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
      title: Yup.string().required("require.empty").max(255, "max"),
      content: Yup.string().required('require.empty')
    }),
    onSubmit: async (value) => {
      try {
        const uploaded = await topicService.uploadTopic(
          { type: typePage },
          value
        );
        toast.success(
          value.id
            ? t("message.success.updated", { name: t('document') })
            : t("message.success.posted", { name: t('document') })
        );
      } catch (error) {
        toast.error(
          value.id
            ? t("message.error.updated", { name: t('document') })
            : t("message.error.posted", { name: t('document') })
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

  const getDetailsTopic = async () => {
    try {
      const { data } = await topicService.getDetailsTopicStudy({
        type: typePage,
      });
      if (data.length) {
        setValues(data[0]);
      }
    } catch (error) { }
  };

  useEffect(() => {
    getDetailsTopic();
  }, []);

  return (
    <div>
      <TitleAdminPage
        text={typePage === "STUDY" ? "navBar.case_study_mn" : "navBar.policy"}
      />

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
              option={{ name: t('title'), length: 255 }}
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
}
