import React from "react";
import { useTranslation } from "react-i18next";

const NotFound = () => {
  const { t } = useTranslation()

  return (
    <div className="w-full min-h-screen flex items-center justify-center text-defaultText">
      <div>
        <p className="text-xl text-center font-bold ">{t('404_error')}</p>
        <p className="text-base text-center ">
          {t('cant_find_url')}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
