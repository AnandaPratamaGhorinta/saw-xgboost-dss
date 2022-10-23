import { Users } from "./type"
import { Table} from "antd"
import { ColumnsType } from "antd/lib/table";

interface TableDataProps {
    data : Users[];
}
export default function TableView ({data}:TableDataProps){
     
    const column : ColumnsType<Users> = [{title: 'Name',
    dataIndex:'name' },{
        title:'Age',
        dataIndex : 'age'
    }]
    return <>
    <Table dataSource={data} columns={column} />
    </>
}