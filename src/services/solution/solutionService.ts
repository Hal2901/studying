import api from "../../configs/api";
import { solutionType, solutionsData } from "../../types/solutionType";
import { apiPath, getPathOfService, serviceApp } from "../../utils/apiPath";
import { Params } from "../../utils/constants";
const  urlAdmin = getPathOfService(serviceApp.core,apiPath.solutions, true)
const  urlget= getPathOfService(serviceApp.core,apiPath.solutions)

export const solutionService = {
    uploadSolution: async (data: solutionType): Promise<solutionType> => {
        return await api.post(urlAdmin, data)
    },
    getDetailsSolution : async(id: number): Promise<solutionType>=> {
        return api.get(`${urlget}/${id}`)
    },
    getListSolutions: async(params: Params): Promise<solutionsData>=> {
        return await api.get(urlget, {params})
    },
    getListSolutionsOther: async(params: Params, listId:{idCate: number,idSolution: number}): Promise<solutionsData>=> {
        return await api.get(`${urlget}/other/${listId.idCate}/${listId.idSolution}`, {params})
    },
    deleteSolution: async(id: number):Promise<any>=> {
        return await api.delete(`${urlAdmin}/${id}`)
    },
    searchSolution: async(keySearch: string, params: Params): Promise<solutionsData>=> {
        return await api.get(`${urlAdmin}/search/${keySearch}`, {params})
    }
}