import React, {useState} from 'react';
import {Form} from "antd";
import {Main} from "@styles/auth-info-style";
import CategoryList from "./list";
import CategoryForm from "./form";
import {
    useCategoriesQuery,
    useCategoryQuery,
    useAddCategoryMutation,
    useUpdateCategoryMutation,
    useDeleteCategoryMutation
} from "@redux/services/web-setup/categories/api";

export type InitialState = {page: number, perPage: number, categoryId: string, visible: boolean};

const Categories = () => {
    const [form] = Form.useForm()

    const [state, setState] = useState<InitialState>({
        page: 1,
        perPage: 10,
        categoryId: "",
        visible: false,
    });

    const categories = useCategoriesQuery({
        page: state.page,
        perPage: state.perPage,
    }, {refetchOnMountOrArgChange: true});

    const category = useCategoryQuery(state.categoryId, {skip: !state.categoryId, refetchOnMountOrArgChange: true});
    const [addCategory, addCategoryParams] = useAddCategoryMutation();
    const [updateCategory, updateCategoryParams] = useUpdateCategoryMutation();
    const [deleteCategory, deleteCategoryParams] = useDeleteCategoryMutation();

    const handleCategoryDelete = async (_id: any) => {
        deleteCategory({_id, action: categories.refetch});
    }

    const showModal = async (_id?: string) => {
        setState({ ...state, visible: true, categoryId: _id ?? "" });
        form.resetFields();
    };

    const handleOk = () => {
        setState({ ...state, visible: false, categoryId: "" });
        categories.refetch();
    };

    const handleCancel = () => {
        setState({ ...state, visible: false, categoryId: "" });
    };

    return (
        <Main>
            <CategoryList
                state={state}
                setState={setState}
                categories={categories.data}
                showModal={showModal}
                handleCategoryDelete={handleCategoryDelete}
                isLoading={categories.isLoading || deleteCategoryParams.isLoading}
            />

            <CategoryForm
                form={form}
                state={state}
                category={category.data}
                addCategory={addCategory}
                updateCategory={updateCategory}
                handleOk={handleOk}
                handleCancel={handleCancel}
                isLoading={addCategoryParams.isLoading || updateCategoryParams.isLoading}
            />
        </Main>
    )
}

export default Categories;