import clsx from "clsx";
import { memo, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useMatch, useNavigate } from "react-router-dom";
import IcArrowsNex from "../../assets/icons/IcArrowsNex";
import colors from "../../common/colors";
import { useSearchParamHook } from "../../hooks/useSearchParam";
import { solutionCategoriesService } from "../../services/solution/solutionCategoriesService";
import {
  companySubMenuFake,
  partnerSubMenuFake,
  resourceSubMenuFake,
} from "../../utils/common";
import { getUrlImage } from "../../utils/constants";
import { TypeSub, publicPath } from "../../utils/routers";

interface Props {
  typeMenu:
    | "product"
    | "solution"
    | "resource"
    | "partner"
    | "company"
    | "contact"
    | "sport"
    | null;
  height?: number;
  onClose: () => void;
}

const menuDataFake: TypeSub[] = [
  {
    title: "Hệ thống mạng băng thông rộng và truy cập",
    routerPath: "",
    children: [
      {
        title: "Fiber Cable Assemblies",
        routerPath: "",
        children: [
          {
            title: "Drop Cables",
            routerPath: "",
          },
          {
            title: "Drop Cables",
            routerPath: "",
          },
          {
            title: "Indoor & Outdoor Cables",
            routerPath: "",
          },
          {
            title: "Indoor Cables",
            routerPath: "",
          },
          {
            title: "Outside Plant Cables",
            routerPath: "",
          },
          {
            title: "aOptical Fiber",
            routerPath: "",
          },
        ],
      },
      {
        title: "Surge Arrestors & Accessories",
        routerPath: "",
        children: [
          {
            title: "Drop Cables",
            routerPath: "",
          },
          {
            title: "Drop Cables",
            routerPath: "",
          },
          {
            title: "Indoor & Outdoor Cables",
            routerPath: "",
          },
          {
            title: "Indoor Cables",
            routerPath: "",
          },
          {
            title: "Outside Plant Cables",
            routerPath: "",
          },
          {
            title: "aOptical Fiber",
            routerPath: "",
          },
        ],
      },
      {
        title: "Signal & Alarm Cable Assemblies",
        routerPath: "",
        children: [
          {
            title: "Drop Cables",
            routerPath: "",
          },
          {
            title: "Drop Cables",
            routerPath: "",
          },
          {
            title: "Indoor & Outdoor Cables",
            routerPath: "",
          },
          {
            title: "Indoor Cables",
            routerPath: "",
          },
          {
            title: "Outside Plant Cables",
            routerPath: "",
          },
          {
            title: "aOptical Fiber",
            routerPath: "",
          },
        ],
      },
      {
        title: "Wireless Cable Assemblies",
        routerPath: "",
        children: [
          {
            title: "Drop Cables",
            routerPath: "",
          },
          {
            title: "Drop Cables",
            routerPath: "",
          },
          {
            title: "Indoor & Outdoor Cables",
            routerPath: "",
          },
          {
            title: "Indoor Cables",
            routerPath: "",
          },
          {
            title: "Outside Plant Cables",
            routerPath: "",
          },
          {
            title: "aOptical Fiber",
            routerPath: "",
          },
        ],
      },
    ],
  },
];
const Menu = memo(({ typeMenu, height, onClose }: Props) => {
  const { t } = useTranslation();
  const { searchParams } = useSearchParamHook();
  const category = searchParams.get("danh-muc");
  const navigate = useNavigate();
  const [childrenCategory, setChildrenCategory] = useState<TypeSub>();
  const [parentId, setParentId] = useState<number>();
  const [childId, setChildId] = useState<number>();
  const [listSub, setListSub] = useState({
    product: menuDataFake,
    solution: [],
    resource: resourceSubMenuFake,
    partner: partnerSubMenuFake,
    company: companySubMenuFake,
    contact: [],
    sport: [],
  });
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
    } catch (error) {}
  };

  const handleClickParentCategory = (item: TypeSub) => {
    if (item?.children) {
      navigate(`${publicPath.solution.index}?danh-muc=${item.id!}`);
    } else {
      if (item.routerPath === "https://lscv.vn/du-an") {
        window.open(`${item.routerPath}`, "_blank");
        return;
      }
      navigate(item.routerPath);
    }
  };

  const handleClickChildCategory = (item: TypeSub) => {
    navigate(`${publicPath.solution.index}?danh-muc=${item.id}`);
    onClose();
  };
  useEffect(() => {
    handleFetchCategories();
  }, [typeMenu]);
  useEffect(() => {
    if (listSub.solution.length > 0 && category) {
      listSub.solution.forEach((item: TypeSub) => {
        if (item.id === +category) {
          setParentId(item.id);
          setChildId(undefined);
          setChildrenCategory(item);
        } else {
          item.children &&
            item.children.forEach((itemChild) => {
              if (itemChild.id === +category) {
                setParentId(item.id);
                setChildId(+category);
                setChildrenCategory(item);
              }
            });
        }
      });
    }
  }, [listSub, category]);
  return (
    <div className="w-screen h-400 menu bg-F5F5F5 z-50 grid grid-cols-3 pl-160 sc1800:top-[72px] top-[144px] left-0 fixed shadow-medium">
      <div className="border-r border-r-border py-12 flex flex-col gap-4 overflow-y-scroll hidden-scroll">
        <p className="text-2xl font-semibold text-defaultText border-l-4 border-l-main pl-3">
          {t(typeMenu ?? "")}
        </p>
        {typeMenu &&
          listSub[`${typeMenu}`].map((item, index) => {
            return (
              <div
                key={index}
                onClick={() => handleClickParentCategory(item)}
                className={clsx(
                  "text-base text-disabled w-fit cursor-pointer",
                  {
                    "text-main underline font-medium":
                      typeMenu === "solution"
                        ? parentId === item.id!
                        : useMatch({ path: item.routerPath, end: true }),
                  }
                )}
              >
                {t(item.title) ?? item.title}
              </div>
            );
          })}
      </div>

      {childrenCategory && (
        <div className="border-r flex flex-col gap-6 pb-10 border-r-border py-12 px-6 overflow-y-scroll hidden-scroll">
          <div className="w-fit flex gap-2">
            <p
              className="text-base text-main font-medium w-fit underline capitalize"
              onClick={() => {
                navigate(publicPath.solution.index);
                onClose();
              }}
            >
              {t("see_all")} {t(typeMenu ?? "")}
            </p>
            <IcArrowsNex color={colors.main} />
          </div>
          <p
            className={clsx(
              "text-2xl font-semibold text-defaultText pl-3 border-l-4 border-l-main "
            )}
          >
            {childrenCategory?.title}
          </p>
          <div
            className={clsx("grid grid-cols-2 gap-6", {
              "!grid-cols-1": typeMenu === "solution",
            })}
          >
            {childrenCategory?.children &&
              childrenCategory?.children.map((child, indexChild) => {
                return (
                  <div key={indexChild} className="flex flex-col gap-4">
                    <p
                      className={clsx("", {
                        "text-lg text-defaultText font-medium":
                          typeMenu != "solution",
                        "text-base text-defaultText font-normal":
                          typeMenu === "solution",
                        "text-main underline font-medium":
                          childId === child.id!,
                      })}
                      onClick={() => handleClickChildCategory(child)}
                    >
                      {child?.title}
                    </p>
                    {child?.children &&
                      child?.children.map((it: any, id: number) => {
                        return (
                          <div
                            key={id}
                            className="text-base text-defaultText font-normal w-fit"
                          >
                            {t(it.title) ?? it.title}
                          </div>
                        );
                      })}
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {childrenCategory?.link && (
        <div className="py-12 px-88">
          <img
            src={
              childrenCategory?.link ? getUrlImage(childrenCategory.link) : ""
            }
            alt=""
            className="w-full h-300 object-contain"
          />
        </div>
      )}
    </div>
  );
});

export default Menu;
