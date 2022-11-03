import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlusCircle } from "react-icons/fa";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useFormik, Field } from "formik";
import * as Yup from "yup";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const CustomerModal = ({ loadData }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    // console.log(formik.values.expiredDay);
  };

  const [birthDay, setBirthDay] = useState(
    new Date().toLocaleDateString("en-US")
  );

  const formik = useFormik({
    initialValues: {
      name: "",
      job: "",
      phone: "",
      address: "",
      gender: "0",
      blood: "unknown",
      birthdate: "",
      body: [],
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      name: Yup.string().required("Nhập tên").min(4, "Tối thiểu 4 kí tự"),
      phone: Yup.string()
        .required("Required")
        .matches(/(84|0[3|5|7|8|9])+([0-9]{8})\b/g, "Điền đúng số điện thoại"),
    }),
    onSubmit: async (values) => {
      // let formData = new FormData();
      // formData.append("name", values.name);
      // formData.append("imageUrl", values.imageUrl[0]);
      // formData.append("quantity", values.quantity);
      // formData.append("price", values.price);
      // formData.append("purchasePrice", values.purchasePrice);
      // formData.append("unit", values.unit);
      // formData.append("usage", values.usage);
      // formData.append("expiredDay", values.expiredDay);
      //   formData.append("expiredDay", exDay);

      console.log(new Date(values.birthdate).toLocaleDateString("en-US"));
      // handleClose();
      // values.name = "";
      // values.imageUrl = "";
      // values.quantity = 0;
      // values.price = 0;
      // values.purchasePrice = 0;
      // values.unit = "";
      // values.usage = "";
      // values.expiredDay = new Date().toLocaleDateString("en-US");
      //   setExDay(new Date().toLocaleDateString("en-US"));
      //   addMed(formData, navigate);
      // await loadData();
    },
  });

  return (
    <>
      <Button
        variant="success"
        onClick={handleShow}
        style={{ marginRight: "20px" }}
      >
        <FaPlusCircle></FaPlusCircle> Thêm khách hàng
      </Button>

      <Modal id="customerModal" size="lg" show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Nhập thông tin khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <MedicineForm></MedicineForm> */}
          <>
            <Form onSubmit={formik.handleSubmit}>
              <Form.Group
                className="mb-3"
                as={Row}
                controlId="formGroupPassword"
              >
                <Form.Label column sm={2}>
                  Tên khách hàng
                  <span
                    style={{
                      display: "inline",
                      marginBottom: "0px",
                      color: "red",
                    }}
                  >
                    {" "}
                    *
                  </span>
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    id="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    placeholder="Nhập tên thuốc"
                  />
                  {formik.errors.name && (
                    <p className="errorMsg"> {formik.errors.name} </p>
                  )}
                </Col>

                <Form.Label column sm={2}>
                  Nghề nghiệp
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    id="usage"
                    value={formik.values.usage}
                    onChange={formik.handleChange}
                  />
                </Col>
              </Form.Group>

              <Row className="mb-3">
                {/* <Form.Group className="mb-3" as={Col}> */}
                <Form.Label column sm={2}>
                  Số điện thoại
                  <span
                    style={{
                      display: "inline",
                      marginBottom: "0px",
                      color: "red",
                    }}
                  >
                    {" "}
                    *
                  </span>
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    id="phone"
                    type="text"
                    placeholder="0"
                    onChange={formik.handleChange}
                  />
                  {formik.errors.phone && (
                    <p className="errorMsg"> {formik.errors.phone} </p>
                  )}
                </Col>
                {/* </Form.Group> */}
                {/* <Form.Group className="mb-3" as={Col}> */}
                <Form.Label column sm={2}>
                  Địa chỉ
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    id="purchasePrice"
                    type="text"
                    onChange={formik.handleChange}
                    placeholder="0"
                  />
                  {formik.errors.purchasePrice && (
                    <p className="errorMsg">{formik.errors.purchasePrice}</p>
                  )}
                </Col>
                {/* </Form.Group> */}
              </Row>

              <Row className="mb-3">
                <Form.Label column sm={2}>
                  Giới tính
                </Form.Label>
                <Col sm={4}>
                  <Form.Select
                    id="gender"
                    onChange={(e) => {
                      formik.handleChange(e);
                      console.log(e.target.value);
                    }}
                  >
                    <option value="0">Không xác định</option>
                    <option value="1">Nam</option>
                    <option value="2">Nữ</option>
                  </Form.Select>

                  {formik.errors.quantity && (
                    <p className="errorMsg"> {formik.errors.quantity} </p>
                  )}
                </Col>

                <Form.Label column sm={2}>
                  Nhóm máu
                </Form.Label>
                <Col sm={4}>
                  <Form.Select
                    id="blood"
                    onChange={(e) => {
                      formik.handleChange(e);
                      console.log(e.target.value);
                    }}
                  >
                    <option value="unknown">Không biết</option>
                    <option value="A">A</option>
                    <option value="B">B</option>
                    <option value="AB">AB</option>
                    <option value="O">O</option>
                  </Form.Select>
                  {formik.errors.price && (
                    <p className="errorMsg"> {formik.errors.price} </p>
                  )}
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Label column sm={2}>
                  Ngày sinh
                </Form.Label>
                {/* <DatePicker
                    selected={new Date(birthDay)}
                    dateFormat="MM/dd/yyyy"
                    onChange={(e) => {
                      setBirthDay(e);
                    }}
                  ></DatePicker> */}
                <Col sm={4}>
                  <Form.Control
                    type="date"
                    id="birthdate"
                    // format="dd/MM/yyyy"
                    onChange={formik.handleChange}
                  />
                </Col>
                <Form.Label column sm={2}>
                  Tổng tiền
                </Form.Label>
                <Col>
                  <Form.Control
                    disabled
                    id="usage"
                    value={formik.values.usage}
                    onChange={formik.handleChange}
                    placeholder="0"
                  />
                  {formik.errors.usage && (
                    <p className="errorMsg">{formik.errors.usage}</p>
                  )}
                </Col>
              </Row>
              <Row className="mb-3">
                <Form.Label column sm={2}>
                  Ghi chú
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    id="usage"
                    value={formik.values.usage}
                    onChange={formik.handleChange}
                  />
                </Col>
                <Form.Label column sm={2}>
                  Đã thanh toán
                </Form.Label>
                <Col>
                  <Form.Control
                    disabled
                    id="usage"
                    value={formik.values.usage}
                    onChange={formik.handleChange}
                    placeholder="0"
                  />
                  {formik.errors.usage && (
                    <p className="errorMsg">{formik.errors.usage}</p>
                  )}
                </Col>
              </Row>

              <Row className="mb-3">
                <Form.Group className="mb-3" as={Col}>
                  {/* <Form.Label column>Ghi chú</Form.Label>
                  <Form.Control
                    id="usage"
                    value={formik.values.usage}
                    onChange={formik.handleChange}
                  /> */}
                </Form.Group>
                <Form.Label column sm={2}>
                  Tổng tiền nợ
                </Form.Label>
                <Col sm={4}>
                  <Form.Control
                    disabled
                    id="usage"
                    value={formik.values.usage}
                    onChange={formik.handleChange}
                    placeholder="0"
                  />
                  {formik.errors.usage && (
                    <p className="errorMsg">{formik.errors.usage}</p>
                  )}
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>
                    <b> Tiền sử bệnh toàn thân:</b>
                  </Form.Label>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Check
                    inline
                    name="body"
                    label="Gan"
                    value="Gan"
                    type="checkbox"
                    id="1"
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="body"
                    label="Tiểu Đường"
                    value="Tiểu Đường"
                    type="checkbox"
                    id="2"
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="body"
                    label="Thấp khớp"
                    value="Thấp khớp"
                    type="checkbox"
                    id="3"
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="body"
                    label="Thần kinh"
                    value="Thần kinh"
                    type="checkbox"
                    id="4"
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="body"
                    label="Dị ứng"
                    value="Dị ứng"
                    type="checkbox"
                    id="5"
                    onChange={formik.handleChange}
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Check
                    inline
                    name="body"
                    label="Tiêu hóa"
                    value="Tiêu hóa"
                    type="checkbox"
                    id="6"
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="body"
                    label="Hô hấp"
                    value="Hô hấp"
                    type="checkbox"
                    id="7"
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="body"
                    label="Tim mạch"
                    value="Tim mạch"
                    type="checkbox"
                    id="8"
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="body"
                    label="Thận"
                    value="Thận"
                    type="checkbox"
                    id="9"
                    onChange={formik.handleChange}
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="body"
                    label="Khác"
                    value="Khác"
                    type="checkbox"
                    id="10"
                    onChange={formik.handleChange}
                  />
                </Col>
              </Row>

              <Row className="mb-3">
                <Col>
                  <Form.Label>
                    <b> Tiền sử bệnh răng miệng:</b>
                  </Form.Label>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Check
                    inline
                    name="group2"
                    label="Khớp thái dương hàm"
                    type="checkbox"
                    id="11"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="group2"
                    label="Tiểu Đường"
                    type="checkbox"
                    id="12"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="group2"
                    label="Thấp khớp"
                    type="checkbox"
                    id="13"
                  />
                </Col>
              </Row>
              <Row className="mb-3">
                <Col>
                  <Form.Check
                    inline
                    name="group2"
                    label="Thần kinh"
                    type="checkbox"
                    id="14"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="group2"
                    label="Dị ứng"
                    type="checkbox"
                    id="15"
                  />
                </Col>
                <Col>
                  <Form.Check
                    inline
                    name="group2"
                    label="Dị ứng"
                    type="checkbox"
                    id="16"
                  />
                </Col>
              </Row>

              <Button
                type="submit"
                variant="primary"
                style={{ float: "right" }}
              >
                Lưu lại
              </Button>
              <Button
                style={{
                  float: "right",
                  marginRight: "10px",
                  backgroundColor: "gray",
                }}
                onClick={handleClose}
              >
                Hủy bỏ
              </Button>
            </Form>
          </>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default CustomerModal;
