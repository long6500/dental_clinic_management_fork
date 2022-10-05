import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import "bootstrap/dist/css/bootstrap.css";
import Button from "react-bootstrap/Button";
import React, { useState } from "react";
// import ModalD from "../Modal/Modal";

const Navbarr = () => {
  return (
    <Navbar bg="primary" variant="dark">
      <Container>
        <Navbar.Brand href="#home">EDENTAL</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <NavDropdown title="Đặt lịch hẹn" id="basic-nav-dropdown">
              <NavDropdown.Item href="/team">Đặt lịch hẹn</NavDropdown.Item>
              <NavDropdown.Item href="/team">Danh sách lịch hẹn</NavDropdown.Item>

              <NavDropdown.Item href="/quytrinh">
                Danh sách tái khám
              </NavDropdown.Item>
            </NavDropdown>

            <Nav.Link href="/asdsad">Khám tổng quát</Nav.Link>
            <Nav.Link href="/asd">Phiếu khám</Nav.Link>
            <Nav.Link href="/asd">Khách hàng</Nav.Link>

            <NavDropdown title="Quản lý" id="basic-nav-dropdown">
              <NavDropdown.Item href="/services">Phiếu khám</NavDropdown.Item>
              <NavDropdown.Item href="/bocrangsu">
                Phiếu khám tổng quát
              </NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Thiết lập" id="basic-nav-dropdown">
              <NavDropdown.Item href="/medicine">
                Đăng ký thuốc
              </NavDropdown.Item>
              <NavDropdown.Item href="/pathological1">
                Đăng ký thủ thuật
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/rangho">
                Đăng ký nhân viên
              </NavDropdown.Item>
              {/* <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item> */}
            </NavDropdown>
          </Nav>

          {/* <Navbar.Form> */}
          {/* <Button variant="success">Sign up</Button> */}
          {/* <ModalD></ModalD> */}
          {/* </Navbar.Form> */}

          <Nav>
            <NavDropdown title="Tên user" id="basic-nav-dropdown">
              <NavDropdown.Item href="/pathological1">Ghi chú</NavDropdown.Item>
              <NavDropdown.Item href="/pathological1">
                Thông tin chung
              </NavDropdown.Item>
              <NavDropdown.Item href="/pathological1">
                Đổi mật khẩu
              </NavDropdown.Item>
              <NavDropdown.Item href="/pathological1">
                Chăm sóc khách hàng
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/pathological1">
                Đăng xuất
              </NavDropdown.Item>
              <NavDropdown.Item href="/pathological1">
                Thông tin phần mềm
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
};

export default Navbarr;
