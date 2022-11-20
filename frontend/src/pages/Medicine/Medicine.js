import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { getMedicineSuccess } from "../../redux/reducer/medicineSlice";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { FaRedoAlt, FaEdit } from "react-icons/fa";
import MedicineModal from "./MedicineModal";
import Table from "react-bootstrap/Table";
import medicineProcessor from "../../apis/medicineProcessor";
import UpdateMedicineModal from "./UpdateMedicineModal";
import ReactPaginate from "react-paginate";
import { AiOutlineCheck, AiOutlineCloseCircle } from "react-icons/ai";
import { store } from "../../redux/store";
import CustomToast from "../../components/CustomToast";
import CustomTable from "../../components/CustomTable";
import axios from "../../apis/api";
import { Pagination } from "antd";
// import "antd/dist/antd.css";

const Medicine = ({ itemsPerPage }) => {
  const [medId, setMedID] = useState("");
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [searchMeds, setSearchMeds] = useState("");
  // const meds = useSelector((state) => state.med.medicine);
  const [meds, setMeds] = useState([]);
  const [isToast, setIsToast] = useState({
    value: false,
    isSuccess: true,
    content: "",
  });

  const [offset, setOffset] = useState(0);
  const [limit, setLimit] = useState(5);
  const [total, setTotal] = useState(0);

  const loadData = async () => {
    // medicineProcessor.getAll("", 1, "");
    const response = await axios
      .get(
        `/api/medicine?keyword=${searchMeds}&offset=${offset}&limit=${limit}`
      )
      .then((response) => {
        // response.success === 1 &&
        //   setMeds(response.data.data) &&
        // setTotal(response.data.total);

        if (response.success === 1) {
          setMeds(response.data.data);
          setTotal(response.data.total);
        }
        // console.log(response.data.total);
      });
  };

  useEffect(() => {
    loadData();
    // console.log(total);
  }, [offset, total, searchMeds, limit]);

  const onChangePage = (current, pageSize) => {
    // console.log(current, pageSize);
    setOffset(current - 1);
    setLimit(pageSize);
  };

  const onShowSizeChange = (current, size) => {
    // console.log(current + " " + size);
    setLimit(size);
    setOffset(current);
    onChangePage(current, size);
  };

  const openUpdateModal = (id) => {
    setMedID(id);
    setIsShowUpdate(true);
  };

  const closeUpdateModal = () => {
    setMedID("");
    setIsShowUpdate(false);
  };

  const handleSearch = (e) => {
    setSearchMeds(e.target.value);
    console.log(e.target.value);
  };

  const showToast = (content, isSuccess) => {
    setIsToast({
      ...isToast,
      content: content,
      isSuccess: isSuccess,
      value: true,
    });
  };

  const refreshData = (e, med, index) => {
    let tempMeds = [...meds];
    let tempMed = tempMeds.find((item) => item._id === med._id);
    tempMed = { ...tempMed, status: e.target.checked };
    tempMeds[index] = tempMed;
    store.dispatch(getMedicineSuccess(tempMeds));
  };

  const title = [
    {
      dataKey: "_id",
      displayName: "Mã thuốc",
    },
    {
      dataKey: "imageUrl",
      displayName: "Ảnh",
      custom: (value) => {
        return (
          <img src={value} style={{ height: "100px", width: "100px" }} alt="" />
        );
      },
    },
    {
      dataKey: "name",
      displayName: "Tên thuốc",
    },
    {
      dataKey: "usage",
      displayName: "Cách sử dụng",
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
                const result = await medicineProcessor.changeStatus(
                  data._id,
                  e.target.checked
                );
                if (result.success === 1) {
                  showToast(`Cập nhật id: ${data._id} thành công`, true);
                  // setTimeout(() => {
                  //   loadData();
                  // },1);
                  await loadData();
                }
              }}
            />
          </>
        );
      },
    },
  ];

  function MedTable() {
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
          <Tab eventKey="profile" title="Tất cả">
            <div style={{ marginLeft: "100px", marginRight: "100px" }}>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Control
                    placeholder="Tìm kiếm"
                    autoFocus
                    value={searchMeds}
                    onChange={handleSearch}
                  />
                </Form.Group>
              </Form>

              <CustomTable data={meds} title={title} />
            </div>
          </Tab>
        </Tabs>
      </>
    );
  }

  return (
    <>
      <UpdateMedicineModal
        closeModal={closeUpdateModal}
        isVisible={isShowUpdate}
        medID={medId}
        loadData={loadData}
      ></UpdateMedicineModal>
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
                Danh sách thuốc
              </h4>
            </Nav>
            <Form className="d-flex">
              <MedicineModal loadData={loadData}></MedicineModal>
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

      <MedTable />
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

export default Medicine;
