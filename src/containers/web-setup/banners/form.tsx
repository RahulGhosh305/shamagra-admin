import { FC, Fragment, useEffect, useState } from "react";
import Image from "next/image";
import { Constants } from "@utils/constants";
import { Col, Form, Input, Modal, Select, Button, FormInstance } from "antd";
import FeatherIcon from "feather-icons-react";
import { useUploadFileMutation } from "@redux/services/media-files/api";
import { InitialState } from "@containers/web-setup/banners";
import {
  AddBannerReq,
  BannerRes,
  UpdateBannerReq,
} from "@redux/services/web-setup/banners/type";

const BannerForm: FC<{
  form: FormInstance;
  state: InitialState;
  banner?: BannerRes;
  isLoading: boolean;
  addBanner: (data: AddBannerReq) => void;
  updateBanner: (data: UpdateBannerReq) => void;
  handleOk: (_id?: string) => void;
  handleCancel: () => void;
}> = ({
  form,
  state,
  banner,
  isLoading,
  addBanner,
  updateBanner,
  handleOk,
  handleCancel,
}) => {
    const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
    const validateMessages = { required: "${label} is required!" };
    const [uploadState, setUploadState] = useState({
      isUploading: false,
      percentage: 0,
      photo: "",
    });
    const [uploadFile] = useUploadFileMutation();

    useEffect(() => {
      if (banner?.data?._id && state.bannerId) {
        form.setFieldsValue({
          photo: banner?.data?.photo ?? "",
          name: banner?.data?.name ?? "",
          page: banner?.data?.page ?? "",
          description: banner?.data?.description ?? null,
          position: banner?.data?.position ?? null,
          bannerPlace: banner?.data?.bannerPlace ?? null,
          status: banner?.data?.status ?? "",
        });
        setUploadState((prev) => ({
          ...prev,
          photo: banner?.data?.photo ?? "",
        }));
      } else if (!state.bannerId) {
        setUploadState({ isUploading: false, percentage: 0, photo: "" });
      }
    }, [banner, form, state]);

    const handleSubmit = async (data: {
      photo: string;
      name: string;
      page: string;
      dataId: string;
      description: string;
      position: number;
      bannerPlace: string;
      status: string;
    }) => {
      if (banner?.data?._id && state.bannerId) {
        updateBanner({
          data: { ...data, _id: banner?.data?._id },
          action: handleOk,
        });
      } else addBanner({ data, action: handleOk });
    };

    const uploadToBackend = async (file: File) => {
      const formData = new FormData();
      formData.append("file", file);

      const data = await uploadFile(formData).unwrap();
      const fileData = Array.isArray(data.data) ? data.data[0] : data.data;
      return fileData;
    };

    const uploadBannerPhoto = async (file: File) => {
      setUploadState({ ...uploadState, isUploading: true });
      try {
        const res = await uploadToBackend(file);
        if (res?.url) {
          form.setFieldsValue({ photo: res.url });
          setUploadState({ ...uploadState, isUploading: false, photo: res.url });
        }
      } catch (err: any) {
        console.error("Upload error:", err);
        setUploadState({ ...uploadState, isUploading: false });
        alert(
          `Photo upload failed: ${err?.data?.message || err?.message || "Unknown error"}`,
        );
      }
    };

    const deleteBannerPhoto = (key: string) => {
      form.setFieldsValue({ photo: null });
      setUploadState({ ...uploadState, photo: "" });
    };

    const footerButtons = [
      <Button
        form="bannerForm"
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
          title="Banners Form"
          open={state.visible}
          onCancel={() => handleCancel()}
          footer={footerButtons}
        >
          <Form
            {...layout}
            name={"bannerForm"}
            form={form}
            id={"bannerForm"}
            validateMessages={validateMessages}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="photo"
              label={<span>Photo</span>}
              rules={[{ required: true }]}
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
                      onClick={() => deleteBannerPhoto(uploadState.photo)}
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
                    htmlFor="thumbnailUpload"
                  >
                    <FeatherIcon icon="upload" />
                    <span
                      aria-disabled={uploadState.isUploading}
                      style={{ verticalAlign: "super" }}
                    >
                      {uploadState.isUploading ? "Uploading..." : "Upload"}
                    </span>
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    id="thumbnailUpload"
                    className="hidden"
                    // onClick={event => event.target.value = null}
                    onChange={(event) =>
                      uploadBannerPhoto(event.target.files![0])
                    }
                  />
                </Fragment>
              )}
            </Form.Item>
            <Form.Item name="name" rules={[{ required: true }]} label="Name">
              <Input placeholder="Name" />
            </Form.Item>
            <Form.Item name="page" rules={[{ required: true }]} label="Page">
              <Select>
                {Constants.BANNER_PAGES &&
                  Constants.BANNER_PAGES.map((page, si) => (
                    <Select.Option key={si} value={page.value}>
                      {page.label}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="description"
              rules={[{ required: true }]}
              label="Description"
            >
              <Input.TextArea placeholder="Description" />
            </Form.Item>
            <Form.Item
              name="position"
              rules={[{ required: true }]}
              label="Position"
            >
              <Input type="number" placeholder="Position" />
            </Form.Item>
            <Form.Item
              name="bannerPlace"
              rules={[{ required: true }]}
              label="Banner Place"
            >
              <Select>
                {Constants.BANNER_POSITIONS &&
                  Constants.BANNER_POSITIONS.map((page, si) => (
                    <Select.Option key={si} value={page.value}>
                      {page.label}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item name="status" rules={[{ required: true }]} label="Status">
              <Select>
                {Constants.STATUS.map((status, si) => (
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

export default BannerForm;
