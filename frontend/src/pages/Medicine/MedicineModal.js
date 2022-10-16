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
import { useFormik } from "formik";
import * as Yup from "yup";
import UploadAndDisplayImage from "../../components/uploadImage";

const MedicineModal = (prop) => {
  const { loadData } = prop;
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: "",
      imageUrl: "",
      quantity: 0,
      price: 0,
      purchasePrice: 0,
      unit: 0,
      usage: "",
      expiredDay: new Date().toLocaleDateString("en-US"),
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
      imageUrl: Yup.string()
        .required("Required")
        .min(8, "Must be 8 characters or more"),
      quantity: Yup.number().required("Required").positive(),
      price: Yup.number().required("Required").positive(),
      purchasePrice: Yup.number().required("Required").positive(),
      unit: Yup.number().required("Required").positive(),
      usage: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      new Promise((resolve) => {
        resolve()
      }).then(() => {
        addMed(values, navigate);
        handleClose()
      }).then(() => {
        setTimeout(() => {
          loadData()
        }, 100)
      })
    },
  });

  // const [newMedicine, setNewMedicine] = useState({
  //   name: "",
  //   imageUrl: "",
  //   quantity: -1,
  //   price: -1,
  //   purchasePrice: -1,
  //   unit: -1,
  //   usage: "",
  //   expiredDay: new Date().toLocaleDateString("en-US"),
  // });

  const handleAddMedicine = (e) => {
    e.preventDefault();
    console.log(formik.values);
    addMed(formik.values, navigate);
    // setNewMedicine({
    //   name: "",
    //   imageUrl: "",
    //   quantity: -1,
    //   price: -1,
    //   purchasePrice: -1,
    //   unit: -1,
    //   usage: "",
    //   expiredDay: new Date().toLocaleDateString("en-US"),
    // });
    handleClose();
    loadData();
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
            <Form onSubmit={formik.handleSubmit}>
              <Row className="mb-3">
                <Form.Group
                  className="mb-3"
                  as={Col}
                  controlId="formGroupPassword"
                >
                  <Form.Label>Tên thuốc</Form.Label>
                  <Form.Control
                    defaultValue={formik.values.name}
                    // onChange={(e) => {
                    //   // setNewMedicine({ ...newMedicine, name: e.target.value });
                    //   formik.handleChange();
                    // }}
                    onChange={formik.handleChange}
                    placeholder="Nhập tên thuốc"
                  />

                  {formik.errors.name && (
                    <p className="errorMsg"> {formik.errors.name} </p>
                  )}
                </Form.Group>
                <Form.Group as={Col}>
                  Hình ảnh
                  <Form.Control
                    defaultValue={formik.values.imageUrl}
                    // onChange={(e) => {
                    //   // setNewMedicine({
                    //   //   ...newMedicine,
                    //   //   imageUrl: e.target.value,
                    //   // });
                    //   formik.handleChange();
                    // }}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.imageUrl && (
                    <p className="errorMsg"> {formik.errors.imageUrl} </p>
                  )}
                  {/* <img src={newMedicine.imageUrl} /> */}
                  {/* <UploadAndDisplayImage/> */}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Lượng/SP</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0"
                    // value={
                    //   newMedicine.quantity === -1 ? 0 : newMedicine.quantity
                    // }
                    defaultValue={formik.values.quantity}
                    // onChange={(e) => {
                    //   // setNewMedicine({
                    //   //   ...newMedicine,
                    //   //   quantity: e.target.value,
                    //   // });
                    //   formik.handleChange();
                    // }}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.quantity && (
                    <p className="errorMsg"> {formik.errors.quantity} </p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Giá bán</Form.Label>

                  <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Control
                        type="number"
                        // value={newMedicine.price === -1 ? 0 : newMedicine.price}
                        defaultValue={formik.values.price}
                        // onChange={(e) => {
                        //   // setNewMedicine({
                        //   //   ...newMedicine,
                        //   //   price: e.target.value,
                        //   // });
                        //   formik.handleChange();
                        // }}
                        onChange={formik.handleChange}
                        // placeholder="0"
                      />
                      {formik.errors.price && (
                        <p className="errorMsg"> {formik.errors.price} </p>
                      )}
                    </Form.Group>
                  </Row>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Đơn vị</Form.Label>
                  <Form.Control
                    type="number"
                    placeholder="0"
                    // value={newMedicine.unit === -1 ? 0 : newMedicine.unit}
                    defaultValue={formik.values.unit}
                    // onChange={(e) => {
                    //   // setNewMedicine({ ...newMedicine, unit: e.target.value });
                    //   formik.handleChange();
                    // }}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.unit && (
                    <p className="errorMsg"> {formik.errors.unit} </p>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Giá nhập</Form.Label>
                  <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Control
                        type="number"
                        // value={
                        //   newMedicine.purchasePrice === -1
                        //     ? 0
                        //     : newMedicine.purchasePrice
                        // }
                        defaultValue={formik.values.purchasePrice}
                        // onChange={(e) => {
                        //   // setNewMedicine({
                        //   //   ...newMedicine,
                        //   //   purchasePrice: e.target.value,
                        //   // });
                        //   formik.handleChange();
                        // }}
                        onChange={formik.handleChange}
                        placeholder="0"
                      />
                      {formik.errors.purchasePrice && (
                        <p className="errorMsg">
                          {formik.errors.purchasePrice}
                        </p>
                      )}
                    </Form.Group>
                  </Row>
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Cách sử dụng</Form.Label>
                  <Form.Control
                    // value={newMedicine.usage}
                    defaultValue={formik.values.usage}
                    // onChange={(e) => {
                    //   // setNewMedicine({ ...newMedicine, usage: e.target.value });
                    //   formik.handleChange();
                    // }}
                    onChange={formik.handleChange}
                    as="textarea"
                    rows={3}
                  />
                  {formik.errors.usage && (
                    <p className="errorMsg">{formik.errors.usage}</p>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label>Ngày hết hạn</Form.Label>

                  <DatePicker
                    selected={
                      formik.values.expiredDay === ""
                        ? new Date()
                        : new Date(formik.values.expiredDay)
                    }
                    dateFormat="MM/dd/yyyy"
                    // onChange={(e) => {
                    //   // setNewMedicine({
                    //   //   ...newMedicine,
                    //   //   expiredDay: new Date(e).toLocaleDateString("en-US"),
                    //   // });
                    //   formik.handleChange();
                    // }}
                    onChange={formik.handleChange}
                  ></DatePicker>
                </Form.Group>
              </Row>
              <Button type="submit" variant="primary">
                Lưu lại
              </Button>
            </Form>
          </>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Hủy bỏ
          </Button>
          <Button  type="submit" variant="primary">
            Lưu lại
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default MedicineModal;
