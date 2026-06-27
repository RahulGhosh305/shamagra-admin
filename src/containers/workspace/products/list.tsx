import FeatherIcon from "feather-icons-react";
import { Table, PageHeader, Button as AntButton } from "antd";
import { Scope } from "@utils/scope"
import { confirmAlert } from "@utils/alert"
import { formatCamelCaseToTitleCase } from "@utils/utilities";
import { FC } from "react";
import { InitialState } from "@containers/workspace/products";
import { ProductsRes } from "@redux/services/workspace/products/type";

const ProductList: FC<{
    state: InitialState,
    setState: (state: InitialState) => void,
    products?: ProductsRes,
    isLoading: boolean,
    showViewModal: (_id?: string) => void,
    showEditModal: (_id?: string) => void,
    handleProductDelete: (_id: string) => void
}> = ({
    state,
    setState,
    products,
    isLoading,
    showViewModal,
    showEditModal,
    handleProductDelete,
}) => {
        const columns = [
            { title: 'Product Code', dataIndex: 'product', render: (key: any) => key?.productCode ?? "" },
            { title: 'Product Name', dataIndex: 'product', render: (key: any) => key?.title ?? "" },
            { title: 'Author', dataIndex: 'product', render: (key: any) => key?.author ?? "" },
            { title: 'Original Price', dataIndex: 'pricing', render: (key: any) => key?.originalPrice ?? "" },
            { title: 'Discount Price', dataIndex: 'pricing', key: 'price', render: (key: any) => key?.discountPrice ?? "" },
            { title: 'Discount Percentage', dataIndex: 'pricing', render: (key: any) => key?.discountPercentage ?? "" },
            { title: 'Stock', dataIndex: 'specifications', render: (key: any) => key?.sku ?? "" },
            { title: 'Description Short', dataIndex: 'description', render: (key: any) => key?.short ?? "" },
            { title: 'Status', dataIndex: 'status', key: 'status', render: (key: string) => formatCamelCaseToTitleCase(key) },
            {
                title: <div className="text-right">Action</div>,
                dataIndex: '_id',
                key: '_id',
                render: (key: any) => <div className="text-right">
                    {Scope.checkScopes(['workspace_products_index']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="minimum-mr color-info border-info"
                            icon={<FeatherIcon icon="eye" size={14} />}
                            onClick={() => showViewModal(key)}
                        />
                    )}
                    {Scope.checkScopes(['workspace_products_update']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="minimum-mr color-info border-info"
                            icon={<FeatherIcon icon="edit" size={14} />}
                            onClick={() => showEditModal(key)}
                        />
                    )}
                    {Scope.checkScopes(['workspace_products_delete']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="color-danger border-danger"
                            icon={<FeatherIcon icon="trash-2" size={14} />}
                            onClick={() => confirmAlert({}, () => handleProductDelete(key))}
                        />
                    )}
                </div>
            },
        ];

        const headerButtons = [
            <div key="1" className="page-header-action">
                {Scope.checkScopes(['workspace_products_create']) && (
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
                    title="Products"
                    subTitle={`List of all ${products?.data?.total} Products.`}
                    onBack={() => window.history.back()}
                    extra={headerButtons}
                >
                    <Table
                        rowKey="_id"
                        bordered={false}
                        className="table-responsive"
                        loading={isLoading}
                        dataSource={products?.data?.data}
                        columns={columns}
                        pagination={{
                            total: products?.data?.total,
                            current: products?.data?.page,
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

export default ProductList;