import { FC, useEffect } from "react";
import { Constants } from "@utils/constants"
import { Col, Form, Input, Modal, Select, Button, FormInstance } from "antd";
import { InitialState } from "@containers/web-setup/categories";
import { AddCategoryReq, CategoryRes, UpdateCategoryReq } from "@redux/services/web-setup/categories/type";

const CategoryForm: FC<{
    form: FormInstance,
    state: InitialState,
    category?: CategoryRes,
    isLoading: boolean,
    addCategory: (data: AddCategoryReq) => void,
    updateCategory: (data: UpdateCategoryReq) => void,
    handleOk: (_id?: string) => void,
    handleCancel: () => void
}> = (
    {
        form,
        state,
        category,
        isLoading,
        addCategory,
        updateCategory,
        handleOk,
        handleCancel
    }
) => {
        const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
        const validateMessages = { required: '${label} is required!' };

        useEffect(() => {
            if (category?.data?._id && state.categoryId) form.setFieldsValue({
                name: category?.data?.name ?? "",
                isDisabled: !!category?.data?.isDisabled,
                position: category?.data?.position ?? "",
                description: category?.data?.description ?? "",
                status: category?.data?.status ?? ""
            })
        }, [category, form, state]);

        const handleSubmit = async (data: {
            name: string,
            photo: string,
            color: string,
            position: number,
            isDisabled: boolean,
            description: string,
            status: string
        }) => {
            if (category?.data?._id && state.categoryId) {
                updateCategory({ data: { ...data, _id: category?.data?._id }, action: handleOk });
            } else addCategory({ data, action: handleOk });
        };


        const footerButtons = [
            <Button
                form="categoryForm"
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
                    title="Categories Form"
                    open={state.visible}
                    onCancel={() => handleCancel()}
                    footer={footerButtons}
                >
                    <Form
                        {...layout}
                        name={'categoryForm'}
                        form={form}
                        id={'categoryForm'}
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

export default CategoryForm;