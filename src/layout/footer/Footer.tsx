import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { publicPath } from "../../utils/routers";
import { productCategoriesService } from "../../services/product/productCategoriesService";
import { solutionCategoriesService } from "../../services/solution/solutionCategoriesService";
import clsx from "clsx";
import { listMemberWebsites } from "../../utils/common";
import { CategorySolution } from "../../types/categoriesType";

import DropdownSelect from "../../components/DropdownSelect";
import IcFacebook from "../../assets/icons/IcFacebook";
import IcTwitter from "../../assets/icons/IcTwitter";
import IcInstagram from "../../assets/icons/IcInstagram";
import IcLinkedln from "../../assets/icons/IcLinkedln";
import IcYoutube from "../../assets/icons/IcYoutube";
import LogoHeader from "../components/LogoHeader";

const params = {
  page: 0,
  size: 3,
  sort: "asc",
};

const initialFooterContents = [
  {
    title: "solution_and_pr",
    item: [],
  },
  {
    title: "resource",
    item: [
      { name: "footer.resource.document", path: publicPath.resource.index },
      { name: "footer.resource.policy", path: publicPath.resource.policy },
      {
        name: "footer.resource.certificate",
        path: publicPath.resource.certificate,
      },
      {
        name: "footer.resource.case_study",
        path: publicPath.resource.caseStudy,
      },
      { name: "footer.resource.video", path: publicPath.resource.videos },
      { name: "footer.resource.training", path: publicPath.resource.training },
    ],
  },
  {
    title: "partner",
    item: [
      { name: "footer.partner.partner", path: publicPath.partner.index },
      {
        name: "footer.partner.partner_register",
        path: publicPath.partner.register,
      },
      {
        name: "footer.partner.partner_check_certificate",
        path: publicPath.partner.checking_certificate,
      },
    ],
  },
  {
    title: "about_us",
    item: [
      { name: "footer.about.company", path: publicPath.company.index },
      {
        name: "footer.about.lsvn_company",
        path: publicPath.company.lsvnmessage,
      },
      { name: "footer.about.history", path: publicPath.company.history },
      { name: "footer.about.staff", path: publicPath.company.staff },
      { name: "footer.about.news", path: publicPath.company.news },
    ],
  },
];

export default function Footer() {
  const { t } = useTranslation();
  const [footerContents, setFooterContents] = useState(initialFooterContents);
  const [groupIndex, setGroupIndex] = useState(-1)

  const createFooterItem = (category: CategorySolution, basePath: string) => ({
    name: category.title,
    path: `${basePath}?danh-muc=${category.id}`,
  });

  const getData = async () => {
    try {
      const { data: productCategories } =
        await productCategoriesService.getListCategories(params);
      const { data: solutionCategories } =
        await solutionCategoriesService.getListCategories(params);

      const newFooterContents = [...footerContents];
      newFooterContents[0] = {
        title: "solution_and_pr",
        item: [
          ...productCategories.slice(0, 3).map(category => createFooterItem(category, '/san-pham')),
          ...solutionCategories.slice(0, 3).map(category => createFooterItem(category, '/giai-phap')),
        ],
      };

      setFooterContents(newFooterContents);
    } catch (error) {
      setFooterContents(initialFooterContents);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <div className="sc1800:px-300 xl:px-[155px] md:px-100 px-5 bg-[#353535] py-[88px]">
        <div className="grid 2xl:grid-cols-[420px_1fr] grid-cols-1 gap-6 gap-y-10">
          <div className="flex flex-col gap-6">
            <div>
              <div className="mb-6">
                <LogoHeader />
              </div>
              <p className="text-base text-white">{t("footer.logo")}</p>
            </div>

            <div>
              <DropdownSelect
                name={t("footer.websites")}
                className="min-w-[280px]"
              >
                {listMemberWebsites.map((group, index) => {
                  return (
                    <div key={index}>
                      <div
                        className="px-6 py-3 text-defaultText text-base leading-5 font-medium hover:bg-hover"
                        onClick={() => {
                          if (index === groupIndex) {
                            setGroupIndex(-1)
                          } else {
                            setGroupIndex(index)
                          }
                        }}
                      >
                        {group.name ?? ''}
                      </div>
                      <div className={clsx("w-full grid transition-all duration-500", {
                        "grid-rows-[1fr]": groupIndex === index,
                        "grid-rows-[0fr]": !(groupIndex === index),
                      })}>
                        <div className="overflow-hidden">
                          {group.group.map((member, indexM) => {
                            return (
                              <div className="flex items-center text-disabled text-base leading-5 hover:bg-hover" key={indexM}>
                                <a
                                  href={member.link ?? ''}
                                  className="w-full px-6 py-3"
                                  target="_blank"
                                >
                                  {member.name ?? ''}
                                </a>
                              </div>
                            )
                          })}
                        </div>
                      </div>

                    </div>
                  )
                })}
              </DropdownSelect>
            </div>
          </div>

          <div className="grid  xl:grid-cols-4 xs:grid-cols-2 gap-y-6">
            {footerContents.map((item, index) => {
              return (
                <div key={index} className="sc1800:pl-0 2xl:pl-2 px-2">
                  <p className="text-lg font-medium mb-6 text-white flex items-end">
                    {t(item.title)}
                  </p>
                  <div className="flex flex-col break-normal justify-start w-full">
                    {item.item.map((content, indexC) => {
                      return (
                        <Link
                          key={indexC}
                          to={content.path}
                          className="text-sm text-white py-2 max-w-[180px] overflow-hidden"
                        >
                          {t(content.name)}
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="bg-[#013775]">
        <div className="sc1800:px-300 md:px-[155px] px-5 md:py-[72px] py-10 flex items-center xl:justify-between justify-center flex-wrap gap-6">
          <p className="text-[#9795B5] text-base font-normal">
            LS Cable & System, Copyright @2023 - Design by Aladin Technology
            Company
          </p>
          <div className="flex gap-[25px] text-[#9795B5] font-medium text-base items-center">
            Follow us
            <ul className="flex gap-6">
              <li>
                <a href="https://www.facebook.com/LSCV4U?mibextid=LQQJ4d" target="_blank" >
                  <IcFacebook />
                </a>
              </li>
              <li>
                <a href="/" target="_blank" >
                  <IcTwitter />
                </a>
              </li>
              <li>
                <a href="/" target="_blank" >
                  <IcInstagram />
                </a>
              </li>
              <li>
                <a href="https://www.linkedin.com/company/lscns/" target="_blank" >
                  <IcLinkedln />
                </a>
              </li>
              <li>
                <a href="https://www.youtube.com/@LSCableSystem/featured" target="_blank" >
                  <IcYoutube />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
