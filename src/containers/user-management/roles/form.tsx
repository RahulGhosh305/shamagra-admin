import {FC, useEffect} from "react";
import {Constants} from "@utils/constants"
import {Col, Form, Input, Modal, Select, Button, FormInstance} from "antd";
import {InitialState} from "@containers/user-management/roles/index";
import {AddRoleReq, RoleRes, UpdateRoleReq} from "@redux/services/user-management/roles/type";

const RoleForm: FC<{
    form: FormInstance,
    state: InitialState,
    role?: RoleRes,
    isLoading: boolean,
    addRole: (data: AddRoleReq) => void,
    updateRole: (data: UpdateRoleReq) => void,
    handleOk: (_id?: string) => void,
    handleCancel: () => void
}> = (
    {
        form,
        state,
        role,
        isLoading,
        addRole,
        updateRole,
        handleOk,
        handleCancel
    }
) => {
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 }}
    const validateMessages = { required: '${label} is required!' };

    useEffect(() => {
        if (role?.data?._id && state.roleId) form.setFieldsValue({
            name: role?.data?.name ?? "",
            description: role?.data?.description ?? "",
            status: role?.data?.status ?? ""
        })
    }, [role, form, state]);

    const handleSubmit = async (data: {
        name: string,
        description: string,
        status: string
    }) => {
        if (role?.data?._id && state.roleId) {
            updateRole({ data: {...data, _id: role?.data?._id}, action: handleOk });
        } else addRole({data, action: handleOk});
    };

    const footerButtons = [
        <Button
            form="roleForm"
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
                title="Roles Form"
                open={state.visible}
                onCancel={handleCancel}
                footer={footerButtons}
            >
                <Form
                    {...layout}
                    name={'roleForm'}
                    form={form}
                    id={'roleForm'}
                    validateMessages={validateMessages}
                    onFinish={handleSubmit}
                >
                    <Form.Item
                        name="name"
                        rules={[{required: true}]}
                        label="Name"
                    >
                        <Input placeholder="Name"/>
                    </Form.Item>
                    <Form.Item
                        name="description"
                        rules={[{ required: true }]}
                        label="Description"
                    >
                        <Input.TextArea placeholder="Description"/>
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

export default RoleForm;