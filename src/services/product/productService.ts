import api from "../../configs/api";
import { PrdRes, listProductVarianRes, productFilter, productTypeRoot } from "../../types/productType";
import { apiPath, getPathOfService, serviceApp } from "../../utils/apiPath";
import { Params } from "../../utils/constants";
import queryString from 'query-string';
const  urlUpload = getPathOfService(serviceApp.core,apiPath.products, true)
const   urlGet= getPathOfService(serviceApp.core,apiPath.products)
export const productService = {
    createProduct: async(data: productTypeRoot) :Promise<productTypeRoot> => {
        return await api.post(urlUpload, data)
    },
    updateProduct: async(data: productTypeRoot) :Promise<productTypeRoot> => {
        return await api.put(urlUpload, data)
    },
    updateStatusProduct: async(id: number): Promise<any>=> {
        return await api.patch(`${urlUpload}/status/${id}`)
    },
    deleteProduct: async(id:number) :Promise<any> => {
        return await api.delete(`${urlUpload}/${id}`)
    },
    deleteProductItem: async(id:number, type: 'image' | 'variant'|'spec'| 'spec-detail'| 'support' |'key') :Promise<any>=> {
        return await api.delete(`${urlUpload}/${type}/${id}`)
    },
    getProducts: async(params: Params): Promise<PrdRes> => {
        return await api.get(urlGet, {params})
    },
    getProductsByChildCategory: async(params: Params): Promise<PrdRes> => {
        return await api.get(urlGet, {params})
    },
    getProductByVariant : async(params: Params, data: any[] = []): Promise<listProductVarianRes>=> {
        const parserString = queryString.stringify(params)
        return await api.post(`${urlGet}/select-variant?${parserString}`, data)
    },
    getProductStatus : async(params: Params): Promise<PrdRes>=> {
        return await api.get(`${urlGet}/select-status`, {params})
    },
    getProductSelectDistributor : async(params: any): Promise<any>=> {
        return await api.get(`${urlGet}/select-city-distributor`, {params})
    },
    getProductSelectByIdPartner : async(params: any): Promise<any>=> {
        return await api.get(`${urlGet}/select-partner`,{params})
    },
    getFilterByProductId : async(params:Params): Promise<{total: number, data: productFilter[]}>=> {
        return await api.get(`${urlGet}/select-filter`, {params})
    },
 
    getDetailProduct: async(id:number): Promise<productTypeRoot> => {
        return await api.get(`${urlGet}/${id}`)
    },
    searchProducts: async(keySearch: string, params: Params): Promise<PrdRes> => {
        return await api.get(`${urlGet}/search/${keySearch}`, {params})
    }
}