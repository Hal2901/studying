import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import * as Yup from 'Yup'
import { useFormik } from "formik"
import { toast } from "react-toastify"
import { topicService } from "../../../services/toppic/topicService"
import { initialTypeTopic } from "../../../types/topicType"
import { useLanguage } from "../../../hooks/useLanguage"

import TitleAdminPage from "../../../components/admin/TitleAdminPage"
import LabelInput from "../../../components/LabelInput"
import { InputElement } from "../../../components/InputElement"
import QuillEditor from "../../../components/QuillEditor"
import TextError from "../../../components/TextError"
import GroupButton from "../../../components/admin/GroupButton"

export default function SportMngt() {
  const { t } = useTranslation()
  const { isVN } = useLanguage()
  const navigate = useNavigate()

  const formik = useFormik<initialTypeTopic>({
    initialValues: {
      id: null,
      title: '',
      content: ''
    },
    validationSchema: Yup.object({
      title: Yup.string().required('require.empty').max(255, 'max'),
      content: Yup.string().required('require.empty')
    }),
    onSubmit: async (value) => {
      try {
        const uploaded = await topicService.uploadTopic({
          type: 'SPORT_TOURNAMENT'
        }, value)
        console.log(uploaded)

        toast.success(
          value.id ? t('message.success.updated', { name: t('sport_event') }) : t('message.success.posted', { name: t('sport_event') })
        )
      } catch (error) {
        toast.error(
          value.id ? t('message.error.updated', { name: t('sport_event') }) : t('message.error.posted', { name: t('sport_event') })
        )
      }
    }
  })

  const { values, errors, touched, isSubmitting, handleChange, setFieldValue, setValues, handleSubmit } = formik

  const handleCancel = () => {
    navigate(-1)
  }

  const getDetailsTopic = async () => {
    try {
      const { data } = await topicService.getDetailsTopicStudy({
        type: 'SPORT_TOURNAMENT'
      })

      if (data.length) {
        setValues(data[0])
      }
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('sport_event') }))
    }
  }

  useEffect(() => {
    getDetailsTopic()
  }, [])

  return (
    <div className="w-full flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-6">
        <TitleAdminPage text={'navBar.sport_tournamenet_mn'} />
        <div>
          <LabelInput text='title' />
          <InputElement placeholder='input_title' name='title' value={values.title} onChange={handleChange} />
          {errors.title && touched.title && (
            <TextError text={errors.title} option={{ name: t('title') }} />
          )}
        </div>
        <div>
          <LabelInput text='content' />
          <QuillEditor
            data={values.content ?? ''}
            onChange={(data) => {
              setFieldValue('content', data)
            }}
          />
          {errors.content && touched.content && (
            <TextError text={errors.content} option={{ name: t('content') }} />
          )}
        </div>
      </div>

      <div>
        <GroupButton
          className="border-t-2 py-4 pr-24 border-zinc-300"
          onCancel={handleCancel}
          onSubmit={handleSubmit}
          disable={isSubmitting || !isVN} />
      </div>
    </div>
  )
}