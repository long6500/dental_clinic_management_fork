import React, { useState, useEffect, Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Input } from "reactstrap";
class ModaladdStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = () => {
    this.props.toggleFromParent();
  };
  render() {
    console.log("check childs prop", this.props);
    console.log("check child open modal", this.props.isOpen);
    return (
      <>
        <Modal
          isOpen={this.props.isOpen}
          toggle={() => this.toggle()}
          size="xl"
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <div className="col-6 form-group">
                  <label>Tên nhân viên</label>
                  <Input type="text"></Input>
                </div>
                <div className="col-6 form-group">
                  <label>Điện thoại</label>
                  <Input type="text"></Input>
                </div>
                <div className="col-6 form-group">
                  <label>Chức vụ</label>
                  <Input type="text"></Input>
                </div>
                <div className="col-6 form-group">
                  <label>Email</label>
                  <Input type="text"></Input>
                </div>
                <div className="col-12 form-group">
                  <label>Địa chỉ</label>
                  <Input type="text"></Input>
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
          </ModalBody>
          <ModalFooter>
            <Button color="primary" onClick={() => this.toggle()}>
              Xác nhận
            </Button>{" "}
            <Button color="secondary" onClick={() => this.toggle()}>
              Hủy
            </Button>
          </ModalFooter>
        </Modal>
      </>
    );
  }
}

export default ModaladdStaff;
