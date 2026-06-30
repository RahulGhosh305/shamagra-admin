import { FC } from "react";
import { Modal, Descriptions, Typography, Tag, Col, Spin, Divider, Image } from "antd";
import FeatherIcon from "feather-icons-react";
import { InitialState } from "@containers/web-setup/authors";
import { AuthorRes } from "@redux/services/web-setup/authors/type";

const { Title, Text } = Typography;

const AuthorView: FC<{
    state: InitialState;
    author?: AuthorRes;
    isLoading: boolean;
    handleCancel: () => void;
}> = ({
    state,
    author,
    isLoading,
    handleCancel,
}) => {
        const data = author?.data;

        return (
            <Col md={12}>
                <Modal
                    title="Author Details"
                    open={state.viewVisible}
                    onCancel={() => handleCancel()}
                    footer={null}
                    width={800}
                >
                    <Spin spinning={isLoading}>
                        {data ? (
                            <div>
                                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        {data.photo ? (
                                            <div style={{ marginBottom: 16 }}>
                                                <Image
                                                    width={150}
                                                    src={data.photo}
                                                    alt={data.name}
                                                    style={{ borderRadius: '50%', objectFit: 'cover', height: 150 }}
                                                />
                                            </div>
                                        ) : (
                                            <div style={{ marginBottom: 16, background: '#f5f5f5', height: '150px', width: '150px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%' }}>
                                                <FeatherIcon icon="user" size={48} color="#ccc" />
                                            </div>
                                        )}
                                        <Title level={3} style={{ marginTop: 0, marginBottom: 16 }}>{data.name}</Title>
                                        <div style={{ marginBottom: '24px', textTransform: 'capitalize' }}>
                                            <Tag color={data.status === 'active' ? 'success' : 'default'}>
                                                {data.status || 'N/A'}
                                            </Tag>
                                            <Tag color={data.isDisabled ? 'red' : 'green'}>
                                                {data.isDisabled ? 'Disabled' : 'Enabled'}
                                            </Tag>
                                        </div>
                                    </div>
                                </div>
                                <Descriptions column={1} bordered size="small">
                                    <Descriptions.Item label="Position">{data.position ?? 'N/A'}</Descriptions.Item>
                                </Descriptions>

                                <Divider orientation="left">Description</Divider>
                                {data.description ? (
                                    <div style={{ marginBottom: '16px' }}>
                                        <Text>{data.description}</Text>
                                    </div>
                                ) : (
                                    <Text type="secondary">No description available.</Text>
                                )}
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <Text type="secondary">No author data available.</Text>
                            </div>
                        )}
                    </Spin>
                </Modal>
            </Col>
        );
    };

export default AuthorView;
