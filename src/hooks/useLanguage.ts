import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();
  const isVN = i18n.language === 'vi';

  const handleSwitchLang = (lang: 'vi' | 'en') => {
    i18n.changeLanguage(lang);
    localStorage.setItem('i18nextLng', lang);
    window.location.reload();
  };

  // useEffect(()=> {
  //   window.addEventListener("load", (event) => {
  //     console.log("page is fully loaded");
  //   });

  //   return( ()=> {
  //     window.removeEventListener("load", (event) => {
  //       console.log("page is fully loaded");
  //     });
  //   })
  // }, [isVN])

  return {
    isVN,
    handleSwitchLang,
  };
};
