import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { privatePath } from "../../../utils/routers";
import { Pagination } from "../../../components/Paginnation";
import { ModalContext } from "../../../context";
import { partnerService } from "../../../services/partnerService";
import { Params } from "../../../utils/constants";
import { useSearchParamHook } from "../../../hooks/useSearchParam";
import { PartnerCompanyRes, PartnerCompanyType } from "../../../types/PartnerType";
import colors from "../../../common/colors";

import IcDelete from "../../../assets/icons/IcDelete";
import IcEdit from "../../../assets/icons/IcEdit";
import IcEye from "../../../assets/icons/IcEye";
import { ConfirmModal } from "../../../context/ConfirmModal";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import { InputElement } from "../../../components/InputElement";
import { Button } from "../../../components/Button";
import IcPlusAdd from "../../../assets/icons/IcPlusAdd";

interface CheckboxState {
  [index: number]: boolean
}
interface Cache {
  triggerer: boolean
  param: Params
  data: PartnerCompanyType[]
  keysearch: string
  checkbox: CheckboxState
  totalPages: number
}

const PartnerManagement = () => {
  const { t } = useTranslation()
  const navigator = useNavigate();
  const { searchParams } = useSearchParamHook();
  const { setModal } = useContext(ModalContext)

  const [cache] = useState<Cache>({
    triggerer: false, // Refresh FE
    param: {
      page: 0,
      size: 10,
      sort: "id,desc"
    },
    data: [],
    keysearch: '',
    checkbox: {},
    totalPages: 100
  })

  const [triggerer, setInner] = useState<boolean>(cache.triggerer); // Refresh handler 1
  const setTriggerer = () => { // exit trigger
    cache.triggerer = !cache.triggerer;
    setInner(cache.triggerer);
  }

  // Api handler (tu dong cap nhat giao dien khi goi api)
  const getData = async () => {
    cleanCheckbox();
    const setter = (result: PartnerCompanyRes) => {
      cache.data = result.data;
      setTriggerer()
    }

    try {
      let result: PartnerCompanyRes
      if (cache.keysearch.length === 0) {
        result = await partnerService.getPartnersCompany(cache.param)
      } else {
        result = await partnerService.searchPartnersCompany(cache.keysearch, cache.param)
      }
      cache.totalPages = Math.ceil(result.total / 10)
      setter(result)
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('partner') }))
      cache.data = []
      setTriggerer()
    }
  }

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

  // Handle delete btn
  const handleShowDeleteBtn = () => {
    if (Object.values(cache.checkbox).includes(true)) {
      setModal(
        <ConfirmModal onDelete={async () => {
          try {
            let ids: string = '0'
            Object.keys(cache.checkbox).map((key) => {
              ids = ids + ',' + cache.data[parseInt(key)]?.id;
            })
            await partnerService.deletePartnerCompanies(ids)
            toast.success(t('message.success.deleted', { name: t('partners') }))
            getData();
          } catch (error) {
            toast.error(t('message.error.deleted', { name: t('partners') }))
          }
        }} message="message_comfirm.contact" />
      );
    }
  }
  // Handle delete icon
  const handleShowDeleteIcon = (id: number) => {
    setModal(
      <ConfirmModal onDelete={async () => {
        try {
          await partnerService.deletePartnerCompany(id)
          toast.success(t('message.success.', { name: t('partner') }))
          getData()
        } catch (error) {
          toast.error(t('message.error.', { name: t('partner') }))
        }
      }} message="message_comfirm.partner" />
    );
  }

  // Handle checkbox
  const handleCheckboxClick = (index: number) => {
    cache.checkbox[index] = cache.checkbox[index] ? !cache.checkbox[index] : true;
    setTriggerer();
  }

  const handleCheckAll = () => {
    const checkAllTrue = isCheckAll();
    checkAllTrue ? cleanCheckbox() :
      Object.keys(cache.data).reduce((previous: number) => {
        cache.checkbox[previous] = true;
        return previous + 1;
      }, 0)
    setTriggerer();
  }

  const isChecked = (index: number) => {
    return cache.checkbox[index] ? true : false
  }

  const isCheckAll = () => {
    const count = Object.keys(cache.checkbox).reduce((previous: number, key: string) => {
      return previous + (cache.checkbox[parseInt(key)] ? 1 : 0);
    }, 0);

    return cache.data?.length === count;
  };

  const cleanCheckbox = () => {
    cache.checkbox = {};
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

  return (
    <div className="w-full h-full flex flex-col justify-between">
      <div className="overflow-scroll hidden-scroll">
        <TitleAdminPage text="partner_list" />
        <div className="grid grid-auto-fit-420 gap-6 my-8">
          <div>
            <InputElement
              placeholder="input_key_search"
              name="name"
              value={cache.keysearch}
              reSearch={true}
              onChange={handleSearch}
            />
          </div>
          <div className="flex items-center justify-end gap-6">
            <Button
              color="empty"
              text="add_partner_company"
              className="px-6 py-3 !w-fit"
              imageLeft={<IcPlusAdd />}
              onClick={() => navigator(privatePath.partner.create)}
            />
            <Button
              color="cancel"
              text={"delete"}
              className="px-6 py-3 !w-fit"
              imageLeft={<IcDelete />}
              onClick={handleShowDeleteBtn}
            />
          </div>
        </div>
        <table className="w-full requesRegister">
          <thead>
            <tr className="border-b border-b-gray-_A1A0A3 text-left">
              <th className='text-base font-semibold leading-150% text-black02 whitespace-nowrap px-2'>
                <input
                  className="w-4 h-4"
                  type="checkbox"
                  checked={isCheckAll()}
                  onClick={() => { handleCheckAll() }}
                />
              </th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('name_partner')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('address')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('tax_number')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('contact_person')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('partner_phone')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('email')}</th>
              <th className='pl-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap text-right'>{t('func')}</th>
            </tr>
          </thead>
          <tbody className="text-sm font-normal">
            {cache.data?.map((item, index) => {
              return (
                <tr key={index} className='border-b border-b-gray-_A1A0A3 text-sm font-normal text-black02 text-left' >
                  <td className='px-2 py-4'>
                    <input
                      className="w-4 h-4"
                      type="checkbox"
                      checked={isChecked(index)}
                      onClick={() => { handleCheckboxClick(index) }}
                    />
                  </td>
                  <td className="px-4">{item.namePartner}</td>
                  <td className="px-4 line-clamp-3">{item.address}</td>
                  <td className="px-4">{item.vat}</td>
                  <td className="px-4">{item.nameContact}</td>
                  <td className="px-4">{item.phone}</td>
                  <td className="px-4">{item.email} </td>
                  <td className="pl-4">
                    <div className="flex items-center justify-end gap-2 cursor-pointer">
                      <div onClick={() => navigator(privatePath.partner.view.replace(":id", item.id + ""))}>
                        <IcEye color={colors.gray01} />
                      </div>
                      <div onClick={() => navigator(`/quan-ly/doi-tac/${item.id}`)}>
                        <IcEdit color={colors.gray01} />
                      </div>
                      <div onClick={() => item.id && handleShowDeleteIcon(Number(item.id))}>
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
        <div className='mt-8 flex justify-end'>
          <Pagination
            currentPage={(cache.param?.page ? cache.param.page : 0) + 1}
            totalPages={cache.totalPages}
            disableEffect={true}
            setCurrentPage={setCurrentPage} />
        </div>
      )}
    </div>
  )
}

export default PartnerManagement 
