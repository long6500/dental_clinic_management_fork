import React, { useState, useEffect, Component } from "react";
import { Button, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import Modal from 'react-bootstrap/Modal';
import { Input } from "reactstrap";
import Form from "react-bootstrap/Form";
import { useFormik } from "formik";
import * as Yup from "yup";
function ModaladdStaff (props) {

  const formik = useFormik({
    initialValues: {
      name: "",
      phone: "",
      competence: "",
      address: "",
      email: "",

    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Không được trống")
        .min(2, "Phải dài hơn 2 kí tự"),
      phone: Yup.string()
        .required("Không được trống")
        .matches(
          /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
          "Số điện thoại phải 10 chữ số"
        ),
      competence: Yup.string()
        .required("Không được trống")
        .min(2, "Phải dài hơn 2 kí tự"),
      address: Yup.string(),
      email: Yup.string()
        .required("Không được trống")
        .matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, "Email sai định dạng"),
    }),

    onSubmit: (values) => {
      props.onHide();
      window.alert("Lưu thành công");
      console.log(values);
    },
  });
    
  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <ModalHeader>Thêm nhân viên</ModalHeader>
          <ModalBody>
          <Form onSubmit={formik.handleSubmit}>
            <div className="container">
              <div className="row">
                <div className="col-6 form-group " style={{marginBottom:"20px"}}>
                  <label>Tên nhân viên</label>
                  <Input type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}></Input>
                    {formik.errors.name && (
                  <div className="errorMsg"> {formik.errors.name} </div>
                )}
                </div>
                <div className="col-6 form-group">
                  <label>Điện thoại</label>
                  <Input type="text"
                  id="phone"
                  name="phone"
                  value={formik.values.phone}
                  onChange={formik.handleChange}></Input>
                   {formik.errors.phone && (
                  <div className="errorMsg"> {formik.errors.phone} </div>
                )}
                </div>
                <div className="col-6 form-group">
                  <label>Chức vụ</label>
                  <Input type="text"
                  id="competence"
                  name="competence"
                  value={formik.values.competence}
                  onChange={formik.handleChange}></Input>
                   {formik.errors.competence && (
                  <div className="errorMsg"> {formik.errors.competence} </div>
                )}
                </div>
                <div className="col-6 form-group" style={{marginBottom:"20px"}}>
                  <label>Email</label>
                  <Input type="text"
                  id="email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}></Input>
                   {formik.errors.email && (
                  <div className="errorMsg"> {formik.errors.email} </div>
                )}
                </div>
                <div className="col-12 form-group">
                  <label>Địa chỉ</label>
                  <Input type="text"
                  id="address"
                  name="address"
                  value={formik.values.address}
                  onChange={formik.handleChange}></Input>
                </div>
              </div>
            </div>
            <div className="mt-4 container">
              <span className="font-medium text-lg" style={{ fontSize:"15px"  }}>Lịch làm việc:</span>
              <div className="row mt-3">
                <div className="row">
                  <div className="col-md-2">
                   
                    <p className="font-weight-bold">Thứ Hai:</p>
                    
                  </div>
                  <div className="col-md-1">
                   
                  <input type="checkbox"></input>
                    
                  </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_start_time"
                      className="form-control form-group w-100 mf_start_time"
                      placeholder="Start Time"
                    ></input>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_end_time  "
                      className="form-control form-group w-100 mf_end_time  "
                      placeholder="End Time"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="row">
                  <div className="col-md-2">
                    <p className="font-weight-bold">Thứ Ba:</p>
                  </div>
                  <div className="col-md-1">
                   
                   <input type="checkbox"></input>
                     
                   </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_start_time"
                      className="form-control form-group w-100 mf_start_time"
                      placeholder="Start Time"
                    ></input>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_end_time  "
                      className="form-control form-group w-100 mf_end_time  "
                      placeholder="End Time"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="row">
                  <div className="col-md-2">
                    <p className="font-weight-bold">Thứ Tư:</p>
                  </div>
                  <div className="col-md-1">
                   
                   <input type="checkbox"></input>
                     
                   </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_start_time"
                      className="form-control form-group w-100 mf_start_time"
                      placeholder="Start Time"
                    ></input>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_end_time  "
                      className="form-control form-group w-100 mf_end_time  "
                      placeholder="End Time"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="row">
                  <div className="col-md-2">
                    <p className="font-weight-bold">Thứ Năm:</p>
                  </div>
                  <div className="col-md-1">
                   
                   <input type="checkbox"></input>
                     
                   </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_start_time"
                      className="form-control form-group w-100 mf_start_time"
                      placeholder="Start Time"
                    ></input>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_end_time  "
                      className="form-control form-group w-100 mf_end_time  "
                      placeholder="End Time"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="row">
                  <div className="col-md-2">
                    <p className="font-weight-bold">Thứ Sáu:</p>
                  </div>
                  <div className="col-md-1">
                   
                   <input type="checkbox"></input>
                     
                   </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_start_time"
                      className="form-control form-group w-100 mf_start_time"
                      placeholder="Start Time"
                    ></input>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_end_time  "
                      className="form-control form-group w-100 mf_end_time  "
                      placeholder="End Time"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="row">
                  <div className="col-md-2">
                    <p className="font-weight-bold">Thứ Bảy:</p>
                  </div>
                  <div className="col-md-1">
                   
                   <input type="checkbox"></input>
                     
                   </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_start_time"
                      className="form-control form-group w-100 mf_start_time"
                      placeholder="Start Time"
                    ></input>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_end_time  "
                      className="form-control form-group w-100 mf_end_time  "
                      placeholder="End Time"
                    ></input>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="row">
                  <div className="col-md-2">
                    <p className="font-weight-bold">Chủ Nhật:</p>
                  </div>
                  <div className="col-md-1">
                   
                   <input type="checkbox"></input>
                     
                   </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_start_time"
                      className="form-control form-group w-100 mf_start_time"
                      placeholder="Start Time"
                    ></input>
                  </div>
                  <div className="col-md-4">
                    <input
                      type="time"
                      id="mf_end_time  "
                      className="form-control form-group w-100 mf_end_time  "
                      placeholder="End Time"
                    ></input>
                  </div>
                </div>
              </div>
              
            </div>
            <div style={{marginTop:"20px",marginBottom:"20px"}}>
          <Button  type="submit"
                variant="primary"
                style={{ float: "right" }}>
            Xác nhận
          </Button>
          <Button style={{
                  float: "right",
                  marginRight: "10px",
                  backgroundColor: "gray",
                }} 
                onClick={props.onHide}>
            Hủy
          </Button>
          </div>
          </Form>
        </ModalBody>
    </Modal>
  );
  
}

export default ModaladdStaff;

 