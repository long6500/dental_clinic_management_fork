import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlusCircle } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { addMed } from "../../apis/medicineProcessor";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const ServiceModal = () => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();
  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ marginRight: "20px" }}
      >
        <FaPlusCircle></FaPlusCircle> Thêm thủ thuật
      </Button>
      <Modal size="lg" show={show} onHide={handleClose} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Thông tin thủ thuật</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <MedicineForm></MedicineForm> */}
          <>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Mã thủ thuật</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
                <Form.Group as={Col}>
                  Hình ảnh
                  <Form.Control />
                  {/* <img src={} /> */}
                  {/* <UploadAndDisplayImage></UploadAndDisplayImage> */}
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group
                  className="mb-3"
                  as={Col}
                  controlId="formGroupPassword"
                >
                  <Form.Label>Tên thủ thuật</Form.Label>
                  <Form.Control />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Thời gian</Form.Label>
                  <Form.Control type="text" />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Giá</Form.Label>
                  <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Control defaultValue="0" />
                    </Form.Group>
                  </Row>
                </Form.Group>

                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Ghi chú</Form.Label>
                  <Form.Control as="textarea" rows={3} />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Hoa hồng</Form.Label>
                  <Row>
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Check
                        name="group1"
                        type="radio"
                        id="custom-switch"
                        label="Theo %"
                      />
                    </Form.Group>

                    <Form.Group className="mb-3" as={Col}>
                      <Form.Control defaultValue="0" />
                    </Form.Group>
                  </Row>
                  <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Check
                        name="group1"
                        type="radio"
                        id="custom-switch"
                        label="Theo tiền"
                      />
                    </Form.Group>
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Control defaultValue="0" />
                    </Form.Group>
                  </Row>
                </Form.Group>
              </Row>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ServiceModal;
