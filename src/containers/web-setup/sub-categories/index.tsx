import React, {useState} from 'react';
import {Form} from "antd";
import {Main} from "@styles/auth-info-style";
import SubCategoryList from "./list";
import SubCategoryForm from "./form";
import {
    useSubCategoriesQuery,
    useSubCategoryQuery,
    useAddSubCategoryMutation,
    useUpdateSubCategoryMutation,
    useDeleteSubCategoryMutation
} from "@redux/services/web-setup/sub-categories/api";
import {useCategoriesQuery} from "@redux/services/utilities/api";

export type InitialState = {page: number, perPage: number, subCategoryId: string, visible: boolean};

const SubCategories = () => {
    const [form] = Form.useForm()

    const [state, setState] = useState<InitialState>({
        page: 1,
        perPage: 10,
        subCategoryId: "",
        visible: false,
    });

    const subCategories = useSubCategoriesQuery({
        page: state.page,
        perPage: state.perPage,
    }, {refetchOnMountOrArgChange: true});

    const categories = useCategoriesQuery("", {refetchOnMountOrArgChange: true});
    const subCategory = useSubCategoryQuery(state.subCategoryId, {skip: !state.subCategoryId, refetchOnMountOrArgChange: true});
    const [addSubCategory, addSubCategoryParams] = useAddSubCategoryMutation();
    const [updateSubCategory, updateSubCategoryParams] = useUpdateSubCategoryMutation();
    const [deleteSubCategory, deleteSubCategoryParams] = useDeleteSubCategoryMutation();

    const handleSubCategoryDelete = async (_id: any) => {
        deleteSubCategory({_id, action: subCategories.refetch});
    }

    const showModal = async (_id?: string) => {
        setState({ ...state, visible: true, subCategoryId: _id ?? "" });
        form.resetFields();
    };

    const handleOk = () => {
        setState({ ...state, visible: false, subCategoryId: "" });
        subCategories.refetch();
    };

    const handleCancel = () => {
        setState({ ...state, visible: false, subCategoryId: "" });
    };

    return (
        <Main>
            <SubCategoryList
                state={state}
                setState={setState}
                subCategories={subCategories.data}
                showModal={showModal}
                handleSubCategoryDelete={handleSubCategoryDelete}
                isLoading={subCategories.isLoading || deleteSubCategoryParams.isLoading}
            />

            <SubCategoryForm
                form={form}
                state={state}
                categories={categories.data}
                subCategory={subCategory.data}
                addSubCategory={addSubCategory}
                updateSubCategory={updateSubCategory}
                handleOk={handleOk}
                handleCancel={handleCancel}
                isLoading={addSubCategoryParams.isLoading || updateSubCategoryParams.isLoading}
            />
        </Main>
    )
}

export default SubCategories;