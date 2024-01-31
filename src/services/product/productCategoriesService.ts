import api from "../../configs/api"
import { CategorySolution, PrCategoryRes, categoriesData } from "../../types/categoriesType"
import { apiPath, getPathOfService, serviceApp } from "../../utils/apiPath"
import { Params } from "../../utils/constants"



const  urlUpload = getPathOfService(serviceApp.core,apiPath.product_categories, true)
const   urlGet= getPathOfService(serviceApp.core,apiPath.product_categories)


export const productCategoriesService = {
    uploadCategories: async(data: CategorySolution): Promise<CategorySolution> => {
        return await api.post(urlUpload, data)
    },
    getListCategories: async (params?: Params): Promise<categoriesData>=> {
        return await api.get(urlGet,{params})
    },
    getListProductOfCategory: async (): Promise<PrCategoryRes>=> {
        return await api.get(`${urlGet}/select`)
    },
    getDetailsCategories: async (id: number): Promise<CategorySolution>=> {
        return await api.get(`${urlGet}/${id}`)
    },
    deleteCategory : async(id:number): Promise<any>=> {
        return await api.delete(`${urlUpload}/${id}`)
    },
}