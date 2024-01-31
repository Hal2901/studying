import moment from "moment"
import { topicType } from "../types/topicType"

export const BASE_URL = '/services/'
//export const BASE_URL_IMAGE = 'http://192.168.1.89:8095/services/upload/api/image/'
export const BASE_URL_IMAGE = "https://lscns.vn/image/" // dinhnkp
export const IMAGE_URL = "https://lscns.vn/image/" // dinhnkp
export const URL_FILE_DOWNLOAD = "https://lscns.vn/services/upload/api/download-file/"
export const URL_FILE = "https://lscns.vn/file/"
export const REGEX_CHARACTER = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/
export const SizePage = 12

export const getUrlImage = (name: string)=> {
    return BASE_URL_IMAGE+name
}
export const getCurrentIdYt = (link: string)=> {
    const index = link.indexOf('=')
    return link.slice(index+1)
}
export const getIdYoutube = (link: string)=> {
    const id = link.slice(32)
    return `https://img.youtube.com/vi/${id}/hqdefault.jpg`
}
export const momentFormat = (data: string, format?: string) => {
    return moment(data).format(format || "DD/MM/YYYY")
}

export const formatCurrency = (money: string)=> {
    return  Number(money)
        .toLocaleString("vi", {
          style: "currency",
          currency: "VND",
        })
        .slice(0, -1)
}
export type Params = {
    type?: topicType,
    page?:number,
    size?: number,
    sort?: string,
    [key:string]: any
}