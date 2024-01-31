import api from "../configs/api";
import { BannerData, BannerType, typeBanner } from "../types/BannerType";
import { apiPath, getPathOfService, serviceApp } from "../utils/apiPath";

const urlAdmin = getPathOfService(serviceApp.core, apiPath.banners, true);
const urlGet = getPathOfService(serviceApp.core, apiPath.banners);

export const bannerService = {
  uploadBanner: async (type: string, data: any): Promise<any> => {
    return await api.post(`${urlAdmin}/${type}`, data);
  },
  getBanners: async (): Promise<BannerType[]> => {
    return await api.get(urlAdmin);
  },
  getBannerByType: async (type: typeBanner): Promise<BannerData[]> => {
    return await api.get(`${urlGet}/${type}`);
  },
  deleteBanner: async (id: number): Promise<any> => {
    return await api.delete(`${urlAdmin}/${id}`);
  },
};
