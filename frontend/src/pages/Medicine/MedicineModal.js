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
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string()
        .required("Required")
        .min(4, "Must be 4 characters or more"),
      // imageUrl: Yup.required("Required"),
      quantity: Yup.number().required("Required").positive("Phải là số dương").integer("Phải là số tự nhiên"),
      price: Yup.number().required("Required").positive("Phải là số dương").moreThan(Yup.ref('purchasePrice'),"Giá bán phải lớn hơn giá nhập"),
      purchasePrice: Yup.number().required("Required").positive("Phải là số dương").lessThan(Yup.ref('price'),"Giá nhập phải nhỏ hơn giá bán "),
      unit: Yup.number().required("Required").positive("Phải là số dương").integer("Phải là số tự nhiên"),
      usage: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      console.log(values.imageUrl[0]);
      new Promise((resolve) => {
        resolve(values);
      })
        .then((values) => {
          let formData = new FormData()
          formData.append('name', values.name)
          formData.append('imageUrl', values.imageUrl[0])
          formData.append('quantity', values.quantity)
          formData.append('price', values.price)
          formData.append('purchasePrice', values.purchasePrice)
          formData.append('unit', values.unit)
          formData.append('usage', values.usage)
          formData.append('expiredDay', values.expiredDay)
          addMed(formData, navigate);
          handleClose();
        })
        .then(() => {
          setTimeout(() => {
            loadData();
          }, 100);
        });
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
                  <Form.Label column sm={12}>Tên thuốc</Form.Label>
                  <Form.Control
                    id="name"
                    value={formik.values.name}
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
                <Form.Label column sm={12}>Email</Form.Label>
                <UploadAndDisplayImage 
                value={formik.values.imageUrl ? formik.values.imageUrl : []} 
                onChange={(value) => {
                  if(value && value.length > 0) {
                    formik.values.imageUrl = value
                  }
                }}
                />
                  {formik.errors.imageUrl && (
                    <p className="errorMsg"> {formik.errors.imageUrl} </p>
                  )}
                </Form.Group>
              </Row>
              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label column sm={12}>Lượng/SP</Form.Label>
                  <Form.Control
                    id="quantity"
                    type="text"
                    placeholder="0"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.quantity && (
                    <p className="errorMsg"> {formik.errors.quantity} </p>
                  )}
                </Form.Group>

                <Form.Group className="mb-3" as={Col}>
                  <Form.Label column sm={12}>Giá bán</Form.Label>

                  <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Control
                        id="price"
                        type="text"
                        value={formik.values.price}
                        onChange={formik.handleChange}
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
                  <Form.Label column sm={12}>Đơn vị</Form.Label>
                  <Form.Control
                    id="unit"
                    type="text"
                    placeholder="0"
                    value={formik.values.unit}
                    onChange={formik.handleChange}
                  />
                  {formik.errors.unit && (
                    <p className="errorMsg"> {formik.errors.unit} </p>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label column sm={12}>Giá nhập</Form.Label>
                  <Row className="mb-3">
                    <Form.Group className="mb-3" as={Col}>
                      <Form.Control
                        id="purchasePrice"
                        type="text"
                        value={formik.values.purchasePrice}
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
                  <Form.Label column sm={12}>Cách sử dụng</Form.Label>
                  <Form.Control
                    id="usage"
                    value={formik.values.usage}
                    onChange={formik.handleChange}
                    as="textarea"
                    rows={3}
                  />
                  {formik.errors.usage && (
                    <p className="errorMsg">{formik.errors.usage}</p>
                  )}
                </Form.Group>
                <Form.Group className="mb-3" as={Col}>
                  <Form.Label column sm={12}>Ngày hết hạn</Form.Label>

                  <DatePicker
                    selected={
                      formik.values.expiredDay === ""
                        ? new Date()
                        : new Date(formik.values.expiredDay)
                    }
                    dateFormat="MM/dd/yyyy"
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
      </Modal>
    </>
  );
};

export default MedicineModal;
