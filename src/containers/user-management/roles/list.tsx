import FeatherIcon from "feather-icons-react";
import { Table, PageHeader, Button as AntButton} from "antd";
import {Scope} from "@utils/scope"
import {confirmAlert} from "@utils/alert"
import {formatCamelCaseToTitleCase} from "@utils/utilities";
import {FC} from "react";
import {InitialState} from "@containers/user-management/roles/index";
import {RolesRes} from "@redux/services/user-management/roles/type";

const RoleList: FC<{
    state: InitialState,
    setState: (state: InitialState) => void,
    roles?: RolesRes,
    isLoading: boolean,
    showModal: (_id?: string) => void,
    handleRoleDelete: (_id: string) => void
}> = ({
    state,
    setState,
    roles,
    isLoading,
    showModal,
    handleRoleDelete,
}) => {
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Description', dataIndex: 'description', key: 'description' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (key: string) => formatCamelCaseToTitleCase(key) },
        {
            title: <div className="text-right">Action</div>,
            render: (key: any) => <div className="text-right">
                {Scope.checkScopes(['um_roles_update']) && !key?.isSystemDefined && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FeatherIcon icon="edit" size={14}/>}
                        onClick={() => showModal(key?._id)}
                    />
                )}
                {Scope.checkScopes(['um_roles_delete']) && !key?.isSystemDefined && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FeatherIcon icon="trash-2" size={14}/>}
                        onClick={() => confirmAlert({}, () => handleRoleDelete(key?._id))}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['um_roles_create']) && (
                <AntButton type="primary" onClick={() => showModal()}>
                    <FeatherIcon icon="plus" size={14}/>
                    &nbsp;Add New
                </AntButton>
            )}
        </div>
    ];

    return (
        <div>
            <PageHeader
                ghost={false}
                title="Roles"
                subTitle={`List of all ${roles?.data?.total} Roles.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={roles?.data?.data}
                    columns={columns}
                    pagination={{
                        total: roles?.data?.total,
                        current: roles?.data?.page,
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

export default RoleList;