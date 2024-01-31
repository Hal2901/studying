import React, { memo } from "react";
import IcStar from "../../assets/icons/IcStar";
import colors from "../../common/colors";
import { Button } from "../Button";
import { solutionType } from "../../types/solutionType";
import { getIdYoutube, getUrlImage, momentFormat } from "../../utils/constants";
import moment from "moment";
import { initialTypeTopic } from "../../types/topicType";
import { productTypeRoot } from "../../types/productType";

interface Props {
  item?: initialTypeTopic;
  itemPr?: productTypeRoot;
  textBtnEdit?: string;
  textBtnDelete?: string;
  isVideo?: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onEditStatus?: () => void;
}

const ProductCard = memo(
  ({
    item,
    itemPr,
    isVideo = false,
    textBtnEdit = "edit_solution",
    textBtnDelete = "delete_solution",
    onDelete,
    onEditStatus,
    onEdit,
  }: Props) => {
    console.log(item?.createdDate, itemPr?.createdDate);
    return (
      <div className="w-full h-[424px] rounded-10 overflow-hidden bg-white border border-border">
        <div className="w-full h-[224px] relative">
          <img
            src={
              isVideo
                ? getIdYoutube(item?.link!)
                : getUrlImage(
                    item?.link! ?? itemPr?.productImages[0]?.link! ?? ""
                  ) ?? ""
            }
            alt=""
            className="w-full h-full object-cover"
          />
          {itemPr && (
            <div
              onClick={onEditStatus}
              className="absolute top-5 right-5 w-10 h-10 flex items-center justify-center bg-white rounded-10 cursor-pointer"
            >
              <IcStar
                color={itemPr.status ? colors.yellow : colors.disable_color}
              />
            </div>
          )}
        </div>
        <div className="flex flex-col  p-4">
          <p className="font-bold line-clamp-1">
            {item?.title || itemPr?.nameProduct}
          </p>
          <div className="">
            <p className="text-xs text-disabled mb-4">
              {momentFormat(
                item?.createdDate ? item?.createdDate : itemPr?.createdDate!
              )}
            </p>
            <Button
              color="empty"
              text={textBtnEdit}
              className="px-6 py-3 mb-2"
              onClick={onEdit}
            />
            <Button
              color="cancel"
              text={textBtnDelete}
              className="px-6 py-3"
              onClick={onDelete}
            />
          </div>
        </div>
      </div>
    );
  }
);

export default ProductCard;
