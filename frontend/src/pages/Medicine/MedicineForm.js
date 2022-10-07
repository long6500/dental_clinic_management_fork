import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import { addMed } from "../../apis/medicineProcessor";
const MedicineForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [medId, setMedId] = useState("");
  const [name, setName] = useState("");
  const [url, setUrl] = useState("");
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [purchasePrice, setPurchasePrice] = useState();
  const [unit, setUnit] = useState();
  const [usage, setUsage] = useState("");
  const [expireDay, setExpireDay] = useState(new Date());

  const [newMedicine, setNewMedicine] =  useState({
    medId: "",
    name: "",
    url: "",
    quantity: -1,
    price: -1,
    purchasePrice: -1,
    unit: -1,
    usage: "",
    expireDay: "",
  })

  const handleAddMedicine = (e) => {
    e.preventDefault();
    const response = addMed(newMedicine, navigate);
  };

  return (
    <>
      <Form>
        <Row className="mb-3">
          <Form.Group as={Col} controlId="formGridEmail">
            <Form.Label>Mã thuốc</Form.Label>
            <Form.Control
              type="text"
              onChange={(e) => {
                // setMedId(e.target.value)
                setNewMedicine({...newMedicine, medId: e.target.value})
              }}
            />
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col} controlId="formGroupPassword">
            <Form.Label>Tên thuốc</Form.Label>
            <Form.Control onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group as={Col}>
            Hình ảnh
            <Form.Control onChange={(e) => setUrl(e.target.value)} />
            <img src={url} />
            {/* <UploadAndDisplayImage></UploadAndDisplayImage> */}
          </Form.Group>
        </Row>
        <Row className="mb-3">
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Lượng/SP</Form.Label>
            <Form.Control onChange={(e) => setQuantity(e.target.value)} />
          </Form.Group>

          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Giá bán</Form.Label>

            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col}>
                <Form.Control
                  onChange={(e) => setPrice(e.target.value)}
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
            <Form.Control onChange={(e) => setUnit(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Giá nhập</Form.Label>
            <Row className="mb-3">
              <Form.Group className="mb-3" as={Col}>
                <Form.Control
                  onChange={(e) => setPurchasePrice(e.target.value)}
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
              onChange={(e) => setUsage(e.target.value)}
              as="textarea"
              rows={3}
            />
          </Form.Group>
          <Form.Group className="mb-3" as={Col}>
            <Form.Label>Ngày hết hạn</Form.Label>
            {/* <DatePicker1
              onChange={(e) => setExpireDay(e.target.value)}
            ></DatePicker1> */}
            <DatePicker
              selected={expireDay}
              dateFormat="dd/MM/yyyy"
              onChange={(e) => setExpireDay(e)}
            ></DatePicker>
          </Form.Group>
        </Row>
      </Form>
    </>
  );
};

export default MedicineForm;
