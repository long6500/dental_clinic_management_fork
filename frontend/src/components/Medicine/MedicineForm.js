import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import UploadAndDisplayImage from "../uploadImage";
import ReactDatePicker from "react-datepicker";
import DatePicker1 from "../datePicker";
const MedicineForm = () => {
  const [url, setUrl] = useState("");

  function onChangeImage(e) {
    const value = e.target.value;
    setUrl(value);
  }
  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Mã thuốc</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group as={Col} controlId="formGridPassword">
            <Form.Label>Mã vạch</Form.Label>
            <Form.Control />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col} controlId="formGroupPassword">
            <Form.Label>Tên thuốc</Form.Label>
            <Form.Control />
          </Form.Group>
          <Form.Group as={Col}>
            Hình ảnh
            <Form.Control onChange={onChangeImage} />
            <img src={url}  />
            {/* <UploadAndDisplayImage></UploadAndDisplayImage> */}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Lượng/SP</Form.Label>
            <Form.Control />
          </Form.Group>

          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Giá bán</Form.Label>

            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col}>
                <Form.Control defaultValue="0" />
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
            <Form.Control />
          </Form.Group>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Giá nhập</Form.Label>
            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col}>
                <Form.Control defaultValue="0" />
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
            <Form.Control as="textarea" rows={3} />
          </Form.Group>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Ngày hết hạn</Form.Label>
            <DatePicker1></DatePicker1>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
};

export default MedicineForm;
