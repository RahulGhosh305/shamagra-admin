import {FC, Fragment, useEffect, useState} from "react";
import {Constants} from "@utils/constants"
import {Col, Form, Input, Modal, Select, Button, FormInstance} from "antd";
import {InitialState} from "@containers/web-setup/sub-categories";
import {AddSubCategoryReq, SubCategoryRes, UpdateSubCategoryReq} from "@redux/services/web-setup/sub-categories/type";
import {SimpleRes} from "@redux/services/utilities/type";
import {deleteFile, uploadPhoto} from "@utils/upload";
import FeatherIcon from "feather-icons-react";

const SubCategoryForm: FC<{
    form: FormInstance,
    state: InitialState,
    subCategory?: SubCategoryRes,
    categories?: SimpleRes,
    isLoading: boolean,
    addSubCategory: (data: AddSubCategoryReq) => void,
    updateSubCategory: (data: UpdateSubCategoryReq) => void,
    handleOk: (_id?: string) => void,
    handleCancel: () => void
}> = (
    {
        form,
        state,
        categories,
        subCategory,
        isLoading,
        addSubCategory,
        updateSubCategory,
        handleOk,
        handleCancel
    }
) => {
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const validateMessages = { required: '${label} is required!' };
    const [uploadState, setUploadState] = useState({ isUploading: false, percentage: 0, photo: "" });

    useEffect(() => {
        if (subCategory?.data?._id && state.subCategoryId) form.setFieldsValue({
            categoryId: subCategory?.data?.category?._id ?? "",
            name: subCategory?.data?.name ?? "",
            photo: subCategory?.data?.photo ?? "",
            color: subCategory?.data?.color ?? "",
            description: subCategory?.data?.description ?? "",
            status: subCategory?.data?.status ?? ""
        })
    }, [subCategory, form, state]);

    const handleSubmit = async (data: {
        categoryId: string,
        name: string,
        photo: string,
        color: string,
        description: string,
        status: string
    }) => {
        if (subCategory?.data?._id && state.subCategoryId) {
            updateSubCategory({ data: {...data, _id: subCategory?.data?._id}, action: handleOk });
        } else addSubCategory({data, action: handleOk});
    };

    const setPhotoUploading = (percentage: number) => setUploadState({ ...uploadState, percentage: percentage });

    const uploadSubCategoryPhoto = (file: File) => {
        setUploadState({ ...uploadState, isUploading: true })
        uploadPhoto(file, Constants.S3_WS_SUB_CATEGORIES(), setPhotoUploading, (cb: any) => {
            form.setFieldsValue({ photo: cb.key ?? cb.Key })
            setUploadState({ ...uploadState, isUploading: false, photo: cb.key ?? cb.Key })
        }).then(r => null)
    }

    const deleteSubCategoryPhoto = (key: string) => {
        deleteFile(key, () => {
            form.setFieldsValue({ photo: null });
            setUploadState({...uploadState, photo: ""});
        })
    }

    const footerButtons = [
        <Button
            form="subCategoryForm"
            key="submit"
            htmlType="submit"
            type="primary"
            disabled={isLoading}
        >
            {isLoading ? 'Loading...' : 'Submit'}
        </Button>
    ];

    return (
        <Col md={12}>
            <Modal
                title="SubCategories Form"
                open={state.visible}
                onCancel={() => handleCancel()}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'subCategoryForm'}
                    form={form}
                    id={'subCategoryForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="photo"
                        label={<span>Photo</span>}
                        rules={[{ required: false }]}
                        initialValue={null}
                    >
                        {uploadState.photo ? (
                            <Fragment>
                                <div>
                                    <img
                                        className="border-radius-3"
                                        height={80}
                                        src={Constants.S3_BASE_URL(uploadState.photo)}
                                        alt=""
                                    />
                                </div>
                                <div className="minimum-mt">
                                    <Button
                                        size="small"
                                        type="ghost"
                                        className="minimum-mr color-danger border-danger"
                                        icon={<FeatherIcon icon="trash" size={14}/>}
                                        onClick={() => deleteSubCategoryPhoto(uploadState.photo)}
                                    />
                                </div>
                            </Fragment>
                        ) : (
                            <Fragment>
                                <label
                                    className={uploadState.photo ? "hidden" : "ant-btn sc-fMiknA kzFbZB btn-outlined ant-btn-light ant-btn-lg"}
                                    htmlFor="thumbnailUpload"
                                >
                                    <FeatherIcon icon="upload" />
                                    <span
                                        aria-disabled={uploadState.isUploading}
                                        style={{ verticalAlign: 'super' }}
                                    >
                                        {uploadState.isUploading ? 'Uploading...' : 'Upload'}
                                    </span>
                                </label>
                                <input
                                    type="file"
                                    id="thumbnailUpload"
                                    className="hidden"
                                    // onClick={event => event.target.value = null}
                                    onChange={(event) => uploadSubCategoryPhoto(event.target.files![0])}
                                />
                            </Fragment>
                        )}
                    </Form.Item>
                    <Form.Item
                        name="categoryId"
                        rules={[{ required: true }]}
                        label="Category">
                        <Select>
                            <Select.Option value="">Category</Select.Option>
                            {categories?.data?.map((category: any, idx: number) => (
                                <Select.Option value={category._id} key={idx}>{category.name}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="name"
                        rules={[{required: true}]}
                        label="Name"
                    >
                        <Input placeholder="Name"/>
                    </Form.Item>
                    <Form.Item
                        name="color"
                        rules={[{required: false}]}
                        initialValue={null}
                        label="Color"
                    >
                        <Input placeholder="Color"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[{required: false}]}
                        initialValue={null}
                        label="Description"
                    >
                        <Input placeholder="Description"/>
                    </Form.Item>
                    <Form.Item
                        name="status"
                        rules={[{ required: true }]}
                        label="Status"
                    >
                        <Select>
                            {Constants.STATUS.map((status, si) => (
                                <Select.Option key={si} value={status.value}>{status.label}</Select.Option>
                            ))}
                        </Select>
                    </Form.Item>
                </Form>
            </Modal>
        </Col>
    )
}

export default SubCategoryForm;