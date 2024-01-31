import api from "../configs/api"
import { getPathOfService, apiPath, serviceApp } from "../utils/apiPath"


const pathImageUpload = getPathOfService(serviceApp.upload,apiPath.uploadImages, true)
const pathFileUpload = getPathOfService(serviceApp.upload,apiPath.uploadFile, true)
const pathVideoUpload = getPathOfService(serviceApp.upload,apiPath.uploadVideo, true)
export const uploadService = {
    uploadImages : async(data: any): Promise<resultImages[]>=> {
        return await api.post(pathImageUpload, data)
    },
    uploadFile : async(data: any): Promise<resultFile>=> {
        return await api.post(pathFileUpload, data)
    },
    uploadVideo : async(data: any): Promise<resultFile>=> {
        return await api.post(pathVideoUpload, data)
    },
}

export type resultImages = {
      linkMedia: string
}
export type resultFile = {
      linkMedia: string
}
