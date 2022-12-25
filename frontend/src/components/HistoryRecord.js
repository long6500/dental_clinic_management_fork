import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { FaPlusCircle, FaRegEye } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../apis/api";
import Table from "react-bootstrap/Table";
import ReactPaginate from "react-paginate";
import { FaTrashAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { Select, Pagination, Table as TableAntd, Form as FormAntd } from "antd";
import { AiTwotonePauseCircle } from "react-icons/ai";

const HistoryRecord = ({ show, handleClose, cusId, cusName }) => {
  const [systemMed, setSystemMed] = useState([]);
  const [dentalMed, setDentalMed] = useState([]);

  const [recordData, setRecordData] = useState([]);
  const [curCustomer, setCurCustomer] = useState({});

  const loadSystemMed = async () => {
    const response = await axios
      .get("/api/systemicMedicalHistory")
      .catch((err) => {
        console.log(err);
      });
    setSystemMed(response.data);
  };

  const loadDentalMed = async () => {
    const response = await axios
      .get("/api/dentalMedicalHistory")
      .catch((err) => {
        console.log(err);
      });
    setDentalMed(response.data);
  };

  const getCustomer = async () => {
    const response = await axios.get(`api/customer/${cusId}`);
    setCurCustomer(response.data);
  };

  const getRecordData = async () => {
    const response = await axios.get(`api/medicalService/getHistory/${cusId}`);

    setRecordData([
      ...response.data.map((m) => ({
        time: new Date(m.medicalPaperItem[0].createdAt).toLocaleDateString(
          "en-GB"
        ),
        PKID: m.medicalPaperId,
        name: m.serviceItem[0].name,
        note: m.medicalPaperItem[0].note,
      })),
    ]);
  };
  useEffect(() => {
    if (cusId) {
      loadSystemMed();
      loadDentalMed();
      getCustomer();
      getRecordData();
    }
  }, [show]);

  const columns = [
    {
      title: "Thời gian",
      dataIndex: "time",
      key: "time",
      align: "center",
      // sorter: (a, b) => a._id.localeCompare(b._id),
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };

        if (index >= 1 && value === dataSource[index - 1].time) {
          obj.props.rowSpan = 0;
        } else {
          for (
            let i = 0;
            index + i !== dataSource.length &&
            value === dataSource[index + i].time;
            i += 1
          ) {
            obj.props.rowSpan = i + 1;
          }
        }

        return obj;
      },
    },
    {
      title: "Mã phiếu khám",
      dataIndex: "PKID",
      key: "PKID",
      align: "center",
      // sorter: (a, b) => a.name.localeCompare(b.name),
      render: (value, row, index) => {
        const obj = {
          children: value,
          props: {},
        };

        if (index >= 1 && value === dataSource[index - 1].PKID) {
          obj.props.rowSpan = 0;
        } else {
          for (
            let i = 0;
            index + i !== dataSource.length &&
            value === dataSource[index + i].PKID;
            i += 1
          ) {
            obj.props.rowSpan = i + 1;
          }
        }

        return obj;
      },
    },
    {
      title: "Thủ thuật",
      dataIndex: "name",
      key: "name",
      align: "center",

      // sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Nội dung",
      dataIndex: "note",
      key: "note",
      align: "center",
    },
  ];

  const dataSource = recordData?.map((i, rowIndex) => {
    return {
      PKID: i.PKID,
      name: i.name,
      time: i.time,
      note: i.note,
    };
  });
  return (
    <Modal
      id="historyRecord"
      show={show}
      onHide={handleClose}
      //   style={{ opacity: `${opac}` }}
    >
      <Modal.Header closeButton>
        <Modal.Title
          style={
            {
              // marginRight: "30px"
            }
          }
        >
          Lịch sử khám
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <FormAntd
          name="basic"
          //    onFinish={addPk}
        >
          <Row className="mb-3">
            <Form.Label column sm={2}>
              Tên khách hàng
            </Form.Label>
            <Col sm={4}>
              <Form.Control id="phone" type="text" readOnly value={cusName} />
            </Col>
            <Form.Label column sm={2}>
              Mã khách hàng
            </Form.Label>
            <Col sm={4}>
              <Form.Control id="phone" type="text" readOnly value={cusId} />
            </Col>
          </Row>

          {/* Tiền sử bệnh toàn thân */}
          <Row className="mb-3">
            <Col>
              <Form.Label>
                <b> Tiền sử bệnh toàn thân:</b>
              </Form.Label>
            </Col>
          </Row>
          <Row className="mb-3" style={{ margin: "5px" }}>
            {systemMed.map((sys, inde) => {
              return (
                <Col>
                  <Form.Check
                    readOnly
                    // disabled
                    inline
                    name="systemicMedicalHistory"
                    label={sys.name}
                    value={sys._id}
                    type="checkbox"
                    id={inde + 1}
                    style={{ width: "160px" }}
                    checked={
                      curCustomer.systemicMedicalHistory &&
                      curCustomer.systemicMedicalHistory.includes(sys._id)
                        ? true
                        : false
                    }
                  />
                </Col>
              );
            })}
          </Row>
          <Row className="mb-3">
            <Col>
              <Form.Label>
                <b> Tiền sử bệnh răng miệng:</b>
              </Form.Label>
            </Col>
            <Row className="mb-3" style={{ margin: "5px" }}>
              {dentalMed.map((den, index) => {
                return (
                  <>
                    <Col sm={4}>
                      <Form.Check
                        readOnly
                        inline
                        name="dentalMedicalHistory"
                        label={den.name}
                        value={den._id}
                        type="checkbox"
                        id={den._id}
                        checked={
                          curCustomer.dentalMedicalHistory &&
                          curCustomer.dentalMedicalHistory.includes(den._id)
                            ? true
                            : false
                        }
                        style={{ width: "162px" }}
                        // style={{ width: "200%" }}
                      />
                    </Col>
                  </>
                );
              })}
            </Row>
          </Row>

          <Row className="mb-3" style={{ margin: "5px" }}>
            Ghi chú
          </Row>
          <Row className="mb-3" style={{ margin: "5px" }}>
            <Form.Control
              as="textarea"
              rows={3}
              value={curCustomer.note}
              // disabled
              readOnly
            />
          </Row>
          <TableAntd
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            bordered={true}
          />
        </FormAntd>
      </Modal.Body>
    </Modal>
  );
};

export default HistoryRecord;
