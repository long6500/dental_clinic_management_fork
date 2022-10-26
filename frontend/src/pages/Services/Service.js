import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
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
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import ServiceModal from "./ServiceModal";

const Service = () => {
  const [key, setKey] = useState("profile");

  const [isShowUpdate, setIsShowUpdate] = useState(false);
  const [serviceId, setServiceId] = useState("");

  const openUpdateModal = (id) => {
    setServiceId(id);
    setIsShowUpdate(true);
  };

  const closeUpdateModal = () => {
    setServiceId("");
    setIsShowUpdate(false);
  };

  const loadData = async () => {
    // setMedis((arr) => [...arr, ...medicineProcessor.addMed.getAllObj()]);
    // console.log(await medicineProcessor.getAllObj());
    // medicineProcessor.getAll();
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <>
      <Navbar>
        <Container fluid>
          {/* <Navbar.Brand href="#">Navbar scroll</Navbar.Brand> */}
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <h4 style={{ display: "inline-block", margin: "10px" }}>
                Danh sách Thủ Thuật
              </h4>
            </Nav>
            <Form className="d-flex">
              <ServiceModal loadData={loadData} />

              <Button variant="primary" style={{ marginRight: "20px" }}>
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
                  <th>Mã thủ thuật</th>
                  <th>Ảnh</th>
                  <th>Tên thủ thuật</th>
                  <th>Giá</th>
                  <th></th>
                </tr>
              </thead>
              <tbody></tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default Service;
