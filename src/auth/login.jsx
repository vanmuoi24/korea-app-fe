import React, { use } from "react";
import { Card, Form, Input, Button, Checkbox } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { login } from "../service/formAPI";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navi = useNavigate();
  const handleFinish = async (values) => {
    try {
      const response = await login(values);
      if (response.data?.success) {
        toast.success("Đăng nhập thành công!");
        localStorage.setItem("token", response.data.data.token);
        setTimeout(() => {
          navi("/admin/managerInformation");
        });
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(`Đăng nhập thất bại tài khoản hoặc mật khẩu không đúng!`);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        background: "#f0f2f5",
      }}
    >
      <Card title="Đăng nhập" style={{ width: 360 }}>
        <Form
          name="login_form"
          initialValues={{ remember: true }}
          onFinish={handleFinish}
          layout="vertical"
        >
          <Form.Item
            name="taiKhoan"
            label="Tài khoản"
            rules={[{ required: true, message: "Vui lòng nhập tài khoản" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Nhập tài khoản" />
          </Form.Item>

          <Form.Item
            name="matKhauBam"
            label="Mật khẩu"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Nhập mật khẩu"
            />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Ghi nhớ đăng nhập</Checkbox>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" block>
              Đăng nhập
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default Login;
