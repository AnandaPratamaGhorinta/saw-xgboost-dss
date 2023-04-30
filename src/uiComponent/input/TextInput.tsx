import { Input } from "antd";

interface TextInputProps {
  id?: string;
  name?: string;
}

export default function TextInput({ id, name }: TextInputProps) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <label htmlFor={id}>{name}</label>
      <Input id={id} name={name} />
    </div>
  );
}
