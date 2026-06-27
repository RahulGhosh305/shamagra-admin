import React, { useState } from 'react';
import { Form } from "antd";
import { Main } from "@styles/auth-info-style";
import UserList from "./list";
import UserForm from "./form";
import UserView from "./view";
import {
    useUsersQuery,
    useUserQuery,
    useAddUserMutation,
    useUpdateUserMutation,
    useDeleteUserMutation
} from "@redux/services/user-management/users/api";
import { useRolesQuery, useVendorsQuery } from "@redux/services/utilities/api";

export type InitialState = { page: number, perPage: number, userId: string, editVisible: boolean, viewVisible: boolean };

const Users = () => {
    const [form] = Form.useForm()

    const [state, setState] = useState<InitialState>({
        page: 1,
        perPage: 10,
        userId: "",
        editVisible: false,
        viewVisible: false,
    });

    const users = useUsersQuery({
        page: state.page,
        perPage: state.perPage,
    }, { refetchOnMountOrArgChange: true });

    const roles = useRolesQuery("", { refetchOnMountOrArgChange: true });
    const vendors = useVendorsQuery("", { refetchOnMountOrArgChange: true });
    const user = useUserQuery(state.userId, { skip: !state.userId, refetchOnMountOrArgChange: true });
    const [addUser, addUserParams] = useAddUserMutation();
    const [updateUser, updateUserParams] = useUpdateUserMutation();
    const [deleteUser, deleteUserParams] = useDeleteUserMutation();

    const handleUserDelete = async (_id: any) => {
        deleteUser({ _id, action: users.refetch });
    }

    const showEditModal = async (_id?: string) => {
        setState({ ...state, editVisible: true, userId: _id ?? "" });
        form.resetFields();
    };

    const showViewModal = async (_id?: string) => {
        setState({ ...state, viewVisible: true, userId: _id ?? "" });
    };

    const handleOk = () => {
        setState({ ...state, editVisible: false, viewVisible: false, userId: "" });
        users.refetch();
    };

    const handleCancel = () => {
        setState({ ...state, editVisible: false, viewVisible: false, userId: "" });
        form.resetFields();
    };

    return (
        <Main>
            <UserList
                state={state}
                setState={setState}
                users={users.data}
                showViewModal={showViewModal}
                showEditModal={showEditModal}
                handleUserDelete={handleUserDelete}
                isLoading={users.isLoading || deleteUserParams.isLoading}
            />

            <UserForm
                form={form}
                state={state}
                user={user.data}
                addUser={addUser}
                updateUser={updateUser}
                handleOk={handleOk}
                handleCancel={handleCancel}
                roles={roles.data}
                vendors={vendors.data}
                isLoading={addUserParams.isLoading || updateUserParams.isLoading}
            />

            <UserView
                state={state}
                user={user.data}
                handleCancel={handleCancel}
                isLoading={user.isLoading}
            />
        </Main>
    )
}

export default Users;