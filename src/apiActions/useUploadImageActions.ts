import { useQueryClient } from "@tanstack/react-query";
import { useSnackbar } from "src/components/Snackbar";
import { QueryKeys } from "src/constants/queryKeys";
import { IUploadImage } from "src/interface/uploadImage";
import { UPLOAD_IMAGE_API } from "src/services/endpoint";
import { useApiAction } from "src/services/useApiAction";
import { QueryCacheUtils } from "src/utils/queryCacheUtils";

export const useUploadImageActions = () => {
    const action = useApiAction();
    const snackbar = useSnackbar();
    const queryClient = useQueryClient();
    const queryCacheUtils = new QueryCacheUtils(queryClient);

    const tryUploadImage = async (values: IUploadImage,) => {
        return new Promise((resolve, reject) => {
            const formData = new FormData();
            if (values.file) {
                formData.append("file", values.file);
            } else {
                reject(new Error("File is required"));
                return;
            }
            action.mutate({
                url: UPLOAD_IMAGE_API.CREATE_UPLOAD_IMAGE,
                method: "post",
                data: formData,

            },
                {
                    onSuccess: (response: any) => {
                        resolve(response)
                        queryCacheUtils.invalidateQueries([QueryKeys.uploadImage]);
                        snackbar?.show({
                            title: response.message || "Upload successful",
                            type: "success",
                        });

                    },
                    onError: (error: any) => {
                        reject(error)
                        snackbar?.show({
                            title: error?.error?.message || error?.message || "Upload failed",
                            type: "error",
                        });
                        console.error("Upload failed:", error);
                    },
                }
            );
        })
    };



    return { tryUploadImage, };
}