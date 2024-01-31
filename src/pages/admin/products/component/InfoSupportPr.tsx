import * as Yup from "Yup";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";
import { ChangeEvent, useContext } from "react";
import IcDelete from "../../../../assets/icons/IcDelete";
import IcPlusAdd from "../../../../assets/icons/IcPlusAdd";
import { Button } from "../../../../components/Button";
import { InputElement } from "../../../../components/InputElement";
import LabelInput from "../../../../components/LabelInput";
import TextError from "../../../../components/TextError";
import GroupButton from "../../../../components/admin/GroupButton";
import TitleAdminPage from "../../../../components/admin/TitleAdminPage";
import { ModalContext } from "../../../../context";
import { ConfirmModal } from "../../../../context/ConfirmModal";
import { productSupportsType } from "../../../../types/productType";
import { productService } from "../../../../services/product/productService";

interface Props {
  isSubmit: boolean;
  data?: productSupportsType[];
  onSubmit: (data: productSupportsType[]) => void;
  onCancel: (key: string) => void;
  onDeleteData: (
    type: "image" | "variant" | "special" | "support",
    idDelete: number
  ) => void;
}
const InfoSupportPr = ({
  data,
  isSubmit,
  onSubmit,
  onCancel,
  onDeleteData,
}: Props) => {
  const { t } = useTranslation();
  const { setModal } = useContext(ModalContext);
  const formik = useFormik<productSupportsType[]>({
    initialValues: data || [
      {
        id: undefined,
        title: "",
        pathLink: "",
      },
    ],
    validationSchema: Yup.array().of(
      Yup.object({
        title: Yup.string().required("require.empty").max(255, "max"),
        pathLink: Yup.string().required("require.empty").max(255, "max"),
      })
    ),
    onSubmit: async (value) => {
      onSubmit(value);
    },
  });
  const { values, errors, touched, setValues, handleSubmit } = formik;
  const handleAddSupportItem = () => {
    setValues([
      ...values,
      {
        id: undefined,
        title: "",
        pathLink: "",
      },
    ]);
  };
  const handleDeleteSp = async (index: number) => {
    const newValues = [...values];
    if (newValues[index].id) {
      const deleted = await productService.deleteProductItem(
        newValues[index].id!,
        "support"
      );
      onDeleteData("support", newValues[index].id!);
    }
    newValues.splice(index, 1);
    setValues(newValues);
  };
  const handleChangeItemValue = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    type: "title" | "pathLink"
  ) => {
    const newValues = [...values];
    newValues[index][`${type}`] = e.target.value;
    setValues(newValues);
  };
  return (
    <div>
      <div className="flex items-end justify-between pb-6 border-b">
        <TitleAdminPage text="support" />
        <Button
          color="empty"
          text="add_support"
          className="px-6 py-3 !w-fit"
          imageLeft={<IcPlusAdd />}
          onClick={handleAddSupportItem}
        />
      </div>
      <div>
        {values.map((value, indexV) => {
          return (
            <div
              key={indexV}
              className="mt-6 pb-6 border-b flex justify-between items-center gap-6"
            >
              <div className="w-11/12">
                <LabelInput text="title" />
                <InputElement
                  placeholder="input_title"
                  name="title"
                  value={value.title}
                  className="mb-2"
                  onChange={(e) => handleChangeItemValue(e, indexV, "title")}
                />
                {errors[indexV]?.title && touched[indexV]?.title && (
                  <TextError
                    text={errors[indexV]!.title! ?? ""}
                    option={{ name: t("title"), length: 255 }}
                  />
                )}
                <LabelInput text="path" />
                <InputElement
                  placeholder="input_path"
                  name="path"
                  value={value.pathLink}
                  onChange={(e) => handleChangeItemValue(e, indexV, "pathLink")}
                />
                {errors[indexV]?.pathLink && touched[indexV]?.pathLink && (
                  <TextError
                    text={errors[indexV]!.pathLink! ?? ""}
                    option={{ name: t("path"), length: 255 }}
                  />
                )}
              </div>
              {values.length > 1 && (
                <div className="w-fit ">
                  <div
                    className="cursor-pointer"
                    onClick={() => handleDeleteSp(indexV)}
                  >
                    <IcDelete />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
      <div className="my-8">
        <GroupButton
          onCancel={() => {
            onCancel("special");
          }}
          onSubmit={handleSubmit}
          disable={isSubmit}
        />
      </div>
    </div>
  );
};

export default InfoSupportPr;
