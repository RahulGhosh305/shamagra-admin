import { FC, useEffect } from "react";
import { Col, Form, Input, Modal, Radio, Row, Select, Button, FormInstance } from "antd";
import { InitialState } from "@containers/clients/users/index";
import { AddUserReq, UserRes } from "@redux/services/clients/users/type";
import { SimpleRes } from "@redux/services/utilities/type";
import { Constants } from "@utils/constants";

const UserForm: FC<{
    form: FormInstance,
    state: InitialState,
    user?: UserRes,
    addUser: (data: AddUserReq) => void,
    updateUser: (data: any) => void,
    handleOk: (_id?: string) => void,
    handleCancel: () => void,
    roles?: SimpleRes,
    vendors?: SimpleRes,
    countries?: SimpleRes,
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
        countries,
        isLoading
    }
) => {
        const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } }
        const validateMessages = { required: '${label} is required!' };

        useEffect(() => {
            if (user?.data?._id && state.userId) {
                form.setFieldsValue({
                    firstName: user?.data?.firstName ?? "",
                    lastName: user?.data?.lastName ?? "",
                    countryId: "",
                    phone: user?.data?.phone ?? "",
                    email: user?.data?.email ?? "",
                    gender: user?.data?.gender ?? "",
                });
            } else if (!state.userId) {
                const bdCountry = countries?.data?.find((c: any) => c.name.toLowerCase() === 'bangladesh');
                if (bdCountry) {
                    form.setFieldsValue({ countryId: bdCountry._id });
                }
            }
        }, [user, form, state, countries]);

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
                    width={600}
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
                            <Col md={24}>
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
                                    name="countryId"
                                    rules={[{ required: false }]}
                                    label="Country"
                                >
                                    <Select>
                                        <Select.Option value="">Select Country</Select.Option>
                                        {countries?.data?.map((country: any) =>
                                            <Select.Option key={country._id} value={country._id}>{country.name}</Select.Option>
                                        )}
                                    </Select>
                                </Form.Item>
                                <Form.Item
                                    name="phone"
                                    rules={[{ required: true }]}
                                    label="Phone"
                                >
                                    <Input placeholder="Phone" />
                                </Form.Item>

                                <Form.Item
                                    name="email"
                                    rules={[{ required: true }]}
                                    label="Email"
                                >
                                    <Input placeholder="Email" />
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

                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Col>
        )
    }

export default UserForm;