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

const Medicine = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [key, setKey] = useState("profile");
  const [medId, setMedID] = useState('')
  const [isShowUpdate, setIsShowUpdate] = useState(false)
  const meds = useSelector((state) => state.med.medicine);

  const loadData = async () => {
    // setMedis((arr) => [...arr, ...medicineProcessor.addMed.getAllObj()]);
    // console.log(await medicineProcessor.getAllObj());
    medicineProcessor.getAll();
  };

  const openUpdateModal = (id) => {
    setMedID(id)
    setIsShowUpdate(true)
  }

  const closeUpdateModal = () => {
    setMedID('')
    setIsShowUpdate(false)
  }

  useEffect(() => {
    loadData();
  }, []);

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
              <MedicineModal loadData ={loadData}></MedicineModal>
              <Button variant="primary" style={{ marginRight: "20px" }} onClick = {loadData}>
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
                  <th>STT</th>
                  <th>Ảnh</th>
                  <th>Mã thuốc</th>
                  <th>Tên thuốc</th>
                  <th>Cách sử dụng</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>

                {meds.map((med, index) => {
                  return (
                    <tr>
                      <td>{index + 1}</td>
                      <td>
                        {med.imageUrl}
                      </td>
                      <td>{med._id}</td>
                      <td>{med.name}</td>
                      <td>{med.usage}</td>
                      <td>
                        {/* <UpdateMedicineModal medID={med._id}></UpdateMedicineModal> */}
                        <FaEdit color="#2980b9" cursor={"pointer"} size={25} onClick={() => {openUpdateModal(med._id)}} />
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
