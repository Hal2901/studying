import React, { useState } from "react";
import Banner from "../../../components/Banner";
import Breadcrumb from "../../../components/Breadcrumb";
import { introduceGroupLeaders, listBreads } from "../../../utils/common";
import { useTranslation } from "react-i18next";
import { Button } from "../../../components/Button";
import InfoPerson from "./component/InfoPerson";
import LevelOfPerson from "./component/LevelOfPerson";
import { ImageChairman, ImageManager } from "../../../assets/images";

const Company = () => {
  const { t } = useTranslation();

  const data = [
    {
      imageLink: ImageChairman,
      title: '“We will become the world’s best cable maker”',
      messages: t("chairman_msg"),
    },
    {
      imageLink: ImageManager,
      title: "“We will become the world’s best cable maker”",
      messages: t("manager_msg"),
    },
  ];

  const [isChairPerson, setChairPerson] = useState<boolean>(true);
  const [president, setDataPresident] = useState(data[0]);
  const [infoPresident, setInfoPresident] = useState(introduceGroupLeaders[0]);

  const handleChangeInfoPresident = (index: number) => {
    if (index > 0) {
      setChairPerson(true);
      setDataPresident(data[0]);
      setInfoPresident(introduceGroupLeaders[0]);
    } else {
      setChairPerson(false);
      setDataPresident(data[1]);
      setInfoPresident(introduceGroupLeaders[1]);
    }
  };
  return (
    <div>
      <Banner typeBanner="INTRO" />
      <Breadcrumb listBreads={listBreads} />
      <div className="sc1800:px-300 xl:px-[155px] sm:px-100 px-5 lg:py-88 py-10 flex flex-col">
        <div className="flex flex-wrap gap-5 items-center  md:justify-between pb-4 border-b border-border">
          <p className="lg:text-40 text-3xl font-semibold text-center lg:max-w-[60%]">
            {t("LS Cable & System")}
          </p>
          <div className="flex flex-wrap gap-y-6 items-center ">
            <Button
              onClick={() => handleChangeInfoPresident(1)}
              color={isChairPerson ? "primary" : "normal"}
              text="chair_perssion"
              className={
                "px-6 py-3 !w-fit " +
                (isChairPerson ? "" : "!font-normal !border-none")
              }
            />
            <Button
              color={!isChairPerson ? "primary" : "normal"}
              text="chair_ps_and_manager_director"
              className={
                "px-6 py-3 !w-fit " +
                (!isChairPerson ? "" : "!font-normal !border-none")
              }
              onClick={() => handleChangeInfoPresident(0)}
            />
          </div>
        </div>

        <div>
          <InfoPerson data={president} />
        </div>

        <div>
          <LevelOfPerson title={t("education")} data={infoPresident.education} />
          <LevelOfPerson
            title={t("experience")}
            data={infoPresident.experiens}
          />
        </div>
      </div>
    </div>
  );
};

export default Company;
