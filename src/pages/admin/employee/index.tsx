import { ChangeEvent, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { topicService } from "../../../services/toppic/topicService"
import { initialTypeTopic, topicsData } from "../../../types/topicType"
import { privatePath } from "../../../utils/routers"
import { ModalContext } from "../../../context"
import { ConfirmModal } from "../../../context/ConfirmModal"
import { useSearchParamHook } from "../../../hooks/useSearchParam"
import { Params } from "../../../utils/constants"
import colors from "../../../common/colors"
import { useLanguage } from "../../../hooks/useLanguage"

import TitleAdminPage from "../../../components/admin/TitleAdminPage"
import { Button } from "../../../components/Button"
import IcPlusAdd from "../../../assets/icons/IcPlusAdd"
import IcDelete from "../../../assets/icons/IcDelete"
import IcEdit from "../../../assets/icons/IcEdit"
import IcEye from "../../../assets/icons/IcEye"
import { InputElement } from "../../../components/InputElement"
import { Pagination } from "../../../components/Paginnation"

interface CheckboxState {
  [index: number]: boolean
}
interface Cache {
  triggerer: boolean
  param: Params
  data: initialTypeTopic[]
  keysearch: string
  checkbox: CheckboxState
  totalPages: number
}

export default function EmployeeMngt() {
  const { t } = useTranslation()
  const { isVN } = useLanguage()
  const navigate = useNavigate()
  const { searchParams } = useSearchParamHook()
  const { setModal } = useContext(ModalContext)

  const [cache] = useState<Cache>({
    triggerer: false, // Refresh FE
    param: {
      type: 'EMPLOYEE',
      page: 0,
      size: 10,
      sort: 'id,desc'
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

  const getData = async () => {
    cleanCheckbox()
    const setter = (result: topicsData) => {
      cache.data = result.data;
      setTriggerer()
    }

    try {
      let result: topicsData
      if (cache.keysearch.length === 0) {
        result = await topicService.getDetailsTopicStudy(cache.param)
      } else {
        result = await topicService.searchTopics(cache.keysearch, cache.param)
      }
      cache.totalPages = Math.ceil(result.total / 10)
      setter(result)
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('employees') }))
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

  const handleShowDeleteBtn = () => {
    if (Object.values(cache.checkbox).includes(true)) {
      setModal(
        <ConfirmModal onDelete={async () => {
          try {
            let ids: string = '0'
            Object.keys(cache.checkbox).map((key) => {
              ids = ids + ',' + cache.data[parseInt(key)]?.id;
            })
            await topicService.deleteTopics(ids);
            getData()
            toast.success(t('message.success.deleted', { name: t('employees') }));
          } catch (error) {
            toast.error(t('message.error.deleted', { name: t('employees') }))
          }
        }} message='message_comfirm.employees' />
      )
    }
  }

  const handleShowDeleteIcon = (id: number) => {
    setModal(
      <ConfirmModal onDelete={async () => {
        try {
          await topicService.deleteTopic(id)
          toast.success(t('message.success.deleted', { name: t('employee') }))
          getData()
        } catch (error) {
          toast.error(t('message.error.deleted', { name: t('employee') }))
        }
      }} message='message_comfirm.employee' />
    )
  }

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
        <TitleAdminPage text={'employee_admin_banner.list'} />
        <div className='grid grid-auto-fit-420 gap-6 my-8'>
          <div>
            <InputElement
              placeholder='input_key_search'
              name='name'
              value={cache.keysearch}
              reSearch={true}
              onChange={handleSearch}
            />
          </div>
          <div className='flex items-center justify-end gap-6'>
            <Button
              color='empty'
              disabled={!isVN}
              text='add_employee'
              className='px-6 py-3 !w-fit'
              imageLeft={<IcPlusAdd />}
              onClick={() => navigate(privatePath.employee.create)}
            />
            <Button
              color='cancel'
              text={'delete'}
              className='px-6 py-3 !w-fit'
              imageLeft={<IcDelete />}
              onClick={handleShowDeleteBtn}
            />
          </div>
        </div>
        <table className='w-full requesRegister'>
          <thead>
            <tr className='border-b border-b-gray-_A1A0A3 text-left'>
              <th className='text-base font-semibold leading-150% text-black02 whitespace-nowrap px-2'>
                <input className='w-4 h-4' type='checkbox' checked={isCheckAll()} onClick={() => { handleCheckAll() }} />
              </th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('employee_name')}</th>
              <th className='px-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap'>{t('position')}</th>
              <th className='pl-4 pb-2 text-base font-semibold leading-150% text-black02 whitespace-nowrap text-right'>{t('func')}</th>
            </tr>
          </thead>
          <tbody className='text-sm font-normal'>
            {cache.data?.map((employee, index) => {
              return (
                <tr key={index} className='border-b border-b-gray-_A1A0A3 text-sm font-normal text-black02 text-left'>
                  <td className='px-2 py-4'>
                    <input
                      className='w-4 h-4'
                      type="checkbox"
                      checked={isChecked(index)}
                      onClick={() => { handleCheckboxClick(index) }}
                    />
                  </td>
                  <td className="px-4">{employee.title}</td>
                  <td className="px-4">{employee.description}</td>
                  <td className="pl-4">
                    <div className='flex items-center justify-end gap-2 cursor-pointer'>
                      <div onClick={() => navigate(privatePath.employee.view.replace(':id', employee.id + ''))}>
                        <IcEye color={colors.gray01} />
                      </div>
                      <div onClick={() => navigate(privatePath.employee.edit.replace(':id', employee.id + ''))}>
                        <IcEdit color={colors.gray01} />
                      </div>
                      <div onClick={() => employee.id && handleShowDeleteIcon(Number(employee.id))}>
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