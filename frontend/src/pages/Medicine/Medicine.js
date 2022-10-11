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
import MedicineModal from "./MedicineModal";
import Table from "react-bootstrap/Table";
import Col from "react-bootstrap/Col";
import medicineProcessor from "../../apis/medicineProcessor";

const Medicine = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [key, setKey] = useState("profile");
  const meds = useSelector((state) => state.med.medicine);
  const [medis,setMedis] = useState([]);
  
  const loadData = async () => {
    setMedis(await medicineProcessor.addMed.getAllObj());
    console.log( await medicineProcessor.getAllObj());
    console.log("asd: " + medis);
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
                Danh sách thuốc
              </h4>
            </Nav>
            <Form className="d-flex">
              {/* <Button
                variant="success"
                style={{ marginRight: "20px" }}
                onClick={addTab}
              >
                <FaPlusCircle></FaPlusCircle> Thêm thuốc
              </Button> */}
              <MedicineModal></MedicineModal>
              <Button variant="primary" style={{ marginRight: "20px" }}>
                <FaRedoAlt /> Tải lại
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* thêm 1 thanh search */}

      <Tabs
        id="uncontrolled-tab-example"
        className="mb-3"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
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
                <tr>
                  <td>1</td>
                  <td>asd</td>
                  <td>qwe</td>
                  <td>zxc</td>
                  <td></td>
                  <td>
                    <Nav.Link href="/asdsad" style={{ display: "inline" }}>
                      <FaEdit size={25} />
                    </Nav.Link>
                    {/* <Link to="/"><FaEdit size={20} style = {{padding:"0px",margin:"0",display:"inline"}}/></Link> */}
                    <Nav.Link href="/asdsad" style={{ display: "inline" }}>
                      <FaEdit size={25} />
                    </Nav.Link>
                  </td>
                </tr>
                {meds.map((med) => {
                  return (
                    <tr>
                      <td>1</td>
                      <td>
                        <img src={med.url} />
                      </td>
                      <td>{med.medId}</td>
                      <td>{med.usage}</td>
                      <td>
                        <Nav.Link
                          href={`/medicine/${med.medId}`}
                          style={{ display: "inline" }}
                        >
                          <FaEdit size={25} />
                        </Nav.Link>
                        {/* <Link to="/"><FaEdit size={20} style = {{padding:"0px",margin:"0",display:"inline"}}/></Link> */}
                        <Nav.Link href="/delete" style={{ display: "inline" }}>
                          <FaEdit size={25} />
                        </Nav.Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </div>
        </Tab>
        {/* <Tab eventKey="contact" title="Contact" link>
          qweqweqwewqe
        </Tab> */}
        {/* {myTab.map((item) => {
          return (
            <Tab eventKey={item.value} title={item.title}>
              {item.content}
            </Tab>
          );
        })} */}
      </Tabs>
    </>
  );
};

export default Medicine;
