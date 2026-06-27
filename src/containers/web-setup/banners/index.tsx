import React, {useState} from 'react';
import {Form} from "antd";
import {Main} from "@styles/auth-info-style";
import BannerList from "./list";
import BannerForm from "./form";
import {
    useBannersQuery,
    useBannerQuery,
    useAddBannerMutation,
    useUpdateBannerMutation,
    useDeleteBannerMutation
} from "@redux/services/web-setup/banners/api";

export type InitialState = {page: number, perPage: number, bannerId: string, visible: boolean};

const Banners = () => {
    const [form] = Form.useForm()

    const [state, setState] = useState<InitialState>({
        page: 1,
        perPage: 10,
        bannerId: "",
        visible: false,
    });

    const banners = useBannersQuery({
        page: state.page,
        perPage: state.perPage,
    }, {refetchOnMountOrArgChange: true});

    const banner = useBannerQuery(state.bannerId, {skip: !state.bannerId, refetchOnMountOrArgChange: true});
    const [addBanner, addBannerParams] = useAddBannerMutation();
    const [updateBanner, updateBannerParams] = useUpdateBannerMutation();
    const [deleteBanner, deleteBannerParams] = useDeleteBannerMutation();

    const handleBannerDelete = async (_id: any) => {
        deleteBanner({_id, action: banners.refetch});
    }

    const showModal = async (_id?: string) => {
        setState({ ...state, visible: true, bannerId: _id ?? "" });
        form.resetFields();
    };

    const handleOk = () => {
        setState({ ...state, visible: false, bannerId: "" });
        banners.refetch();
    };

    const handleCancel = () => {
        setState({ ...state, visible: false, bannerId: "" });
    };

    return (
        <Main>
            <BannerList
                state={state}
                setState={setState}
                banners={banners.data}
                showModal={showModal}
                handleBannerDelete={handleBannerDelete}
                isLoading={banners.isLoading || deleteBannerParams.isLoading}
            />

            <BannerForm
                form={form}
                state={state}
                banner={banner.data}
                addBanner={addBanner}
                updateBanner={updateBanner}
                handleOk={handleOk}
                handleCancel={handleCancel}
                isLoading={addBannerParams.isLoading || updateBannerParams.isLoading}
            />
        </Main>
    )
}

export default Banners;