import { useTranslation } from "react-i18next";
import { URL_FILE, URL_FILE_DOWNLOAD } from "../utils/constants";
import { toast } from "react-toastify";
import { saveAs } from "file-saver";

export const useDownloadFile = ()=> {
    const {t} = useTranslation()
    const handleDownload = (filePathL: string, name: string)=> {
        try {
            const link = document.createElement("a");
            link.href = URL_FILE_DOWNLOAD + filePathL;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            toast.success(t("message.success.download", { name}));
        } catch (error) {
            toast.error(t("message.error.download", { name}));
        }
       
    }
    const handleDownloadMultipleFile = (filePathL: string[], name: string)=> {
        try {
            filePathL.forEach(async(item)=> {
                await saveAs(URL_FILE + item, item);
                // const link = document.createElement("a");
                // document.body.appendChild(link);
                // link.href = URL_FILE_DOWNLOAD + item;
                // link.click();
                // document.body.removeChild(link);
            })
            toast.success(t("message.success.download", { name}));
        } catch (error) {
            toast.error(t("message.error.download", { name}));
        }
       
    }

    return {
        handleDownload,
        handleDownloadMultipleFile
    }
}