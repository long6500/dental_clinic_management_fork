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
          size="lg"
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>Thêm nhân viên</ModalHeader>
          <ModalBody>
            <div className="container">
              <div className="row">
                <div className="col-5 form-group">
                  <label>Mã nhân viên</label>
                  <Input type="text"></Input>
                </div>
                <div className="col-5 form-group">
                  <label>Tên nhân viên</label>
                  <Input type="text"></Input>
                </div>
                <div className="col-5 form-group">
                  <label>Điện thoại</label>
                  <Input type="text"></Input>
                </div>
                <div className="col-5 form-group">
                  <label>Địa chỉ</label>
                  <Input type="text"></Input>
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
