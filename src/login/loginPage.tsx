import React, { useState } from "react";
import { Button, Form, Input, Layout, message } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

const { Content } = Layout;

const LoginPage: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    setLoading(true);
    // Simulating login process
    setTimeout(() => {
      setLoading(false);
      if (values.username === "admin" && values.password === "password") {
        message.success("Login successful");
        navigate("/home");
      } else {
        message.error("Invalid username or password");
      }
    }, 1000);
  };

  return (
    <Layout className="layout">
      <Content
        style={{
          padding: "50px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="login-container">
          <h1>Login</h1>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{ remember: true }}
            onFinish={handleSubmit}
          >
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined className="site-form-item-icon" />}
                placeholder="Username"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input
                prefix={<LockOutlined className="site-form-item-icon" />}
                type="password"
                placeholder="Password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-form-button"
                loading={loading}
              >
                Log in
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Content>
    </Layout>
  );
};

export default LoginPage;
