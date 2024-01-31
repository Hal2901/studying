import api from '../../configs/api';
import { initialTypeTopic, topicsData } from '../../types/topicType';
import { apiPath, getPathOfService, serviceApp } from '../../utils/apiPath';
import { Params } from '../../utils/constants';
const urlAdmin = getPathOfService(serviceApp.core, apiPath.topics, true);
const urlGet = getPathOfService(serviceApp.core, apiPath.topics);

export const topicService = {
  uploadTopic: async (
    params: Params,
    data: initialTypeTopic
  ): Promise<initialTypeTopic> => {
    return await api.post(urlAdmin, data, { params });
  },
  uploadTopicHistory: async (
    params: Params,
    data: initialTypeTopic[]
  ): Promise<initialTypeTopic> => {
    return await api.post(urlAdmin + '/history', data, { params });
  },
  getDetailsTopic: async (
    id: number,
    params: Params
  ): Promise<initialTypeTopic> => {
    return await api.get(`${urlGet}/${id}`, { params });
  },
  getDetailsTopicStudy: async (params: Params): Promise<topicsData> => {
    return await api.get(urlGet, { params });
  },
  getListTopic: async (params: Params): Promise<topicsData> => {
    return await api.get(urlGet, { params });
  },
  searchTopics: async (
    keySearch: string,
    params: Params
  ): Promise<topicsData> => {
    return await api.get(`${urlGet}/search/${keySearch}`, { params });
  },
  deleteTopic: async (id: number): Promise<any> => {
    return await api.delete(`${urlAdmin}/${id}`);
  },
  deleteTopics: async (ids: string): Promise<any> => {
    return await api.delete(`${urlAdmin}/all?id=${ids}`);
  },
};
