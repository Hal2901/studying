import { ChangeEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import * as Yup from 'Yup'
import clsx from "clsx"
import { useFormik } from "formik"
import { toast } from "react-toastify"
import { topicService } from "../../../../services/toppic/topicService"
import { initialTypeTopic } from "../../../../types/topicType"
import { uploadService } from "../../../../services/uploadService"
import { useHandleImage } from "../../../../hooks/useHandleImage"
import { getUrlImage } from "../../../../utils/constants"

import TitleAdminPage from "../../../../components/admin/TitleAdminPage"
import LabelInput from "../../../../components/LabelInput"
import InputUploadFile from "../../../../components/InputUploadFile"
import { InputElement } from "../../../../components/InputElement"
import ImagePreview from "../../../../components/ImagePreview"
import TextError from "../../../../components/TextError"
import { Button } from "../../../../components/Button"
import GroupButton from "../../../../components/admin/GroupButton"

interface Props {
  type: 'view' | 'add' | 'edit'
}

export default function EditEmployee({ type }: Props) {
  const { t } = useTranslation()
  const navigate = useNavigate()

  const { preViewImage, handleChange: handleChangeFile, handleDelete, handlePaste, file } = useHandleImage('')

  const formik = useFormik<initialTypeTopic>({
    initialValues: {
      id: null,
      link: '',
      title: '',
      description: ''
    },
    validationSchema: Yup.object({
      link: Yup.string().required('require.empty'),
      title: Yup.string().required('require.empty').max(255, 'max'),
      description: Yup.string().required('require.empty').max(255, 'max')
    }),
    onSubmit: async (value) => {
      try {
        if (file) {
          const formData = new FormData()
          formData.append('file', file)
          const linkImage = await uploadService.uploadImages(formData)
          value.link = linkImage[0].linkMedia
        } else {
          value.link = preViewImage.split('/').reverse()[0]
        }

        const uploaded = await topicService.uploadTopic(
          { type: 'EMPLOYEE' }, value)

        toast.success(
          value.id ? t('message.success.updated', { name: t('employee') }) : t('message.success.posted', { name: t('employee') })
        )

        navigate(-1)
      } catch (error) {
        value.id ? toast.error(t('message.error.updated', { name: t('employee') })) : toast.error(t('message.error.posted', { name: t('employee') }))
      }
    }
  })

  const { values, errors, touched, isSubmitting, setFieldValue, setValues, handleSubmit } = formik

  const getDetailsTopic = async (id: number) => {
    try {
      const data = await topicService.getDetailsTopic(id, {
        type: 'EMPLOYEE'
      })
      if (data) {
        setValues(data)
        if (data.link) {
          handlePaste(getUrlImage(data.link))
        }
      }
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('employees') }))
    }
  }

  const handleChangeKeyValue = (e: ChangeEvent<HTMLInputElement>, field: keyof typeof values) => {
    if (type === 'view') {
      return
    }
    setFieldValue(field, e.target.value)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  useEffect(() => {
    switch (type) {
      case 'view':
      case 'edit':
        const id = +window.location.pathname.split('/').reverse()[0]
        getDetailsTopic(id)
        break
    }
  }, [])

  useEffect(() => {
    if (file || preViewImage) {
      console.log(preViewImage)
      setFieldValue('link', preViewImage)
    } else {
      console.log('here')
      setFieldValue('link', '')
    }
  }, [preViewImage, file])

  return (
    <div className="w-full flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-6">
        <TitleAdminPage text={clsx(
          type === 'view' && `${values.title}`,
          type === 'add' && 'employee_admin_banner.add',
          type === 'edit' && 'employee_admin_banner.edit'
        )} />
        <div className="flex gap-6">
          {type !== 'view' && (
            <div>
              <LabelInput text='upload_img' subText='max_1_img' />
              <InputUploadFile onChange={handleChangeFile} imgSize={t('img_size', { size: '(200 *461)' })} />
              {errors.link && touched.link && (
                <TextError text={errors.link ?? ''} option={{ name: t('img') }} />
              )}
            </div>
          )}
          {preViewImage && (
            type !== 'view' ?
              (
                <div>
                  <LabelInput text='image_uploaded' />
                  <ImagePreview imagePreview={preViewImage ?? ''} onDelete={handleDelete} />
                </div>
              ) : (
                <div>
                  <LabelInput text='image_uploaded' />
                  <ImagePreview className="pointer-events-none" imagePreview={preViewImage ?? ''} onDelete={handleDelete} />
                </div>
              )
          )}
        </div>
        <div>
          <LabelInput text='employee_name' />
          <InputElement placeholder='input_employee_name' name='title' value={values.title} onChange={(e) => handleChangeKeyValue(e, 'title')} disabled={type === 'view'} />
          {errors.title && touched.title && (
            <TextError text={errors.title ?? ''} option={{ name: t('employee_name') }} />
          )}
        </div>
        <div>
          <LabelInput text='position' />
          <InputElement placeholder='input_position' name='description' value={values.description} onChange={(e) => handleChangeKeyValue(e, 'description')} disabled={type === 'view'} />
          {errors.description && touched.description && (
            <TextError text={errors.description ?? ''} option={{ name: t('position') }} />
          )}
        </div>
      </div>

      {type === 'view' ? (<div className="flex items-center gap-6 justify-end">
        <Button
          color="empty"
          text={"cancel_btn"}
          className="mr-24 pr-6 py-3 !w-fit "
          onClick={handleCancel}
        />
      </div>) : (
        <div>
          <GroupButton className="border-t-2 py-4 pr-24 border-zinc-300" onCancel={handleCancel} onSubmit={handleSubmit} disable={isSubmitting} />
        </div>
      )}

    </div>
  )
}