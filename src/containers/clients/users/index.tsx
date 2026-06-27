import React, {useState} from 'react';
import {Form} from "antd";
import {Main} from "@styles/auth-info-style";
import UserList from "./list";
import {useAddUserMutation, useUsersQuery} from "@redux/services/clients/users/api";
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
export type InitialState = {userId: string, visible: boolean, filterVisible: boolean};

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
    const [state, setState] = useState<InitialState>({userId: "", visible: false, filterVisible: false});

    const countries = useCountriesQuery("", {refetchOnMountOrArgChange: true});
    const cities = useCitiesQuery("", {refetchOnMountOrArgChange: true});
    const locations = useLocationsQuery("", {refetchOnMountOrArgChange: true});
    const [addUser, addUserParams] = useAddUserMutation();
    const users = useUsersQuery(filters, {refetchOnMountOrArgChange: true});

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

    const showModal = async (_id?: string) => {
        setState({ ...state, visible: true, userId: _id ?? ""});
        form.resetFields();
    };
    const handleOk = () => {
        setState({...state, visible: false, userId: ""});
        users.refetch();
    };

    const handleCancel = () => {
        setState({...state, visible: false, userId: ""});
    };

    return (
        <Main>
            <UserList
                state={state}
                setState={setState}
                filters={filters}
                setFilters={setFilters}
                showFilter={showFilter}
                showModal={showModal}
                isLoading={users.isLoading}
                users={users.data}
            />
        </Main>
    )
}

export default Users;