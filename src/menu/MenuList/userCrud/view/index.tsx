import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Button, Table } from "antd";
import { ColumnsType } from "antd/lib/table";
import { endpoints } from "../../../../service/endpoints/endpoints";
import { Users } from "../../../../service/dto/users";
import { useNavigate } from "react-router-dom";

export default function UserCrudView() {
  const [user, setUser] = useState<Users[]>([]);

  useEffect(() => {
    loadUser();
  }, []);

  const loadUser = async () => {
    const result = await axios.get(endpoints.users);
    setUser(result.data);
  };

  const navigate = useNavigate();

  const columns = useMemo<ColumnsType<Users>>(() => {
    return [
      {
        title: "Username",
        dataIndex: "username",
      },
      {
        title: "Email",
        dataIndex: "email",
      },
      {
        title: "Name",
        dataIndex: "name",
      },
      {
        title: "Action",
        render: () => {
          return (
            <>
              <Button
                name="Add"
                type={"primary"}
                onClick={() => navigate("/add-user")}
              >
                Add
              </Button>
              <Button
                name="Update"
                type={"default"}
                onClick={() => navigate("/update-user")}
              >
                Update
              </Button>
              <Button
                name="Delete"
                type={"primary"}
                danger={true}
                onClick={() => navigate("/delete-user")}
              >
                Delete
              </Button>
            </>
          );
        },
      },
    ];
  }, [navigate]);

  return (
    <div>
      <Table<Users> columns={columns} dataSource={user} />
    </div>
  );
}
