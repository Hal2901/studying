import * as Yup from "Yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import ImagePreview from "../../../components/ImagePreview";
import { InputElement } from "../../../components/InputElement";
import InputUploadFile from "../../../components/InputUploadFile";
import LabelInput from "../../../components/LabelInput";
import TextError from "../../../components/TextError";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import { useHandleImage } from "../../../hooks/useHandleImage";
import GroupButton from "../../../components/admin/GroupButton";
import { useEffect, useState } from "react";
import DropdownSelect from "../../../components/DropdownSelect";
import clsx from "clsx";
import QuillEditor from "../../../components/QuillEditor";
import { solutionType } from "../../../types/solutionType";
import { CategorySolution } from "../../../types/categoriesType";
import { SizePage, getUrlImage } from "../../../utils/constants";
import { solutionCategoriesService } from "../../../services/solution/solutionCategoriesService";
import { uploadService } from "../../../services/uploadService";
import { solutionService } from "../../../services/solution/solutionService";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../../Loading";

const EditSolution = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState<CategorySolution[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [categoryActive, setCategoryActive] = useState<any>({
    idParent: null,
    id: null,
    title: "",
  });
  const requestParam = {
    page: currentPage - 1,
    size: SizePage,
  };
  const {
    preViewImage,
    handleChange: handleChangeFile,
    handleDelete,
    handlePaste,
    file,
  } = useHandleImage("");
  const formik = useFormik<solutionType>({
    initialValues: {
      id: undefined,
      link: "",
      idCategory: -1,
      title: "",
      description: "",
      content: "",
    },
    validationSchema: Yup.object({
      link: Yup.string().required("require.empty"),
      idCategory: Yup.number().min(0, "require.empty"),
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
        const uploaded = await solutionService.uploadSolution(value);
        navigate(-1);
        toast.success(
          id
            ? t("message.success.updated", { name: t('content') })
            : t("message.success.posted", { name: t('content') })
        );
      } catch (error) {
        toast.error(
          id
            ? t("message.error.updated", { name: t('content') })
            : t("message.error.posted", { name: t('content') })
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

  const handleAddCategory = (items: any, idPr: number) => {
    setFieldValue("idCategory", items?.id);
    setCategoryActive({
      idParent: idPr,
      id: items?.id,
      title: items.title,
    });
  };

  const getListCategories = async () => {
    try {
      const { total, data } = await solutionCategoriesService.getListCategories(
        requestParam
      );
      setCategoriesList((prevState) => [...prevState, ...data]);
      setTotalPage(Math.ceil(total / SizePage));
    } catch (error) {
      return;
    }
  };
  const fetchMoreCategories = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevState) => prevState + 1);
    } else {
      setHasMore(false);
    }
  };
  const getDetailSolution = async (id: number) => {
    try {
      const details = await solutionService.getDetailsSolution(id);
      const category = await solutionCategoriesService.getDetailsCategory(
        details.idCategory
      );
      setValues(details);
      setCategoryActive({
        ...categoryActive,
        title: category.title,
        id: category.id,
      });
      handlePaste(getUrlImage(details.link));
    } catch (error) {
      return;
    }
  };

  useEffect(() => {
    if (file) {
      setFieldValue("link", preViewImage);
    }
  }, [preViewImage, file]);

  useEffect(() => {
    if (id) {
      getDetailSolution(+id);
    }
  }, [id]);

  useEffect(() => {
    getListCategories();
  }, [currentPage]);

  useEffect(() => {
    if (id && categoriesList.length > 0 && values.idCategory) {
      const parentCate = categoriesList.filter((item) => {
        const checkItem = item.children.filter(
          (itemCh) => itemCh.id === values.idCategory
        );
        if (checkItem.length > 0) return item;
      });
      if (parentCate.length > 0) {
        setCategoryActive({
          ...categoryActive,
          idParent: parentCate[0].id,
        });
      }
    }
  }, [id, categoriesList, values.idCategory]);

  return (
    <div>
      <TitleAdminPage text={id ? "edit_solution" : "add_solution"} />
      <div className="my-10 flex flex-col gap-4">
        <div className="flex flex-wrap gap-6 items-center mb-6">
          <div>
            <LabelInput text="upload_img" subText="max_1_img" />
            <InputUploadFile onChange={handleChangeFile} imgSize={t('img_size', { size: '(424*272)' })} />
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
          <TextError text={errors.link} option={{ name: t('img') }} />
        )}

        <div>
          <LabelInput text="category_solution" />

          {categoriesList.length > 0 && (
            <DropdownSelect
              name={
                values.idCategory > -1
                  ? categoryActive.title
                  : "input_category_solution"
              }
              className="!w-full z-30"
              classOverlay="border-transparent border-t-border"
            >
              <InfiniteScroll
                dataLength={categoriesList.length}
                next={fetchMoreCategories}
                hasMore={hasMore}
                loader={<Loading />}
                height={200}
                className="hidden-scroll"
              >
                <div className="w-1/3 rounded-10 h-auto flex flex-col border">
                  {categoriesList.map((category, index) => {
                    return (
                      <div
                        key={index}
                        className={clsx(
                          "flex items-center h-12 px-6 hover:bg-active hover:text-white border-b relative showCategory",
                          {
                            "rounded-tr-10": index === 0,
                            "rounded-b-10": index + 1 === categoriesList.length,
                            "bg-active text-white":
                              categoryActive.idParent === category.id,
                          }
                        )}
                      >
                        {category?.title}

                        {category?.children && (
                          <div className="w-full h-auto absolute left-full top-0 rounded-10 hidden flex-col border cateChild">
                            {category?.children.map((child, indexC) => {
                              return (
                                <div
                                  onClick={() =>
                                    handleAddCategory(child, category.id!)
                                  }
                                  key={indexC}
                                  className={clsx(
                                    "flex items-center h-12 px-6 text-defaultText hover:bg-active hover:text-white group  border-b relative",
                                    {
                                      "rounded-t-10": indexC === 0,
                                      "rounded-b-10":
                                        indexC + 1 === category.children.length,
                                      "bg-active text-white":
                                        categoryActive.id === child.id,
                                    }
                                  )}
                                >
                                  {child.title}
                                </div>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </InfiniteScroll>
            </DropdownSelect>
          )}

          {errors.idCategory && touched.idCategory && (
            <TextError
              text={errors.idCategory ?? ""}
              option={{ name: t("category_solution"), length: 255 }}
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

export default EditSolution;
