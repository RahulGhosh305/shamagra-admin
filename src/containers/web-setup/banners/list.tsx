import FeatherIcon from "feather-icons-react";
import { Table, PageHeader, Button as AntButton} from "antd";
import {Scope} from "@utils/scope"
import {confirmAlert} from "@utils/alert"
import {formatCamelCaseToTitleCase} from "@utils/utilities";
import {FC} from "react";
import {InitialState} from "@containers/web-setup/banners";
import {BannersRes} from "@redux/services/web-setup/banners/type";

const BannerList: FC<{
    state: InitialState,
    setState: (state: InitialState) => void,
    banners?: BannersRes,
    isLoading: boolean,
    showModal: (_id?: string) => void,
    handleBannerDelete: (_id: string) => void
}> = ({
    state,
    setState,
    banners,
    isLoading,
    showModal,
    handleBannerDelete,
}) => {
    const columns = [
        { title: 'Name', dataIndex: 'name', key: 'name' },
        { title: 'Page', dataIndex: 'page', key: 'page' },
        { title: 'Banner Place', dataIndex: 'bannerPlace', key: 'bannerPlace', render: (key: string) => formatCamelCaseToTitleCase(key) },
        { title: 'Position', dataIndex: 'position', key: 'position' },
        { title: 'Status', dataIndex: 'status', key: 'status', render: (key: string) => formatCamelCaseToTitleCase(key) },
        {
            title: <div className="text-right">Action</div>,
            dataIndex: '_id',
            key: '_id',
            render: (key: string) => <div className="text-right">
                {Scope.checkScopes(['ws_banners_update']) && (
                    <AntButton
                        size="small"
                        type="ghost"
                        className="minimum-mr color-info border-info"
                        icon={<FeatherIcon icon="edit" size={14}/>}
                        onClick={() => showModal(key)}
                    />
                )} 
                {Scope.checkScopes(['ws_banners_delete']) && ( 
                    <AntButton
                        size="small"
                        type="ghost"
                        className="color-danger border-danger"
                        icon={<FeatherIcon icon="trash-2" size={14}/>}
                        onClick={() => confirmAlert({}, () => handleBannerDelete(key))}
                    />
                )}
            </div>
        },
    ];

    const headerButtons = [
        <div key="1" className="page-header-action">
            {Scope.checkScopes(['ws_banners_create']) && (
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
                title="Banners"
                subTitle={`List of all ${banners?.data?.total} Banners.`}
                onBack={() => window.history.back()}
                extra={headerButtons}
            >
                <Table
                    rowKey="_id"
                    bordered={false}
                    className="table-responsive"
                    loading={isLoading}
                    dataSource={banners?.data?.data}
                    columns={columns}
                    pagination={{
                        total: banners?.data?.total,
                        current: banners?.data?.page,
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

export default BannerList;