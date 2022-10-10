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
             
              {/* <MedicineModal></MedicineModal> */}
              <ServiceModal/>
              <Button variant="primary" style={{ marginRight: "20px" }}>
                <FaRedoAlt /> Tải lại
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>


    </>
  )
}

export default Service