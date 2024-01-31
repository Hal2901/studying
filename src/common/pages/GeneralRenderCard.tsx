import React, { ReactNode, memo } from "react";
import TitlePage from "../../components/TitlePage";
import CardItem from "../../components/CardItem";
import { Button } from "../../components/Button";
import clsx from "clsx";
import { initialTypeTopic } from "../../types/topicType";
import Loading from "../../pages/Loading";
import NoContent from "../../pages/NoContent";

interface Props {
  data: initialTypeTopic[];
  titlePage: string;
  textBtn: string;
  totalPage?: boolean;
  loadding?: boolean;
  className?: string;
  iconCard?: ReactNode;
  isVideo?: boolean;
  handleShowmore: () => void;
  handleForwardOfContent?: (data?: any) => void;
  handleBtn: (data?: any) => void;
}
const GeneralRenderCard = memo(
  ({
    textBtn,
    titlePage,
    data,
    className,
    iconCard,
    totalPage = true,
    loadding = false,
    isVideo = false,
    handleShowmore,
    handleBtn,
    handleForwardOfContent,
  }: Props) => {
    return (
      <div>
        <TitlePage text={titlePage} />
        {data.length === 0 ? (
          <NoContent />
        ) : (
          <div
            className={clsx(
              "w-full grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 xs:grid-cols-2 grid-cols-1  gap-6",
              {
                className,
              }
            )}
          >
            {data.map((item, index) => {
              return (
                <CardItem
                  isVideo={isVideo}
                  iconBtn={iconCard}
                  key={index}
                  item={item}
                  handleButton={handleBtn}
                  handleForward={handleForwardOfContent}
                  textBtn={textBtn}
                />
              );
            })}
          </div>
        )}
        {loadding && <Loading />}
        {totalPage && (
          <div className="py-10">
            <Button
              onClick={handleShowmore}
              color="empty"
              text="see_more"
              className="px-6 py-3"
            />
          </div>
        )}
      </div>
    );
  }
);

export default GeneralRenderCard;
