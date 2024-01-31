import { Link, NavLink, useMatch, useResolvedPath } from "react-router-dom";
import { privateRoutes } from "../../utils/routers";
import { useTranslation } from "react-i18next";
// import { rootRoute } from "../../common";
import colors from "../../common/colors";

interface Props {
  item: {
    path: string;
    exact?: boolean;
    name?: string;
    icon?: any;
  };
}
const RenderLink = (props: Props) => {
  const { t } = useTranslation()

  const resolved = useResolvedPath(`${props.item.path}`);
  const match = useMatch({ path: resolved.pathname, end: false });

  return (
    <NavLink
      to={props.item.path}
      // end
      className={({ isActive }) => {
        return (
          "relative flex gap-[10px] border-l-4 hover:bg-hover hover:text-active items-center py-4 pl-6 text-sm" +
          (isActive || match
            ? " border-l-active text-active"
            : " border-l-transparent font-normal text-defaultText ")
        );
      }}
    >
      <div className="w-12">
        <props.item.icon
          color={match ? colors.color_0082C5 : colors.text_main}
        />
      </div>
      <div className="transition-200 md:w-[240px] whitespace-nowrap w-0">{t(props.item?.name ?? "")}</div>
    </NavLink>
  );
};
export default function NavBar() {
  return (
    <div className="flex-shrink-0 bg-whiteFAFAFA h-screen overflow-y-scroll hidden-scroll py-10 flex flex-col">
      {privateRoutes.map((navItem, index) => {
        if (navItem.hidden) return;
        return <RenderLink key={index} item={navItem} />;
      })}
    </div>
  );
}
