import { useTranslation } from "react-i18next"
import { typeBanner } from "../../../types/BannerType"

import TitleAdminPage from "../../../components/admin/TitleAdminPage"
import UploadFile from "./UploadFile"

const initialValues: typeBanner[] = [
  'E_CATALOG',
  'SCS_BROCHURE',
  'FULL_CATALOG',
  'DC_BROCHURE'
]

export default function BrochureAndCatalog() {
  const { t } = useTranslation()

  return (
    <div className="w-full flex flex-col gap-6 overflow-y-scroll hidden-scroll pb-6">
      <TitleAdminPage text={'brochure_catalog_admin_banner'} />

      {initialValues.map((value, index) => {
        return (
          <div className="flex flex-col gap-6" key={index}>
            <p className="flex items-center text-neutral-800 text-xl font-bold leading-normal gap-4"><span className="flex-shrink-0">{t(value)}</span> <span className="w-full border border-zinc-300"></span></p>
            <UploadFile type={value} />
          </div>
        )
      })}
    </div>
  )
}