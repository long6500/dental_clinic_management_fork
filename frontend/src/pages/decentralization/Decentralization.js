import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table } from "antd";
import { Checkbox } from "antd";
import axios from "../../apis/api";
import React, { useState, useEffect, Component } from "react";

const Decentralization = () => {
  const [role, setRole] = useState([]);
  let options = [];  
  const expandedRowRender = () => {
    const columns = [
      {
        title: "Chức năng",
        dataIndex: "date",
        key: "date"
      },
      {
        title: "Thêm",
        dataIndex: "name",
        key: "name",
        render: () => <Checkbox></Checkbox>
      },
      {
        title: "Sửa",
        dataIndex: "name",
        key: "name",
        render: () => <Checkbox></Checkbox>
      },
      {
        title: "Xóa",
        dataIndex: "name",
        key: "name",
        render: () => <Checkbox></Checkbox>
      },
      {
        title: "Xem",
        dataIndex: "name",
        key: "name",
        render: () => <Checkbox></Checkbox>
      }
      
    ];
    const data = [];
    for (let i = 0; i < 3; ++i) {
      data.push({
        key: i.toString()
      });
    }
    return <Table columns={columns} dataSource={data} pagination={false} />;
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
      />
    </>
  );
};
export default Decentralization;
