import { FC, useEffect } from "react";
import { Col, Form, Input, Modal, Radio, Row, Select, Button, FormInstance } from "antd";
import { InitialState } from "@containers/user-management/users/index";
import { AddUserReq, UpdateUserReq, UserRes } from "@redux/services/user-management/users/type";
import { SimpleRes } from "@redux/services/utilities/type";
import { Constants } from "@utils/constants";

const UserForm: FC<{
    form: FormInstance,
    state: InitialState,
    user?: UserRes,
    addUser: (data: AddUserReq) => void,
    updateUser: (data: UpdateUserReq) => void,
    handleOk: (_id?: string) => void,
    handleCancel: () => void,
    roles?: SimpleRes,
    vendors?: SimpleRes,
    isLoading: boolean
}> = (
    {
        form,
        state,
        user,
        addUser,
        updateUser,
        handleOk,
        handleCancel,
        roles,
        vendors,
        isLoading
    }
) => {
        const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
        const validateMessages = { required: '${label} is required!' };

        useEffect(() => {
            if (user?.data?._id && state.userId) form.setFieldsValue({
                firstName: user?.data?.firstName ?? "",
                lastName: user?.data?.lastName ?? "",
                phone: user?.data?.phone ?? "",
                username: user?.data?.username ?? "",
                email: user?.data?.email ?? "",
                fathersName: user?.data?.personal?.fathersName ?? "",
                fathersPhone: user?.data?.personal?.fathersPhone ?? "",
                mothersName: user?.data?.personal?.mothersName ?? "",
                mothersPhone: user?.data?.personal?.mothersPhone ?? "",
                presentAddress: user?.data?.personal?.presentAddress ?? "",
                permanentAddress: user?.data?.personal?.permanentAddress ?? "",
                roleId: user?.data?.role?._id ?? "",
                vendorId: user?.data?.vendor?._id ?? null,
                status: user?.data?.status ?? "",
                gender: user?.data?.gender ?? "",
                superAdmin: user?.data?.superAdmin ?? false,
            });
        }, [user, form, state]);

        const handleSubmit = async (data: any) => {
            if (user?.data?._id && state.userId) {
                updateUser({ data: { ...data, _id: user.data._id }, action: handleOk });
            } else addUser({ data, action: handleOk });
        };

        const footerButtons = [
            <Button
                form="userForm"
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
                    title="Users Form"
                    open={state.editVisible}
                    onCancel={handleCancel}
                    footer={footerButtons}
                    width={1000}
                >
                    <Form
                        {...layout}
                        name={'userForm'}
                        form={form}
                        id={'userForm'}
                        validateMessages={validateMessages}
                        onFinish={handleSubmit}
                    >
                        <Row>
                            <Col md={12}>
                                <Form.Item
                                    name="firstName"
                                    rules={[{ required: true }]}
                                    label="First Name"
                                >
                                    <Input placeholder="First Name" />
                                </Form.Item>
                                <Form.Item
                                    name="lastName"
                                    rules={[{ required: true }]}
                                    label="Last Name"
                                >
                                    <Input placeholder="Last Name" />
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    rules={[{ required: true }]}
                                    label="Phone"
                                >
                                    <Input placeholder="Phone" />
                                </Form.Item>
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true }]}
                                    label="Username"
                                >
                                    <Input placeholder="Username" />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[{ required: true }]}
                                    label="Email"
                                >
                                    <Input placeholder="Email" />
                                </Form.Item>
                                <Form.Item
                                    name="fathersName"
                                    label="Father's Name"
                                >
                                    <Input placeholder="Father's Name" />
                                </Form.Item>
                                <Form.Item
                                    name="fathersPhone"
                                    label="Father's Phone"
                                >
                                    <Input placeholder="Father's Phone" />
                                </Form.Item>
                            </Col>
                            <Col md={12}>
                                <Form.Item
                                    name="mothersName"
                                    label="Mother's Name"
                                >
                                    <Input placeholder="Mother's Name" />
                                </Form.Item>
                                <Form.Item
                                    name="mothersPhone"
                                    label="Mother's Phone"
                                >
                                    <Input placeholder="Mother's Phone" />
                                </Form.Item>
                                <Form.Item
                                    name="presentAddress"
                                    label="Present Address"
                                >
                                    <Input placeholder="Present Address" />
                                </Form.Item>
                                <Form.Item
                                    name="permanentAddress"
                                    label="Permanent Address"
                                >
                                    <Input placeholder="Permanent Address" />
                                </Form.Item>
                                <Form.Item
                                    name="roleId"
                                    rules={[{ required: true }]}
                                    label="Role"
                                >
                                    <Select>
                                        <Select.Option value="">Roles</Select.Option>
                                        {roles?.data?.filter((role: any) => role.name !== Constants.ROLES.SUPER_ADMIN).map((role: any) =>
                                            <Select.Option key={role._id} value={role._id}>{role.name}</Select.Option>
                                        )}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="vendorId"
                                    rules={[{ required: false }]}
                                    initialValue={null}
                                    label="Vendor"
                                >
                                    <Select disabled={true}>
                                        <Select.Option value="">Vendors</Select.Option>
                                        {vendors?.data?.map((vendor: any) =>
                                            <Select.Option key={vendor._id} value={vendor._id}>{vendor.firstName} {vendor.lastName}</Select.Option>
                                        )}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="status"
                                    rules={[{ required: true }]}
                                    label="Status"
                                >
                                    <Select>
                                        <Select.Option value="">Select One</Select.Option>
                                        <Select.Option value="active">Active</Select.Option>
                                        <Select.Option value="inactive">Inactive</Select.Option>
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="gender"
                                    rules={[{ required: true }]}
                                    label="Gender"
                                >
                                    <Radio.Group>
                                        <Radio value="male">Male</Radio>
                                        <Radio value="female">Female</Radio>
                                    </Radio.Group>
                                </Form.Item>
                                <Form.Item
                                    name="superAdmin"
                                    rules={[{ required: true }]}
                                    label="Super Admin"
                                >
                                    <Radio.Group>
                                        <Radio value={true}>Yes</Radio>
                                        <Radio value={false}>No</Radio>
                                    </Radio.Group>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Col>
        )
    }

export default UserForm;