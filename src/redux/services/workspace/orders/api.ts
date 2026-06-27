import { createApi } from "@reduxjs/toolkit/dist/query/react";
import { baseQuery, validateStatus } from "@utils/auth";
import { Constants } from "@utils/constants";
import {
  AddOrderReq,
  DeleteOrderReq,
  OrdersReq,
  OrdersRes,
  OrderRes,
  UpdateOrderReq,
} from "@redux/services/workspace/orders/type";
import { SimpleRes } from "@redux/services/utilities/type";

export const ordersApi = createApi({
  reducerPath: "ordersApi",
  baseQuery: baseQuery({ auth: Constants.AUTH_TYPE.bearer }),
  endpoints: (builder) => ({
    orders: builder.query<OrdersRes, OrdersReq>({
      query: (args) =>
        `${Constants.WORKSPACE}/orders?page=${args.page}&perPage=${args.perPage}`,
    }),
    order: builder.query<OrderRes, string>({
      query: (_id) => `${Constants.WORKSPACE}/orders/${_id}`,
    }),
    addOrder: builder.mutation<SimpleRes, AddOrderReq>({
      query: (args) => ({
        url: `${Constants.WORKSPACE}/orders`,
        method: "POST",
        body: args.data,
        validateStatus: (response, result) =>
          validateStatus({
            status: response.status,
            message: result.message,
            action: args.action,
            alert: true,
          }),
      }),
    }),
    updateOrder: builder.mutation<SimpleRes, UpdateOrderReq>({
      query: (args) => {
        const { _id, ...restData } = args.data as any;
        return {
          url: `${Constants.WORKSPACE}/orders/${_id}`,
          method: "PUT",
          body: restData,
          validateStatus: (response, result) =>
            validateStatus({
              status: response.status,
              message: result.message,
              action: args.action,
              alert: true,
            }),
        };
      },
    }),
    deleteOrder: builder.mutation<SimpleRes, DeleteOrderReq>({
      query: (args) => ({
        url: `${Constants.WORKSPACE}/orders/${args._id}`,
        method: "DELETE",
        validateStatus: (response, result) =>
          validateStatus({
            status: response.status,
            message: result.message,
            action: args.action,
            alert: true,
          }),
      }),
    }),
  }),
});

export const {
  useOrdersQuery,
  useOrderQuery,
  useAddOrderMutation,
  useUpdateOrderMutation,
  useDeleteOrderMutation,
} = ordersApi;
