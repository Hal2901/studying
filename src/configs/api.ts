import axios from "axios";
import { BASE_URL } from "../utils/constants";
import keycloakService from "./keycloakService";


const api = axios.create();
api.interceptors.request.use(async (config: any) => {
  config.headers["Accept-Language"] =  localStorage.getItem('i18nextLng') || "vi";
  const { url } = config;
  config.url = BASE_URL + url
  const checkUpload = config.url.includes('images') || config.url.includes('/files') && config?.method == 'post'
  if (checkUpload) {
    config.headers = { ...config.headers, "Content-Type": "multipart/form-data" }
  }


  const token = keycloakService.getToken() || localStorage.getItem('accessToken')
  const isLoggedIn = keycloakService.isLoggedIn()
  if (isLoggedIn) {
    config.headers.Authorization = "Bearer " + token;
  }

  return config;
});

api.interceptors.response.use(
  async (response: any) => {
    const total = response.headers["x-total-count"];
    if (total) {
      return {
        total,
        data: response.data,
      };
    } else {
      return response.data;
    }
  },
  function (error: any) {
    const { status } = error.response;
      if (status === 401) {
        localStorage.removeItem("accessToken");
        if (window.document.location.pathname.includes('quan-ly')) {
        keycloakService.doLogin();
      }else{
        window.document.location.reload() 
      }
    }
    return Promise.reject(error);
  }
);


export default api;
