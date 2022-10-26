import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlusCircle, FaRedoAlt, FaEdit } from "react-icons/fa";
import MedicineForm from "./MedicineForm";
import { useNavigate, useParams } from "react-router-dom";
import { addMed } from "../../apis/medicineProcessor";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from "react-redux";
import {
  getMedDetailSuccess,
  getMedicineSuccess,
} from "../../redux/reducer/medicineSlice";
import medicineProcessor from "../../apis/medicineProcessor";
import Nav from "react-bootstrap/Nav";
import UploadAndDisplayImage from "../../components/uploadImage";
import Pagination from 'react-bootstrap/Pagination';

const UpdateMedicineModal = ({ medID, isVisible, closeModal, loadData }) => {
  const dispatch = useDispatch();

  const newMedicine = useSelector((state) => state.med.medDetail);

  useEffect(() => {
    medID && medicineProcessor.getMedicineDetailObj(medID);
  }, [medID]);

  const navigate = useNavigate();

  const handleUpdateMedicine = (e) => {
    e.preventDefault();
    new Promise((resolve) => {
      resolve();
    })
      .then(() => {
        let formData = new FormData();
        formData.append("name", newMedicine.name);
        formData.append("imageUrl", newMedicine.imageUrl[0]);
        formData.append("quantity", newMedicine.quantity);
        formData.append("price", newMedicine.price);
        formData.append("purchasePrice", newMedicine.purchasePrice);
        formData.append("unit", newMedicine.unit);
        formData.append("usage", newMedicine.usage);
        formData.append("expiredDay", newMedicine.expiredDay);

        console.log("name: " + newMedicine.imageUrl[0]);
        medicineProcessor.updateMedcine(
          {
            ...newMedicine,
            // formData,
            price: newMedicine.price?.$numberDecimal,
            purchasePrice: newMedicine.purchasePrice?.$numberDecimal,
          },
          navigate
        );
        closeModal();
      })
      .then(() => {
        setTimeout(() => {
          loadData();
        }, 100);
      });
  };

  return (
    <>
      <Modal size="lg" show={isVisible} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Thông tin thuốc</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <>
            <Form>
              <Row className="mb-3">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Mã thuốc</Form.Label>
                  <Form.Control disabled type="text" value={newMedicine._id} />
                </Form.Group>
              </Row>

              <Row className="mb-3">
                <Form.Group
                  className="mb-3"
                  as={Col}
                  controlId="formGroupPassword"
                >
                  <Form.Label column sm={12}>
                    Tên thuốc
                  </Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      dispatch(getMedDetailSuccess({ name: e.target.value }));
                    }}
                    value={newMedicine.name}
                  />
                </Form.Group>
                <Form.Group as={Col}>
                  <Form.Label column sm={12}>
                    Hình ảnh
                  </Form.Label>
                  {/* <Form.Control
                    onChange={(e) => {
                      dispatch(getMedDetailSuccess({imageUrl: e.target.value}))
                      // setNewMedicine({ ...newMedicine, url: e.target.value });
                    }}
                    value={newMedicine.imageUrl}
                  />
                  <img src={newMedicine.url} /> */}
                  <UploadAndDisplayImage
                    value={newMedicine.imageUrl}
                    onChange={(e) => {
                      dispatch(getMedDetailSuccess({ imageUrl: e }));
                      console.log("img: " + newMedicine.imageUrl);
                      console.log("e: " + e);
                    }}
                  />
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Lượng/SP</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      dispatch(
                        getMedDetailSuccess({ quantity: e.target.value })
                      );
                    }}
                    value={newMedicine.quantity}
                    step="0.01"
                    min="0"
                    type="number"
                  />
                </Form.Group>

                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Giá bán</Form.Label>

                  <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Control
                        type="number"
                        onChange={(e) => {
                          dispatch(
                            getMedDetailSuccess({ price: e.target.value })
                          );
                        }}
                        value={newMedicine.price?.$numberDecimal}
                        // defaultValue={price?.$numberDecimal}
                        step="0.01"
                        min="0"
                      />
                    </Form.Group>
                  </Row>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Đơn vị</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      dispatch(getMedDetailSuccess({ unit: e.target.value }));
                    }}
                    value={newMedicine.unit}
                    step="0.01"
                    min="0"
                    type="number"
                  />
                </Form.Group>
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Giá nhập</Form.Label>
                  <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Control
                        onChange={(e) => {
                          dispatch(
                            getMedDetailSuccess({
                              purchasePrice: e.target.value,
                            })
                          );
                        }}
                        value={newMedicine.purchasePrice?.$numberDecimal}
                        step="0.01"
                        min="0"
                        type="number"
                      />
                    </Form.Group>
                  </Row>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Cách sử dụng</Form.Label>
                  <Form.Control
                    onChange={(e) => {
                      dispatch(getMedDetailSuccess({ usage: e.target.value }));
                    }}
                    value={newMedicine.usage}
                    as="textarea"
                    rows={3}
                  />
                </Form.Group>
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Ngày hết hạn</Form.Label>

                  <DatePicker
                    selected={new Date(newMedicine.expiredDay)}
                    dateFormat="MM/dd/yyyy"
                    onChange={(e) => {
                      dispatch(getMedDetailSuccess({ expiredDay: e }));
                    }}
                  ></DatePicker>
                </Form.Group>
              </Row>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Hủy bỏ
          </Button>
          <Button variant="primary" onClick={handleUpdateMedicine}>
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default UpdateMedicineModal;
