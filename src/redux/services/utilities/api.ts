import { createApi } from "@reduxjs/toolkit/query/react";
import { Constants } from "@utils/constants";
import { baseQuery } from "@utils/auth";
import { SimpleRes, SimpleReq } from "@redux/services/utilities/type";

export const utilitiesApi = createApi({
    reducerPath: "utilitiesApi",
    baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
    endpoints: (builder) => ({
        roles: builder.query<SimpleRes, string>({
            query: () => `${Constants.UTILITIES}/roles`,
        }),
        countries: builder.query<SimpleRes, string>({
            query: () => `${Constants.UTILITIES}/countries`,
        }),
        cities: builder.query<SimpleRes, string>({
            query: (countryId) => `${Constants.UTILITIES}/cities?countryId=${countryId}`,
        }),
        locations: builder.query<SimpleRes, string>({
            query: (cityId) => `${Constants.UTILITIES}/locations?cityId=${cityId}`,
        }),
        categories: builder.query<SimpleRes, string>({
            query: (cityId) => `${Constants.UTILITIES}/categories`,
        }),
        subCategories: builder.query<SimpleRes, string>({
            query: (cityId) => `${Constants.UTILITIES}/sub-categories`,
        }),
        brands: builder.query<SimpleRes, string>({
            query: (cityId) => `${Constants.UTILITIES}/brands`,
        }),
        users: builder.query<SimpleRes, string>({
            query: () => `${Constants.UTILITIES}/users`,
        }),
        vendors: builder.query<SimpleRes, string>({
            query: () => `${Constants.UTILITIES}/vendors`,
        }),
        organizations: builder.query<SimpleRes, string>({
            query: () => `${Constants.UTILITIES}/organizations`,
        }),
    }),
});

export const {
    useRolesQuery,
    useCountriesQuery,
    useCitiesQuery,
    useLocationsQuery,
    useCategoriesQuery,
    useSubCategoriesQuery,
    useBrandsQuery,
    useUsersQuery,
    useVendorsQuery,
    useOrganizationsQuery
} = utilitiesApi;
