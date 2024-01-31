import clsx from "clsx";
import { memo, useState } from "react";
import { useTranslation } from "react-i18next";
import { productSpecs } from "../../../../types/productType";

interface Props {
  item: productSpecs;
}
const SpecialItem = memo(({ item }: Props) => {
  const { t } = useTranslation();
  const [show, setShow] = useState<boolean>(true);
  return (
    <div className="w-full mb-10">
      <p className="text-2xl font-semibold border-l-4 border-l-main pl-4 mb-6 ">
        {item?.nameSpec}
      </p>

      <div
        className="grid grid-cols-3 border-l border-active"
        onClick={() => setShow(!show)}
      >
        <div className="bg-active p-4 text-white font-medium border-b border-r h-14 border-border">
          {item.column1}
        </div>
        <div className="bg-active p-4 text-white font-medium border-b border-r h-14 border-border">
          {item.column2}
        </div>
        <div className="bg-active p-4 text-white font-medium border-b border-r h-14 border-border">
          {item.column3}
        </div>
      </div>
      <div
        className=" overflow-hidden h-0 duration-500 ease-in-out"
        style={{ height: show ? item?.productSpecDetails?.length * 56 : 0 }}
      >
        {item?.productSpecDetails.map((attr, indexAttr: number) => {
          return (
            <div
              key={indexAttr}
              className={clsx("grid grid-cols-3 border-l border-border")}
            >
              <div className="p-4 text-sm min-h-[56px] border-b border-r  border-border">
                {attr?.nameSpec}
              </div>
              <div className="p-4 text-sm min-h-[56px] border-b border-r  border-border">
                {attr?.value1}
              </div>
              <div className="p-4 text-sm min-h-[56px] border-b border-r  border-border">
                {attr?.value2}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default SpecialItem;
