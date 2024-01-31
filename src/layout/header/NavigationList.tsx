import React from "react";
import { publicPath, publicRoutes } from "../../utils/routers";
import { Link } from "react-router-dom";
import LinkWrapperMenu from "./LinkWrapperMenu";
import { useTranslation } from "react-i18next";

interface Props {
  className?: string;
}

const NavigationList = ({ className }: Props) => {
  const { t } = useTranslation();
  return (
    <div
      className={
        "sc1800:relative fixed sc1800:w-auto w-full sc1800:top-0 top-[72px] right-0 sc1800:bg-inherit bg-white z-50 " +
        className
      }
    >
      <div className="flex items-center sm:justify-center gap-8">
        {publicRoutes.map((item, index) => {
          if (item.hidden) return;
          if (
            item.path === "/" ||
            item.path === publicPath.contact.index ||
            item.path === publicPath.sport.index
          )
            return (
              <Link
                key={index}
                to={item.path}
                className="sc1800:text-white text-defaultText text-base leading-5 font-medium group py-[26px] relative "
              >
                {t(item.name)}
              </Link>
            );
          return (
            <LinkWrapperMenu
              key={index}
              item={{
                text: item.name,
                path: item.path,
                typeMenu: item.typeMenu ?? null,
              }}
            />
          );
        })}
      </div>
    </div>
  );
};

export default NavigationList;
