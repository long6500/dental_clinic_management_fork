import React, { useState, useEffect, Component } from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import { Input } from "reactstrap";
class EditStaff extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  toggle = () => {
    this.props.toggleFromParentEdit();
  };
  render() {
    console.log("check childs propEdit", this.props);
    console.log("check child open modalEdit", this.props.isOpenEdit);

    return (
      <>
        <Modal
          isOpen={this.props.isOpenEdit}
          toggle={() => this.toggle()}
          size="lg"
          centered
        >
          <ModalHeader toggle={() => this.toggle()}>Sửa nhân viên</ModalHeader>
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

export default EditStaff;
