import React, { useEffect, useState } from "react";
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
import UploadAndDisplayImage from "../../components/uploadImage";

const MedicineModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const [newMedicine, setNewMedicine] = useState({
    name: "",
    imageUrl: "",
    quantity: -1,
    price: -1,
    purchasePrice: -1,
    unit: -1,
    usage: "",
    expiredDay: new Date().toLocaleDateString('en-US'),
  });

  const handleAddMedicine = (e) => {
    e.preventDefault();
    console.log("handleAddMedicine");
    console.log("date: " + newMedicine.expiredDay);
   addMed(newMedicine, navigate);
    setNewMedicine({
      name: "",
      imageUrl: "",
      quantity: -1,
      price: -1,
      purchasePrice: -1,
      unit: -1,
      usage: "",
      expiredDay: new Date().toLocaleDateString('en-US'),
    });
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

      <Modal size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin thuốc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <MedicineForm></MedicineForm> */}
          <>
            <Form>
              {/* <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Mã thuốc</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                // set_id(e.target.value)
                setNewMedicine({ ...newMedicine, _id: e.target.value });
              }}
            />
          </Form.Group>
        </Row> */}

              <Row className="mb-3">
                <Form.Group
                  className="mb-3"
                  as={Col}
                  controlId="formGroupPassword"
                >
                  <Form.Label>Tên thuốc</Form.Label>
                  <Form.Control
                    value={newMedicine.name}
                    onChange={(e) => {
                      setNewMedicine({ ...newMedicine, name: e.target.value });
                    }}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  Hình ảnh
                  <Form.Control
                    value={newMedicine.imageUrl }
                    onChange={(e) => {
                      setNewMedicine({
                        ...newMedicine,
                        imageUrl: e.target.value,
                      });
                    }}
                  />
                  <img src={newMedicine.imageUrl} />
                  {/* <UploadAndDisplayImage/> */}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Lượng/SP</Form.Label>
                  <Form.Control
                  type
                    value={newMedicine.quantity}
                    onChange={(e) => {
                      setNewMedicine({
                        ...newMedicine,
                        quantity: e.target.value,
                      });
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Giá bán</Form.Label>

                  <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Control
                        value={newMedicine.price}
                        onChange={(e) => {
                          setNewMedicine({
                            ...newMedicine,
                            price: e.target.value,
                          });
                        }}
                        placeholder="0"
                      />
                    </Form.Group>
                  </Row>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Đơn vị</Form.Label>
                  <Form.Control
                    value={newMedicine.unit}
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
                        value={newMedicine.purchasePrice}
                        onChange={(e) => {
                          setNewMedicine({
                            ...newMedicine,
                            purchasePrice: e.target.value,
                          });
                        }}
                        placeholder="0"
                      />
                    </Form.Group>
                  </Row>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Cách sử dụng</Form.Label>
                  <Form.Control
                    value={newMedicine.usage}
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
                    selected={
                      newMedicine.expiredDay === ""
                        ? new Date()
                        : new Date(newMedicine.expiredDay)
                    }
                    dateFormat="MM/dd/yyyy"
                    onChange={(e) => {
                      setNewMedicine({
                        ...newMedicine,
                        expiredDay: new Date(e).toLocaleDateString("en-US"),
                      });
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
