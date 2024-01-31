import { ChangeEvent, memo, useEffect, useState } from "react"
import { useTranslation } from "react-i18next"
import { toast } from "react-toastify"
import { uploadService } from "../../../services/uploadService"
import { bannerService } from "../../../services/bannerService"
import { BannerData, typeBanner } from "../../../types/BannerType"

import IcUploadImgThin from "../../../assets/icons/IcUploadImgThin"
import IcDelete from "../../../assets/icons/IcDelete"
import LabelInput from "../../../components/LabelInput"

const params = {
  id: 0,
  type: '',
  link: ''
}

interface Props {
  type: typeBanner
}

const UploadFile = memo(({ type }: Props) => {
  const { t } = useTranslation()
  const [data, setData] = useState<BannerData>()

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>, type: string) => {
    try {
      const file = e.target.files![0]
      if (file) {
        const formData = new FormData()
        formData.append('file', file)
        const linkFile = await uploadService.uploadFile(formData)

        await bannerService.uploadBanner(type, { ...params, type: type, link: linkFile.linkMedia })
        e.target.value = ''

        await getDetailCatalog()
        toast.success(t('message.success.posted', { name: t('brochure & catalog') }))
      }
    } catch (error) {
      toast.error(t('message.error.posted', { name: t('brochure & catalog') }))
    }
  }

  const getDetailCatalog = async () => {
    try {
      const data = await bannerService.getBannerByType(type)

      setData(data[0] || { id: 0, type: type, link: '' })

    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('brochure & catalog') }))
    }
  }

  const handleDeleteFile = async (id: number) => {
    try {
      await bannerService.deleteBanner(id)
      await getDetailCatalog()

      toast.success(t('message.success.deleted', { name: t('brochure & catalog') }))
    } catch (error) {
      toast.error(t('message.error.deleted', { name: t('brochure & catalog') }))
    }

  }

  useEffect(() => {
    getDetailCatalog()
  }, [])

  return (
    <div className="grid grid-auto-fit-200 items-end gap-6">
      <div>
        <p className="mb-1 font-medium"> {t("upload_file_type")}</p>
        <label className="flex h-[110px] border-[2px] border-dashed flex-col items-center justify-center rounded-10 cursor-pointer">
          <div className="w-11 h-11 rounded-1/2 bg-border flex items-center justify-center mb-3">
            <IcUploadImgThin />
          </div>
          <p className="text-active">{t("click_to_upload")}</p>
          <input
            type="file"
            accept=".xlsx,.xls, image/png, image/jpeg, .doc, .docx, .pdf"
            hidden
            onChange={(e) => handleChangeFile(e, type)}
          />
        </label>
      </div>

      {data?.link && (
        <div>
          <LabelInput text="file_uploaded" isRequire={false} />
          <div className="flex justify-between items-center h-[110px] gap-6 bg-whiteFAFAFA rounded-10 border px-4 py-4 ">
            {data.link ? (
              <>
                <div className="flex items-center overflow-hidden gap-4 ">
                  <div className="flex-shrink-0">
                    <IcUploadImgThin />
                  </div>
                  {data.link}
                </div>
                <div onClick={() => handleDeleteFile(data.id)} className="z-50 cursor-pointer">
                  <IcDelete />
                </div>
              </>
            ) : (
              t("no_file")
            )}
          </div>
        </div>
      )}

    </div>
  )
})

export default UploadFile