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
import customerProcessor from "../../apis/customerProcessor";
import axios from "../../apis/api";

import { Pagination } from "antd";

const Customer = () => {
  const [customers, setCustomers] = useState([]);

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);
  const [searchMeds, setSearchMeds] = useState("");

  const loadData = () => {
    axios
      .get(
        `/api/customer?keyword=${searchMeds}&offset=${offset}&limit=${limit}`
      )
      .then((response) => {
        // response.success === 1 && setCustomers(response.data);
        if (response.success === 1) {
          setCustomers(response.data);
          setTotal(response.data.total);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const [cusId, setCusID] = useState();
  const [isShowUpdate, setIsShowUpdate] = useState(false);

  useEffect(() => {
    loadData();
  }, [offset, total, searchMeds, limit]);

  const onChangePage = (current, pageSize) => {
    // console.log(current, pageSize);
    setOffset(current - 1);
    setLimit(pageSize);
  };

  // useEffect(() => {
  //   loadData();
  // }, [isShowUpdate]);

  const [currentItems, setCurrentItems] = useState([]);

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
    setIsShowUpdate(false);
    // console.log("chay ow day");
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
      dataKey: "fullname",
      displayName: "Tên khách hàng",
    },
    {
      dataKey: "phone",
      displayName: "Điện thoại",
    },
    {
      dataKey: "address",
      displayName: "Địa chỉ",
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
              onChange={async (e) => {
                // refreshData(e, med, index);
                const result = await customerProcessor.changeStatus(
                  data._id,
                  e.target.checked
                );
                if (result.success === 1) {
                  showToast(`Cập nhật id: ${data._id} thành công`, true);
                  // setTimeout(() => {
                  //   loadData();
                  // },1);
                  loadData();
                }
              }}
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

              <CustomTable data={customers} title={title} />
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
              <CustomerModal
                lbl="Thêm Khách hàng"
                loadData={loadData}
                widthh="181px"
              />
              <Button
                variant="primary"
                style={{ marginRight: "20px" }}
                onClick={loadData}
              >
                <FaRedoAlt /> Tải lại
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <CustomerTable />
      <div id="pagin">
        <Pagination
          showSizeChanger
          current={offset + 1}
          total={total}
          onChange={onChangePage}
          defaultPageSize={5}
          pageSizeOptions={[5, 10, 20, 50]}
        />
      </div>
    </>
  );
};

export default Customer;
