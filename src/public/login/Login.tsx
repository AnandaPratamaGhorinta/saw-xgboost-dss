import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { loginStyles } from "./login.style";
import { useState } from "react";

export const useStyles = createUseStyles(loginStyles);

export default function Login() {
  const navigate = useNavigate();
  const classes = useStyles();
  const [loading, setLoading] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);

  const onFinishLogin = (values: any) => {
    console.log("Success:", values);
    setLoading(true);

    // Redirect to the desired route on successful login
    navigate("/dashboard");
  };

  const onFinishForgotPassword = (values: any) => {
    console.log("Forgot Password Success:", values);
    setLoading(false);
    // Here you would normally handle the password reset logic
  };

  const onFinishFailed = (errorInfo: any) => {
    setLoading(false);
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={classes.loginContainer}>
      {!isForgotPassword ? (
        <Form
          name="login"
          initialValues={{ remember: true }}
          onFinish={onFinishLogin}
          onFinishFailed={onFinishFailed}
          className={classes.loginForm}
        >
          <h2>Login</h2>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>

          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password placeholder="Password" />
          </Form.Item>

          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={classes.loginFormButton}
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => setIsForgotPassword(true)}>
              Forgot Password
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <Form
          name="forgot-password"
          onFinish={onFinishForgotPassword}
          onFinishFailed={onFinishFailed}
          className={classes.loginForm}
        >
          <h2>Forgot Password</h2>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Please input your Email!" }]}
          >
            <Input placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="newPassword"
            rules={[
              { required: true, message: "Please input your new Password!" },
            ]}
          >
            <Input.Password placeholder="New Password" />
          </Form.Item>
          <Form.Item
            name="confirmNewPassword"
            rules={[
              { required: true, message: "Please confirm your new Password!" },
            ]}
          >
            <Input.Password placeholder="Confirm New Password" />
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className={classes.loginFormButton}
              loading={loading}
            >
              Submit
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="link" onClick={() => setIsForgotPassword(false)}>
              Back
            </Button>
          </Form.Item>
        </Form>
      )}
    </div>
  );
}
