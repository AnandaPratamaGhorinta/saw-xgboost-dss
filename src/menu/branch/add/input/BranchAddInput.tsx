import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Input, Button, Card } from "antd";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles({
  container: {
    padding: "20px",
    background: "#fff",
    minHeight: "100vh",
  },
  card: {
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
  },
  formItem: {
    marginBottom: "15px",
  },
  formLabel: {
    width: "150px",
    fontWeight: "bold",
  },
  formInput: {
    width: "calc(100% - 150px)", // Adjust based on label width
  },
  buttonsContainer: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "10px",
    marginTop: "20px",
  },
});

const { Item: FormItem } = Form;

const BranchAddInput: React.FC = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<any>({});

  const onFinish = (values: any) => {
    setFormData(values); // Save form data in state
    navigate("/branch/add/review", { state: { branchData: values } });
  };

  return (
    <div className={classes.container}>
      <Card className={classes.card}>
        <h2>Add Branch</h2>
        <Form layout="vertical" onFinish={onFinish} initialValues={formData}>
          <FormItem
            label="Code"
            name="code"
            rules={[
              { required: true, message: "Please enter the branch code" },
            ]}
            className={classes.formItem}
          >
            <Input className={classes.formInput} />
          </FormItem>
          <FormItem
            label="Name"
            name="name"
            rules={[
              { required: true, message: "Please enter the branch name" },
            ]}
            className={classes.formItem}
          >
            <Input className={classes.formInput} />
          </FormItem>
          <FormItem
            label="Description"
            name="description"
            className={classes.formItem}
          >
            <Input.TextArea className={classes.formInput} rows={4} />
          </FormItem>
          <FormItem label="Address" name="address" className={classes.formItem}>
            <Input className={classes.formInput} />
          </FormItem>
          <FormItem
            label="Phone Number"
            name="phoneNumber"
            className={classes.formItem}
          >
            <Input className={classes.formInput} />
          </FormItem>
          <FormItem label="Fax" name="fax" className={classes.formItem}>
            <Input className={classes.formInput} />
          </FormItem>
          <FormItem
            label="Email"
            name="email"
            rules={[
              { type: "email", message: "Please enter a valid email address" },
            ]}
            className={classes.formItem}
          >
            <Input className={classes.formInput} />
          </FormItem>
          <FormItem label="City" name="city" className={classes.formItem}>
            <Input className={classes.formInput} />
          </FormItem>
          <div className={classes.buttonsContainer}>
            <Button onClick={() => navigate("/branch")} type="default">
              Back
            </Button>
            <Button type="primary" htmlType="submit">
              Confirm
            </Button>
          </div>
        </Form>
      </Card>
    </div>
  );
};

export default BranchAddInput;
