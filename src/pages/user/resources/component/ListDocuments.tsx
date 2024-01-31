import clsx from "clsx";
import { memo } from "react";
import { useTranslation } from "react-i18next";
import IcDownload from "../../../../assets/icons/IcDowload";
import colors from "../../../../common/colors";
import { Button } from "../../../../components/Button";
import { useDownloadFile } from "../../../../hooks/useDownloadFile";
import { initialTypeTopic } from "../../../../types/topicType";
import { listDocuments } from "../../../../utils/common";
import { momentFormat } from "../../../../utils/constants";

interface Props {
  data: initialTypeTopic[];
}
const ListDocuments = memo(({ data }: Props) => {
  const { t } = useTranslation();
  const { handleDownload } = useDownloadFile();
  return (
    <div className="w-full lg:overflow-hidden overflow-x-scroll">
      <div className="lg:w-full w-auto lg:min-w-auto min-w-[800px] grid grid-cols-4 border-l border-r border-active">
        {listDocuments.map((name, index) => {
          return (
            <div
              key={index}
              className={clsx(
                "bg-active p-4 text-white font-medium border-b border-r h-14 border-border",
                { "col-span-2": index === 0 },
                { "border-r-transparent": index === 2 },
                { "text-center": index !== 0 }
              )}
            >
              {t(name)}
            </div>
          );
        })}
      </div>
      <div className="lg:w-full w-auto lg:min-w-auto min-w-[800px]">
        {data.map((item, index) => {
          return (
            <div
              key={index}
              className="grid grid-cols-4 border text-white border-t-transparent border-border bg-whiteFAFAFA"
            >
              <div
                className={clsx(
                  "p-4  text-sm border-b text-defaultText border-r h-14 border-border col-span-2"
                )}
              >
                {item?.title}
              </div>
              <div
                className={
                  "flex items-center border-b border-r border-border justify-center"
                }
              >
                <Button
                  color="normal"
                  text="download"
                  className="!text-xs !font-normal !text-defaultText px-2 py-1 h-7 rounded-[4px] bg-white !w-fit"
                  image={
                    <IcDownload color={colors.gray01} width={16} height={16} />
                  }
                  onClick={() => handleDownload(item.file!, "document")}
                />
              </div>
              <div
                className={clsx(
                  "p-4 text-center text-defaultText text-sm border-b border-r h-14 border-border"
                )}
              >
                {momentFormat(item.createdDate!)}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default ListDocuments;
