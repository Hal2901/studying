import { ChangeEvent, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { ModalContext } from "../../../context";
import clsx from "clsx";
import { partnerService } from "../../../services/partnerService";
import { useSearchParamHook } from "../../../hooks/useSearchParam";
import { Params } from "../../../utils/constants";

import IcDelete from "../../../assets/icons/IcDelete";
import TitleAdminPage from "../../../components/admin/TitleAdminPage";
import { InputElement } from "../../../components/InputElement";
import { Button } from "../../../components/Button";
import IcSort from "../../../assets/icons/IcSort";
import { Pagination } from "../../../components/Paginnation";
import { PartnerType, PartnerTypeRes } from "../../../types/PartnerType";
import { ConfirmModal } from "../../../context/ConfirmModal";
import ShowPartnerRequest from "./components/ShowPartnerRequest";

interface CheckboxState {
  [index: number]: boolean
}
interface Cache {
  triggerer: boolean
  param: Params
  data: PartnerType[]
  keysearch: string
  checkbox: CheckboxState
  totalPages: number
}

const RequestPartnerManagement = () => {
  const { t } = useTranslation()
  const titlePage = "request_advisory_to_become_partner_list"
  const { searchParams } = useSearchParamHook()
  const { setModal } = useContext(ModalContext)

  const [cache] = useState<Cache>({
    triggerer: false, // Refresh FE
    param: {
      page: 0,
      size: 10,
      sort: "createdDate,desc"
    },
    data: [],
    keysearch: '',
    checkbox: {},
    totalPages: 100
  });

  const [triggerer, setInner] = useState<boolean>(cache.triggerer); // Refresh handler 1
  const setTriggerer = () => { // exit trigger
    cache.triggerer = !cache.triggerer;
    setInner(cache.triggerer);
  }

  // Api handler (tu dong cap nhat giao dien khi goi api)
  const getData = async () => {
    cleanCheckbox();
    const setter = (result: PartnerTypeRes) => {
      cache.data = result.data;
      setTriggerer()
    }

    try {
      let result: PartnerTypeRes
      if (cache.keysearch.length === 0) {
        result = await partnerService.getPartners(cache.param)
      } else {
        result = await partnerService.searchPartners(cache.keysearch, cache.param)
      }
      cache.totalPages = Math.ceil(result.total / 10)
      setter(result)
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('partner_request') }))
      cache.data = []
      setTriggerer()
    }
  }

  const setCurrentPage = (page: number) => {
    cache.param.page = page - 1
    getData()
  }

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
  // Popup request partner 
  const handleShowRequestPartner = (data: PartnerType, type: "view" | "add" | "edit") => {
    setModal(<ShowPartnerRequest data={data} type={type} refresh={getData} />);
  };
  // Handle delete btn
  const handleShowDelete = () => {
    if (Object.values(cache.checkbox).includes(true)) {
      setModal(
        <ConfirmModal onDelete={async () => {
          try {
            let ids: string = "0"
            Object.keys(cache.checkbox).map((key) => {
              ids = ids + "," + cache.data[parseInt(key)].id;
            })
            await partnerService.deletePartners(ids)
            toast.success(t('message.success.deleted', { name: t('partner_request') }))
            getData();
          } catch (error) {
            toast.error(t('message.error.deleted', { name: t('partner_request') }))
          }
        }} message="message_comfirm.partner" />
      );
    }
  }
  // Handler filter
  const handleFilter = (order: "asc" | "desc") => {
    const format = `createdDate,${order}`;
    if (cache.param.sort === format) {
      return;
    }
    cache.param.sort = format
    cache.param.page = 0;
    getData();
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
        <TitleAdminPage text={titlePage} />
        <div className="grid grid-auto-fit-420 my-8 gap-6">
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
              color="cancel"
              text={"delete"}
              className="px-6 py-3 !w-fit"
              imageLeft={<IcDelete />}
              onClick={handleShowDelete}
            />
            <Button
              color="empty"
              text="latest"
              className="px-6 py-3 !w-fit"
              imageLeft={<IcSort />}
              onClick={() => handleFilter("desc")}
            />
            <Button
              color="empty"
              text="oldest"
              className="px-6 py-3 !w-fit"
              imageLeft={
                <span className="rotate-180">
                  <IcSort />
                </span>
              }
              onClick={() => handleFilter("asc")}
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
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('full_name')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('phone_number')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('email')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('company_name')}</th>
              <th className='pl-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap text-right'>{t('status')}</th>
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
                  <td className="cursor-pointer px-4" onClick={() => handleShowRequestPartner(item, "view")}>{item?.person?.namePerson}</td>
                  <td className="px-4">{item?.person?.phone}</td>
                  <td className="px-4">{item?.person?.email} </td>
                  <td className="px-4">{item?.company?.nameCompany}</td>
                  <td className="pl-4">
                    <div className="flex items-center justify-end gap-1 cursor-pointer" onClick={() => handleShowRequestPartner(item, "edit")}>
                      <div className={clsx("rounded-full w-3 h-3 flex-shrink-0", item.feedback ? "bg-green-400" : "bg-danger")}>
                      </div>
                      <span className={clsx('flex-shrink-0', item.feedback ? "text-green-400" : "text-danger")}>
                        {item.feedback ? t("responded") : t("not_responded")}</span>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {cache.totalPages > 1 && (
        <div className="mt-8 flex justify-end ">
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

export default RequestPartnerManagement