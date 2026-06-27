import { FC, useEffect } from "react";
import { Constants } from "@utils/constants"
import { Col, Form, Input, Modal, Select, Button, FormInstance } from "antd";
import { InitialState } from "@containers/web-setup/authors";
import { AddAuthorReq, AuthorRes, UpdateAuthorReq } from "@redux/services/web-setup/authors/type";

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

        useEffect(() => {
            if (author?.data?._id && state.authorId) form.setFieldsValue({
                name: author?.data?.name ?? "",
                isDisabled: !!author?.data?.isDisabled,
                position: author?.data?.position ?? "",
                description: author?.data?.description ?? "",
                status: author?.data?.status ?? ""
            })
        }, [author, form, state]);

        const handleSubmit = async (data: {
            name: string,
            photo: string,
            color: string,
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
                    open={state.visible}
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