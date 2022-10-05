import React, { useState } from "react";
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
import { FaRedoAlt } from "react-icons/fa";
import MedicineModal from "./MedicineModal";

const Medicine = () => {
  const [key, setKey] = useState("profile");
  // const [myTab, setMyTab] = useState([
  //   { value: "home", title: "home", content: "hello wolrd" },
  // ]);

  // function addTab(e) {
  //   e.preventDefault();
  //   setMyTab([
  //     ...myTab,
  //     {
  //       value: "home1",
  //       title: "home1",
  //       content: "hello wolrd1",
  //     },
  //   ]);
  // }

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

      <Tabs
        id="uncontrolled-tab-example"
        className="mb-3"
        activeKey={key}
        onSelect={(k) => setKey(k)}
      >
        {/* <Tab eventKey="http://localhost:3000/pathological1" title="Home">
          asd
        </Tab> */}

        <Tab eventKey="profile" title="Profile">
          LIST OF MEDICINE
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
