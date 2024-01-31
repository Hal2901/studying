import api from "../configs/api";
import {
  PartnerCompanyRes,
  PartnerCompanyType,
  PartnerType,
  PartnerTypeRes,
} from "../types/PartnerType";
// import { solutionType, solutionsData } from "../../types/solutionType";
import { apiPath, getPathOfService, serviceApp } from "../utils/apiPath";

import { Params } from "../utils/constants";
const urlAdmin = getPathOfService(serviceApp.core, apiPath.partners, true);
const urlget = getPathOfService(serviceApp.core, apiPath.partners);

const urlAdminCompany = getPathOfService(
  serviceApp.core,
  apiPath.partnerCompany,
  true
);
const urlgetCompany = getPathOfService(serviceApp.core, apiPath.partnerCompany);

export const partnerService = {
  // Quan ly doi tac
  addPartnerCompany: async (data: any): Promise<any> => {
    return await api.post(urlAdminCompany, data);
  },
  getPartnerCompanyDetail: async (
    id: number | string
  ): Promise<PartnerCompanyType> => {
    return api.get(`${urlgetCompany}/${id}`);
  },
  getPartnersCompany: async (params?: Params): Promise<PartnerCompanyRes> => {
    return await api.get(urlgetCompany, { params });
  },
  searchPartnersCompany: async (
    search: string,
    params: Params
  ): Promise<PartnerCompanyRes> => {
    return await api.get(`${urlgetCompany}/search/${search}`, { params });
  },
  deletePartnerCompany: async (id: number | string): Promise<any> => {
    return await api.delete(`${urlAdminCompany}/${id}`);
  },
  deletePartnerCompanies: async (ids: string): Promise<any> => {
    return await api.delete(`${urlAdminCompany}/all?id=${ids}`);
  },

  // danh sach doi tac companies

  // Yeu cau tro thanh doi tac
  addPartner: async (data: PartnerType): Promise<any> => {
    return await api.post(urlget, data);
  },
  getPartnerDetail: async (id: number): Promise<any> => {
    return api.get(`${urlget}/${id}`);
  },
  getPartners: async (params: Params): Promise<PartnerTypeRes> => {
    return await api.get(urlAdmin, { params });
  },
  searchPartners: async (
    search: string,
    params: Params
  ): Promise<PartnerTypeRes> => {
    return await api.get(`${urlAdmin}/search/${search}`, { params });
  },
  editPartner: async (data: PartnerType): Promise<PartnerType> => {
    return await api.put(urlAdmin, data);
  },
  deletePartners: async (ids: string): Promise<any> => {
    return await api.delete(`${urlAdmin}?id=${ids}`);
  },
};
