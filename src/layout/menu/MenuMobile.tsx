import { useTranslation } from "react-i18next";
import { Link, NavLink, useNavigate } from "react-router-dom";
import colors from "../../common/colors";
import { publicPath, publicRoutes } from "../../utils/routers";
import LanguageBox from "../components/LanguageBox";
import UserBox from "../components/UserBox";
import SubMenuMobile from "./SubMenuMobile";
import IcShoppingCart from "../../assets/icons/IcShoppingCart";
interface Props {
  handleClick: () => void;
}

const MenuMobile = ({ handleClick }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <div className=" lg:w-1/3 md:w-1/2 sm:w-3/4 w-11/12 h-screen pt-5 pb-100 xl:hidden block bg-white fixed top-[72px] left-0 overflow-y-scroll hidden-scroll shadow-normal">
      <div className="sm:hidden px-6 flex flex-wrap items-center">
        <LanguageBox />
        <UserBox className="w-124" color={colors.disable_color} />
        <div
          onClick={() => {
            navigate(publicPath.product.productFavorite);
            handleClick();
          }}
        >
          <IcShoppingCart color={colors.disable_color} />
        </div>
      </div>
      <div className="flex flex-col ">
        {publicRoutes.map((item, index) => {
          if (item.hidden) return;
          if (
            item.path === "/" ||
            item.path === publicPath.contact.index ||
            item.path === publicPath.sport.index
          )
            return (
              <NavLink
                onClick={handleClick}
                key={index}
                //
                to={item.path}
                className={({ isActive, isPending }) => {
                  return (
                    "sc1800:text-white  text-base leading-5 font-medium group h-12 flex items-center p-6 hover:bg-hover  relative " +
                    (isActive ? "text-active" : "text-defaultText")
                  );
                }}
              >
                {t(item.name)}
              </NavLink>
            );
          return (
            <SubMenuMobile
              key={index}
              typeMenu={item.typeMenu ?? null}
              name={item.name}
              path={item.path}
              onCloseMenu={handleClick}
            />
          );
        })}
      </div>
    </div>
  );
};

export default MenuMobile;
