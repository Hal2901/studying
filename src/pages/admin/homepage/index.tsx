import { ChangeEvent, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useTranslation } from "react-i18next"
import * as Yup from 'Yup'
import { useFormik } from "formik"
import { toast } from "react-toastify"
import { topicService } from "../../../services/toppic/topicService"
import { initialTypeTopic } from "../../../types/topicType"
import { uploadService } from "../../../services/uploadService"
import { useHandleImage } from "../../../hooks/useHandleImage"
import { getUrlImage } from "../../../utils/constants"

import TitleAdminPage from "../../../components/admin/TitleAdminPage"
import LabelInput from "../../../components/LabelInput"
import InputUploadFile from "../../../components/InputUploadFile"
import { InputElement } from "../../../components/InputElement"
import ImagePreview from "../../../components/ImagePreview"
import TextError from "../../../components/TextError"
import GroupButton from "../../../components/admin/GroupButton"

export default function HomepageMngt() {

  const { t } = useTranslation()
  const navigate = useNavigate()

  const { handleChange: handleChangeFile, handleRemoveByIndex, plainFiles, setPlainFiles } = useHandleImage("", [])

  const formik = useFormik<initialTypeTopic>({
    initialValues: {
      id: null,
      link: '',
      title: '',
      videoLink1: '',
      videoLink2: '',
      file: '',
      content: '',
    },
    validationSchema: Yup.object({
      link: Yup.string().required('require.empty'),
      file: Yup.string().required('require.empty'),
      title: Yup.string().required('require.empty').max(255, 'max'),
      videoLink1: Yup.string().required('require.empty'),
      videoLink2: Yup.string().required('require.empty'),
      content: Yup.string().required('require.empty')
    }),
    onSubmit: async (value) => {
      try {
        if (plainFiles[0] && plainFiles[0].file) {
          const formData = new FormData()
          formData.append('file', plainFiles[0].file)
          const linkImages = await uploadService.uploadImages(formData)
          value.link = linkImages[0].linkMedia
        } else {
          value.link = plainFiles[0].link?.split('/').reverse()[0]
        }

        if (plainFiles[1] && plainFiles[1].file) {
          const formData = new FormData()
          formData.append('file', plainFiles[1].file)
          const linkImages = await uploadService.uploadImages(formData)
          value.file = linkImages[0].linkMedia
        } else if (plainFiles[1] && plainFiles[1].link) {
          value.file = plainFiles[1].link?.split('/').reverse()[0]
        }

        const uploaded = await topicService.uploadTopic(
          { type: 'INTRODUCE' }, value)
        console.log(uploaded)

        await getDetailsTopic()

        toast.success(
          value.id ? t('message.success.updated', { name: t('home_intro') }) : t('message.success.posted', { name: t('home_intro') })
        )
      } catch (error) {
        toast.error(
          value.id ? t('message.error.updated', { name: t('home_intro') }) : t('message.error.posted', { name: t('home_intro') })
        )
      }
    },
  })

  const { values, errors, touched, isSubmitting, handleChange, setValues, setFieldValue, handleSubmit } = formik

  const handleChangeImg = (e: ChangeEvent<HTMLInputElement>) => {
    if (plainFiles.length >= 2) {
      return
    }
    handleChangeFile(e)
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const getDetailsTopic = async () => {
    try {
      const { data } = await topicService.getDetailsTopicStudy({
        type: 'INTRODUCE'
      })
      if (data[0]) {
        setValues(data[0])
        const newPlainFiles = [{ link: getUrlImage(data[0].link || '') }]
        if (data[0].file) {
          newPlainFiles.push({ link: getUrlImage(data[0].file) })
        }
        setPlainFiles(newPlainFiles)
      }
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('home_intro') }))
    }
  }

  useEffect(() => {
    getDetailsTopic()
  }, [])

  useEffect(() => {
    if (plainFiles[0] && plainFiles[0].link) {
      setFieldValue("link", plainFiles[0].link);
    } else {
      setFieldValue('link', '')
    }

    if (plainFiles[1] && plainFiles[1].link) {
      setFieldValue('file', plainFiles[1].link)
    } else {
      setFieldValue('file', '')
    }
  }, [plainFiles]);


  return (
    <div className="w-full flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-6">
        <TitleAdminPage text={'homepage_introduction_admin_banner'} />
        <div >
          <div className="flex flex-wrap w-full gap-6" >
            <div>
              <LabelInput text='upload_img' subText='max_2_img' />
              <InputUploadFile
                onChange={(e) => handleChangeImg(e)}
                imgSize={t('img_size', { size: '(288*429) & (288*288)' })}
              />
            </div>
            {plainFiles.length > 0 && plainFiles[0]?.link && (
              <div>
                <LabelInput text='image_uploaded' isRequire={false} />
                <ImagePreview imagePreview={plainFiles[0].link ?? ''}
                  onDelete={() => handleRemoveByIndex(0)} />
              </div>
            )}
            {plainFiles[1] && plainFiles[1]?.link && (
              <div>
                <LabelInput text='image_uploaded' isRequire={false} />
                <ImagePreview imagePreview={plainFiles[1].link ?? ''}
                  onDelete={() => handleRemoveByIndex(1)} />
              </div>
            )}
          </div>
          {errors.file && touched.file && (
            <TextError text={errors.file} option={{ name: t('img') }} />
          )}
        </div>
        <div>
          <LabelInput text='title' />
          <InputElement placeholder='input_title' name='title' value={values.title} onChange={handleChange} />
          {errors.title && touched.title && (
            <TextError text={errors.title} option={{ name: t('title') }} />
          )}
        </div>
        <div>
          <LabelInput text='content' />
          <InputElement isTextarea={true} placeholder='input_content' name='content' value={values.content} onChange={handleChange} />
          {errors.content && touched.content && (
            <TextError text={errors.content} option={{ name: t('content') }} />
          )}
        </div>
        <div>
          <LabelInput text='video_link_1' />
          <InputElement placeholder='input_link' name='videoLink1' value={values.videoLink1} onChange={handleChange} />
          {errors.videoLink1 && touched.videoLink1 && (
            <TextError text={errors.videoLink1 ?? ''} option={{ name: t('link') }} />
          )}
        </div>
        <div>
          <LabelInput text='video_link_2' />
          <InputElement placeholder='input_link' name='videoLink2' value={values.videoLink2} onChange={handleChange} />
          {errors.videoLink2 && touched.videoLink2 && (
            <TextError text={errors.videoLink2 ?? ''} option={{ name: t('link') }} />
          )}
        </div>
      </div>

      <div>
        <GroupButton className="border-t-2 py-4 pr-24 border-zinc-300" onCancel={handleCancel} onSubmit={handleSubmit} disable={isSubmitting} />
      </div>
    </div>
  )
}