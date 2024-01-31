import React, { ChangeEvent, useContext, useEffect } from "react";
import {
  CategoryParent,
  CategorySolution,
} from "../../../../types/categoriesType";
import { ModalContext } from "../../../../context";
import { useHandleImage } from "../../../../hooks/useHandleImage";
import TitleAdminPage from "../../../../components/admin/TitleAdminPage";
import LabelInput from "../../../../components/LabelInput";
import { InputElement } from "../../../../components/InputElement";
import { useFormik } from "formik";
import * as Yup from "Yup";
import TextError from "../../../../components/TextError";
import InputUploadFile from "../../../../components/InputUploadFile";
import ImagePreview from "../../../../components/ImagePreview";
import GroupButton from "../../../../components/admin/GroupButton";
import IcDelete from "../../../../assets/icons/IcDelete";
import { Button } from "../../../../components/Button";
import IcPlusAdd from "../../../../assets/icons/IcPlusAdd";
import { solutionCategoriesService } from "../../../../services/solution/solutionCategoriesService";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { uploadService } from "../../../../services/uploadService";
import { getUrlImage } from "../../../../utils/constants";
import { productCategoriesService } from "../../../../services/product/productCategoriesService";
import { ConfirmModal } from "../../../../context/ConfirmModal";

interface Props {
  typeTableList: "solution" | "product";
  data: CategorySolution;
  onReload: () => void;
}

const initialCategories = {
  id: undefined,
  link: "",
  title: "",
  description: "",
  children: [
    {
      id: undefined,
      title: "",
    },
  ],
};
const EditCategorySolution = ({ data, typeTableList, onReload }: Props) => {
  const { closeModal, setModal } = useContext(ModalContext);
  const { t } = useTranslation();
  const { preViewImage, handleChange, handleDelete, file } = useHandleImage(
    data?.link ? getUrlImage(data?.link) : ""
  );
  const formik = useFormik<CategorySolution>({
    initialValues: data || {
      id: undefined,
      link: "",
      title: "",
      description: "",
      children: [
        {
          id: undefined,
          title: "",
        },
      ],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("require.empty").max(255, "max"),
      description: Yup.string().required("require.empty").max(525, "max"),
      link: Yup.string().required("require.empty"),
      children: Yup.array().of(
        Yup.object().shape({
          title: Yup.string()
            .trim()
            .required("require.empty")
            .max(255, "max")
            .test("test-duplicate", "aaaaaa", function (value) {
              const newValue = [...values.children];
              const isDuplicate = newValue.filter(
                (item) => item.title === value
              );
              if (isDuplicate.length > 1) {
                return false;
              }
              return true;
            }),
        })
      ),
    }),
    onSubmit: async (value) => {
      try {
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          const linkImages = await uploadService.uploadImages(formData);
          value.link = linkImages[0].linkMedia;
        }
        typeTableList === "solution"
          ? await solutionCategoriesService.postOrUpdateCategory(value)
          : await productCategoriesService.uploadCategories(value);
        handleReset(initialCategories);
        onReload();
        toast.success(
          data
            ? t("message.success.updated", { name: t("cate") })
            : t("message.success.posted", { name: t("cate") })
        );
      } catch (error) {
        toast.error(
          data
            ? t("message.error.updated", { name: t("cate") })
            : t("message.error.posted", { name: t("cate") })
        );
      } finally {
        closeModal();
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
    handleReset,
  } = formik;

  const handleChangeKeyValue = (
    e: ChangeEvent<HTMLInputElement>,
    name: "title" | "description"
  ) => {
    const value = values;
    value[name] = e.target.value;
    setFieldValue("category", value);
  };

  const handleChangeNameSubCate = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = values;

    const targetValue = e.target.value;
    value.children[index].title = targetValue;
    setFieldValue("category", value);
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      typeTableList === "solution"
        ? await solutionCategoriesService.deleteCategory(id)
        : await productCategoriesService.deleteCategory(id);
      toast.success(t("message.success.deleted", { name: t("cate") }));
      onReload();
    } catch (error) {
      toast.error(t("message.error.deleted", { name: t("cate") }));
    }
  };
  const handleAddOrDeleteCateSub = async (
    index: number,
    idSubCategory?: number
  ) => {
    const value = values;
    if (index >= 0) {
      if (idSubCategory) {
        handleDeleteCategory(idSubCategory);
      }
      value.children.splice(index, 1);
    } else {
      value.children.push({
        id: undefined,
        title: "",
      });
    }
    setFieldValue("category", value);
  };
  useEffect(() => {
    const value = values;
    if (file) {
      value.link = preViewImage;
    }
    setFieldValue("category", value);
  }, [preViewImage]);

  return (
    <div className="w-[60vw] max-h-[80vh] overflow-y-scroll hidden-scroll rounded-10 bg-white py-10 px-6">
      <TitleAdminPage
        className="!text-[32px] leading-[40px] mb-10 text-center uppercase !w-full"
        text={data ? "edit_category" : "add_category"}
      />
      <div className="flex flex-col gap-6 mb-6">
        <div>
          <LabelInput text="big_category" />
          <InputElement
            placeholder="input_big_category"
            name="name"
            value={values.title}
            onChange={(e: any) => handleChangeKeyValue(e, "title")}
          />
          {errors?.title && touched?.title && (
            <TextError
              text={errors?.title}
              option={{ name: t("name"), length: 255 }}
            />
          )}
        </div>
        <div>
          <LabelInput text="description" />
          <InputElement
            placeholder="input_description"
            name="description"
            value={values.description}
            onChange={(e: any) => handleChangeKeyValue(e, "description")}
          />
          {errors?.description && touched?.description && (
            <TextError
              text={errors?.description}
              option={{ name: t("description"), length: 255 }}
            />
          )}
        </div>
        <div className="flex gap-6 items-center">
          <div>
            <LabelInput text="upload_img" subText="max_1_img" />
            <InputUploadFile
              onChange={handleChange}
              imgSize={t("img_size", { size: "(464*334)" })}
            />
            {errors?.link && touched?.link && (
              <TextError text={errors?.link} option={{ name: t("img") }} />
            )}
          </div>
          {preViewImage != "" && (
            <div>
              <LabelInput text="image_uploaded" />
              <ImagePreview
                imagePreview={preViewImage}
                onDelete={handleDelete}
              />
            </div>
          )}
        </div>
      </div>
      <div>
        <TitleAdminPage text={"second_category"} />

        <div className=" my-5">
          <div className="rounded-10 border border-border p-6">
            <TitleAdminPage
              text={"category_child"}
              className="!text-lg !font-semibold"
            />
            <div className="flex flex-col gap-6 mt-5">
              {values?.children.map((item, index2) => {
                return (
                  <div key={index2} className="">
                    <LabelInput
                      isRequire={false}
                      text={t(`child_category_name`, { name: `${index2 + 1}` })}
                    />
                    <div className="flex justify-between gap-6">
                      <InputElement
                        placeholder="input_description"
                        name="description"
                        value={item?.title ?? ""}
                        onChange={(e: any) =>
                          handleChangeNameSubCate(e, index2)
                        }
                      />
                      <div
                        onClick={() =>
                          handleAddOrDeleteCateSub(index2, item.id)
                        }
                        className="flex items-center justify-center cursor-pointer border border-border rounded-10 w-12 h-12"
                      >
                        <IcDelete />
                      </div>
                    </div>
                  </div>
                );
              })}
              {errors?.children && touched?.children && (
                <TextError
                  text={"require.empty"}
                  option={{
                    name:
                      t("category_name_&_255_characters") +
                      " " +
                      t("no_duplicate"),
                    length: 255,
                  }}
                />
              )}
              <Button
                color="empty"
                text="add_category_child"
                className="px-6 py-3 !w-fit"
                imageLeft={<IcPlusAdd />}
                onClick={() => handleAddOrDeleteCateSub(-1)}
              />
            </div>
          </div>
        </div>
      </div>

      <div>
        <GroupButton
          onCancel={closeModal}
          onSubmit={handleSubmit}
          disable={isSubmitting}
        />
      </div>
    </div>
  );
};

export default EditCategorySolution;
