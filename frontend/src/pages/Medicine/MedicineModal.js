import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlusCircle } from "react-icons/fa";
import MedicineForm from "./MedicineForm";
import { useNavigate } from "react-router-dom";
import { addMed } from "../../apis/medicineProcessor";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MedicineModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const navigate = useNavigate();

  const [newMedicine, setNewMedicine] = useState({
    medId: "",
    name: "",
    url: "",
    quantity: -1,
    price: -1,
    purchasePrice: -1,
    unit: -1,
    usage: "",
    expireDay: "",
  });

  const handleAddMedicine = (e) => { 
    e.preventDefault();
    console.log("handleAddMedicine");
    const response = addMed(newMedicine, navigate);
  };


  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ marginRight: "20px" }}
      >
        <FaPlusCircle></FaPlusCircle> Thêm thuốc
      </Button>

      <Modal size="lg" show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin thuốc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <MedicineForm></MedicineForm> */}
          <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Mã thuốc</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                // setMedId(e.target.value)
                setNewMedicine({ ...newMedicine, medId: e.target.value });
              }}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col} controlId="formGroupPassword">
            <Form.Label>Tên thuốc</Form.Label>
            <Form.Control
              onChange={(e) => {
                setNewMedicine({ ...newMedicine, name: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group as={Col}>
            Hình ảnh  
            <Form.Control
              onChange={(e) => {
                setNewMedicine({ ...newMedicine, url: e.target.value });
              }}
            />
            <img src={newMedicine.url} />
            {/* <UploadAndDisplayImage></UploadAndDisplayImage> */}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Lượng/SP</Form.Label>
            <Form.Control
              onChange={(e) => {
                setNewMedicine({ ...newMedicine, quantity: e.target.value });
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Giá bán</Form.Label>

            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col}>
                <Form.Control
                  onChange={(e) => {
                    setNewMedicine({ ...newMedicine, price: e.target.value });
                  }}
                  defaultValue="0"
                />
              </Form.Group>
              <Form.Group className="mb-3" as={Col}>
                <Form.Control defaultValue="0" />
              </Form.Group>
            </Row>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Đơn vị</Form.Label>
            <Form.Control
              onChange={(e) => {
                setNewMedicine({ ...newMedicine, unit: e.target.value });
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Giá nhập</Form.Label>
            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col}>
                <Form.Control
                  onChange={(e) => {
                    setNewMedicine({
                      ...newMedicine,
                      purchasePrice: e.target.value,
                    });
                  }}
                  defaultValue="0"
                />
              </Form.Group>
              <Form.Group className="mb-3" as={Col}>
                <Form.Control defaultValue="0" />
              </Form.Group>
            </Row>
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Cách sử dụng</Form.Label>
            <Form.Control
              onChange={(e) => {
                setNewMedicine({ ...newMedicine, usage: e.target.value });
              }}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Ngày hết hạn</Form.Label>
          
            <DatePicker 
              selected={newMedicine.expireDay}
              dateFormat="dd/MM/yyyy"
              onChange={(e) => {
                setNewMedicine({ ...newMedicine, expireDay: e });
              }}
            ></DatePicker>
          </Form.Group>
        </Row>
      </Form>
    </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleAddMedicine}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MedicineModal;
