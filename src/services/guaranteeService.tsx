import api from "../configs/api";
import { WarrantyType, WarrantyTypeRes } from "../types/WarrantyType";
import { apiPath, getPathOfService, serviceApp } from "../utils/apiPath";

import { Params } from "../utils/constants";
const urlAdmin = getPathOfService(serviceApp.core, apiPath.guarantee, true);
const urlget = getPathOfService(serviceApp.core, apiPath.guarantee);

export const guaranteeService = {
  addGuarantee: async (data: WarrantyType): Promise<any> => {
    return await api.post(urlAdmin, data);
  },
  getGuaranteeDetail: async (id: number | string): Promise<any> => {
    return api.get(`${urlget}/${id}`);
  },
  getGuarantees: async (params: Params): Promise<WarrantyTypeRes> => {
    return await api.get(urlget, { params });
  },
  filterGuarantee: async (code: string): Promise<WarrantyType> => {
    return await api.get(`${urlget}/filter/${code}`);
  },
  searchGuarantees: async (
    search: string,
    params: Params
  ): Promise<WarrantyTypeRes> => {
    return await api.get(`${urlAdmin}/search/${search}`, { params });
  },
  // editContact: async (data: ContactType): Promise<ContactType> => {
  //   return await api.put(urlAdmin, data);
  // },
  deleteGuarantee: async (id: number | string): Promise<any> => {
    return await api.delete(`${urlAdmin}/${id}`);
  },
};
