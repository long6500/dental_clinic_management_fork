import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table } from "antd";
import { Checkbox } from "antd";
import axios from "../../apis/api";
import React, { useState, useEffect, Component } from "react";

const Decentralization = () => {
  const [role, setRole] = useState([]);
  let options = [];  
  
  
  const expandedRowRender = () => {
    const onChange = (e) => {
      console.log(e.target.options.value);
    };

    const columnsRole = [
      {
        title: "Chức năng",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Thêm",
        dataIndex: "add",
        key: "add",
        //render: () => <Checkbox onChange={onChange}>Checkbox</Checkbox>
      },
      {
        title: "Sửa",
        dataIndex: "edit",
        key: "edit",
        //render: () => <Checkbox onChange={onChange}>Checkbox</Checkbox>
      },
      {
        title: "Xóa",
        dataIndex: "delete",
        key: "delete",
        //render: () => <Checkbox onChange={onChange}>Checkbox</Checkbox>
      },
      {
        title: "Xem",
        dataIndex: "view",
        key: "view",
        //render: () => <Checkbox onChange={onChange}>Checkbox</Checkbox>
      }
      
    ];
    const dataRole = [
      {
        key: 1,
        date: "Quản lý thuốc",
        add:  <Checkbox options={{label:'', value:'mã chức năng + add'}} onChange={onChange}></Checkbox>,
        edit:  <Checkbox options={{label:'', value:'mã chức năng + edit'}} onChange={onChange}></Checkbox>,
        delete: <Checkbox options={{label:'', value:'mã chức năng + delete'}} onChange={onChange}></Checkbox>,
        view: <Checkbox options={{label:'', value:'mã chức năng +  view'}} onChange={onChange}></Checkbox>
      },
      {
        key: 2,
        date: "Quản lý nhân viên",
        add:  <Checkbox options={{label:'', value:'mã chức năng + add'}} onChange={onChange}></Checkbox>,
        edit:  <Checkbox options={{label:'', value:'mã chức năng + edit'}} onChange={onChange}></Checkbox>,
        delete: <Checkbox options={{label:'', value:'mã chức năng + delete'}} onChange={onChange}></Checkbox>,
        view: <Checkbox options={{label:'', value:'mã chức năng +  view'}} onChange={onChange}></Checkbox>
      },
      {
        key: 3,
        date: "Quản lý khách hàng",
        add:  <Checkbox options={{label:'', value:'mã chức năng + add'}} onChange={onChange}></Checkbox>,
        edit:  <Checkbox options={{label:'', value:'mã chức năng + edit'}} onChange={onChange}></Checkbox>,
        delete: <Checkbox options={{label:'', value:'mã chức năng + delete'}} onChange={onChange}></Checkbox>,
        view: <Checkbox options={{label:'', value:'mã chức năng +  view'}} onChange={onChange}></Checkbox>
      },
      {
        key: 4,
        date: "Quản lý thuốc",
        add:  <Checkbox options={{label:'', value:'mã chức năng + add'}} onChange={onChange}></Checkbox>,
        edit:  <Checkbox options={{label:'', value:'mã chức năng + edit'}} onChange={onChange}></Checkbox>,
        delete: <Checkbox options={{label:'', value:'mã chức năng + delete'}} onChange={onChange}></Checkbox>,
        view: <Checkbox options={{label:'', value:'mã chức năng +  view'}} onChange={onChange}></Checkbox>
      },
      {
        key: 5,
        date: "Phiếu khám",
        add:  <Checkbox options={{label:'', value:'mã chức năng + add'}} onChange={onChange}></Checkbox>,
        edit:  <Checkbox options={{label:'', value:'mã chức năng + edit'}} onChange={onChange}></Checkbox>,
        delete: <Checkbox options={{label:'', value:'mã chức năng + delete'}} onChange={onChange}></Checkbox>,
        view: <Checkbox options={{label:'', value:'mã chức năng +  view'}} onChange={onChange}></Checkbox>
      }
    ];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString()
      });
    }
    return <Table columns={columnsRole} dataSource={dataRole} pagination={false} />;
  };
  const columns = [
    {
      title: "Phân Quyền ",
      dataIndex: "name",
      key: "name"
    }
  ];
  const data = [];
  useEffect(() => {
    // console.log(empId);
    
      getRole();
     
    
  }, []);
  

  for (let i = 0; i < role.length; i++) {
    
    data.push({
      key: i.toString(),
      name: `${role[i].name}`
    });
  }
  role.forEach((role) => {
    options.push({
      label: role.name,
      value: role._id,
    });
  });
  const getRole = async () => {
    await axios.get(`/api/role/`).then(async (response) => {
      setRole(response.data);
    });
  };

  return (
    <>
      <Table
        columns={columns}
        
        expandable={{
          expandedRowRender,
          defaultExpandedRowKeys: ["0"]
        }}
        dataSource={data}
        pagination={false}
      />
    </>
  );
};
export default Decentralization;
