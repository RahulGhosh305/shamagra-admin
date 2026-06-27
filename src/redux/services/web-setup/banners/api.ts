import {createApi} from "@reduxjs/toolkit/dist/query/react";
import {baseQuery, validateStatus} from "@utils/auth";
import {Constants} from "@utils/constants";
import {
    AddBannerReq,
    DeleteBannerReq,
    BannersReq,
    BannersRes,
    BannerRes,
    UpdateBannerReq
} from "@redux/services/web-setup/banners/type";
import {SimpleRes} from "@redux/services/utilities/type";

export const bannersApi = createApi({
    reducerPath: "bannersApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        banners: builder.query<BannersRes, BannersReq>({
            query: (args) => `${Constants.WEB_SETUP}/banners?page=${args.page}&perPage=${args.perPage}`,
        }),
        banner: builder.query<BannerRes, string>({
            query: (_id) => `${Constants.WEB_SETUP}/banners/${_id}`,
        }),
        addBanner: builder.mutation<SimpleRes, AddBannerReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/banners`,
                method: 'POST',
                body: args.data,
                validateStatus: (response, result) => validateStatus({
                    status: response.status,
                    message: result.message,
                    action: args.action,
                    alert: true
                })
            })
        }),
        updateBanner: builder.mutation<SimpleRes, UpdateBannerReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/banners/${args.data._id}`,
                method: 'PUT',
                body: args.data,
                validateStatus: (response, result) => validateStatus({
                    status: response.status,
                    message: result.message,
                    action: args.action,
                    alert: true
                })
            })
        }),
        deleteBanner: builder.mutation<SimpleRes, DeleteBannerReq>({
            query: (args) => ({
                url: `${Constants.WEB_SETUP}/banners/${args._id}`,
                method: 'DELETE',
                validateStatus: (response, result) => validateStatus({
                    status: response.status,
                    message: result.message,
                    action: args.action,
                    alert: true
                })
            })
        }),
    }),
});

export const {
    useBannersQuery,
    useBannerQuery,
    useAddBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation
} = bannersApi;