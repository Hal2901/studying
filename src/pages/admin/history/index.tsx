import { ChangeEvent, useContext, useEffect } from "react"
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
import { ModalContext } from "../../../context"

import TitleAdminPage from "../../../components/admin/TitleAdminPage"
import LabelInput from "../../../components/LabelInput"
import InputUploadFile from "../../../components/InputUploadFile"
import { InputElement } from "../../../components/InputElement"
import ImagePreview from "../../../components/ImagePreview"
import TextError from "../../../components/TextError"
import GroupButton from "../../../components/admin/GroupButton"
import { Button } from "../../../components/Button"
import IcPlusAdd from "../../../assets/icons/IcPlusAdd"
import IcDelete from "../../../assets/icons/IcDelete"
import { ConfirmModal } from "../../../context/ConfirmModal"

const param = {
  page: 0,
  size: 10,
  sort: 'id,asc'
}

export default function HistoryMngt() {
  const { t } = useTranslation()
  const navigate = useNavigate()
  const { setModal } = useContext(ModalContext)

  const { plainFiles, setPlainFiles, setPreViewImage, setCurrentFile } = useHandleImage('', [])

  // handle images
  const handleRemoveByIndex = (index: number) => {
    setPlainFiles((previousPlainFiles) => [
      ...previousPlainFiles.slice(0, index),
      { id: index, link: '', file: undefined }, // Placeholder for deleted image
      ...previousPlainFiles.slice(index + 1),
    ]);

    setFieldValue(`[${index}].link`, '');
  };

  const hanldeChangeFile = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    const file = e.target.files![0];
    setCurrentFile(file)
    const link = URL.createObjectURL(file)
    setPreViewImage(link)

    const newPlainFiles = [...plainFiles]
    newPlainFiles[index] = { id: 'id', link: link, file: file }
    setPlainFiles(newPlainFiles)
  }

  const formik = useFormik<initialTypeTopic[]>({
    initialValues: [
      {
        id: null,
        link: '',
        title: '',
        description: '',
        content: ''
      },
    ],
    validationSchema: Yup.array().of(
      Yup.object({
        link: Yup.string().required('require.empty'),
        title: Yup.string().required('require.empty').max(255, 'max'),
        description: Yup.string().required('require.empty'),
        content: Yup.string().required('require.empty')
      })
    )
    ,
    onSubmit: async (value) => {
      try {
        if (plainFiles.length > 0) {
          await Promise.all(plainFiles.map(async (file, index) => {
            try {
              if (file.file) {
                const formData = new FormData()
                formData.append('file', file.file)
                const linkImages = await uploadService.uploadImages(formData)
                value[index].link = linkImages[0].linkMedia
              } else {
                value[index].link = file.link?.split('/').reverse()[0]
              }
            } catch (error) {
              toast.error(t('message.error.posted_image'))
            }
          }))

          const uploaded = await topicService.uploadTopicHistory(
            { type: 'HISTORY' }, value)
          console.log(uploaded)

          toast.success(
            value[0].id ? t('message.success.updated', { name: t('company_history') }) : t('message.success.posted', { name: t('company_history') })
          )
        }
      } catch (error) {
        toast.error(
          value[0].id ? t('message.error.updated', { name: t('company_history') }) : t('message.error.posted', { name: t('company_history') })
        )
      }
    }
  })

  const { values, errors, touched, isSubmitting, setFieldValue, setValues, handleSubmit } = formik

  // handle milestone
  const handleChangeMilestoneValue = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    index: number,
    param: 'title' | 'description' | 'content'
  ) => {
    const newMilestone = [...values]
    newMilestone[index][`${param}`] = e.target.value
    setValues(newMilestone)
  }

  const handleAddMilestone = () => {
    setValues([
      ...values,
      {
        id: null,
        link: '',
        title: '',
        description: '',
        content: ''
      },
    ])

    setPlainFiles([...plainFiles, { id: 'id', link: '', file: undefined }])
  }

  const handleDeleteMilestone = (
    id: number | null | undefined,
    index: number
  ) => {
    const deleteMilestone = async () => {
      try {
        if (id) {
          await topicService.deleteTopic(id)
          toast.success(t('message.success.deleted', { name: t('company_history') }))
        }
        const newMilestone = [...values]
        newMilestone.splice(index, 1)
        setValues(newMilestone)
        setPlainFiles((previousPlainFiles) => [
          ...previousPlainFiles.slice(0, index),
          ...previousPlainFiles.slice(index + 1),
        ]);
      } catch (error) {
        toast.error(t('message.error.deleted', { name: t('company_history') }))
      }
    }

    setModal(
      <ConfirmModal
        onDelete={() => deleteMilestone()}
        message="message_comfirm.milestone"
      />
    );
  }

  const handleCancel = () => {
    navigate(-1)
  }

  const getDetailsTopic = async () => {
    try {
      const { data } = await topicService.getDetailsTopicStudy({
        ...param,
        type: 'HISTORY'
      })
      setValues(data)
      const newPlainFiles = data.map(milestone => ({ link: getUrlImage(milestone.link!) }))
      setPlainFiles(newPlainFiles)
    } catch (error) {
      toast.error(t('message.error.fetched', { name: t('company_history') }))
    }
  }

  useEffect(() => {
    getDetailsTopic()
  }, [])

  useEffect(() => {
    values.map((_, index) => {
      if (plainFiles[index]) {
        const file = plainFiles[index]
        if (file.link) {
          setFieldValue(`[${index}].link`, file.link)
        } else {
          setFieldValue(`[${index}].link`, '')
        }
      }
    })
  }, [plainFiles])

  return (
    <div className="w-full flex flex-col justify-between gap-6">
      <div className="flex flex-col gap-6">
        <TitleAdminPage text={'history_admin_banner'} />

        <div className="flex flex-col gap-6">
          {values.map((milestone, index) => {
            return (
              <div className="flex flex-col pt-6 gap-6  border-t-2 border-zinc-300 first:border-none" key={index}>
                <div className="flex items-center gap-6">

                  <p className="text-lg font-medium text-defaultText">{t('milestone') + ` ${index + 1}`}</p>
                  <div className="w-fit ">
                    <Button
                      color="cancel"
                      text={"delete"}
                      className="px-6 py-3 !w-fit"
                      imageLeft={<IcDelete />}
                      onClick={() => handleDeleteMilestone(milestone.id, index)}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center gap-6">
                    <div className="flex flex-wrap items-center gap-6 w-full">
                      <div>
                        <LabelInput text='upload_img' subText='max_1_img' />
                        <InputUploadFile onChange={(e) => hanldeChangeFile(e, index)} imgSize={t('img_size', { size: '(424 * 272)' })} />
                      </div>
                      {plainFiles.length > 0 && plainFiles[index]?.link && (
                        <div>
                          <LabelInput text="image_uploaded" />
                          <ImagePreview
                            imagePreview={plainFiles[index]?.link ?? ""}
                            onDelete={() => handleRemoveByIndex(index)}
                          />
                        </div>
                      )}
                    </div>
                  </div>

                  {errors[index]?.link && touched[index]?.link && (
                    <TextError text={errors[index]?.link ?? ''} option={{ name: t('img') }} />
                  )}
                </div>

                <div>
                  <LabelInput text='formation_year' />
                  <InputElement placeholder='input_formation_year' name='description' value={milestone.description} onChange={(e) => handleChangeMilestoneValue(e, index, 'description')} />
                  {errors[index]?.description && touched[index]?.description && (
                    <TextError text={errors[index]?.description ?? ''} option={{ name: t('formation_year') }} />
                  )}
                </div>

                <div>
                  <LabelInput text='title' />
                  <InputElement placeholder='input_title' name='title' value={milestone.title} onChange={(e) => handleChangeMilestoneValue(e, index, 'title')} />
                  {errors[index]?.title && touched[index]?.title && (
                    <TextError text={errors[index]?.title ?? ''} option={{ name: t('title'), length: '255' }} />
                  )}
                </div>

                <div>
                  <LabelInput text='description' />
                  <InputElement isTextarea={true} placeholder='input_description' name='content' value={milestone.content} onChange={(e) => handleChangeMilestoneValue(e, index, 'content')} />
                  {errors[index]?.content && touched[index]?.content && (
                    <TextError text={errors[index]?.content ?? ''} option={{ name: t('description') }} />
                  )}
                </div>
              </div>
            )
          })}
        </div>

        <div>
          <Button
            color="empty"
            text="add_history"
            className="px-4 py-3 !w-fit mt-8"
            imageLeft={<IcPlusAdd />}
            onClick={handleAddMilestone}
          />
        </div>
      </div>

      <div>
        <GroupButton className="border-t-2 py-4 pr-24 border-zinc-300" onCancel={handleCancel} onSubmit={handleSubmit} disable={isSubmitting} />
      </div>
    </div>
  )
}