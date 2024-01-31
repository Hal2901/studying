import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { useLanguage } from "../../../hooks/useLanguage";
import { privatePath } from "../../../utils/routers";
import { ModalContext } from "../../../context";
import { WarrantyType, WarrantyTypeRes } from "../../../types/WarrantyType";
import { Params } from "../../../utils/constants";
import { guaranteeService } from "../../../services/guaranteeService";
import { useSearchParamHook } from "../../../hooks/useSearchParam";

import IcDelete from "../../../assets/icons/IcDelete";
import IcEdit from "../../../assets/icons/IcEdit";
import colors from "../../../common/colors";
import IcEye from "../../../assets/icons/IcEye";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import { InputElement } from "../../../components/InputElement";
import { Button } from "../../../components/Button";
import IcPlus from "../../../assets/icons/IcPlus";
import { ConfirmModal } from "../../../context/ConfirmModal";
import { Pagination } from "../../../components/Paginnation";

interface Cache {
  triggerer: boolean
  param: Params
  data: WarrantyType[]
  keysearch: string
  totalPages: number
}

const WarrantyManagement = () => {
  const { t } = useTranslation()
  const { isVN } = useLanguage()
  const navigator = useNavigate();
  const { searchParams } = useSearchParamHook();
  const { setModal } = useContext(ModalContext);

  const [cache] = useState<Cache>({
    triggerer: false, // Refresh FE
    param: {
      page: 0,
      size: 10,
      sort: "createdDate,desc"
    },
    data: [],
    keysearch: "",
    totalPages: 100
  });

  const [triggerer, setInner] = useState<boolean>(cache.triggerer); // Refresh handler 1
  const setTriggerer = () => { // exit trigger
    cache.triggerer = !cache.triggerer;
    setInner(cache.triggerer);
  }

  // Api handler (tu dong cap nhat giao dien khi goi api)
  const getData = async () => {
    const setter = (result: WarrantyTypeRes) => {
      cache.data = result.data;
      setTriggerer()
    }

    try {
      let result: WarrantyTypeRes
      if (cache.keysearch.length === 0) {
        result = await guaranteeService.getGuarantees(cache.param)
      } else {
        result = await guaranteeService.searchGuarantees(cache.keysearch, cache.param)
      }
      cache.totalPages = Math.ceil(result.total / 10)
      setter(result)
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('warranty') }))
      cache.data = [];
      setTriggerer();
    }
  }

  useEffect(() => {
    // Check param
    const page = searchParams.get("page");
    if (page) {
      const intPage = Number(page);
      cache.param.page = (intPage > 0 && intPage <= cache.totalPages ? intPage : 1) - 1;
    } else {
      cache.param.page = 0;
    }
    // goi api
    getData()
  }, [true])

  const setCurrentPage = (page: number) => {
    cache.param.page = page - 1
    getData()
  }

  // Search handler
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const currentInputValue = e.target.value;
    cache.keysearch = currentInputValue;
    // rate limiter = 0.5 second per api call
    setTriggerer();
    setTimeout(() => {
      if (cache.keysearch === currentInputValue) {
        cache.param.page = 0
        getData()
      }
    },
      currentInputValue.length === 0 ? 0 : 500);
  }

  // Handle delete icon 
  const handleShowDeleteIcon = (id: number | string) => {
    setModal(
      <ConfirmModal onDelete={async () => {
        try {
          await guaranteeService.deleteGuarantee(id)
          getData()

          toast.success(t('message.success.deleted', { name: t('warranty') }))
        } catch (error) {
          toast.error(t('message.error.deleted', { name: t('warranty') }))
        }
      }} message="message_comfirm.warranty" />
    );
  }

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="overflow-scroll hidden-scroll">
        <TitleAdminPage text={t('navBar.info_guarantee_mn')} />
        <div className="grid grid-cols-2 my-8">
          <div>
            <InputElement
              placeholder="input_key_search"
              value={cache.keysearch}
              reSearch={true}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center justify-end gap-6">
            <Button
              disabled={!isVN}
              color="empty"
              text="add_warranty_btn"
              className="px-6 py-3 !w-fit"
              imageLeft={
                <span className="pr-1">
                  <IcPlus />
                </span>
              }
              onClick={() => navigator(privatePath.guarantee.create)}
            />
          </div>
        </div>
        <table className="w-full requesRegister">
          <thead>
            <tr className="border-b border-b-gray-_A1A0A3 text-left">
              <th className='pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('warranty_number')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('investor_name')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('project_name')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('start')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('end')}</th>
              <th className='pl-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap text-right'>{t('func')}</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal">
            {cache.data?.map((item, index) => {
              return (
                <tr key={index} className='border-b border-b-gray-_A1A0A3 text-sm font-normal text-black02 text-left' >
                  <td className="py-4">{item.code}</td>
                  <td className="px-4">{item.fullname}</td>
                  <td className="px-4">{item.fullname}</td>
                  <td className="px-4">{item.startDate}</td>
                  <td className="px-4">{item.endDate}</td>
                  <td className="pl-4">
                    <div className="flex items-center justify-end gap-2 cursor-pointer">
                      <div onClick={() => { navigator(privatePath.guarantee.view.replace(":id", item?.id + "")) }}>
                        <IcEye color={colors.gray01} />
                      </div>
                      <div onClick={() => { navigator(privatePath.guarantee.edit.replace(":id", item?.id + "")) }}>
                        <IcEdit color={colors.gray01} />
                      </div>
                      <div onClick={() => handleShowDeleteIcon(item?.id ? item.id : 0)}>
                        <IcDelete />
                      </div>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {cache.totalPages > 1 && (
        <div className="mt-8 flex justify-end">
          <Pagination
            currentPage={(cache.param?.page ? cache.param.page : 0) + 1}
            totalPages={cache.totalPages}
            disableEffect={true}
            setCurrentPage={setCurrentPage}
          />
        </div>
      )}
    </div>
  )
}

export default WarrantyManagement
