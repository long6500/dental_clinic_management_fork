import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";
import { FaBookMedical, FaPlusCircle, FaTrashAlt } from "react-icons/fa";
import {
  Select,
  Pagination,
  Modal as ModalAntd,
  Table as TableAntd,
  Form as FormAntd,
  Space,
  Tag,
  InputNumber,
  DatePicker,
  TimePicker,
} from "antd";
import dayjs from "dayjs";
import { Typeahead } from "react-bootstrap-typeahead";
import { useFetcher } from "react-router-dom";
import axios from "../../apis/api";
import Swal from "sweetalert2";
const Payment = ({ closeMedPaper, openMedPaper }) => {
  const [show, setShow] = useState(false);

  const [paymentList, setPaymentList] = useState([]);
  const handleShow = () => {
    closeMedPaper();
    setShow(true);
  };

  const handleClose = () => {
    openMedPaper();
    setShow(false);
  };

  const columns = [
    {
      title: "Ngày trả",
      dataIndex: "date",
      align: "center",
    },
    {
      title: "Hình thức TT",
      dataIndex: "type",
      align: "center",
    },
    {
      title: "Thanh toán",
      dataIndex: "money",
      align: "center",
    },
    {
      title: "Nhân viên thu",
      dataIndex: "people",
      align: "center",
    },
    {
      title: "",
      dataIndex: "action",
      align: "center",
    },
  ];
  const curDate = new Date();
  const curTime = new Date().getTime();

  const [paySelect, setPaySelect] = useState([]);
  const op = [
    { id: 0, name: "Tiền mặt" },
    { id: 1, name: "VISA" },
    { id: 2, name: "Master Card" },
    { id: 3, name: "MOMO" },
    { id: 4, name: "VNPAY" },
    { id: 5, name: "Chuyển khoản" },
    { id: 6, name: "Thẻ trả trước" },
    { id: 7, name: "Khác" },
  ];

  const addRow = () => {
    setPaymentList([...paymentList, ["", [], "", ""]]);
  };

  const deleteRow = (rowIndex) => {
    // console.log(paymentList);
    let temp = paymentList;
    temp.splice(rowIndex, 1);
    setPaymentList([...temp]);
  };

  const dateFormat = "DD/MM/YYYY";
  const dataSource = paymentList.map((row, rowIndex) => {
    return {
      date: (
        <>
          <Space direction="vertical">
            <DatePicker
              format={dateFormat}
              defaultValue={dayjs(new Date())}
              disabled
            />
            <TimePicker
              defaultValue={dayjs(curTime, "HH:mm:ss")}
              disabled
              style={{ width: "100%" }}
            />
          </Space>
        </>
      ),
      type: (
        <FormAntd.Item
          name={`TK${rowIndex}`}
          rules={[
            {
              required: true,
              message: "Nhập cách thanh toán",
            },
          ]}
        >
          <Typeahead
            style={{
              // transform: "translateY(12px)",
              marginTop: "20px",
            }}
            id="basic-typeahead-single"
            labelKey="name"
            onChange={(e) => {
              // let temp = paySelect;
              // temp[rowIndex] = e;
              // setPaySelect([...temp]);
              console.log(e);
              let temp = paymentList;
              temp[rowIndex][1] = e;
              setPaymentList([...temp]);
            }}
            options={op}
            placeholder="Nhập thuốc"
            selected={row[1]}
          />
        </FormAntd.Item>
      ),
      money: (
        // <Form.Control
        //   required
        //   type="number"
        //   min="1"
        //   onChange={(e) => {
        //     // let temp = medListA;
        //     // temp[rowIndex][1] = Number(e.target.value);
        //     // setMedListA([...temp]);
        //   }}
        //   // value={row[1]}
        // />
        <>
          <InputNumber
            required
            min={1}
            value={row[2]}
            onChange={(e) => {
              let temp = paymentList;
              temp[rowIndex][2] = e;
              setPaymentList([...temp]);
            }}
          ></InputNumber>
        </>
      ),
      people: <Form.Control required type="text" value={"Demo value "} />,
      action: (
        <td
          onClick={() => {
            //them alert truoc khi xoa
            Swal.fire({
              title: "Bạn có chắc chắn muốn xoá",
              showDenyButton: true,
              // showCancelButton: true,
              confirmButtonText: "Xoá",
              denyButtonText: `Huỷ`,
            }).then((result) => {
              /* Read more about isConfirmed, isDenied below */
              if (result.isConfirmed) {
                deleteRow(rowIndex);
              } else if (result.isDenied) {
                // Swal.fire('Changes are not saved', '', 'info')
              }
            });
          }}
        >
          <FaTrashAlt cursor="pointer" color="#e74c3c" />
        </td>
      ),
    };
  });
  return (
    <>
      <Button
        variant="primary"
        style={{
          backgroundColor: "#e67e22",
          width: "52%",
          marginBottom: "8px",
          display: "inline",
        }}
        onClick={handleShow}
      >
        Thanh toán
      </Button>

      <Modal
        id="PaymentModal"
        size="lg"
        show={show}
        onHide={handleClose}
        // backdrop="static"
        // aria-labelledby="st-lg-modal"
      >
        <FormAntd
          name="basic"
          // form={form}
          // onFinish={checkClose}
        >
          <Modal.Header>
            <Modal.Title>Thanh toán</Modal.Title>

            <div style={{ float: "right", display: "inline-block" }}>
              <Button type="submit" variant="primary">
                OK
              </Button>
            </div>
          </Modal.Header>
          <Modal.Body>
            <Row className="mb-3" style={{ margin: "5px" }}>
              <Form.Label column sm={1} style={{ width: "13%", color: "blue" }}>
                Tổng tiền hoá đơn:
              </Form.Label>
              <Col
                sm={2}
                //  style={{ width: "20%" }}
              >
                <InputNumber
                  style={{
                    width: "100%",
                    color: "blue",
                  }}
                  defaultValue={3000000}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  bordered={false}
                  readOnly
                />
              </Col>
              <Form.Label
                column
                sm={1}
                style={{ width: "13%", color: "green" }}
              >
                <b>Đã thanh toán:</b>
              </Form.Label>
              <Col sm={2} style={{ padding: "0px" }}>
                <InputNumber
                  style={{
                    width: "100%",
                    color: "green",
                  }}
                  defaultValue={3000000}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  bordered={false}
                  readOnly
                />
              </Col>

              <Form.Label
                column
                sm={1}
                style={{ width: "8%", color: "red", display: "inline" }}
              >
                Còn nợ:
              </Form.Label>

              <Col sm={2} style={{ display: "inline" }}>
                <InputNumber
                  style={{
                    width: "100%",
                    color: "red",
                  }}
                  defaultValue={3000000}
                  formatter={(value) =>
                    `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  bordered={false}
                  readOnly
                />
              </Col>

              <Col sm={1} style={{ display: "inline" }}>
                <Button
                  variant="success"
                  onClick={addRow}
                  style={{
                    transform: "translateY(-7px)",
                  }}
                >
                  <FaPlusCircle />
                </Button>
              </Col>
            </Row>
            <TableAntd
              dataSource={dataSource}
              columns={columns}
              pagination={false}
            />
          </Modal.Body>
        </FormAntd>
      </Modal>
    </>
  );
};

export default Payment;
