import React, {useState} from 'react';
import {Form} from "antd";
import {Main} from "@styles/auth-info-style";
import RoleList from "./list";
import RoleForm from "./form";
import {
    useRolesQuery,
    useRoleQuery,
    useAddRoleMutation,
    useUpdateRoleMutation,
    useDeleteRoleMutation
} from "@redux/services/user-management/roles/api";

export type InitialState = {page: number, perPage: number, roleId: string, visible: boolean};

const Roles = () => {
    const [form] = Form.useForm()

    const [state, setState] = useState<InitialState>({
        page: 1,
        perPage: 10,
        roleId: "",
        visible: false,
    });

    const roles = useRolesQuery({
        page: state.page,
        perPage: state.perPage,
    }, {refetchOnMountOrArgChange: true});

    const role = useRoleQuery(state.roleId, {skip: !state.roleId, refetchOnMountOrArgChange: true});
    const [addRole, addRoleParams] = useAddRoleMutation();
    const [updateRole, updateRoleParams] = useUpdateRoleMutation();
    const [deleteRole, deleteRoleParams] = useDeleteRoleMutation();

    const handleRoleDelete = (_id: any) => {
        deleteRole({_id, action: roles.refetch});
    }

    const showModal = (_id?: string) => {
        setState({...state, visible: true, roleId: _id ?? ""});
        form.resetFields();
    };

    const handleOk = () => {
        setState({ ...state, visible: false, roleId: "" });
        roles.refetch();
    };

    const handleCancel = () => {
        setState({ ...state, visible: false, roleId: "" });
    };

    return (
        <Main>
            <RoleList
                state={state}
                setState={setState}
                roles={roles.data}
                showModal={showModal}
                handleRoleDelete={handleRoleDelete}
                isLoading={roles.isLoading || deleteRoleParams.isLoading}
            />

            <RoleForm
                form={form}
                state={state}
                role={role.data}
                addRole={addRole}
                updateRole={updateRole}
                handleOk={handleOk}
                handleCancel={handleCancel}
                isLoading={addRoleParams.isLoading || updateRoleParams.isLoading}
            />
        </Main>
    )
}

export default Roles;