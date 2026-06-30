import FeatherIcon from "feather-icons-react";
import { Table, PageHeader, Button as AntButton } from "antd";
import { Scope } from "@utils/scope"
import { confirmAlert } from "@utils/alert"
import { formatCamelCaseToTitleCase } from "@utils/utilities";
import { useRouter } from "next/router";
import { FC } from "react";
import { InitialState } from "@containers/clients/users/index";
import { UsersRes } from "@redux/services/clients/users/type";

const UserList: FC<{
    state: InitialState,
    setState: (state: InitialState) => void,
    users?: UsersRes,
    showViewModal: (_id?: string) => void,
    showEditModal: (_id?: string) => void,
    handleUserDelete: (_id: string) => void,
    isLoading: boolean
}> = ({
    state,
    setState,
    users,
    showViewModal,
    showEditModal,
    handleUserDelete,
    isLoading
}) => {
        const router = useRouter();
        const columns = [
            { title: 'First Name', dataIndex: 'firstName', key: 'firstName', render: (key: string) => key ?? "N/A" },
            { title: 'Last Name', dataIndex: 'lastName', key: 'lastName', render: (key: string) => key ?? "N/A" },
            { title: 'Phone', dataIndex: 'phone', key: 'phone', render: (key: string) => key ?? "N/A" },
            { title: 'Email', dataIndex: 'email', key: 'email', render: (key: string) => key ?? "N/A" },
            { title: 'Gender', dataIndex: 'gender', key: 'gender', render: (key: string) => key ?? "N/A" },
            { title: 'Status', dataIndex: 'status', key: 'status', render: (key: string) => formatCamelCaseToTitleCase(key) },
            {
                title: <div className="text-right">Action</div>,
                // dataIndex: '_id',
                // key: '_id',
                render: (key: any) => <div className="text-right">
                    {Scope.checkScopes(['crm_clients_users_index']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="minimum-mr color-info border-info"
                            icon={<FeatherIcon icon="eye" size={14} />}
                            onClick={() => showViewModal(key?._id)}
                        />
                    )}
                    {Scope.checkScopes(['crm_clients_users_update']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="minimum-mr color-info border-info"
                            icon={<FeatherIcon icon="edit" size={14} />}
                            onClick={() => showEditModal(key?._id)}
                        />
                    )}
                    {Scope.checkScopes(['crm_clients_users_delete']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="color-danger border-danger"
                            icon={<FeatherIcon icon="trash-2" size={14} />}
                            onClick={() => confirmAlert({}, () => handleUserDelete(key?._id))}
                        />
                    )}
                </div>
            },
        ];

        const headerButtons = [
            // <div key="1" className="page-header-action">
            //     {Scope.checkScopes(['crm_clients_users_index']) && (
            //         <AntButton type="primary" onClick={() => showFilter()}>
            //             Filter
            //         </AntButton>
            //     )}
            // </div>,
            <div key="2" className="page-header-action">
                {Scope.checkScopes(['crm_clients_users_create']) && (
                    <AntButton type="primary" onClick={() => showEditModal()}>
                        <FeatherIcon icon="plus" size={14} />
                        &nbsp;Add New
                    </AntButton>
                )}
            </div>
        ];

        return (
            <div>
                <PageHeader
                    ghost={false}
                    title="Users"
                    subTitle={`List of all ${users?.data?.total} Users.`}
                    onBack={() => window.history.back()}
                    extra={headerButtons}
                >
                    <Table
                        rowKey="_id"
                        bordered={false}
                        className="table-responsive"
                        loading={isLoading}
                        dataSource={users?.data?.data}
                        columns={columns}
                        pagination={{
                            total: users?.data?.total,
                            current: users?.data?.page,
                            onChange: async (pageNo, perPageNo) => setState({
                                ...state,
                                page: pageNo,
                                perPage: perPageNo
                            })
                        }}
                    />
                </PageHeader>
            </div>
        )
    }

export default UserList;