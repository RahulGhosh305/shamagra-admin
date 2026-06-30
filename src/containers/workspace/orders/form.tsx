import { FC, Fragment, useEffect, useState } from "react";
import { Constants } from "@utils/constants";
import {
  Col,
  Form,
  Input,
  Modal,
  Select,
  Button,
  FormInstance,
  Row,
} from "antd";
import { InitialState } from "@containers/workspace/orders";
import {
  AddOrderReq,
  OrderRes,
  UpdateOrderReq,
} from "@redux/services/workspace/orders/type";
import { SimpleRes } from "@redux/services/utilities/type";
import { useUploadFileMutation } from "@redux/services/media-files/api";
import FeatherIcon from "feather-icons-react";
// import { deleteFile, uploadPhoto } from "@utils/upload";

const ProductForm: FC<{
  form: FormInstance;
  state: InitialState;
  categories?: SimpleRes;
  order?: OrderRes;
  isLoading: boolean;
  addOrder: (data: AddOrderReq) => void;
  updateOrder: (data: UpdateOrderReq) => void;
  handleOk: (_id?: string) => void;
  handleCancel: () => void;
}> = ({
  form,
  state,
  categories,
  order,
  isLoading,
  addOrder,
  updateOrder,
  handleOk,
  handleCancel,
}) => {
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    const validateMessages = { required: "${label} is required!" };
    // const [uploadState, setUploadState] = useState({
    //   isUploading: false,
    //   percentage: 0,
    //   photo: "",
    //   file: "",
    // });
    // const [uploadFile] = useUploadFileMutation();

    useEffect(() => {
      if (order?.data?._id && state.orderId) {
        form.setFieldsValue({
          // categoryId: product?.data?.specifications?.category?._id ?? "",
          // photo: product?.data?.photo ?? "",
          firstName: order?.data?.user?.firstName ?? "",
          lastName: order?.data?.user?.lastName ?? "",
          // productCode: product?.data?.product?.productCode ?? "",
          orderNumber: order?.data?.orderNumber ?? "",
          apartment: order?.data?.shippingAddress?.apartment ?? "",
          thana: order?.data?.shippingAddress?.thana ?? "",
          city: order?.data?.shippingAddress?.city ?? "",
          district: order?.data?.shippingAddress?.district ?? "",
          // originalPrice: product?.data?.pricing?.originalPrice ?? "",
          // discountPrice: product?.data?.pricing?.discountPrice ?? "",
          // discountPercentage: product?.data?.pricing?.discountPercentage ?? "",
          // dimensions: product?.data?.specifications?.dimensions ?? "",
          // weight: product?.data?.specifications?.weight ?? "",
          // sku: product?.data?.specifications?.sku ?? "",
          // originCountry: product?.data?.specifications?.originCountry ?? "",
          // format: product?.data?.specifications?.format ?? "",
          // totalPages: product?.data?.specifications?.totalPages ?? "",
          // publishDate: product?.data?.specifications?.publishDate ?? "",
          // language: product?.data?.specifications?.language ?? "",
          orderStatus: order?.data?.orderStatus ?? "",
        });

        // Initialize preview states for existing photos and files
        // setUploadState((prev) => ({
        //   ...prev,
        //   photo: product?.data?.photo ?? "",
        //   file: product?.data?.file ?? "",
        // }));
      } else if (!state.orderId) {
        // Clear previews when switching to add mode
        // setUploadState({
        //   isUploading: false,
        //   percentage: 0,
        //   photo: "",
        //   file: "",
        // });
      }
    }, [order, form, state]);

    const handleSubmit = async (data: any) => {
      if (order?.data?._id && state.orderId) {
        updateOrder({
          data: { orderStatus: data.orderStatus, _id: order?.data?._id },
          action: handleOk,
        });
      }
      // else addOrder({ data, action: handleOk });
    };

    // const uploadToBackend = async (file: File) => {
    //   const formData = new FormData();
    //   formData.append("file", file);

    //   try {
    //     const data = await uploadFile(formData).unwrap();
    //     // the controller returns an array for upload.array(), grab the first item
    //     const fileData = Array.isArray(data.data) ? data.data[0] : data.data;
    //     return fileData; // { url, public_id }
    //   } catch (error: any) {
    //     throw new Error(
    //       error?.data?.message || error?.message || "Upload failed from backend",
    //     );
    //   }
    // };

    // const uploadProductPhoto = async (file: File) => {
    //   setUploadState({ ...uploadState, isUploading: true });
    //   try {
    //     const res = await uploadToBackend(file);
    //     if (res?.url) {
    //       form.setFieldsValue({ photo: res.url });
    //       setUploadState({
    //         ...uploadState,
    //         isUploading: false,
    //         photo: res.url,
    //       });
    //     }
    //   } catch (err: any) {
    //     console.error("Upload error:", err);
    //     setUploadState({ ...uploadState, isUploading: false });
    //     alert(`Photo upload failed: ${err.message}`);
    //   }
    // };

    // const deleteProductPhoto = (key: string) => {
    //   form.setFieldsValue({ photo: null });
    //   setUploadState({ ...uploadState, photo: "" });
    // };

    // const uploadProductFile = async (file: File) => {
    //   if (
    //     file.type !== "application/pdf" &&
    //     !file.name.toLowerCase().endsWith(".pdf")
    //   ) {
    //     alert("শুধুমাত্র PDF ফাইল আপলোড করা যাবে! (Only PDF files are allowed)");
    //     return;
    //   }

    //   setUploadState({ ...uploadState, isUploading: true });
    //   try {
    //     const res = await uploadToBackend(file);
    //     if (res?.url) {
    //       form.setFieldsValue({ file: res.url });
    //       setUploadState({
    //         ...uploadState,
    //         isUploading: false,
    //         file: res.url,
    //       });
    //     }
    //   } catch (err: any) {
    //     console.error("Upload error:", err);
    //     setUploadState({ ...uploadState, isUploading: false });
    //     alert(`File upload failed: ${err.message}`);
    //   }
    // };

    // const deleteProductFile = (key: string) => {
    //   form.setFieldsValue({ file: null });
    //   setUploadState({ ...uploadState, file: "" });
    // };

    const footerButtons = [
      <Button
        form="productForm"
        key="submit"
        htmlType="submit"
        type="primary"
        disabled={isLoading}
      >
        {isLoading ? "Loading..." : "Submit"}
      </Button>,
    ];

    return (
      <Col md={12}>
        <Modal
          title="Order Form"
          open={state.editVisible}
          onCancel={() => handleCancel()}
          footer={footerButtons}
        >
          <Form
            {...layout}
            name={"productForm"}
            form={form}
            id={"productForm"}
            validateMessages={validateMessages}
            onFinish={handleSubmit}
          >

            {/* <Form.Item
                  name="categoryId"
                  rules={[{ required: true }]}
                  label="Category"
                >
                  <Select>
                    <Select.Option value="">Category</Select.Option>
                    {categories?.data?.map((item: any, idx: number) => (
                      <Select.Option value={item._id} key={idx}>
                        {item.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item> */}
            <Form.Item
              name="orderNumber"
              rules={[{ required: true }]}
              label="Order Number"
            >
              <Input placeholder="Order Number" disabled />
            </Form.Item>
            <Form.Item
              name="firstName"
              rules={[{ required: true }]}
              label="First Name"
            >
              <Input placeholder="firstName" />
            </Form.Item>
            <Form.Item
              name="lastName"
              rules={[{ required: true }]}
              label="Last Name"
            >
              <Input placeholder="Last Name" />
            </Form.Item>
            <Form.Item
              name="apartment"
              rules={[{ required: true }]}
              label="Apartment"
            >
              <Input placeholder="Apartment" />
            </Form.Item>
            <Form.Item
              name="city"
              rules={[{ required: true }]}
              label="City"
            >
              <Input placeholder="City" />
            </Form.Item>
            <Form.Item
              name="thana"
              rules={[{ required: true }]}
              label="Thana"
            >
              <Input placeholder="Thana" />
            </Form.Item>
            <Form.Item
              name="district"
              rules={[{ required: true }]}
              label="District"
            >
              <Input placeholder="district" />
            </Form.Item>
            <Form.Item
              name="orderStatus"
              rules={[{ required: true }]}
              label="Status"
            >
              <Select>
                {Constants.ORDER_WITH_SHIPPING_STATUS.map((status, si) => (
                  <Select.Option key={si} value={status.value}>
                    {status.label}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>

          </Form>
        </Modal>
      </Col>
    );
  };

export default ProductForm;
