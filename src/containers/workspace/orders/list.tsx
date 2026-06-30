import FeatherIcon from "feather-icons-react";
import { Table, PageHeader, Button as AntButton } from "antd";
import { Scope } from "@utils/scope"
import { confirmAlert } from "@utils/alert"
import { formatCamelCaseToTitleCase, shortDate } from "@utils/utilities";
import { FC } from "react";
import { InitialState } from "@containers/workspace/orders";
import { OrdersRes } from "@redux/services/workspace/orders/type";

const ProductList: FC<{
    state: InitialState,
    setState: (state: InitialState) => void,
    orders?: OrdersRes,
    isLoading: boolean,
    showViewModal: (_id?: string) => void,
    showEditModal: (_id?: string) => void,
    handleOrderDelete: (_id: string) => void
}> = ({
    state,
    setState,
    orders,
    isLoading,
    showViewModal,
    showEditModal,
    handleOrderDelete,
}) => {
        const columns = [
            { title: 'Order Number', dataIndex: 'orderNumber', render: (key: any) => key ?? "" },
            { title: 'User Name', dataIndex: 'shippingAddress', render: (key: any) => `${key?.firstName ?? ''} ${key?.lastName ?? ''}` },
            { title: 'Phone', dataIndex: 'shippingAddress', render: (key: any) => key?.phone ?? "" },
            // { title: 'User Address', dataIndex: 'shippingAddress', render: (key: any) => `${key?.apartment ?? ""}, ${key?.city ?? ""}, ${key?.district ?? ""} ` },
            { title: 'Price', dataIndex: 'pricing', key: 'pricing', render: (key: any) => key?.totalAmount ?? "" },
            { title: 'Payment', dataIndex: 'payment', render: (key: any) => key?.method ?? "" },
            { title: 'Order Items', dataIndex: 'items', render: (key: any) => key?.map((item: any) => item.productTitle + " | ") },
            { title: 'Order Date', dataIndex: 'createdAt', render: (key: any) => shortDate(key) ?? "" },
            {
                title: 'Status', dataIndex: 'orderStatus', key: 'orderStatus', render: (key: string) => key ?? ""
            },
            {
                title: <div className="text-right">Action</div>,
                dataIndex: '_id',
                key: '_id',
                render: (key: any) => <div className="text-right">
                    {Scope.checkScopes(['workspace_orders_index']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="minimum-mr color-info border-info"
                            icon={<FeatherIcon icon="eye" size={14} />}
                            onClick={() => showViewModal(key)}
                        />
                    )}
                    {Scope.checkScopes(['workspace_orders_update']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="minimum-mr color-info border-info"
                            icon={<FeatherIcon icon="edit" size={14} />}
                            onClick={() => showEditModal(key)}
                        />
                    )}
                    {Scope.checkScopes(['workspace_orders_delete']) && (
                        <AntButton
                            size="small"
                            type="ghost"
                            className="color-danger border-danger"
                            icon={<FeatherIcon icon="trash-2" size={14} />}
                            onClick={() => confirmAlert({}, () => handleOrderDelete(key))}
                        />
                    )}
                </div>
            },
        ];

        const headerButtons = [
            <div key="1" className="page-header-action">
                {Scope.checkScopes(['workspace_orders_create']) && (
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
                    title="Orders"
                    subTitle={`List of all ${orders?.data?.total} Orders.`}
                    onBack={() => window.history.back()}
                    extra={headerButtons}
                >
                    <Table
                        rowKey="_id"
                        bordered={false}
                        className="table-responsive"
                        loading={isLoading}
                        dataSource={orders?.data?.data}
                        columns={columns}
                        pagination={{
                            total: orders?.data?.total,
                            current: orders?.data?.page,
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