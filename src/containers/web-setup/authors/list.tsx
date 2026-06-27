import FeatherIcon from "feather-icons-react";
import { Table, PageHeader, Button as AntButton } from "antd";
import { Scope } from "@utils/scope"
import { confirmAlert } from "@utils/alert"
import { formatCamelCaseToTitleCase } from "@utils/utilities";
import { FC } from "react";
import { InitialState } from "@containers/web-setup/authors";
import { AuthorsRes } from "@redux/services/web-setup/authors/type";
import { Constants } from "@utils/constants";

const AuthorList: FC<{
    state: InitialState,
    setState: (state: InitialState) => void,
    authors?: AuthorsRes,
    isLoading: boolean,
    showModal: (_id?: string) => void,
    handleAuthorDelete: (_id: string) => void
}> = ({
    state,
    setState,
    authors,
    isLoading,
    showModal,
    handleAuthorDelete,
}) => {
        const columns = [
            { title: 'Name', dataIndex: 'name', key: 'name' },
            { title: 'Is Disabled?', dataIndex: 'isDisabled', key: 'isDisabled', render: (key: string) => key ? "Yes" : "No" },
            { title: 'Position', dataIndex: 'position', key: 'position', render: (key: string) => key ? key : "N/A" },
            { title: 'Description', dataIndex: 'description', key: 'description', render: (key: string) => key ? key : "N/A" },
            { title: 'Status', dataIndex: 'status', key: 'status', render: (key: string) => formatCamelCaseToTitleCase(key) },
            {
                title: <div className="text-right">Action</div>,
                dataIndex: '_id',
                key: '_id',
                render: (key: any) => <div className="text-right">
                    {Scope.checkScopes(['ws_authors_update']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="minimum-mr color-info border-info"
                            icon={<FeatherIcon icon="edit" size={14} />}
                            onClick={() => showModal(key)}
                        />
                    )}
                    {Scope.checkScopes(['ws_authors_delete']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="color-danger border-danger"
                            icon={<FeatherIcon icon="trash-2" size={14} />}
                            onClick={() => confirmAlert({}, () => handleAuthorDelete(key))}
                        />
                    )}
                </div>
            },
        ];

        const headerButtons = [
            <div key="1" className="page-header-action">
                {Scope.checkScopes(['ws_authors_create']) && (
                    <AntButton type="primary" onClick={() => showModal()}>
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
                    title="Authors"
                    subTitle={`List of all ${authors?.data?.total} Authors.`}
                    onBack={() => window.history.back()}
                    extra={headerButtons}
                >
                    <Table
                        rowKey="_id"
                        bordered={false}
                        className="table-responsive"
                        loading={isLoading}
                        dataSource={authors?.data?.data}
                        columns={columns}
                        pagination={{
                            total: authors?.data?.total,
                            current: authors?.data?.page,
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

export default AuthorList;