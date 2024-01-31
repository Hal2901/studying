import api from "../configs/api";
import { ContactType, ContactTypeRes } from "../types/contactType";
import { apiPath, getPathOfService, serviceApp } from "../utils/apiPath";

import { Params } from "../utils/constants";
const urlAdmin = getPathOfService(serviceApp.core, apiPath.contacts, true);
const urlget = getPathOfService(serviceApp.core, apiPath.contacts);

export const contactService = {
  addContact: async (data: any): Promise<any> => {
    return await api.post(urlget, data);
  },
  getContanctDetail: async (id: number): Promise<any> => {
    return api.get(`${urlget}/${id}`);
  },
  getContacts: async (params: Params): Promise<ContactTypeRes> => {
    return await api.get(urlAdmin, { params });
  },
  searchContacts: async (
    search: string,
    params: Params
  ): Promise<ContactTypeRes> => {
    return await api.get(`${urlAdmin}/search/${search}`, { params });
  },
  editContact: async (data: ContactType): Promise<ContactType> => {
    return await api.put(urlAdmin, data);
  },
  deleteContacts: async (ids: string): Promise<any> => {
    return await api.delete(`${urlAdmin}?id=${ids}`);
  },
};
