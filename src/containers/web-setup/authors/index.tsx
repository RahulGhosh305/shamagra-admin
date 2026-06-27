import React, {useState} from 'react';
import {Form} from "antd";
import {Main} from "@styles/auth-info-style";
import AuthorList from "./list";
import AuthorForm from "./form";
import {
    useAuthorsQuery,
    useAuthorQuery,
    useAddAuthorMutation,
    useUpdateAuthorMutation,
    useDeleteAuthorMutation
} from "@redux/services/web-setup/authors/api";

export type InitialState = {page: number, perPage: number, authorId: string, visible: boolean};

const Authors = () => {
    const [form] = Form.useForm()

    const [state, setState] = useState<InitialState>({
        page: 1,
        perPage: 10,
        authorId: "",
        visible: false,
    });

    const authors = useAuthorsQuery({
        page: state.page,
        perPage: state.perPage,
    }, {refetchOnMountOrArgChange: true});

    const author = useAuthorQuery(state.authorId, {skip: !state.authorId, refetchOnMountOrArgChange: true});
    const [addAuthor, addAuthorParams] = useAddAuthorMutation();
    const [updateAuthor, updateAuthorParams] = useUpdateAuthorMutation();
    const [deleteAuthor, deleteAuthorParams] = useDeleteAuthorMutation();

    const handleAuthorDelete = async (_id: any) => {
        deleteAuthor({_id, action: authors.refetch});
    }

    const showModal = async (_id?: string) => {
        setState({ ...state, visible: true, authorId: _id ?? "" });
        form.resetFields();
    };

    const handleOk = () => {
        setState({ ...state, visible: false, authorId: "" });
        authors.refetch();
    };

    const handleCancel = () => {
        setState({ ...state, visible: false, authorId: "" });
    };

    return (
        <Main>
            <AuthorList
                state={state}
                setState={setState}
                authors={authors.data}
                showModal={showModal}
                handleAuthorDelete={handleAuthorDelete}
                isLoading={authors.isLoading || deleteAuthorParams.isLoading}
            />

            <AuthorForm
                form={form}
                state={state}
                author={author.data}
                addAuthor={addAuthor}
                updateAuthor={updateAuthor}
                handleOk={handleOk}
                handleCancel={handleCancel}
                isLoading={addAuthorParams.isLoading || updateAuthorParams.isLoading}
            />
        </Main>
    )
}

export default Authors;