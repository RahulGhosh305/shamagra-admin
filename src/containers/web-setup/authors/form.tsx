import { FC, useEffect, useState, Fragment } from "react";
import { Constants } from "@utils/constants"
import { Col, Form, Input, Modal, Select, Button, FormInstance } from "antd";
import { InitialState } from "@containers/web-setup/authors";
import { AddAuthorReq, AuthorRes, UpdateAuthorReq } from "@redux/services/web-setup/authors/type";
import { useUploadFileMutation } from "@redux/services/media-files/api";
import FeatherIcon from "feather-icons-react";

const AuthorForm: FC<{
    form: FormInstance,
    state: InitialState,
    author?: AuthorRes,
    isLoading: boolean,
    addAuthor: (data: AddAuthorReq) => void,
    updateAuthor: (data: UpdateAuthorReq) => void,
    handleOk: (_id?: string) => void,
    handleCancel: () => void
}> = (
    {
        form,
        state,
        author,
        isLoading,
        addAuthor,
        updateAuthor,
        handleOk,
        handleCancel
    }
) => {
        const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
        const validateMessages = { required: '${label} is required!' };

        const [uploadState, setUploadState] = useState({
            isUploadingPhoto: false,
            photo: "",
        });
        const [uploadFile] = useUploadFileMutation();

        useEffect(() => {
            if (author?.data?._id && state.authorId) {
                form.setFieldsValue({
                    name: author?.data?.name ?? "",
                    photo: author?.data?.photo ?? "",
                    isDisabled: !!author?.data?.isDisabled,
                    position: author?.data?.position ?? "",
                    description: author?.data?.description ?? "",
                    status: author?.data?.status ?? ""
                });
                setUploadState(prev => ({
                    ...prev,
                    photo: author?.data?.photo ?? "",
                }));
            } else if (!state.authorId) {
                setUploadState({
                    isUploadingPhoto: false,
                    photo: "",
                });
            }
        }, [author, form, state]);

        const uploadToBackend = async (file: File) => {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const data = await uploadFile(formData).unwrap();
                const fileData = Array.isArray(data.data) ? data.data[0] : data.data;
                return fileData;
            } catch (error: any) {
                throw new Error(
                    error?.data?.message || error?.message || "Upload failed from backend",
                );
            }
        };

        const uploadAuthorPhoto = async (file: File) => {
            setUploadState({ ...uploadState, isUploadingPhoto: true });
            try {
                const res = await uploadToBackend(file);
                if (res?.url) {
                    form.setFieldsValue({ photo: res.url });
                    setUploadState({
                        ...uploadState,
                        isUploadingPhoto: false,
                        photo: res.url,
                    });
                }
            } catch (err: any) {
                console.error("Upload error:", err);
                setUploadState({ ...uploadState, isUploadingPhoto: false });
                alert(`Photo upload failed: ${err.message}`);
            }
        };

        const deleteAuthorPhoto = (key: string) => {
            form.setFieldsValue({ photo: null });
            setUploadState({ ...uploadState, photo: "" });
        };

        const handleSubmit = async (data: {
            name: string,
            photo: string,
            position: number,
            isDisabled: boolean,
            description: string,
            status: string
        }) => {
            if (author?.data?._id && state.authorId) {
                updateAuthor({ data: { ...data, _id: author?.data?._id }, action: handleOk });
            } else addAuthor({ data, action: handleOk });
        };


        const footerButtons = [
            <Button
                form="authorForm"
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
                    title="Authors Form"
                    open={state.editVisible}
                    onCancel={() => handleCancel()}
                    footer={footerButtons}
                >
                    <Form
                        {...layout}
                        name={'authorForm'}
                        form={form}
                        id={'authorForm'}
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
                                            src={uploadState.photo}
                                            alt=""
                                        />
                                    </div>
                                    <div className="minimum-mt">
                                        <Button
                                            size="small"
                                            type="ghost"
                                            className="minimum-mr color-danger border-danger"
                                            icon={<FeatherIcon icon="trash" size={14} />}
                                            onClick={() => deleteAuthorPhoto(uploadState.photo)}
                                        />
                                    </div>
                                </Fragment>
                            ) : (
                                <Fragment>
                                    <label
                                        className={
                                            uploadState.photo
                                                ? "hidden"
                                                : "ant-btn sc-fMiknA kzFbZB btn-outlined ant-btn-light ant-btn-lg"
                                        }
                                        htmlFor="photoUpload"
                                    >
                                        <FeatherIcon icon="upload" />
                                        <span
                                            aria-disabled={uploadState.isUploadingPhoto}
                                            style={{ verticalAlign: "super" }}
                                        >
                                            {uploadState.isUploadingPhoto ? "Uploading..." : "Upload"}
                                        </span>
                                    </label>
                                    <input
                                        type="file"
                                        id="photoUpload"
                                        className="hidden"
                                        onChange={(event) =>
                                            uploadAuthorPhoto(event.target.files![0])
                                        }
                                    />
                                </Fragment>
                            )}
                        </Form.Item>
                        <Form.Item
                            name="name"
                            rules={[{ required: true }]}
                            label="Name"
                        >
                            <Input placeholder="Name" />
                        </Form.Item>
                        <Form.Item
                            name="position"
                            rules={[{ required: true }]}
                            label="Position"
                        >
                            <Input type={"number"} placeholder="Position" />
                        </Form.Item>
                        <Form.Item
                            name="isDisabled"
                            rules={[{ required: true }]}
                            label="Is Disabled?"
                        >
                            <Select>
                                <Select.Option value={true}>Yes</Select.Option>
                                <Select.Option value={false}>No</Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="description"
                            rules={[{ required: false }]}
                            initialValue={null}
                            label="Description"
                        >
                            <Input placeholder="Description" />
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

export default AuthorForm;