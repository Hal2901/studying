import api from "../../configs/api";
import { CategorySolution, categoriesData } from "../../types/categoriesType";
import { apiPath, getPathOfService, serviceApp } from "../../utils/apiPath";
import { Params } from "../../utils/constants";


const  urlUpload = getPathOfService(serviceApp.core,apiPath.solution_categories, true)
const   urlget= getPathOfService(serviceApp.core,apiPath.solution_categories)

export const solutionCategoriesService ={
    postOrUpdateCategory: async(data: CategorySolution): Promise<CategorySolution> => {
      return await api.post(urlUpload, data)
    },
    getListCategories: async (params?: Params): Promise<categoriesData>=> {
        return await api.get(urlget,{params})
    },
    getDetailsPr: async (id: Number): Promise<categoriesData>=> {
        return await api.get(`${urlget}/${id}`)
    },
    deleteCategory : async(id:number): Promise<any>=> {
        return await api.delete(`${urlUpload}/${id}`)
    },
    getDetailsCategory: async(id:number): Promise<CategorySolution>=> {
        return await api.get(`${urlget}/${id}`) 
    }
}