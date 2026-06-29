import { AuthWrapper } from "@styles/auth-info-style";
import { Button, Form, Input } from "antd";
import { useSignInMutation } from "@redux/services/auth/api";
import { SignInReq } from "@redux/services/auth/type";
import { useRouter } from "next/router";
import Image from "next/image";

const Signin = () => {
  const router = useRouter();
  const [form] = Form.useForm();
  const [signInAction, signInParams] = useSignInMutation();

  const handleSubmit = (data: SignInReq["data"]) => {
    signInAction({
      data: data,
      action: () => {
        const search = window.location.search;
        const params = new URLSearchParams(search);
        const redirect = params.get("redirect");

        if (redirect) {
          router.replace(redirect);
        } else {
          router.replace("/");
        }

        // setTimeout(() => {
        //     router.reload()
        // }, 250)
      },
    });
  };

  return (
    <AuthWrapper>
      <div className="auth-contents">
        <Form
          name="login"
          className="login-form"
          form={form}
          onFinish={handleSubmit}
          layout="vertical"
        >
          <h3 style={{ paddingBottom: "40px", textAlign: "center" }}>
            <Image
              src={"/assets/images/LOGO_BANGLA@2x.png"}
              alt=""
              width={160}
              height={80}
            />
          </h3>
          <Form.Item
            name="email"
            rules={[{ message: "Please input your Email!", required: true }]}
            label="Email or Username"
          >
            <Input placeholder={"Email or Username"} />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ message: "Please input your Password!", required: true }]}
            label="Password"
          >
            <Input placeholder="Password" type={"password"} />
          </Form.Item>
          <Form.Item className="text-center">
            <Button
              className="btn-signin mt-10"
              htmlType="submit"
              type="primary"
              size="large"
              disabled={signInParams.isLoading}
            >
              {signInParams.isLoading ? "Loading..." : "Sign In"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </AuthWrapper>
  );
};

export default Signin;
