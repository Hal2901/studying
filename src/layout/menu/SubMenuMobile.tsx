import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { useSearchParamHook } from "../../hooks/useSearchParam";
import { solutionCategoriesService } from "../../services/solution/solutionCategoriesService";
import {
  companySubMenuFake,
  partnerSubMenuFake,
  resourceSubMenuFake,
} from "../../utils/common";
import { publicPath } from "../../utils/routers";
import CategoryProduct from "../../components/categories/CategoryProduct";
import CategoryBox from "../../components/categories/CategoryBox";
interface Props {
  name: string;
  path: string;
  typeMenu:
  | "product"
  | "solution"
  | "resource"
  | "partner"
  | "company"
  | "contact"
  | "sport"
  | null;
  onCloseMenu: () => void;
}
const SubMenuMobile = memo(({ name, typeMenu, path, onCloseMenu }: Props) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { searchParams } = useSearchParamHook();
  const location = useLocation();
  const category = searchParams.get("danh-muc");
  const [listSub, setListSub] = useState({
    product: [],
    solution: [],
    resource: resourceSubMenuFake,
    partner: partnerSubMenuFake,
    company: companySubMenuFake,
    contact: [],
    sport: [],
  });

  const [showMenu, setShowMenu] = useState({
    parent: false,
    child: -1,
    grandChild: -1,
  });

  const handleActiveCategory = (item: any) => {
    if (typeMenu === "solution") {
      navigate(`${publicPath.solution.index}?danh-muc=${item.id!}`);
    } else {
      if (item.routerPath === "https://lscv.vn/du-an") {
        window.open(`${item.routerPath}`, "_blank");
        return;
      }
      navigate(item.routerPath);
      onCloseMenu();
    }
  };
  const handleFetchCategories = async () => {
    try {
      switch (typeMenu) {
        case "solution":
          const { total, data } =
            await solutionCategoriesService.getListCategories();
          const newList: any = { ...listSub };
          newList.solution = data;
          setListSub(newList);
          break;

        default:
          break;
      }
    } catch (error) { }
  };

  // useEffect(() => {
  //   handleFetchCategories();
  // }, [typeMenu]);
  return (
    <div>
      <div
        onClick={() => {
          setShowMenu({ ...showMenu, parent: !showMenu.parent });
        }}
        className={clsx(
          "h-12 flex items-center text-defaultText text-base leading-5 font-medium p-6 hover:bg-hover relative",
          {
            "!text-active": location.pathname.includes(path),
          }
        )}
      >
        {t(name)}
      </div>

      <div
        className={clsx("w-full grid transition-all duration-500", {
          "grid-rows-[1fr]": showMenu.parent,
          "grid-rows-[0fr]": !showMenu.parent,
        })}
      >
        <div className="overflow-hidden">
          {typeMenu === "product" && (
            <CategoryProduct onCloseMenu={onCloseMenu} />
          )}
          {typeMenu === "solution" && (
            <CategoryBox
              nameCategory={"solution"}
              typeCategory={"solution"}
              onCloseMenu={onCloseMenu}
            />
          )}
          {listSub[typeMenu!].map((item, index) => {
            return (
              <div key={index} className="px-8">
                <div
                  onClick={() => {
                    setShowMenu({
                      ...showMenu,
                      child: showMenu.child === index ? -1 : index,
                      grandChild: -1,
                    });
                    handleActiveCategory(item);
                  }}
                  className={clsx(
                    "h-12 w-full flex items-center text-disabled text-base leading-5 hover:bg-hover",
                    {
                      "!text-active":
                        typeMenu !== "solution"
                          ? location.pathname === item.routerPath
                          : showMenu.child === index,
                    }
                  )}
                >
                  {t(item.title)}
                </div>
                {item.children && (
                  <div
                    className={clsx(
                      "w-full grid transition-all duration-500 px-3",
                      {
                        "grid-rows-[1fr]": showMenu.child === index,
                        "grid-rows-[0fr]": showMenu.child !== index,
                      }
                    )}
                  >
                    <div className="overflow-hidden">
                      {item.children.map((item2, index2) => {
                        return (
                          <div
                            key={index2}
                            className={clsx(
                              "w-full transition-all duration-500 overflow-hidden text-sm text-disabled flex items-center h-12 hover:bg-hover",
                              {
                                "!text-active":
                                  showMenu.grandChild === item2.id,
                              }
                            )}
                            onClick={() => {
                              handleActiveCategory(item2);
                              setShowMenu({
                                ...showMenu,
                                grandChild:
                                  showMenu.grandChild === item2.id
                                    ? -1
                                    : item2.id!,
                              });
                              onCloseMenu();
                            }}
                          >
                            {item2.title}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
});

export default SubMenuMobile;
