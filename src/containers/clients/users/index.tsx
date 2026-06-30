import React, { useState } from 'react';
import { Form } from "antd";
import { Main } from "@styles/auth-info-style";
import UserList from "./list";
import UserForm from "./form";
import UserView from "./view";
import {
    useAddUserMutation,
    useUsersQuery,
    useUserQuery,
    useUpdateUserMutation,
    useDeleteUserMutation
} from "@redux/services/clients/users/api";
import {
    useCitiesQuery,
    useCountriesQuery,
    useLocationsQuery,
    useOrganizationsQuery
} from "@redux/services/utilities/api";

export type InitialFilters = {
    page: number,
    perPage: number,
    cityIds: string,
    locationIds: string,
    areaIds: string,
    createdAtFrom: string,
    createdAtTo: string,
    agentNumber: string,
};
export type InitialState = { page: number, perPage: number, userId: string, editVisible: boolean, viewVisible: boolean, filterVisible: boolean };

const Users = () => {
    const [form] = Form.useForm()
    const [filter] = Form.useForm()

    const initialFilters = {
        cityIds: "",
        locationIds: "",
        areaIds: "",
        createdAtFrom: "",
        createdAtTo: "",
        agentNumber: "",
        page: 1,
        perPage: 10
    };

    const [filters, setFilters] = useState<InitialFilters>(initialFilters);
    const [state, setState] = useState<InitialState>({ page: 1, perPage: 10, userId: "", editVisible: false, viewVisible: false, filterVisible: false });

    const countries = useCountriesQuery("", { refetchOnMountOrArgChange: true });
    const cities = useCitiesQuery("", { refetchOnMountOrArgChange: true });
    const locations = useLocationsQuery("", { refetchOnMountOrArgChange: true });
    const [updateUser, updateUserParams] = useUpdateUserMutation();
    const [addUser, addUserParams] = useAddUserMutation();
    const [deleteUser, deleteUserParams] = useDeleteUserMutation();
    const users = useUsersQuery({
        ...filters,
        page: state.page,
        perPage: state.perPage,
    }, { refetchOnMountOrArgChange: true });
    const user = useUserQuery(state.userId, { skip: !state.userId, refetchOnMountOrArgChange: true });

    const showFilter = async () => {
        setState({ ...state, filterVisible: true });
    };

    const handleFilterOk = async () => {
        setState({ ...state, filterVisible: false });
    };

    const handleFilterCancel = async () => {
        setState({ ...state, filterVisible: false });
        filter.resetFields();
        setFilters(initialFilters)
    };

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

    const handleUserDelete = async (_id: any) => {
        deleteUser({ data: { _id }, action: users.refetch });
    }

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