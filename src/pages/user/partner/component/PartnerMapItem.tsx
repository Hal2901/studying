import React, { memo } from "react";
import { Companylogo } from "../../../../assets/images";
import { useTranslation } from "react-i18next";
import clsx from "clsx";
import { PartnerCompanyType } from "../../../../types/PartnerType";
import { getUrlImage } from "../../../../utils/constants";

interface Props {
  className?: string;
  onChangeLinkMap: () => void;
  item: PartnerCompanyType;
}
const PartnerMapItem = memo(
  ({ item, className = "", onChangeLinkMap }: Props) => {
    const { t } = useTranslation();
    return (
      <div
        className={clsx(
          "w-full hover:bg-whiteFAFAFA py-6 px-4 flex flex-col gap-2 text-defaultText break-words",
          className
        )}
        onClick={() => onChangeLinkMap()}
      >
        <img
          src={getUrlImage(item.link) ?? Companylogo}
          alt=""
          className="w-[120px] h-10 mb-[6px]"
        />
        <p className="font-medium text-lg break-words">{item.namePartner}</p>
        <p>
          {t("address")}: {item.address}
        </p>
        <p>
          {t("tax_code")}: {item.vat}
        </p>
        <p>
          {t("person_contact")}: {item.nameContact}
        </p>
        <p>
          {t("phone_number")}:
          <a
            href={item?.phone ? `tel:${item?.phone.split(" ").join("-")}` : ""}
            onClick={(e) => e.stopPropagation()}
            className="text-danger"
          >
            {item.phone}
          </a>
        </p>
        <p>
          {t("email")}:{" "}
          <a
            href={`mailto:${item.email}`}
            onClick={(e) => e.stopPropagation()}
            className="text-black text-base font-medium"
          >
            {item.email}
          </a>
        </p>
      </div>
    );
  }
);

export default PartnerMapItem;
