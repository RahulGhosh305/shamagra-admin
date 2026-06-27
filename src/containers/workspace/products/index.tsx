import React, { useEffect, useState } from 'react';
import { Form } from "antd";
import { Main } from "@styles/auth-info-style";
import ProductList from "./list";
import ProductForm from "./form";
import ProductView from "./view";
import {
    useProductsQuery,
    useProductQuery,
    useAddProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} from "@redux/services/workspace/products/api";
import { useCategoriesQuery } from "@redux/services/utilities/api";

export type InitialState = { page: number, perPage: number, productId: string, viewVisible: boolean, editVisible: boolean };

const Products = () => {
    const [form] = Form.useForm()

    const [state, setState] = useState<InitialState>({
        page: 1,
        perPage: 10,
        productId: "",
        viewVisible: false,
        editVisible: false,
    });

    const products = useProductsQuery({
        page: state.page,
        perPage: state.perPage,
    }, { refetchOnMountOrArgChange: true });

    const categories = useCategoriesQuery("", { refetchOnMountOrArgChange: true })
    const product = useProductQuery(state.productId, { skip: !state.productId, refetchOnMountOrArgChange: true });
    const [addProduct, addProductParams] = useAddProductMutation();
    const [updateProduct, updateProductParams] = useUpdateProductMutation();
    const [deleteProduct, deleteProductParams] = useDeleteProductMutation();

    const handleProductDelete = async (_id: any) => {
        deleteProduct({ _id, action: products.refetch });
    }

    const showViewModal = async (_id?: string) => {
        setState({ ...state, viewVisible: true, productId: _id ?? "" });
    };

    const showEditModal = async (_id?: string) => {
        setState({ ...state, editVisible: true, productId: _id ?? "" });
        form.resetFields();
    };

    const handleOk = () => {
        setState({ ...state, editVisible: false, productId: "" });
        products.refetch();
    };

    const handleCancel = () => {
        setState({ ...state, editVisible: false, viewVisible: false, productId: "" });
    };

    return (
        <Main>
            <ProductList
                state={state}
                setState={setState}
                products={products.data}
                showEditModal={showEditModal}
                showViewModal={showViewModal}
                handleProductDelete={handleProductDelete}
                isLoading={products.isLoading || deleteProductParams.isLoading}
            />

            <ProductForm
                form={form}
                state={state}
                categories={categories.data}
                product={product.data}
                addProduct={addProduct}
                updateProduct={updateProduct}
                handleOk={handleOk}
                handleCancel={handleCancel}
                isLoading={addProductParams.isLoading || updateProductParams.isLoading}
            />

            <ProductView
                state={state}
                product={product.data}
                handleCancel={handleCancel}
                isLoading={product.isLoading}
            />
        </Main>
    )
}

export default Products;