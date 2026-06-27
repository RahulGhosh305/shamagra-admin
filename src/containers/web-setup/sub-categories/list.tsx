import FeatherIcon from "feather-icons-react";
import { Table, PageHeader, Button as AntButton} from "antd";
import {Scope} from "@utils/scope"
import {confirmAlert} from "@utils/alert"
import {formatCamelCaseToTitleCase} from "@utils/utilities";
import {FC} from "react";
import {InitialState} from "@containers/web-setup/sub-categories";
import {SubCategoriesRes} from "@redux/services/web-setup/sub-categories/type";
import {Constants} from "@utils/constants";

const SubCategoryList: FC<{
    state: InitialState,
    setState: (state: InitialState) => void,
    subCategories?: SubCategoriesRes,
    isLoading: boolean,
    showModal: (_id?: string) => void,
    handleSubCategoryDelete: (_id: string) => void
}> = ({
    state,
    setState,
    subCategories,
    isLoading,
    showModal,
    handleSubCategoryDelete,
}) => {
    const columns = [
        { title: 'Category', dataIndex: 'category', key: 'category', render: (key: any) => key?.name },
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Photo', dataIndex: 'photo', key: 'photo', render: (key: string) => key ? (<img height={80} src={Constants.S3_BASE_URL(key)} alt={Constants.S3_BASE_URL(key)}/>) : "N/A" },
        { title: 'Color', dataIndex: 'color', key: 'color', render: (key: string) => key ?? 'N/A' },
        { title: 'Description', dataIndex: 'description', key: 'description', render: (key: string) => key ?? 'N/A' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (key: string) => formatCamelCaseToTitleCase(key) },
        {
            title: <div className="text-right">Action</div>,
            dataIndex: '_id',
            key: '_id',
            render: (key: any) => <div className="text-right">
                {Scope.checkScopes(['ws_sub_categories_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FeatherIcon icon="edit" size={14}/>}
                        onClick={() => showModal(key)}
                    />
                )} 
                {Scope.checkScopes(['ws_sub_categories_delete']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FeatherIcon icon="trash-2" size={14}/>}
                        onClick={() => confirmAlert({}, () => handleSubCategoryDelete(key))}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['ws_sub_categories_create']) && (
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
                title="Sub Categories"
                subTitle={`List of all ${subCategories?.data?.total} Sub Categories.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={subCategories?.data?.data}
                    columns={columns}
                    pagination={{
                        total: subCategories?.data?.total,
                        current: subCategories?.data?.page,
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

export default SubCategoryList;