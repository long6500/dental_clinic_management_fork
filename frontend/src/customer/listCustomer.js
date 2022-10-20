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

const Customer = () => {

  return (
    <>
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
              <Button variant="primary" style={{ marginRight: "20px" }}>
                Thêm khách hàng
              </Button>
              <Button
                variant="primary"
                
                style={{ marginRight: "20px" }}
              >
                <FaRedoAlt /> Tải lại
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* thêm 1 thanh search */}

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

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Mã khách hàng</th>
                  <th>Tên khách hàng</th>
                  <th>Điện thoại</th>
                  <th>Địa chỉ</th>
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
                    <Nav.Link href="/" style={{ display: "inline" }}>
                      <FaEdit size={25} />
                    </Nav.Link>
                    <Nav.Link
                      href="/"
                      style={{ display: "inline", color: "red" }}
                    >
                      <AiFillDelete size={25} />
                    </Nav.Link>
                  </td>
                </tr>
              </tbody>
            </Table>
          </div>
        </Tab>
      </Tabs>
    </>
  );
};

export default Customer;
