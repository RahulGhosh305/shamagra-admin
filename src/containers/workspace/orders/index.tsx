import React, { useEffect, useState } from 'react';
import { Form } from "antd";
import { Main } from "@styles/auth-info-style";
import OrderList from "./list";
import OrderForm from "./form";
import OrderView from "./view";
import {
    useOrdersQuery,
    useOrderQuery,
    useAddOrderMutation,
    useUpdateOrderMutation,
    useDeleteOrderMutation
} from "@redux/services/workspace/orders/api";
import { useCategoriesQuery } from "@redux/services/utilities/api";

export type InitialState = { page: number, perPage: number, orderId: string, viewVisible: boolean, editVisible: boolean };

const Products = () => {
    const [form] = Form.useForm()

    const [state, setState] = useState<InitialState>({
        page: 1,
        perPage: 10,
        orderId: "",
        viewVisible: false,
        editVisible: false,
    });

    const orders = useOrdersQuery({
        page: state.page,
        perPage: state.perPage,
    }, { refetchOnMountOrArgChange: true });

    const categories = useCategoriesQuery("", { refetchOnMountOrArgChange: true })
    const order = useOrderQuery(state.orderId, { skip: !state.orderId, refetchOnMountOrArgChange: true });
    const [addOrder, addOrderParams] = useAddOrderMutation();
    const [updateOrder, updateOrderParams] = useUpdateOrderMutation();
    const [deleteOrder, deleteOrderParams] = useDeleteOrderMutation();

    const handleOrderDelete = async (_id: any) => {
        deleteOrder({ _id, action: orders.refetch });
    }

    const showViewModal = async (_id?: string) => {
        setState({ ...state, viewVisible: true, orderId: _id ?? "" });
    };

    const showEditModal = async (_id?: string) => {
        setState({ ...state, editVisible: true, orderId: _id ?? "" });
        form.resetFields();
    };

    const handleOk = () => {
        setState({ ...state, editVisible: false, orderId: "" });
        orders.refetch();
    };

    const handleCancel = () => {
        setState({ ...state, editVisible: false, viewVisible: false, orderId: "" });
    };

    return (
        <Main>
            <OrderList
                state={state}
                setState={setState}
                orders={orders.data}
                showEditModal={showEditModal}
                showViewModal={showViewModal}
                handleOrderDelete={handleOrderDelete}
                isLoading={orders.isLoading || deleteOrderParams.isLoading}
            />

            <OrderForm
                form={form}
                state={state}
                categories={categories.data}
                order={order.data}
                addOrder={addOrder}
                updateOrder={updateOrder}
                handleOk={handleOk}
                handleCancel={handleCancel}
                isLoading={addOrderParams.isLoading || updateOrderParams.isLoading}
            />

            <OrderView
                state={state}
                order={order.data}
                handleCancel={handleCancel}
                isLoading={order.isLoading}
            />
        </Main>
    )
}

export default Products;