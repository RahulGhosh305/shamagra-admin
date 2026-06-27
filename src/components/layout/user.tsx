import React, { FormEvent, Fragment, useState } from "react";
import { InfoWraper, UserDropDwon } from "@styles/auth-info-style";
import { Avatar, Col, Form, Input, Modal, Popover, Select } from "antd";
import Link from "next/link";
import FeatherIcon from "feather-icons-react";
import { userInfo } from "@utils/auth";
import {
  useChangePasswordMutation,
  useLogOutMutation,
} from "@redux/services/auth/api";
import { useRouter } from "next/router";

const User = () => {
  const router = useRouter();
  const user = userInfo();
  const [logOut] = useLogOutMutation();
  const [changePasswordAction, changePasswordParams] =
    useChangePasswordMutation();

  const [form] = Form.useForm();
  const layout = { labelCol: { span: 8 }, wrapperCol: { span: 16 } };
  const validateMessages = { required: "${label} is required!" };
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const passwordHandle = () => {
    form
      .validateFields()
      .then((values) => {
        changePasswordAction({
          data: {
            _id: user._id,
            ...values,
          },
          action: () => logOut({ action: () => router.replace("/signin") }),
        });
        form.resetFields();
        setIsModalOpen(false);
      })
      .catch((errorInfo) => {
        console.log("Form validation failed:", errorInfo);
      });
  };

  const userContent = (
    <UserDropDwon>
      <div className="user-dropdwon">
        <figure className="user-dropdwon__info">
          <img src={"/assets/images/chat-auth.png"} alt="" />
          <figcaption>
            <h5
              style={{ margin: 0 }}
            >{`${user?.firstName} ${user?.lastName}`}</h5>
            <p style={{ margin: 0 }}>{user.email}</p>

            {user.vendor._id ? (
              <Fragment>
                <p style={{ margin: 0 }}>
                  {user.vendor?.organization?.designation},{" "}
                  {user.vendor.organization?.department}
                </p>
                <p style={{ margin: 0 }}>{user.vendor?.organization?.name}</p>
              </Fragment>
            ) : null}
          </figcaption>
        </figure>
        <ul className="user-dropdwon__links">
          <li>
            <Link href="/" onClick={showModal}>
              <FeatherIcon icon="user" /> Change Password
            </Link>
          </li>
        </ul>
        <Link
          href={""}
          className="user-dropdwon__bottomAction"
          onClick={(e) => {
            e.preventDefault();
            logOut({ action: () => router.replace("/signin") });
          }}
        >
          <FeatherIcon icon="log-out" /> Sign Out
        </Link>
      </div>
    </UserDropDwon>
  );

  return (
    <InfoWraper>
      <Col md={12}>
        <Modal
          title="Change Password"
          open={isModalOpen}
          onOk={passwordHandle}
          onCancel={handleCancel}
        >
          <Form
            {...layout}
            form={form} // Pass the form instance here
            validateMessages={validateMessages}
          >
            <Form.Item
              name="currentPassword"
              label="Current Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>
            <Form.Item
              name="password"
              label="New Password"
              rules={[{ required: true }]}
            >
              <Input type="password" />
            </Form.Item>
          </Form>
        </Modal>
      </Col>
      <div className="nav-author">
        <Popover
          placement="bottomRight"
          content={userContent}
          trigger={"click"}
        >
          <Link href="" className="head-example">
            <Avatar src={"/assets/images/avatar.png"} />
          </Link>
        </Popover>
      </div>
    </InfoWraper>
  );
};

export default User;
