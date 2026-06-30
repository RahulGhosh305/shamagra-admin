import { FC } from "react";
import { Modal, Descriptions, Image, Typography, Tag, Divider, Row, Col, Spin } from "antd";
import { InitialState } from "@containers/workspace/products";
import { ProductRes } from "@redux/services/workspace/products/type";
import FeatherIcon from "feather-icons-react";

const { Title, Text } = Typography;

const ProductView: FC<{
    state: InitialState;
    product?: ProductRes;
    isLoading: boolean;
    handleCancel: () => void;
}> = ({
    state,
    product,
    isLoading,
    handleCancel,
}) => {
        const data = product?.data;

        return (
            <Col md={12}>
                <Modal
                    title="Products Details"
                    open={state.viewVisible}
                    onCancel={() => handleCancel()}
                    footer={null}
                    width={1500}
                >
                    <Spin spinning={isLoading}>
                        {data ? (
                            <div>
                                <Row gutter={[24, 24]}>
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
                                        <Text style={{ fontSize: '16px', display: 'block', marginBottom: '16px' }}>লেখক: {data.product?.author || 'N/A'}</Text>
                                        {data.product?.subTitle && <Text type="secondary" style={{ fontSize: '16px', display: 'block', marginBottom: '16px' }}>{data.product.subTitle}</Text>}

                                        <div style={{ marginBottom: '24px', textTransform: 'capitalize' }}>
                                            <Tag color={data.status === 'active' ? 'success' : 'default'}>
                                                {data.status || 'N/A'}
                                            </Tag>
                                            <Tag color="blue">{data.category?.name || data.specifications?.category?.name || 'Uncategorized'}</Tag>
                                        </div>

                                        <Descriptions column={2} bordered size="small">
                                            <Descriptions.Item label="Product Code">{data.product?.productCode}</Descriptions.Item>
                                            <Descriptions.Item label="Purchase Price">{data.pricing?.purchasePrice}</Descriptions.Item>
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
                                </Row>

                                <Divider orientation="left">Description</Divider>
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
                                {(data.description as any)?.support && (
                                    <div>
                                        <Text strong>Support Info: </Text>
                                        <Text>{(data.description as any).support}</Text>
                                    </div>
                                )}

                                <Divider orientation="left">Specifications</Divider>
                                <Descriptions column={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, xxl: 3 }} bordered size="small" style={{ overflowX: 'auto' }}>
                                    <Descriptions.Item label="Format">{data.specifications?.format || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Total Pages">{data.specifications?.totalPages || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Publish Date">{data.specifications?.publishYear || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Language">{data.specifications?.language || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Origin Country">{data.specifications?.originCountry || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Dimensions">{data.specifications?.dimensions || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Weight">{data.specifications?.weight || 'N/A'}</Descriptions.Item>
                                </Descriptions>

                                {(data.features && data.features.length > 0) && (
                                    <>
                                        <Divider orientation="left">Features</Divider>
                                        <ul>
                                            {data.features.map((feature, idx) => (
                                                <li key={idx}><Text>{feature}</Text></li>
                                            ))}
                                        </ul>
                                    </>
                                )}

                                <Divider orientation="left">Shipping Information</Divider>
                                <Descriptions column={2} bordered size="small" style={{ overflowX: 'auto' }}>
                                    <Descriptions.Item label="Free Shipping Threshold">{data.shippingInfo?.freeShippingThreshold || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Return Policy">{data.shippingInfo?.returnPolicy || 'N/A'}</Descriptions.Item>
                                    <Descriptions.Item label="Secure Shopping">{data.shippingInfo?.secureShopping || 'N/A'}</Descriptions.Item>
                                </Descriptions>
                            </div>
                        ) : (
                            <div style={{ textAlign: 'center', padding: '40px' }}>
                                <Text type="secondary">No product data available.</Text>
                            </div>
                        )}
                    </Spin>
                </Modal>
            </Col>
        );
    };

export default ProductView;
