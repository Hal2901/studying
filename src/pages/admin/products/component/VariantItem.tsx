import clsx from "clsx";
import { ChangeEvent, memo } from "react";
import { useTranslation } from "react-i18next";
import IcDelete from "../../../../assets/icons/IcDelete";
import IcLabelUploadImg from "../../../../assets/icons/IcLabelUploadImg";
import IcSort from "../../../../assets/icons/IcSort";
import colors from "../../../../common/colors";
import { TextAreaElement } from "../../../../components/TextAreaElement";
import { getUrlImage } from "../../../../utils/constants";

interface Props {
  data: any[];
  indexP: number;
  handleDeleteRow: () => void;
  handleDeleteFileSpecial: () => void;
  handleChangeFile: (
    e: ChangeEvent<HTMLInputElement>,
    typeFile: "img" | "special"
  ) => void;
  handleChangeInputRow: (
    e: ChangeEvent<HTMLTextAreaElement>,
    indexCol: number
  ) => void;
}

const VariantItem = memo(
  ({
    data,
    indexP,
    handleDeleteRow,
    handleChangeFile,
    handleChangeInputRow,
    handleDeleteFileSpecial,
  }: Props) => {
    const { t } = useTranslation();
    return (
      <div
        className={clsx(" flex  h-auto relative shadow-sm", {
          "bg-whiteFAFAFA": indexP % 2 == 0,
          "bg-white": indexP % 2 != 0,
        })}
      >
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "flex items-center justify-between text-white font-medium min-h-[100px] p-4 showCategory  relative",
                {
                  "min-w-[160px] w-160": index === 0,
                  "min-w-[320px] w-[320px]": index !== 0,
                  "bg-whiteFAFAFA": indexP % 2 == 0,
                  "bg-white": indexP % 2 != 0,
                }
              )}
            >
              {index === 0 && (
                <div className="w-full">
                  <label className="flex h-full w-full border border-border flex-col items-center justify-center p-4 cursor-pointer">
                    {item?.value ? (
                      <img
                        src={getUrlImage(item?.value)}
                        alt=""
                        className="w-full h-16"
                      />
                    ) : (
                      <>
                        <IcLabelUploadImg color={colors.text_main} />
                        <p className="text-defaultText">{t("upload_img")}</p>
                      </>
                    )}
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleChangeFile(e, "img")}
                    />
                  </label>
                </div>
              )}
              {index > 0 && index + 1 < data.length && (
                <div className="w-full">
                  <TextAreaElement
                    placeholder="input_description"
                    name="description"
                    rows={3}
                    value={item?.value ?? ""}
                    className="border-none font-normal max-w-full !bg-transparent"
                    onChange={(e) => handleChangeInputRow(e, index)}
                  />
                </div>
              )}
              {index + 1 === data.length && (
                <div className="w-full relative">
                  {item?.value ? (
                    <div className="flex items-center justify-between gap-1 cursor-pointer">
                      <IcLabelUploadImg />
                      <p className="text-defaultText">
                        {item.value.slice(0, 10)}
                      </p>
                      <div onClick={handleDeleteFileSpecial}>
                        <IcDelete />
                      </div>
                    </div>
                  ) : (
                    <label className="flex h-12 rounded-10 w-full border border-main text-main items-center justify-center p-4 cursor-pointer">
                      <IcSort />
                      {t("upload_file_special")}
                      <input
                        type="file"
                        hidden
                        onChange={(e) => handleChangeFile(e, "special")}
                      />
                    </label>
                  )}
                  <div
                    className="absolute top-1/2 -translate-y-1/2 left-[120%] cursor-pointer"
                    onClick={handleDeleteRow}
                  >
                    <IcDelete />
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  }
);

export default VariantItem;
