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
import { InitialState } from "@containers/workspace/products";
import {
  AddProductReq,
  ProductRes,
  UpdateProductReq,
} from "@redux/services/workspace/products/type";
import { SimpleRes } from "@redux/services/utilities/type";
import { useUploadFileMutation } from "@redux/services/media-files/api";
import FeatherIcon from "feather-icons-react";
// import { deleteFile, uploadPhoto } from "@utils/upload";

const ProductForm: FC<{
  form: FormInstance;
  state: InitialState;
  categories?: SimpleRes;
  product?: ProductRes;
  isLoading: boolean;
  addProduct: (data: AddProductReq) => void;
  updateProduct: (data: UpdateProductReq) => void;
  handleOk: (_id?: string) => void;
  handleCancel: () => void;
}> = ({
  form,
  state,
  categories,
  product,
  isLoading,
  addProduct,
  updateProduct,
  handleOk,
  handleCancel,
}) => {
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    const validateMessages = { required: "${label} is required!" };
    const [uploadState, setUploadState] = useState({
      isUploadingPhoto: false,
      isUploadingFile: false,
      percentage: 0,
      photo: "",
      file: "",
    });
    const [uploadFile] = useUploadFileMutation();
    const discountPercentageValue = Form.useWatch("discountPercentage", form);

    useEffect(() => {
      if (product?.data?._id && state.productId) {
        form.setFieldsValue({
          categoryId: product?.data?.specifications?.category?._id ?? "",
          photo: product?.data?.photo ?? "",
          title: product?.data?.product?.title ?? "",
          productCode: product?.data?.product?.productCode ?? "",
          subTitle: product?.data?.product?.subTitle ?? "",
          author: product?.data?.product?.author ?? "",
          descriptionShort: product?.data?.description?.short ?? "",
          authorDescription: product?.data?.authorDescription ?? "",
          descriptionLong: product?.data?.description?.long ?? "",
          purchasePrice: product?.data?.pricing?.purchasePrice ?? "",
          originalPrice: product?.data?.pricing?.originalPrice ?? "",
          discountPrice: product?.data?.pricing?.discountPrice ?? "",
          discountPercentage: product?.data?.pricing?.discountPercentage ?? "",
          dimensions: product?.data?.specifications?.dimensions ?? "",
          weight: product?.data?.specifications?.weight ?? "",
          sku: product?.data?.specifications?.sku ?? "",
          originCountry: product?.data?.specifications?.originCountry ?? "",
          format: product?.data?.specifications?.format ?? "",
          totalPages: product?.data?.specifications?.totalPages ?? "",
          publishYear: product?.data?.specifications?.publishYear ?? "",
          language: product?.data?.specifications?.language ?? "",
          status: product?.data?.status ?? "",
        });

        // Initialize preview states for existing photos and files
        setUploadState((prev) => ({
          ...prev,
          photo: product?.data?.photo ?? "",
          file: product?.data?.file ?? "",
        }));
      } else if (!state.productId) {
        // Clear previews when switching to add mode
        setUploadState({
          isUploadingPhoto: false,
          isUploadingFile: false,
          percentage: 0,
          photo: "",
          file: "",
        });
      }
    }, [product, form, state]);

    const handleSubmit = async (data: {
      categoryId: string;
      photo: string;
      file: string;
      title: string;
      price: string;
      descriptionShort: string;
      authorDescription: string;
      descriptionLong: string;
      status: string;
    }) => {
      if (product?.data?._id && state.productId) {
        updateProduct({
          data: { ...data, _id: product?.data?._id },
          action: handleOk,
        });
      } else addProduct({ data, action: handleOk });
    };

    const uploadToBackend = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const data = await uploadFile(formData).unwrap();
        // the controller returns an array for upload.array(), grab the first item
        const fileData = Array.isArray(data.data) ? data.data[0] : data.data;
        return fileData; // { url, public_id }
      } catch (error: any) {
        throw new Error(
          error?.data?.message || error?.message || "Upload failed from backend",
        );
      }
    };

    const uploadProductPhoto = async (file: File) => {
      setUploadState({ ...uploadState, isUploadingPhoto: true });
      try {
        const res = await uploadToBackend(file);
        if (res?.url) {
          form.setFieldsValue({ photo: res.url });
          setUploadState({
            ...uploadState,
            isUploadingPhoto: false,
            photo: res.url,
          });
        }
      } catch (err: any) {
        console.error("Upload error:", err);
        setUploadState({ ...uploadState, isUploadingPhoto: false });
        alert(`Photo upload failed: ${err.message}`);
      }
    };

    const deleteProductPhoto = (key: string) => {
      form.setFieldsValue({ photo: null });
      setUploadState({ ...uploadState, photo: "" });
    };

    const uploadProductFile = async (file: File) => {
      if (
        file.type !== "application/pdf" &&
        !file.name.toLowerCase().endsWith(".pdf")
      ) {
        alert("শুধুমাত্র PDF ফাইল আপলোড করা যাবে! (Only PDF files are allowed)");
        return;
      }

      setUploadState({ ...uploadState, isUploadingFile: true });
      try {
        const res = await uploadToBackend(file);
        if (res?.url) {
          form.setFieldsValue({ file: res.url });
          setUploadState({
            ...uploadState,
            isUploadingFile: false,
            file: res.url,
          });
        }
      } catch (err: any) {
        console.error("Upload error:", err);
        setUploadState({ ...uploadState, isUploadingFile: false });
        alert(`File upload failed: ${err.message}`);
      }
    };

    const deleteProductFile = (key: string) => {
      form.setFieldsValue({ file: null });
      setUploadState({ ...uploadState, file: "" });
    };

    const calculateDiscount = () => {
      const originalPrice = Number(form.getFieldValue("originalPrice")) || 0;
      const discountPercentage = Number(form.getFieldValue("discountPercentage")) || 0;
      if (originalPrice >= 0 && discountPercentage > 0) {
        const discountPrice = Math.round(originalPrice - (originalPrice * discountPercentage) / 100);
        form.setFieldsValue({ discountPrice });
      }
    };

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
          title="Products Form"
          open={state.editVisible}
          onCancel={() => handleCancel()}
          footer={footerButtons}
          width={1500}
        >
          <Form
            {...layout}
            name={"productForm"}
            form={form}
            id={"productForm"}
            validateMessages={validateMessages}
            onFinish={handleSubmit}
          >
            <Row>
              <Col md={8}>
                <Form.Item
                  name="photo"
                  label={<span>Photo</span>}
                  rules={[{ required: false }]}
                  initialValue={null}
                >
                  {uploadState.photo ? (
                    <Fragment>
                      <div>
                        <img
                          className="border-radius-3"
                          height={80}
                          src={uploadState.photo}
                          alt=""
                        />
                      </div>
                      <div className="minimum-mt">
                        <Button
                          size="small"
                          type="ghost"
                          className="minimum-mr color-danger border-danger"
                          icon={<FeatherIcon icon="trash" size={14} />}
                          onClick={() => deleteProductPhoto(uploadState.photo)}
                        />
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <label
                        className={
                          uploadState.photo
                            ? "hidden"
                            : "ant-btn sc-fMiknA kzFbZB btn-outlined ant-btn-light ant-btn-lg"
                        }
                        htmlFor="photoUpload"
                      >
                        <FeatherIcon icon="upload" />
                        <span
                          aria-disabled={uploadState.isUploadingPhoto}
                          style={{ verticalAlign: "super" }}
                        >
                          {uploadState.isUploadingPhoto ? "Uploading..." : "Upload"}
                        </span>
                      </label>
                      <input
                        type="file"
                        id="photoUpload"
                        className="hidden"
                        // onClick={event => event.target.value = null}
                        onChange={(event) =>
                          uploadProductPhoto(event.target.files![0])
                        }
                      />
                    </Fragment>
                  )}
                </Form.Item>
                <Form.Item
                  name="file"
                  label={<span>File</span>}
                  rules={[{ required: false }]}
                  initialValue={null}
                >
                  {uploadState.file ? (
                    <Fragment>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "6px",
                          padding: "4px",
                          border: "1px dashed #d9d9d9",
                          borderRadius: "4px",
                          background: "#fafafa",
                        }}
                      >
                        <FeatherIcon
                          icon="file-text"
                          size={32}
                          style={{ color: "#ff4d4f" }}
                        />
                        <div>PDF Uploaded</div>
                      </div>
                      <div className="minimum-mt">
                        <Button
                          size="small"
                          type="ghost"
                          className="minimum-mr color-danger border-danger"
                          icon={<FeatherIcon icon="trash" size={14} />}
                          onClick={() => deleteProductFile(uploadState.file)}
                        />
                      </div>
                    </Fragment>
                  ) : (
                    <Fragment>
                      <label
                        className={
                          uploadState.file
                            ? "hidden"
                            : "ant-btn sc-fMiknA kzFbZB btn-outlined ant-btn-light ant-btn-lg"
                        }
                        htmlFor="fileUpload"
                      >
                        <FeatherIcon icon="upload" />
                        <span
                          aria-disabled={uploadState.isUploadingFile}
                          style={{ verticalAlign: "super" }}
                        >
                          {uploadState.isUploadingFile ? "Uploading..." : "Upload"}
                        </span>
                      </label>
                      <input
                        type="file"
                        accept=".pdf,application/pdf"
                        id="fileUpload"
                        className="hidden"
                        // onClick={event => event.target.value = null}
                        onChange={(event) =>
                          uploadProductFile(event.target.files![0])
                        }
                      />
                    </Fragment>
                  )}
                </Form.Item>
                <Form.Item
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
                </Form.Item>
                <Form.Item
                  name="title"
                  rules={[{ required: true }]}
                  label="Book Title"
                >
                  <Input placeholder="Title" />
                </Form.Item>
                <Form.Item
                  name="productCode"
                  rules={[{ required: true }]}
                  label="Product Code"
                >
                  <Input placeholder="Product Code" />
                </Form.Item>
                <Form.Item
                  name="subTitle"
                  rules={[{ required: false }]}
                  label="Sub Title"
                >
                  <Input placeholder="Sub Title" />
                </Form.Item>
                <Form.Item
                  name="author"
                  rules={[{ required: true }]}
                  label="Author"
                >
                  <Input placeholder="Author" />
                </Form.Item>
                <Form.Item
                  name="purchasePrice"
                  rules={[{ required: true }]}
                  label="Purchase Price"
                >
                  <Input placeholder="Purchase Price" type="number" />
                </Form.Item>
                <Form.Item
                  name="originalPrice"
                  rules={[{ required: true }]}
                  label="Original Price"
                >
                  <Input placeholder="Original Price" type="number" onChange={calculateDiscount} />
                </Form.Item>
                <Form.Item
                  name="discountPercentage"
                  rules={[{ required: false }]}
                  label="Discount Percentage"
                >
                  <Input placeholder="Discount Percentage" type="number" onChange={calculateDiscount} />
                </Form.Item>
              </Col>

              <Col md={8}>
                <Form.Item
                  name="discountPrice"
                  rules={[{ required: true }]}
                  label="Discount Price"
                >
                  <Input placeholder="Discount Price" type="number" disabled={!!discountPercentageValue && Number(discountPercentageValue) > 0} />
                </Form.Item>
                <Form.Item
                  name="format"
                  rules={[{ required: true }]}
                  label="Format"
                >
                  <Input placeholder="Book Format" />
                </Form.Item>
                <Form.Item
                  name="totalPages"
                  rules={[{ required: true }]}
                  label="Total Pages"
                >
                  <Input placeholder="Total Pages" />
                </Form.Item>
                <Form.Item
                  name="publishYear"
                  rules={[{ required: false }]}
                  label="Publish Year"
                >
                  <Input placeholder="Publish Year" />
                </Form.Item>
                <Form.Item
                  name="language"
                  rules={[{ required: true }]}
                  label="Language"
                >
                  <Input placeholder="Language" />
                </Form.Item>
                <Form.Item
                  name="sku"
                  rules={[{ required: false }]}
                  label="SKU"
                >
                  <Input placeholder="SKU" />
                </Form.Item>
                <Form.Item
                  name="dimensions"
                  rules={[{ required: false }]}
                  label="Dimensions"
                >
                  <Input placeholder="Dimensions" />
                </Form.Item>
                <Form.Item
                  name="weight"
                  rules={[{ required: false }]}
                  label="Weight"
                >
                  <Input placeholder="Weight" />
                </Form.Item>
                <Form.Item
                  name="originCountry"
                  rules={[{ required: true }]}
                  label="Origin Country"
                >
                  <Input placeholder="Origin Country" />
                </Form.Item>
              </Col>

              <Col md={8}>
                <Form.Item
                  name="descriptionShort"
                  rules={[{ required: false }]}
                  label="Description Short"
                >
                  <Input.TextArea rows={5} placeholder="Description Short" />
                </Form.Item>
                <Form.Item
                  name="descriptionLong"
                  rules={[{ required: true }]}
                  label="Description Long"
                >
                  <Input.TextArea rows={5} placeholder="Description Long" />
                </Form.Item>
                <Form.Item
                  name="authorDescription"
                  rules={[{ required: true }]}
                  label="Author Description"
                >
                  <Input.TextArea rows={5} placeholder="Author Description" />
                </Form.Item>
                <Form.Item
                  name="status"
                  rules={[{ required: true }]}
                  label="Status"
                >
                  <Select>
                    {Constants.STATUS.map((status, si) => (
                      <Select.Option key={si} value={status.value}>
                        {status.label}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Modal>
      </Col>
    );
  };

export default ProductForm;
