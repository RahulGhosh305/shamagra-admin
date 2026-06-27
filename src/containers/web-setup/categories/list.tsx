import FeatherIcon from "feather-icons-react";
import { Table, PageHeader, Button as AntButton } from "antd";
import { Scope } from "@utils/scope"
import { confirmAlert } from "@utils/alert"
import { formatCamelCaseToTitleCase } from "@utils/utilities";
import { FC } from "react";
import { InitialState } from "@containers/web-setup/categories";
import { CategoriesRes } from "@redux/services/web-setup/categories/type";
import { Constants } from "@utils/constants";

const CategoryList: FC<{
    state: InitialState,
    setState: (state: InitialState) => void,
    categories?: CategoriesRes,
    isLoading: boolean,
    showModal: (_id?: string) => void,
    handleCategoryDelete: (_id: string) => void
}> = ({
    state,
    setState,
    categories,
    isLoading,
    showModal,
    handleCategoryDelete,
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
                    {Scope.checkScopes(['ws_categories_update']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="minimum-mr color-info border-info"
                            icon={<FeatherIcon icon="edit" size={14} />}
                            onClick={() => showModal(key)}
                        />
                    )}
                    {Scope.checkScopes(['ws_categories_delete']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="color-danger border-danger"
                            icon={<FeatherIcon icon="trash-2" size={14} />}
                            onClick={() => confirmAlert({}, () => handleCategoryDelete(key))}
                        />
                    )}
                </div>
            },
        ];

        const headerButtons = [
            <div key="1" className="page-header-action">
                {Scope.checkScopes(['ws_categories_create']) && (
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
                    title="Categories"
                    subTitle={`List of all ${categories?.data?.total} Categories.`}
                    onBack={() => window.history.back()}
                    extra={headerButtons}
                >
                    <Table
                        rowKey="_id"
                        bordered={false}
                        className="table-responsive"
                        loading={isLoading}
                        dataSource={categories?.data?.data}
                        columns={columns}
                        pagination={{
                            total: categories?.data?.total,
                            current: categories?.data?.page,
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

export default CategoryList;