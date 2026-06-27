import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { useDispatch } from "react-redux";

import { authApi, logoutApi } from "./services/auth/api";
import { utilitiesApi } from "./services/utilities/api";
import { dashboardApi } from "./services/dashboard/api";

import { rolesApi } from "@redux/services/user-management/roles/api"
import { usersApi } from "@redux/services/user-management/users/api"
import { permissionsApi } from "@redux/services/user-management/roles-permissions/api"

import { bannersApi } from "@redux/services/web-setup/banners/api"
import { categoriesApi } from "@redux/services/web-setup/categories/api"
import { authorsApi } from "@redux/services/web-setup/authors/api"
import { subCategoriesApi } from "@redux/services/web-setup/sub-categories/api"


import { mediaApi } from "@redux/services/media-files/api";

import { productsApi } from "@redux/services/workspace/products/api";
import { ordersApi } from "@redux/services/workspace/orders/api";

import { clientsUsersApi } from "@redux/services/clients/users/api";

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [logoutApi.reducerPath]: logoutApi.reducer,
        [utilitiesApi.reducerPath]: utilitiesApi.reducer,
        [mediaApi.reducerPath]: mediaApi.reducer,
        [dashboardApi.reducerPath]: dashboardApi.reducer,

        [rolesApi.reducerPath]: rolesApi.reducer,
        [permissionsApi.reducerPath]: permissionsApi.reducer,
        [usersApi.reducerPath]: usersApi.reducer,


        [bannersApi.reducerPath]: bannersApi.reducer,
        [categoriesApi.reducerPath]: categoriesApi.reducer,
        [authorsApi.reducerPath]: authorsApi.reducer,
        [subCategoriesApi.reducerPath]: subCategoriesApi.reducer,


        [productsApi.reducerPath]: productsApi.reducer,
        [ordersApi.reducerPath]: ordersApi.reducer,

        [clientsUsersApi.reducerPath]: clientsUsersApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
        authApi.middleware,
        logoutApi.middleware,
        utilitiesApi.middleware,
        mediaApi.middleware,
        dashboardApi.middleware,

        rolesApi.middleware,
        permissionsApi.middleware,
        usersApi.middleware,

        bannersApi.middleware,
        categoriesApi.middleware,
        authorsApi.middleware,
        subCategoriesApi.middleware,

        productsApi.middleware,
        ordersApi.middleware,

        clientsUsersApi.middleware,
    ),
});

setupListeners(store.dispatch);

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
