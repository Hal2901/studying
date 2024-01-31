import { useLanguage } from "../../hooks/useLanguage";

export default function LanguageBox() {
  const { isVN, handleSwitchLang } = useLanguage();
  return (
    <div className="flex gap-2 items-center sm:text-white text-base leading-5 font-medium relative group z-max">
      {isVN ? "VIE" : "ENG"}
      <div className="absolute top-full left-1/3 z-20 bg-whiteFAFAFA rounded-md min-w-[100px] group-hover:block hidden overflow-hidden shadow-normal">
        <div
          onClick={() => handleSwitchLang("vi")}
          className="text-main text-sm leading-5 font-medium flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-hover"
        >
          VIE
        </div>
        <div
          onClick={() => handleSwitchLang("en")}
          className="text-main text-sm leading-5 font-medium flex items-center gap-1 py-1 px-2 cursor-pointer hover:bg-hover"
        >
          ENG
        </div>
      </div>
    </div>
  );
}
