import React, { useState, useEffect, Component } from "react";
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
import ModaladdStaff from "./ModaladdStaff";
import EditStaff from "./EditStaff";
function Staff () {
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow2, setModalShow2] = React.useState(false);
  
 
    return (
      <>
         <Navbar>
         
         <ModaladdStaff
          show={modalShow}
          onHide={() => setModalShow(false)}
         ></ModaladdStaff>
         <EditStaff  show={modalShow2}
          onHide={() => setModalShow2(false)}>

          </EditStaff>

         <Container fluid>
           <Navbar.Toggle aria-controls="navbarScroll" />
           <Navbar.Collapse id="navbarScroll">
             <Nav
               className="me-auto my-2 my-lg-0"
               style={{ maxHeight: "100px" }}
               navbarScroll
             >
               <h4 style={{ display: "inline-block", margin: "10px" }}>
                 Danh sách nhân viên
               </h4>
             </Nav>
             <Form className="d-flex">
               <Button
                 variant="primary"
                 onClick={() => setModalShow(true)}
                 style={{ marginRight: "20px" }}
               >
                 Thêm nhân viên
               </Button>
               <Button variant="primary" style={{ marginRight: "20px" }} >
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
                   <th>Mã nhân viên</th>
                   <th>Tên nhân viên</th>
                   <th>Chức Danh</th>
                   <th>Điện thoại</th>
                   <th>Địa chỉ</th>
                   <th>Trạng Thái</th>
                   <th></th>
                 </tr>
               </thead>
               <tbody>
                 <tr>
                   <td>3123đá</td>
                   <td>asd</td>
                   <td>3123đá</td>
                   <td>3123đá</td>
                   <td>qwe</td>
                   <td>zxc</td>
                   <td>
                     <Nav.Link
                        onClick={() => setModalShow2(true)}
                       test={"abcd1231"}
                       style={{ display: "inline" }}
                       centered
                     >
                       <FaEdit size={25} />                       
                     </Nav.Link>
                     <Form.Check
                           type="switch"
                           style={{ display: "inline", marginLeft: "10px" }}
                         />
                   </td>
                 </tr>
               </tbody>
             </Table>
           </div>
         </Tab>
       </Tabs>
      
      </>
    );
  }


export default Staff;
