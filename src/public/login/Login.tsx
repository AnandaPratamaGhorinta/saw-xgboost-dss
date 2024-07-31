import { Form, Input, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { createUseStyles } from "react-jss";
import { loginStyles } from "./login.style";

export const useStyles = createUseStyles(loginStyles);

export default function Login() {
  const navigate = useNavigate();
  const classes = useStyles();

  const onFinish = (values: any) => {
    console.log("Success:", values);
    // Redirect to the desired route on successful login
    navigate("/");
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={classes.loginContainer}>
      <Form
        name="login"
        initialValues={{ remember: true }}
        onFinish={onFinish}
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
          >
            Log in
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
