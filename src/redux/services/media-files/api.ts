import { createApi } from "@reduxjs/toolkit/query/react";
import { Constants } from "@utils/constants";
import { baseQuery } from "@utils/auth";
import { UploadFileRes } from "./type";

export const mediaApi = createApi({
    reducerPath: "mediaApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        uploadFile: builder.mutation<UploadFileRes, FormData>({
            query: (data) => ({
                url: `${Constants.MEDIA_FILES}/upload`,
                method: "POST",
                body: data,
            }),
        }),
    }),
});

export const { useUploadFileMutation } = mediaApi;
