import { Checkbox, Col, Form, Row } from "antd";

interface SimpleCheckBoxInputProps {
  label: string;
  name: string;
}

export default function SimpleCheckBoxInput({
  label,
  name,
}: SimpleCheckBoxInputProps) {
  return (
    <Form.Item label={label}>
      <Row gutter={8} align="middle">
        <Col>
          <Form.Item
            name={name}
            valuePropName="checked"
            noStyle
            getValueFromEvent={(e) => e.target.checked}
            initialValue={false}
          >
            <Checkbox />
          </Form.Item>
        </Col>
        <Col>{label}</Col>
      </Row>
    </Form.Item>
  );
}
