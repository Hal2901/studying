import clsx from "clsx";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { Button } from "../../../components/Button";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import { productService } from "../../../services/product/productService";
import {
  baseInfo,
  productSpecs,
  productSupportsType,
  productTypeRoot,
} from "../../../types/productType";
import BaseInfoProduct from "./component/BaseInfoProduct";
import InfoSupportPr from "./component/InfoSupportPr";
import SpecialProduct from "./component/SpecialProduct";

const listBtn = [
  { text: "base_info", type: "base" },
  { text: "special", type: "special" },
  { text: "product_support", type: "support" },
];
const EditProduct = () => {
  const { id } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isSubmitting, setSubmitting] = useState<boolean>(false);
  const [typeCreate, setTypeCreate] = useState<string>("base");
  const [dataProduct, setDataProduct] = useState<productTypeRoot>({
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
    productSupports: [
      {
        id: undefined,
        title: "",
        pathLink: "",
      },
    ],
    productSpecs: [
      {
        id: undefined,
        nameSpec: "",
        column1: "column 1",
        column2: "column 2",
        column3: "column 3",
        productSpecDetails: [
          {
            id: undefined,
            nameSpec: "",
            value1: "",
            value2: "",
          },
        ],
      },
    ],
  });

  const handleNext = (key: string) => {
    setTypeCreate(key);
  };

  const handleValidateData = () => {
    const simpleKeys =
      dataProduct.categories.id !== -1 &&
      dataProduct.companies.length > 0 &&
      dataProduct.infoProduct !== "" &&
      dataProduct.nameProduct !== "" &&
      dataProduct.productImages.length > 0;

    const checkProductKeys = dataProduct.productKeys.every(
      (item) => item.name !== ""
    );
    const checkProductSpecs = dataProduct.productSpecs.every((item) => {
      const checkDetail = item.productSpecDetails.every(
        (child) =>
          child.nameSpec !== "" && child.value1 !== "" && child.value2 !== ""
      );

      return (
        item.nameSpec !== "" &&
        item.column1 !== "" &&
        item.column2 !== "" &&
        item.column3 !== "" &&
        checkDetail
      );
    });
    const checkProductVariants = dataProduct.productVariants.every((item) => {
      return item.productValues.every((child) => child.value !== "");
    });

    return (
      simpleKeys &&
      checkProductKeys &&
      checkProductSpecs &&
      checkProductVariants
    );
  };
  const handleActionBaseInfo = (data: baseInfo) => {
    setDataProduct({
      ...data,
      productSupports: dataProduct.productSupports,
      productSpecs: dataProduct.productSpecs,
    });
    handleNext("special");
  };
  const handleActionSpecial = (data: productSpecs[]) => {
    setDataProduct({
      ...dataProduct,
      productSpecs: data,
    });
    handleNext("support");
  };
  const handleSubmit = async (data: productSupportsType[]) => {
    try {
      setSubmitting(true);
      const valueUpload: productTypeRoot = {
        ...dataProduct,
        productSupports: data,
      };

      const validate = handleValidateData();
      if (!validate)
        return toast.error(
          "Chưa nhập đủ thông tin cơ bản hoặc thông số kĩ thuật"
        );

      valueUpload.productVariants.map((item) => {
        item.productValues.map((vl) => {
          vl.value = vl.value.trim();
          return vl;
        });
        return item;
      });
      const result = await productService.createProduct(valueUpload);
      toast.success(
        id
          ? t("message.success.updated", { name: t("product") })
          : t("message.success.posted", { name: t("product") })
      );
      navigate(-1);
    } catch (error) {
      toast.error(
        id
          ? t("message.error.updated", { name: t("product") })
          : t("message.error.posted", { name: t("product") })
      );
    } finally {
      setSubmitting(false);
    }
  };
  const fetchDetailPr = async (id: number) => {
    try {
      const result = await productService.getDetailProduct(id);
      if (result) {
        setDataProduct(result);
      }
    } catch (error) {
      toast.error(t("message.error.fetched", { name: t("product") }));
    }
  };
  const handleDeleteData = (
    type: "image" | "variant" | "special" | "support" | "productKeys",
    idDelete: number,
    values?: productTypeRoot
  ) => {
    if (id) {
      let newData = { ...dataProduct };
      switch (type) {
        case "variant":
          const newVariant = newData.productVariants.filter(
            (item) => item.id !== idDelete
          );
          if (values) {
            newData = {
              ...values,
              productImages: dataProduct.productImages,
              productSupports: dataProduct.productSupports,
              productSpecs: dataProduct.productSpecs,
            };
          }
          newData.productVariants = newVariant;
          break;
        case "productKeys":
          const newProductKeys = newData.productKeys.filter(
            (item) => item.id !== idDelete
          );
          if (values) {
            newData = {
              ...values,
              productImages: dataProduct.productImages,
              productSupports: dataProduct.productSupports,
              productSpecs: dataProduct.productSpecs,
            };
          }
          newData.productKeys = newProductKeys;
          break;
        case "special":
          const productSpecs = newData.productSpecs.filter(
            (item) => item.id !== idDelete
          );
          newData.productSpecs = productSpecs;
          break;
        case "support":
          const productSupports = newData.productSupports.filter(
            (item) => item.id !== idDelete
          );
          newData.productSupports = productSupports;
          break;
        default:
          break;
      }
      setDataProduct(newData);
    }
  };

  useEffect(() => {
    if (id) {
      fetchDetailPr(+id);
    }
  }, [id]);
  return (
    <div>
      <TitleAdminPage text="list_pr" />
      <div className="border-b flex items-center my-8">
        {listBtn.map((btn, indexBtn) => {
          return (
            <Button
              key={indexBtn}
              color={btn.type === typeCreate ? "primary" : "empty"}
              text={btn.text}
              className={clsx("px-6 py-3 !font-medium !rounded-[4px] !w-fit", {
                "!border-transparent !text-defaultText": btn.type != typeCreate,
              })}
            />
          );
        })}
      </div>
      <div>
        {typeCreate === "base" && (
          <BaseInfoProduct
            data={dataProduct}
            onSubmit={handleActionBaseInfo}
            onDeleteData={handleDeleteData}
          />
        )}
        {typeCreate === "special" && (
          <SpecialProduct
            onCancel={(key: string) => handleNext(key)}
            data={dataProduct.productSpecs}
            onSubmit={handleActionSpecial}
            onDeleteData={handleDeleteData}
          />
        )}
        {typeCreate === "support" && (
          <InfoSupportPr
            isSubmit={isSubmitting}
            onCancel={(key: string) => handleNext(key)}
            data={dataProduct.productSupports}
            onSubmit={handleSubmit}
            onDeleteData={handleDeleteData}
          />
        )}
      </div>
    </div>
  );
};

export default EditProduct;
