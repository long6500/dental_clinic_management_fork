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
import { FaTrashAlt, FaFileMedical } from "react-icons/fa";
import Swal from "sweetalert2";
import { Select, Pagination, Table as TableAntd, Form as FormAntd } from "antd";

const HisRecMedList = ({ showHRML, closeHRML, pkid }) => {
  const [medListA, setMedListA] = useState([]);
  return (
    <>
      <Modal
        // id="MedListPaper"
        size="lg"
        show={showHRML}
        onHide={closeHRML}
        // backdrop="static"
      >
        <Modal.Header>
          <Modal.Title>Lịch sử thuốc khách hàng</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>STT</th>
                <th>Tên thuốc</th>
                <th>Số lượng</th>
                <th>Đơn vị</th>
                <th>Cách dùng</th>
                <th></th>
              </tr>
            </thead>
            {/* {medListA.length > 0 && ( */}
            <tbody>
              {medListA.length > 0 &&
                medListA.map((row, rowIndex) => {
                  return (
                    <tr style={{ textAlign: "center" }}>
                      <td style={{ width: "1%" }}>
                        <Form.Control
                          style={{ textAlign: "center" }}
                          type="text"
                          // disabled
                          readOnly
                          plaintext
                          value={rowIndex + 1}
                        />
                      </td>
                      {/* Ten thuoc */}
                      <td style={{ width: "30%" }}>
                        <Form.Control
                          style={{ textAlign: "center" }}
                          type="text"
                          // disabled
                          readOnly
                          plaintext
                          value={rowIndex + 1}
                        />
                      </td>
                      {/* So Luong */}
                      <td style={{ width: "12%" }}>
                        {/* <FormAntd.Item
                            name={`SL${rowIndex}`}
                            rules={[
                              {
                                required: true,
                                message: "Nhập số lượng",
                              },
                            ]}
                            initialValue={row[1]}
                          > */}
                        <Form.Control
                          required
                          type="number"
                          min="1"
                          onChange={(e) => {
                            let temp = medListA;
                            temp[rowIndex][1] = Number(e.target.value);
                            setMedListA([...temp]);
                          }}
                          value={row[1]}
                        />
                        {/* </FormAntd.Item> */}
                      </td>
                      {/* Don vi */}
                      <td style={{ width: "12%" }}>
                        <Form.Control disabled value={row[2]} />
                      </td>
                      {/* Cach dung */}
                      <td style={{ width: "30%" }}>
                        <Form.Control
                          required
                          type="text"
                          onChange={(e) => {
                            let temp = medListA;
                            temp[rowIndex][3] = e.target.value;
                            setMedListA([...temp]);
                          }}
                          value={row[3]}
                        />
                      </td>
                    </tr>
                  );
                })}
            </tbody>
            {/* )} */}
          </Table>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default HisRecMedList;
