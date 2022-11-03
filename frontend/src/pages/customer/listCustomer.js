import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FaRedoAlt, FaEdit } from "react-icons/fa";
import Table from "react-bootstrap/Table";
import { AiFillDelete } from "react-icons/ai";
import CustomerModal from "./CustomerModal";
import CustomTable from "../../components/CustomTable";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import CustomToast from "../../components/CustomToast";
import UpdateCustomerModal from "./UpdateCustomerModal";

const Customer = () => {
  const loadData = async () => {};
  const [currentItems, setCurrentItems] = useState([]);

  const [cusId, setCusID] = useState("");

  const [isShowUpdate, setIsShowUpdate] = useState(false);

  const [isToast, setIsToast] = useState({
    value: false,
    isSuccess: true,
    content: "",
  });

  const openUpdateModal = (id) => {
    setCusID(id);
    setIsShowUpdate(true);
  };

  const closeUpdateModal = () => {
    setCusID("");
    setIsShowUpdate(false);
  };

  const showToast = (content, isSuccess) => {
    setIsToast({
      ...isToast,
      content: content,
      isSuccess: isSuccess,
      value: true,
    });
  };

  const title = [
    {
      dataKey: "_id",
      displayName: "Mã khách hàng",
    },
    {
      dataKey: "name",
      displayName: "Tên khách hàng",
    },
    {
      dataKey: "usage",
      displayName: "Điện thoại",
    },
    {
      dataKey: "usage",
      displayName: "Địa chỉ",
    },
    {
      dataKey: "usage",
      displayName: "Nhân viên phụ trách",
    },
    {
      dataKey: "status",
      displayName: "Trạng thái",
      custom: (value, data) => {
        return value ? (
          <AiOutlineCheck color="#009432" size={25} />
        ) : (
          <AiOutlineCloseCircle color="#EA2027" size={25} />
        );
      },
    },
    {
      dataKey: "",
      displayName: "",
      fixedWidth: 500,
      custom: (value, data) => {
        return (
          <>
            <FaEdit
              className="mx-2"
              color="#2980b9"
              cursor={"pointer"}
              size={25}
              onClick={() => {
                openUpdateModal(data._id);
              }}
            />
            <Form.Check
              type="switch"
              checked={data.status}
              style={{ display: "inline", marginLeft: "10px" }}
              // onChange={async (e) => {
              //   // refreshData(e, med, index);
              //   const result = await medicineProcessor.changeStatus(
              //     data._id,
              //     e.target.checked
              //   );
              //   if (result.success === 1) {
              //     showToast(`Cập nhật id: ${data._id} thành công`, true);
              //     // setTimeout(() => {
              //     //   loadData();
              //     // },1);
              //     await loadData();
              //   }
              // }}
            />
          </>
        );
      },
    },
  ];
  function CustomerTable() {
    return (
      <>
        <div
          style={{
            position: "fixed",
            right: "10px",
            bottom: "20px",
            zIndex: "3",
          }}
        >
          <CustomToast
            value={isToast.value}
            content={isToast.content}
            isSuccess={isToast.isSuccess}
            onClose={() => {
              setIsToast({ ...isToast, value: false });
            }}
          />
        </div>

        <Tabs id="uncontrolled-tab-example" className="mb-3">
          {/* <Tab eventKey="http://localhost:3000/pathological1" title="Home">
          asd
        </Tab> */}

          <Tab eventKey="profile" title="Tất cả">
            <div style={{ marginLeft: "100px", marginRight: "100px" }}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control placeholder="Tìm kiếm" />
                </Form.Group>
              </Form>

              {/* <CustomTable data={currentItems} title={title} /> */}
              <Table striped bordered hover responsive>
                <thead>
                  <tr
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <th>Mã khách hàng</th>
                    <th>Tên khách hàng</th>
                    <th>Điện thoại</th>
                    <th>Địa chỉ</th>
                    <th>Nhân viên phụ trách</th>
                    <th>Trạng thái</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    style={{
                      textAlign: "center",
                    }}
                  >
                    <td>asd</td>
                    <td>qwe</td>
                    <td>zxc</td>
                    <td>zxc</td>
                    <td>zxc</td>
                    <td></td>
                    <td>
                      <FaEdit
                        size={25}
                        color="#2980b9"
                        cursor={"pointer"}
                        onClick={() => {
                          openUpdateModal(1);
                        }}
                      />
                      <Form.Check
                        type="switch"
                        style={{ display: "inline", marginLeft: "12px" }}
                        checked
                      />
                    </td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </Tab>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <UpdateCustomerModal
        closeModal={closeUpdateModal}
        isVisible={isShowUpdate}
        cusId={cusId}
        loadData={loadData}
      />

      <Navbar>
        <Container fluid>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <h4 style={{ display: "inline-block", margin: "10px" }}>
                Danh sách khách hàng
              </h4>
            </Nav>
            <Form className="d-flex">

              <CustomerModal loadData={loadData} />
              <Button variant="primary" style={{ marginRight: "20px" }}>

                <FaRedoAlt /> Tải lại
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>


      <CustomerTable />

    </>
  );
};

export default Customer;
