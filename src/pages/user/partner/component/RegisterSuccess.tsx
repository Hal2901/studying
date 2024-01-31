import React, { useContext } from "react";
import {
  ImageAddPrFavorite,
  RegisterSuccessImg,
} from "../../../../assets/images";
import { useTranslation } from "react-i18next";
import { Button } from "../../../../components/Button";
import { useNavigate } from "react-router-dom";
import { ModalContext } from "../../../../context";
import IcCloseModal from "../../../../assets/icons/IcCloseModal";
import { publicPath } from "../../../../utils/routers";

const RegisterSuccess = ({ mdPr = false }: { mdPr?: boolean }) => {
  const { t } = useTranslation();
  const { closeModal } = useContext(ModalContext);
  const navigate = useNavigate();
  const gotoHome = () => {
    navigate(mdPr ? publicPath.product.productFavorite : "/");
    closeModal();
  };
  return (
    <div className="flex flex-col items-center gap-6 py-14 bg-white lg:w-[50vw] w-[80vw] h-600 rounded-[4px] px-5 relative">
      <button className="absolute top-6 right-6" onClick={() => closeModal()}>
        <IcCloseModal />
      </button>
      <img
        src={mdPr ? ImageAddPrFavorite : RegisterSuccessImg}
        alt=""
        className="max-w-[400px] max-h-[200px] object-contain mb-2"
      />
      <p className="text-2xl font-semibold text-center">
        {t(
          mdPr
            ? "message.success.add_product_intoFavorite"
            : "register_partner_sc"
        )}
      </p>
      <p className="text-center max-w-[480px]">
        {t(mdPr ? "add_pr_into_favorite_des" : "register_partner_sc_sub")}
      </p>

      <Button
        color="primary"
        text={mdPr ? "go_to_cart" : "go_to_home"}
        className="px-6 py-3 min-h-[40px] !w-fit !font-medium !min-w-[200px]"
        onClick={gotoHome}
      />
    </div>
  );
};

export default RegisterSuccess;
