import clsx from "clsx";
import { ChangeEvent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import IcDotHover from "../../../../assets/icons/IcDotHover";
import IcPlusAdd from "../../../../assets/icons/IcPlusAdd";
import { Button } from "../../../../components/Button";
import DropdownSelect from "../../../../components/DropdownSelect";
import ImagePreview from "../../../../components/ImagePreview";
import { InputElement } from "../../../../components/InputElement";
import InputUploadFile from "../../../../components/InputUploadFile";
import LabelInput from "../../../../components/LabelInput";
import { TextAreaElement } from "../../../../components/TextAreaElement";
import GroupButton from "../../../../components/admin/GroupButton";
import TitleAdminPage from "../../../../components/admin/TitleAdminPage";
import { useHandleImage } from "../../../../hooks/useHandleImage";
import { actionColumns } from "../../../../utils/common";
import UploadFileSupportItem from "./UploadFileSupportItem";
import VariantItem from "./VariantItem";
import * as Yup from "Yup";
import { useFormik } from "formik";
import InfiniteScroll from "react-infinite-scroll-component";
import { useNavigate } from "react-router-dom";
import TextError from "../../../../components/TextError";
import { useLanguage } from "../../../../hooks/useLanguage";
import { partnerService } from "../../../../services/partnerService";
import { productCategoriesService } from "../../../../services/product/productCategoriesService";
import { uploadService } from "../../../../services/uploadService";
import { PartnerCompanyType } from "../../../../types/PartnerType";
import { CategorySolution } from "../../../../types/categoriesType";
import { baseInfo } from "../../../../types/productType";
import {
  Params,
  REGEX_CHARACTER,
  SizePage,
  getUrlImage,
} from "../../../../utils/constants";
import Loading from "../../../Loading";
import { productService } from "../../../../services/product/productService";

interface Props {
  data?: baseInfo;
  onSubmit: (data: baseInfo) => void;
  onDeleteData: (
    type: "image" | "variant" | "special" | "support" | "productKeys",
    idDelete: number,
    value: any
  ) => void;
}
const BaseInfoProduct = ({ onSubmit, onDeleteData, data }: Props) => {
  const { isVN } = useLanguage();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categoriesList, setCategoriesList] = useState<CategorySolution[]>([]);
  const [partners, setPatners] = useState<PartnerCompanyType[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPage, setTotalPage] = useState<number>(1);
  const [currentPagePartner, setCurrentPagePartner] = useState<number>(1);
  const [totalPageTotalPagePartner, setTotalPagePartner] = useState<number>(1);
  const [hasMore, setHasMore] = useState({
    categories: true,
    partners: true,
  });
  const [categoryActive, setCategoryActive] = useState<any>({
    idParent: null,
    id: null,
    title: "",
  });
  const [partnerActive, setPartnerActive] = useState<any>({
    id: null,
    title: "",
  });

  const { handleChange, handleRemoveByIndex, plainFiles } = useHandleImage(
    "",
    data ? data.productImages : []
  );

  const requestParam = {
    page: currentPage - 1,
    size: SizePage,
  };

  const formik = useFormik<baseInfo>({
    initialValues: data || {
      id: undefined,
      nameProduct: "",
      infoProduct: "",
      link: "",
      status: false,
      linkFile1: "",
      linkPath1: "",
      linkFile2: "",
      linkPath2: "",
      linkFile3: "",
      linkPath3: "",
      linkFile4: "",
      linkPath4: "",
      price: "",
      companies: [],
      categories: {
        id: -1,
      },
      productImages: [],
      productKeys: [
        {
          id: undefined,
          name: "Hình ảnh",
          filter: false,
        },
        {
          id: undefined,
          name: "Mã sản phẩm",
          filter: false,
        },
        {
          id: undefined,
          name: "Giá đề xuất",
          filter: false,
        },
        {
          id: undefined,
          name: "Mô tả",
          filter: false,
        },
        {
          id: undefined,
          name: "Loại sản phẩm",
          filter: false,
        },
        {
          id: undefined,
          name: "File thông số",
          filter: false,
        },
      ],
      productVariants: [
        {
          id: undefined,
          productValues: [
            {
              id: undefined,
              value: "",
            },
            {
              id: undefined,
              value: "",
            },
            {
              id: undefined,
              value: "",
            },
            {
              id: undefined,
              value: "",
            },
            {
              id: undefined,
              value: "",
            },
            {
              id: undefined,
              value: "",
            },
          ],
        },
      ],
    },
    validationSchema: Yup.object({
      nameProduct: Yup.string().required("require.empty").max(255, "max"),
      infoProduct: Yup.string().required("require.empty").max(1000, "max"),
      price: Yup.string().trim().required("require.empty").max(255, "max"),
      companies: Yup.array().min(1, "require.empty"),
      categories: Yup.object().shape({
        id: Yup.number().min(0, "require.empty"),
      }),
      productKeys: Yup.array().of(
        Yup.object().shape({
          name: Yup.string().trim().required("require.empty").max(100, "max"),
        })
      ),
      productVariants: Yup.array().of(
        Yup.object().shape({
          productValues: Yup.array().of(
            Yup.object().shape({
              value: Yup.string()
                .trim()
                .required("require.empty")
                .max(1000, "max"),
            })
          ),
        })
      ),
      productImages: Yup.array().min(1, "max_pr_imgs").max(4, "max_pr_imgs"),
    }),
    onSubmit: async (value) => {
      try {
        let images: any = [];
        if (plainFiles) {
          const listPromise = Promise.all(
            plainFiles.map(async (item) => {
              if (item.file) {
                const formData = new FormData();
                formData.append("file", item.file!);
                const image = await uploadService.uploadImages(formData);
                item.link = image[0].linkMedia;
                return {
                  id: undefined,
                  link: item.link,
                };
              }
              return item;
            })
          );
          images = await listPromise;
        }
        if (images.length > 0) {
          value.productImages = images;
        }
        onSubmit(value);
      } catch (error) {}
    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    setValues,
    handleChange: handleChangeFormik,
    setFieldValue,
    handleSubmit,
  } = formik;
  const handleChangeFilesImgProduct = (e: ChangeEvent<HTMLInputElement>) => {
    if (plainFiles.length >= 4) {
      return toast.error("Tải tối đa 4 ảnh cho sản phẩm.");
    }
    handleChange(e);
  };
  const handleDeleteImage = async (index: number) => {
    try {
      if (plainFiles.length === 1)
        return toast.warning(
          t("min_image", { length: "1", name: t("image_product") })
        );
      if (plainFiles[index].id && plainFiles[index].id !== "id") {
        const deletedImage = await productService.deleteProductItem(
          plainFiles[index].id,
          "image"
        );
        // onDeleteData("image", plainFiles[index].id);
      }
      handleRemoveByIndex(index);
    } catch (error) {}
  };
  const handleUploadFileSupport = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    try {
      const newValues = { ...values };
      const file = e.target.files![0];

      const checkCharactorName = REGEX_CHARACTER.test(file.name);
      const formData = new FormData();
      formData.append("file", file);
      const linkImages = await uploadService.uploadFile(formData);
      e.target.value = "";
      switch (index) {
        case 1:
          newValues.linkFile1 = linkImages.linkMedia;
          newValues.linkPath1 = linkImages.linkMedia;
          break;

        case 2:
          newValues.linkFile2 = linkImages.linkMedia;
          newValues.linkPath2 = linkImages.linkMedia;
          break;

        case 3:
          newValues.linkFile3 = linkImages.linkMedia;
          newValues.linkPath3 = linkImages.linkMedia;
          break;

        case 4:
          newValues.linkFile4 = linkImages.linkMedia;
          newValues.linkPath4 = linkImages.linkMedia;
          break;
        default:
          break;
      }
      setValues(newValues);
    } catch (error) {
      toast.error(t("message.error.posted", { name: t("file") }));
    }
  };
  const handleDeleteFileSp = (index: number) => {
    switch (index) {
      case 1:
        setFieldValue("linkFile1", "");
        setFieldValue("linkPath1", "");
        break;

      case 2:
        setFieldValue("linkFile2", "");
        setFieldValue("linkPath2", "");
        break;

      case 3:
        setFieldValue("linkFile3", "");
        setFieldValue("linkPath3", "");
        break;

      case 4:
        setFieldValue("linkFile4", "");
        setFieldValue("linkPath4", "");
        break;

      default:
        break;
    }
  };

  const handleActionColumnPrVariant = (index: number, index2: number) => {
    const handleAddColItem = async (
      index: number,
      indexReplace: number,
      name?: string
    ) => {
      try {
        const newListVariants = { ...values };
        if (name) {
          newListVariants.productKeys.splice(index, indexReplace, {
            id: undefined,
            name: name,
            filter: false,
          });
        } else {
          if (newListVariants.productKeys[index].id) {
            const deletedKey = await productService.deleteProductItem(
              newListVariants.productKeys[index].id!,
              "key"
            );
            toast.success(
              t("message.success.deleted", { name: t("column_variant") })
            );
            onDeleteData(
              "productKeys",
              newListVariants.productKeys[index].id!,
              values
            );
          }
          newListVariants.productKeys.splice(index, indexReplace);
        }
        const newItemVariantRow = newListVariants.productVariants.map(
          (item) => {
            name
              ? item.productValues.splice(index, indexReplace, {
                  id: undefined,
                  value: "",
                })
              : item.productValues.splice(index, indexReplace);
            return item;
          }
        );
        newListVariants.productVariants = newItemVariantRow;
        setValues(newListVariants);
      } catch (error) {
        toast.error(t("message.error.deleted", { name: t("column_variant") }));
      }
    };
    switch (index2) {
      case 0:
        handleAddColItem(index, 0, "Cột mới bên trái");
        break;
      case 1:
        handleAddColItem(index + 1, 0, "cột mới bên phải");
        break;
      case 2:
        handleAddColItem(index, 1);
        break;
      default:
        break;
    }
  };

  const handleAddRowPropose = async (index: number) => {
    const newRows = [...values.productVariants];

    if (index >= 0) {
      // if (newRows.length <= 1)
      //   return toast.warning(t("min", { length: "1 biến thể" }));
      if (newRows[index].id) {
        try {
          const deletedRow = await productService.deleteProductItem(
            newRows[index].id!,
            "variant"
          );
          onDeleteData("variant", newRows[index].id!, values);
        } catch (error) {}
      }
      newRows.splice(index, 1);
    } else {
      const newItem: any = values.productVariants[
        values.productVariants.length - 1
      ]?.productValues.map((item) => {
        return {
          id: undefined,
          value: item.value,
        };
      });
      const newItem2: any = values.productKeys.map((item) => {
        return {
          id: undefined,
          value: "",
        };
      });
      newRows.push(
        newItem && newItem.length > 0
          ? { id: undefined, productValues: newItem }
          : { id: undefined, productValues: newItem2 }
      );
    }
    setFieldValue("productVariants", newRows);
  };

  const handleChangeFileVariantRow = async (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    type: "img" | "special"
  ) => {
    try {
      const newListVariants = [...values.productVariants];
      const file = e.target.files![0];
      const formData = new FormData();
      formData.append("file", file);
      if (type === "img") {
        newListVariants[index].productValues[0].value = (
          await uploadService.uploadImages(formData)
        )[0].linkMedia;
      } else {
        const endIndex = newListVariants[index].productValues.length - 1;
        newListVariants[index].productValues[endIndex].value = (
          await uploadService.uploadFile(formData)
        ).linkMedia;
      }
      e.target.value = "";
      setValues({
        ...values,
        productVariants: newListVariants,
      });
    } catch (error) {
      toast.error(t("message.error.posted", { name: t("file") }));
    }
  };

  const handleChangeInputVariantRow = (
    e: ChangeEvent<HTMLTextAreaElement>,
    indexRow: number,
    indexCol: number
  ) => {
    const value = e.target.value;
    const newListVariants = [...values.productVariants];
    newListVariants[indexRow].productValues[indexCol].value = value;
    setFieldValue("productVariants", newListVariants);
  };
  const handleDeleteFileSpecial = (index: number) => {
    const newListVariants = [...values.productVariants];
    const endIndex = newListVariants[index].productValues.length - 1;
    newListVariants[index].productValues[endIndex].value = "";
    setValues({
      ...values,
      productVariants: newListVariants,
    });
  };
  const handleChangeNameColVariant = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const newListVariants = [...values.productKeys];
    newListVariants[index].name = e.target.value;
    setFieldValue("productKeys", newListVariants);
  };

  const handleActiveFilter = (index: number) => {
    const newProductKeys = [...values.productKeys];
    // const checkLength = newProductKeys.filter((item) => item.filter);
    // if (!newProductKeys[index].filter && checkLength.length >= 3) {
    //   return toast.error(t("chose_propose_pr"));
    // }
    newProductKeys[index].filter = !newProductKeys[index].filter;
    setFieldValue("productKeys", newProductKeys);
  };
  const handleCancel = () => {
    navigate(-1);
  };

  // get list categories
  const getListCategories = async () => {
    try {
      const { total, data } =
        await await productCategoriesService.getListCategories(requestParam);
      setCategoriesList((prevState) => [...prevState, ...data]);
      setTotalPage(Math.ceil(total / SizePage));
    } catch (error) {
      return;
    }
  };
  // get listPartners
  const getListPartnerCompanies = async (params?: Params) => {
    try {
      const { total, data } = await partnerService.getPartnersCompany(params);
      setPatners([...partners, ...data]);
    } catch (error) {}
  };
  // hasmore
  const fetchMoreCategories = () => {
    if (currentPage < totalPage) {
      setCurrentPage((prevState) => prevState + 1);
    } else {
      setHasMore({
        ...hasMore,
        categories: false,
      });
    }
  };
  const fetchMorePartner = () => {
    if (currentPagePartner < totalPageTotalPagePartner) {
      setCurrentPagePartner((prevState) => prevState + 1);
    } else {
      setHasMore({
        ...hasMore,
        categories: false,
      });
    }
  };

  // add categories
  const handleAddCategory = (items: any, idPr: number, isParent?: boolean) => {
    if (isParent) {
      setFieldValue("categories", {
        id: items?.id,
      });
      setCategoryActive({
        idParent: items?.id,
        id: undefined,
        title: items.title,
      });
    } else {
      setFieldValue("categories", {
        id: items?.id,
      });
      setCategoryActive({
        idParent: idPr,
        id: items?.id,
        title: items.title,
      });
    }
  };
  // add partner
  const handleAdPartner = (item: any) => {
    const newCompanies = [...values.companies];

    const checkCp = newCompanies.filter((it) => it.id === item.id);

    if (checkCp.length > 0) {
      setFieldValue(
        "companies",
        newCompanies.filter((it) => it.id !== item.id)
      );
      return;
    }
    setFieldValue("companies", [...newCompanies, { id: item.id }]);
  };

  useEffect(() => {
    const requestParam = {
      page: currentPagePartner - 1,
      size: SizePage,
    };
    getListPartnerCompanies(requestParam);
  }, [currentPagePartner]);

  useEffect(() => {
    getListCategories();
  }, [currentPage]);

  useEffect(() => {
    let listImages: any = [];
    if (plainFiles.length > 0) {
      listImages = plainFiles.map((plan) => {
        return {
          id: plan.id,
          link: plan.link,
        };
      });
    }
    setFieldValue("productImages", listImages);
  }, [plainFiles]);

  useEffect(() => {
    if (data) {
      setValues(data);
    }
  }, [data]);

  useEffect(() => {
    if (values.categories.id && categoriesList.length > 0) {
      let name = "";
      const parentCate = categoriesList.filter((item) => {
        const checkItem = item.children.filter((itemCh) => {
          const a = itemCh.id === values.categories.id;
          if (a) {
            name = itemCh.title;
            return itemCh;
          }
        });
        if (checkItem.length > 0) return item;
      });

      if (parentCate.length > 0) {
        setCategoryActive({
          ...categoryActive,
          title: name,
          idParent: parentCate[0].id,
        });
      }
    }
  }, [categoriesList, values.categories.id]);

  return (
    <div>
      <div className="flex flex-wrap gap-6 items-center mb-6">
        <div>
          <LabelInput text="upload_img" subText={t("max_img", { number: 4 })} />
          <InputUploadFile
            onChange={handleChangeFilesImgProduct}
            imgSize={t("img_size", { size: "(535*535)" })}
          />
          {errors.productImages && touched.productImages && (
            <TextError text={errors.productImages.toString()} />
          )}
        </div>
        {plainFiles.length > 0 && (
          <div>
            <LabelInput text="image_uploaded" />
            <div className="flex flex-wrap items-center gap-6">
              {plainFiles.map((plainImg, index) => {
                return (
                  <ImagePreview
                    key={index}
                    imagePreview={
                      plainImg.id !== "id"
                        ? getUrlImage(plainImg.link!)
                        : plainImg.link ?? ""
                    }
                    // onDelete={() => handleRemoveByIndex(index)}
                    onDelete={() => handleDeleteImage(index)}
                  />
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-6">
        <div>
          <LabelInput text="name_pr" />
          <InputElement
            placeholder="input_name_pr"
            name="nameProduct"
            value={values.nameProduct}
            onChange={handleChangeFormik}
          />
          {errors.nameProduct && touched.nameProduct && (
            <TextError
              text={errors.nameProduct ?? ""}
              option={{ name: t("name"), length: 255 }}
            />
          )}
        </div>
        <div>
          <LabelInput text="infor_pr" />
          <TextAreaElement
            placeholder="input_description"
            name="infoProduct"
            value={values.infoProduct}
            onChange={(e: any) => setFieldValue("infoProduct", e.target.value)}
          />
          {errors.infoProduct && touched.infoProduct && (
            <TextError
              text={errors.infoProduct ?? ""}
              option={{ name: t("infor_pr"), length: 1000 }}
            />
          )}
        </div>
        <div>
          <LabelInput text="price_propose" isRequire={false} />
          <InputElement
            placeholder="input_price_propose"
            name="price"
            value={values.price}
            onChange={handleChangeFormik}
          />
          {errors.price && touched.price && (
            <TextError
              text={errors.price ?? ""}
              option={{ name: t("price"), length: 255 }}
            />
          )}
        </div>
        {/* categories */}
        <div className="relative z-50">
          <LabelInput text="category" />
          {categoriesList.length > 0 && (
            <DropdownSelect
              name={
                values.categories.id > -1
                  ? categoryActive.title
                  : "input_category"
              }
              className="!w-full z-30"
              classOverlay="border-transparent border-t-border"
            >
              <InfiniteScroll
                dataLength={categoriesList.length}
                next={fetchMoreCategories}
                hasMore={currentPage < totalPage && hasMore.categories}
                loader={<Loading />}
                height={200}
                className="hidden-scroll"
              >
                <div className="w-1/2 rounded-10 h-auto flex flex-col border">
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
                        <div
                          className="w-full h-12 flex items-center"
                          // onClick={() => handleAddCategory(category, -1, true)}
                        >
                          {category?.title}
                        </div>

                        {category?.children &&
                          category?.children.length > 0 && (
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
                                          indexC + 1 ===
                                          category.children.length,
                                        "bg-active text-white":
                                          values.categories.id === child.id,
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
          {errors.categories && touched.categories && (
            <TextError
              text={errors.categories.id ?? ""}
              option={{ name: t("cate"), length: 255 }}
            />
          )}
        </div>
        {/* partners*/}
        <div className="z-40">
          <LabelInput text="partner_or_distributor" />
          {partners.length > 0 && (
            <DropdownSelect
              name={
                t("input_partner_or_distributor") +
                `  (${values.companies.length})`
              }
              className="!w-full"
            >
              <InfiniteScroll
                dataLength={categoriesList.length}
                next={fetchMorePartner}
                hasMore={
                  currentPagePartner < totalPageTotalPagePartner &&
                  hasMore.partners
                }
                loader={<Loading />}
                height={200}
                className="hidden-scroll"
              >
                {partners.map((partner, indexD) => {
                  return (
                    <label
                      key={indexD}
                      className="flex gap-2 h-12 items-center hover:bg-whiteFAFAFA border-b px-6"
                    >
                      <input
                        className="w-4 h-4 rounded-md"
                        type="checkbox"
                        checked={
                          values.companies.filter((cp) => cp.id === partner.id)
                            .length > 0
                        }
                        onChange={() => handleAdPartner(partner)}
                      />
                      <p>{partner.namePartner}</p>
                    </label>
                  );
                })}
              </InfiniteScroll>
            </DropdownSelect>
          )}
          {errors.companies && touched.companies && (
            <TextError text={"require.empty"} option={{ name: t("partner") }} />
          )}
        </div>
      </div>
      {/* files and paths upload */}
      <div className="flex flex-col gap-6 mt-6">
        <UploadFileSupportItem
          handleChangeFile={(e: ChangeEvent<HTMLInputElement>) => {
            handleUploadFileSupport(e, 1);
          }}
          handleDeleteFile={() => handleDeleteFileSp(1)}
          error={undefined}
          linkFile={values.linkFile1}
          linkPath={values.linkPath1}
          name="upload_file_pr"
        />
        {((errors.linkFile1 && touched.linkFile1) ||
          (errors.linkPath1 && touched.linkPath1)) && (
          <TextError
            text={errors.linkFile1 ?? errors.linkPath1 ?? ""}
            option={{ name: t("guidline_file_&_link"), length: 255 }}
          />
        )}
        <UploadFileSupportItem
          handleChangeFile={(e: ChangeEvent<HTMLInputElement>) => {
            handleUploadFileSupport(e, 2);
          }}
          handleDeleteFile={() => handleDeleteFileSp(2)}
          error={undefined}
          linkFile={values.linkFile2}
          linkPath={values.linkPath2}
          name="upload_set_up"
        />
        {((errors.linkFile2 && touched.linkFile2) ||
          (errors.linkPath2 && touched.linkPath2)) && (
          <TextError
            text={errors.linkFile2 ?? errors.linkPath2 ?? ""}
            option={{ name: t("guidline_file_&_link"), length: 255 }}
          />
        )}
        <UploadFileSupportItem
          handleChangeFile={(e: ChangeEvent<HTMLInputElement>) => {
            handleUploadFileSupport(e, 3);
          }}
          handleDeleteFile={() => handleDeleteFileSp(3)}
          error={undefined}
          linkFile={values.linkFile3}
          linkPath={values.linkPath3}
          name="upload_file_table_data"
        />
        {((errors.linkFile3 && touched.linkFile3) ||
          (errors.linkPath3 && touched.linkPath3)) && (
          <TextError
            text={errors.linkFile3 ?? errors.linkPath3 ?? ""}
            option={{ name: t("guidline_file_&_link"), length: 255 }}
          />
        )}
        <UploadFileSupportItem
          handleChangeFile={(e: ChangeEvent<HTMLInputElement>) => {
            handleUploadFileSupport(e, 4);
          }}
          handleDeleteFile={() => handleDeleteFileSp(4)}
          error={undefined}
          linkFile={values.linkFile4}
          linkPath={values.linkPath4}
          name="upload_file_prev_img"
        />
      </div>

      <div className="my-8">
        <TitleAdminPage text="product_variation" />
        <div className="w-full overflow-x-scroll pb-10">
          <div className=" flex w-auto h-auto mt-8">
            {values.productKeys.map((variant, indexVarian) => {
              return (
                <div
                  key={indexVarian}
                  className={clsx(
                    "flex items-center bg-main justify-between text-white font-medium h-14 px-4 showCategory  relative",
                    {
                      "min-w-[160px] w-160": indexVarian === 0,
                      "min-w-[320px] w-[320px]": indexVarian !== 0,
                    }
                  )}
                >
                  {indexVarian > 3 &&
                  indexVarian + 1 < values.productKeys.length ? (
                    <InputElement
                      placeholder="input_name_col"
                      name="name"
                      className="!text-gray01 !bg-transparent border-none"
                      value={variant.name}
                      onChange={(e: any) =>
                        handleChangeNameColVariant(e, indexVarian)
                      }
                    />
                  ) : (
                    variant.name
                  )}

                  {indexVarian > 3 &&
                    indexVarian + 1 < values.productKeys.length && (
                      <>
                        <div className="cateChild cursor-pointer hidden h-full items-center group justify-center relative">
                          <IcDotHover />
                          <div className="absolute top-full right-0 z-30 group-hover:block hidden w-200 rounded-10 overflow-hidden bg-white border">
                            {actionColumns.map((action, indexAc) => {
                              if (
                                values.productKeys.length <= 5 &&
                                indexAc === 2
                              )
                                return;
                              return (
                                <div
                                  onClick={() =>
                                    handleActionColumnPrVariant(
                                      indexVarian,
                                      indexAc
                                    )
                                  }
                                  className={clsx(
                                    "h-12 text-defaultText px-4 flex items-center font-normal",
                                    {
                                      "border-b ":
                                        indexAc + 1 != actionColumns.length,
                                    }
                                  )}
                                  key={indexAc}
                                >
                                  {t(action)}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      </>
                    )}
                </div>
              );
            })}
          </div>
          {values.productVariants.map((item, index) => {
            return (
              <VariantItem
                data={item.productValues}
                key={index}
                indexP={index}
                handleDeleteRow={() => handleAddRowPropose(index)}
                handleChangeFile={(
                  e: ChangeEvent<HTMLInputElement>,
                  type: "img" | "special"
                ) => handleChangeFileVariantRow(e, index, type)}
                handleChangeInputRow={(
                  e: ChangeEvent<HTMLTextAreaElement>,
                  indexCol: number
                ) => handleChangeInputVariantRow(e, index, indexCol)}
                handleDeleteFileSpecial={() => handleDeleteFileSpecial(index)}
              />
            );
          })}
        </div>

        {errors.productKeys && touched.productKeys && (
          <div className="w-full">
            <TextError text={"require.varian_key"} />
          </div>
        )}
        {errors.productVariants && touched.productVariants && (
          <TextError text={"require.varian_value"} />
        )}
        {isVN && (
          <div>
            <Button
              color="empty"
              text="add_row"
              className="px-4 py-3 !w-fit mt-8"
              imageLeft={<IcPlusAdd />}
              onClick={() => handleAddRowPropose(-1)}
            />
          </div>
        )}
      </div>
      {/* </div> */}
      <div>
        <LabelInput text="chose_propose_pr" isRequire={false} />
        <DropdownSelect
          name="chose_propose"
          className="!w-full"
          classOverlay="h-auto"
        >
          {values.productKeys
            .slice(4, values.productKeys.length - 1)
            .map((variant, indexV) => {
              return (
                <label
                  key={indexV}
                  className="flex gap-2 h-12 items-center hover:bg-whiteFAFAFA border-b px-6"
                >
                  <input
                    className="w-4 h-4 rounded-md"
                    type="checkbox"
                    checked={variant.filter}
                    onChange={(e) => handleActiveFilter(indexV + 4)}
                  />
                  <p>{variant.name}</p>
                </label>
              );
            })}
        </DropdownSelect>
      </div>
      <div className="my-8">
        <GroupButton
          textSubmit="next"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
};

export default BaseInfoProduct;
