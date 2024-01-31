import * as Yup from "Yup";
import clsx from "clsx";
import { useFormik } from "formik";
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
import { productSpecs } from "../../../../types/productType";
import { productService } from "../../../../services/product/productService";
interface Props {
  onCancel: (key: string) => void;
  onSubmit: (data: productSpecs[]) => void;
  onDeleteData: (
    type: "image" | "variant" | "special" | "support",
    idDelete: number
  ) => void;
  data?: productSpecs[];
}
const SpecialProduct = ({ onSubmit, onCancel, onDeleteData, data }: Props) => {
  const { setModal } = useContext(ModalContext);
  const formik = useFormik<productSpecs[]>({
    initialValues: data || [
      {
        id: undefined,
        nameSpec: "",
        column1: "teen 2",
        column2: "teen 3",
        column3: "teen 4",
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
    validationSchema: Yup.array().of(
      Yup.object({
        nameSpec: Yup.string().required("require.empty").max(255, "max"),
        column1: Yup.string().required("require.empty").max(255, "max"),
        column2: Yup.string().required("require.empty").max(255, "max"),
        column3: Yup.string().required("require.empty").max(255, "max"),
        productSpecDetails: Yup.array()
          .min(1, "")
          .of(
            Yup.object({
              nameSpec: Yup.string().required("require.empty").max(255, "max"),
              value1: Yup.string().required("require.empty").max(255, "max"),
              value2: Yup.string().required("require.empty").max(255, "max"),
            })
          ),
      })
    ),
    onSubmit: async (value) => {
      try {
        onSubmit(value);
      } catch (error) {}
    },
  });
  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleChange,
    setValues,
    handleSubmit,
  } = formik;

  const handleChangeTableName = (
    e: ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const value = e.target.value;
    const newValues = [...values];
    newValues[index].nameSpec = value;
    setValues(newValues);
  };

  const handleChangeColtableName = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    indexCol: number
  ) => {
    const value = e.target.value;
    const newValues = [...values];
    switch (indexCol) {
      case 0:
        newValues[index].column1 = value;
        break;
      case 1:
        newValues[index].column2 = value;
        break;
      case 2:
        newValues[index].column3 = value;
        break;

      default:
        break;
    }
    setValues(newValues);
  };
  const handleChangeRowValue = (
    e: ChangeEvent<HTMLInputElement>,
    index: number,
    indexRow: number,
    indexCol: number
  ) => {
    const value = e.target.value;
    const newValues = [...values];
    switch (indexCol) {
      case 0:
        newValues[index].productSpecDetails[indexRow].nameSpec = value;
        break;
      case 1:
        newValues[index].productSpecDetails[indexRow].value1 = value;
        break;
      case 2:
        newValues[index].productSpecDetails[indexRow].value2 = value;
        break;

      default:
        break;
    }
    setValues(newValues);
  };

  const handleAddOrRemoteTableIndex = async (index: number) => {
    const newValues = [...values];
    if (index >= 0) {
      try {
        if (newValues[index].id) {
          const deleted = await productService.deleteProductItem(
            newValues[index].id!,
            "spec"
          );
          // onDeleteData("image", newValues[index].id!);
          // setModal(
          //   <ConfirmModal onDelete={deleteTb} message="message_comfirm.table" />
          // );
        }
      } catch (error) {}
      newValues.splice(index, 1);
    } else {
      newValues.push({
        id: undefined,
        nameSpec: "",
        column1: "",
        column2: "",
        column3: "",
        productSpecDetails: [
          {
            id: undefined,
            nameSpec: "",
            value1: "",
            value2: "",
          },
        ],
      });
    }
    setValues(newValues);
  };

  const handleAddOrRemoteRowTableIndex = async (
    indexTable: number,
    indexRow: number
  ) => {
    const newValues = [...values];
    if (indexRow >= 0) {
      if (newValues[indexTable].productSpecDetails[indexRow].id) {
        const deleted = await productService.deleteProductItem(
          newValues[indexTable].productSpecDetails[indexRow].id!,
          "spec-detail"
        );
        // onDeleteData("special", -1);
        // setModal(
        //   <ConfirmModal onDelete={() => {}} message="message_comfirm.col" />
        // );
      }
      newValues[indexTable].productSpecDetails.splice(indexRow, 1);
    } else {
      const itemRow = {
        id: undefined,
        nameSpec: "",
        value1: "",
        value2: "",
      };

      newValues[indexTable].productSpecDetails.push(itemRow);
    }
    setValues(newValues);
  };
  return (
    <div>
      <div className="flex items-end justify-between pb-6 border-b">
        <TitleAdminPage text="special" />
        <Button
          color="empty"
          text="add_table"
          className="px-6 py-3 !w-fit"
          imageLeft={<IcPlusAdd />}
          onClick={() => handleAddOrRemoteTableIndex(-1)}
        />
      </div>
      <div>
        {values.map((table, index) => {
          return (
            <div key={index} className="mt-6 pb-6">
              <LabelInput text="table_name" />
              <div className="flex items-start justify-between gap-6">
                <InputElement
                  placeholder="input_table_name"
                  name="nameSpec"
                  value={table.nameSpec}
                  className="mb-2"
                  onChange={(e) => handleChangeTableName(e, index)}
                />
                {values.length > 1 && (
                  <div
                    className="cursor-pointer w-6 pt-4"
                    onClick={() => handleAddOrRemoteTableIndex(index)}
                  >
                    <IcDelete />
                  </div>
                )}
              </div>

              <div className=" my-4 gap-6 flex justify-between">
                <div className="w-full rounded-10">
                  <div className="grid grid-cols-3 h-14 bg-main rounded-t-10 overflow-hidden">
                    {[1, 2, 3].map((item, indexCol) => {
                      return (
                        <div className="flex items-center  px-4" key={indexCol}>
                          <InputElement
                            placeholder="input_name_col"
                            name="col"
                            className="!bg-transparent text-white border-none"
                            value={
                              item === 1
                                ? table.column1
                                : item === 2
                                ? table.column2
                                : table.column3
                            }
                            onChange={(e) =>
                              handleChangeColtableName(e, index, indexCol)
                            }
                          />
                        </div>
                      );
                    })}
                  </div>
                  {table?.productSpecDetails.map((attrb, indexAtrb) => {
                    return (
                      <div
                        key={indexAtrb}
                        className={clsx("grid grid-cols-3 h-14 relative", {
                          "bg-F5F5F5": indexAtrb % 2 != 0,
                          "rounded-b-10":
                            indexAtrb + 1 === table?.productSpecDetails.length,
                        })}
                      >
                        {[1, 2, 3].map((itemValue, indexValue) => {
                          return (
                            <div
                              className={clsx("flex items-center ")}
                              key={indexValue}
                            >
                              <InputElement
                                placeholder="input_data"
                                name="path"
                                className="!bg-transparent border-none"
                                value={
                                  itemValue === 1
                                    ? attrb.nameSpec
                                    : itemValue === 2
                                    ? attrb.value1
                                    : attrb.value2
                                }
                                onChange={(e) =>
                                  handleChangeRowValue(
                                    e,
                                    index,
                                    indexAtrb,
                                    indexValue
                                  )
                                }
                              />
                            </div>
                          );
                        })}
                        <div
                          className="absolute top-0 -right-12 cursor-pointer w-6 pt-4"
                          onClick={() =>
                            handleAddOrRemoteRowTableIndex(index, indexAtrb)
                          }
                        >
                          <IcDelete />
                        </div>
                      </div>
                    );
                  })}
                </div>
                <div className="w-6"></div>
              </div>

              {errors[index] && touched[index] && (
                <TextError text={"require.table_special"} />
              )}
              <Button
                color="empty"
                text="add_row"
                className="px-6 py-3 !w-fit"
                imageLeft={<IcPlusAdd />}
                onClick={() => handleAddOrRemoteRowTableIndex(index, -1)}
              />
            </div>
          );
        })}
      </div>
      <div className="my-8">
        <GroupButton
          textSubmit="next"
          onCancel={() => {
            onCancel("base");
          }}
          onSubmit={handleSubmit}
          disable={isSubmitting}
        />
      </div>
    </div>
  );
};

export default SpecialProduct;
