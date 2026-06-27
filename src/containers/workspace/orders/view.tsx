import { FC } from "react";
import { Modal, Descriptions, Image, Typography, Tag, Divider, Row, Col, Spin } from "antd";
import { InitialState } from "@containers/workspace/orders";
import { OrderRes } from "@redux/services/workspace/orders/type";
import FeatherIcon from "feather-icons-react";

const { Title, Text } = Typography;

const OrderView: FC<{
    state: InitialState;
    order?: OrderRes;
    isLoading: boolean;
    handleCancel: () => void;
}> = ({
    state,
    order,
    isLoading,
    handleCancel,
}) => {
        const data = order?.data;
        console.log("Data", data)
        return (
            <Col md={12}>
                <Modal
                    title={`Order Details : ${data?.orderNumber}`}
                    open={state.viewVisible}
                    onCancel={() => handleCancel()}
                    footer={null}
                    width={1500}
                >
                    <Spin spinning={isLoading}>
                        {data ? (

                            <div>
                                {/* <Row gutter={[24, 24]}>
                                    <Col xs={24} md={6}>
                                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                            {data.photo ? (
                                                <Image
                                                    width={240}
                                                    src={data.photo}
                                                    alt={data.product?.title}
                                                    style={{ borderRadius: '8px', objectFit: 'cover' }}
                                                />
                                            ) : (
                                                <div style={{ background: '#f5f5f5', height: '300px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px' }}>
                                                    <FeatherIcon icon="image" size={48} color="#ccc" />
                                                </div>
                                            )}
                                        </div>
                                    </Col>
                                    <Col xs={24} md={18}>
                                        <Title level={3} style={{ marginTop: 0, marginBottom: 8 }}>{data.product?.title}</Title>
                                        {data.product?.subTitle && <Text type="secondary" style={{ fontSize: '16px', display: 'block', marginBottom: '16px' }}>{data.product.subTitle}</Text>}

                                        <div style={{ marginBottom: '24px', textTransform: 'capitalize' }}>
                                            <Tag color={data.status === 'active' ? 'success' : 'default'}>
                                                {data.status || 'N/A'}
                                            </Tag>
                                            <Tag color="blue">{data.category?.name || data.specifications?.category?.name || 'Uncategorized'}</Tag>
                                        </div>

                                        <Descriptions column={2} bordered size="small">
                                            <Descriptions.Item label="Product Code">{data.product?.productCode}</Descriptions.Item>
                                            <Descriptions.Item label="Author">{data.product?.author}</Descriptions.Item>
                                            <Descriptions.Item label="Original Price">{(data.pricing?.originalPrice) ? `$${data.pricing.originalPrice}` : 'N/A'}</Descriptions.Item>
                                            <Descriptions.Item label="Discount Price">
                                                <Text type="success" strong>{(data.pricing?.discountPrice) ? `$${data.pricing.discountPrice}` : 'N/A'}</Text>
                                                {data.pricing?.discountPercentage ? ` (${data.pricing.discountPercentage}%)` : null}
                                            </Descriptions.Item>
                                            <Descriptions.Item label="Rating">
                                                {data.rating?.averageScore} / 5 ({data.rating?.totalReviews} reviews)
                                            </Descriptions.Item>
                                            <Descriptions.Item label="SKU">{data.specifications?.sku || 'N/A'}</Descriptions.Item>
                                        </Descriptions>
                                    </Col>
                                </Row> */}

                                {/* <Divider orientation="left">Description</Divider>
                                {data.description?.short && (
                                    <div style={{ marginBottom: '16px' }}>
                                        <Text strong>Short Description: </Text>
                                        <Text>{data.description.short}</Text>
                                    </div>
                                )}
                                {data.description?.long && (
                                    <div style={{ marginBottom: '16px' }}>
                                        <Text strong>Long Description: </Text>
                                        <Text>{data.description.long}</Text>
                                    </div>
                                )}
                                {data.description?.support && (
                                    <div>
                                        <Text strong>Support Info: </Text>
                                        <Text>{data.description.support}</Text>
                                    </div>
                                )} */}
                                <Divider orientation="left">User Information</Divider>
                                <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }} bordered size="small" style={{ overflowX: 'auto' }}>
                                    <Descriptions.Item label="Full Name">{data.user?.firstName + " " + data.user?.lastName || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Phone">{data.user?.phone || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Email">{data.user?.email || 'N/A'}</Descriptions.Item>
                                </Descriptions>


                                <Divider orientation="left">Shipping Address</Divider>
                                <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }} bordered size="small" style={{ overflowX: 'auto' }}>
                                    <Descriptions.Item label="Apartment">{data.shippingAddress?.apartment || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="City">{data.shippingAddress?.city || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="District">{data.shippingAddress?.district || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="State">{data.shippingAddress?.state || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Street Address">{data.shippingAddress?.streetAddress || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Thana">{data.shippingAddress?.thana || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="zipCode">{data.shippingAddress?.zipCode || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="country">{data.shippingAddress?.country || 'N/A'}</Descriptions.Item>
                                </Descriptions>

                                {(data.items && data.items.length > 0) && (
                                    <>
                                        <Divider orientation="left">Order Items</Divider>
                                        <ul>
                                            {data.items.map((item, idx) => (
                                                <li key={idx}>
                                                    <Descriptions column={2} bordered size="small" style={{ overflowX: 'auto' }}>
                                                        <Descriptions.Item label="Product Code">{item?.productCode || 'N/A'}</Descriptions.Item>
                                                        <Descriptions.Item label="Product Title">{item?.productTitle || 'N/A'}</Descriptions.Item>
                                                        <Descriptions.Item label="Product Quantity">{item?.quantity || 'N/A'}</Descriptions.Item>
                                                        <Descriptions.Item label="Unit Price">{item?.unitPrice || 'N/A'}</Descriptions.Item>
                                                    </Descriptions>
                                                </li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                <Divider orientation="left">Payment Information</Divider>
                                <Descriptions column={2} bordered size="small" style={{ overflowX: 'auto' }}>
                                    <Descriptions.Item label="Payment Method">{data.payment?.method || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Transaction Id">{data.payment?.transactionId || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Payment Status">{data.payment?.status || 'N/A'}</Descriptions.Item>
                                </Descriptions>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <Text type="secondary">No product data available.</Text>
                            </div>
                        )}
                    </Spin>
                </Modal>
            </Col >
        );
    };

export default OrderView;
