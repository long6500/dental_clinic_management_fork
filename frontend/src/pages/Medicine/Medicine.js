import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getMedicineSuccess } from "../../redux/reducer/medicineSlice";

import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import CloseButton from "react-bootstrap/CloseButton";
import { FaPlusCircle } from "react-icons/fa";
import { FaRedoAlt, FaEdit } from "react-icons/fa";
import MedicineModal from "./MedicineModal";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import medicineProcessor from "../../apis/medicineProcessor";
import UpdateMedicineModal from "./UpdateMedicineModal";
import MyPagination from "../../components/MyPagination";

const Medicine = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [key, setKey] = useState("profile");
  const [medId, setMedID] = useState("");
  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const meds = useSelector((state) => state.med.medicine);

  const loadData = async () => {
    // setMedis((arr) => [...arr, ...medicineProcessor.addMed.getAllObj()]);
    // console.log(await medicineProcessor.getAllObj());
    medicineProcessor.getAll();
    // console.log("chay lai");
  };

  const openUpdateModal = (id) => {
    setMedID(id);
    setIsShowUpdate(true);
  };

  const closeUpdateModal = () => {
    setMedID("");
    setIsShowUpdate(false);
  };

  // useEffect(() => {
  //   new Promise((resolve) => {
  //     resolve();
  //   })
  //     .then(() => {
  //       loadData();
  //     })
  //     .then(() => {
  //       setTimeout(() => {
  //         loadData();
  //       }, 200);
  //     });
  // }, []);

  useEffect(() => {
    loadData();
  }, []);

  useEffect(() => {
    loadData();
  }, [meds.length]);

  // useEffect(() => {
  //   console.log("meds.length: " + meds.length);
  //   loadData();
  // }, [meds.length]);

  const handleChangePage = ()=>{
    
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

      <Tabs
        id="uncontrolled-tab-example"
        className="mb-3"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        <Tab eventKey="profile" title="Tất cả">
          <div style={{ marginLeft: "100px", marginRight: "100px" }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control placeholder="Tìm kiếm" />
              </Form.Group>
            </Form>

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Mã thuốc</th>
                  <th>Ảnh</th>
                  <th>Tên thuốc</th>
                  <th>Cách sử dụng</th>
                </tr>
              </thead>
              <tbody>
                {meds.map((med, index) => {
                  return (
                    <tr>
                      <td style={{ width: "10%" }}>{med._id}</td>
                      <td style={{ textAlign: "center" }}>
                        <img
                          src={med.imageUrl}
                          style={{ height: "50px", width: "50px" }}
                        />
                      </td>
                      <td>{med.name}</td>
                      <td>{med.usage}</td>
                      <td style={{ textAlign: "center" }}>
                        {/* <UpdateMedicineModal medID={med._id}></UpdateMedicineModal> */}
                        <FaEdit
                          color="#2980b9"
                          cursor={"pointer"}
                          size={25}
                          onClick={() => {
                            openUpdateModal(med._id);
                          }}
                        />
                        <Form.Check
                          type="switch"
                          style={{ display: "inline", marginLeft: "10px" }}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
            
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default Medicine;
