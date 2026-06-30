import { FC } from "react";
import { Modal, Descriptions, Typography, Tag, Divider, Col, Row, Spin } from "antd";
import { InitialState } from "@containers/clients/users/index";
import { UserRes } from "@redux/services/clients/users/type";

const { Title, Text } = Typography;

const UserView: FC<{
    state: InitialState;
    user?: UserRes;
    isLoading: boolean;
    handleCancel: () => void;
}> = ({
    state,
    user,
    isLoading,
    handleCancel,
}) => {
        const data = user?.data;

        return (
            <Col md={12}>
                <Modal
                    title="User Details"
                    open={state.viewVisible}
                    onCancel={() => handleCancel()}
                    footer={null}
                    width={800}
                >
                    <Spin spinning={isLoading}>
                        {data ? (
                            <div>
                                <Row gutter={[24, 24]}>
                                    <Col xs={24}>
                                        <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>{data.firstName} {data.lastName}</Title>

                                        <div style={{ marginBottom: '24px', textTransform: 'capitalize' }}>
                                            <Tag color={data.status === 'active' ? 'success' : 'default'}>
                                                {data.status || 'N/A'}
                                            </Tag>
                                        </div>

                                        <Descriptions column={{ xs: 1, sm: 1, md: 2 }} bordered size="small" style={{ overflowX: 'auto' }}>
                                            <Descriptions.Item label="Email">{data.email}</Descriptions.Item>
                                            <Descriptions.Item label="Phone">{data.phone}</Descriptions.Item>
                                            <Descriptions.Item label="Gender" style={{ textTransform: 'capitalize' }}>{data.gender}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                </Row>

                                {(data.personal) && (
                                    <>
                                        <Divider orientation="left">Personal Information</Divider>
                                        <Descriptions column={{ xs: 1, sm: 1, md: 2 }} bordered size="small" style={{ overflowX: 'auto' }}>
                                            <Descriptions.Item label="Father's Name">{data.personal.fathersName}</Descriptions.Item>
                                            <Descriptions.Item label="Mother's Name">{data.personal.mothersName}</Descriptions.Item>
                                        </Descriptions>
                                    </>
                                )}

                                {(data.personal?.presentAddress || data.personal?.permanentAddress) && (
                                    <>
                                        <Divider orientation="left">Address Information</Divider>
                                        <Descriptions column={1} bordered size="small" style={{ overflowX: 'auto' }}>
                                            {data.personal?.presentAddress && <Descriptions.Item label="Present Address">{data.personal.presentAddress}</Descriptions.Item>}
                                            {data.personal?.permanentAddress && <Descriptions.Item label="Permanent Address">{data.personal.permanentAddress}</Descriptions.Item>}
                                        </Descriptions>
                                    </>
                                )}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <Text type="secondary">No user data available.</Text>
                            </div>
                        )}
                    </Spin>
                </Modal>
            </Col>
        );
    };

export default UserView;
