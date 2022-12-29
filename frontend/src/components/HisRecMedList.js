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
  // const [pre, setPre] = useState({});

  const getCurMed = async () => {
    await axios
      .get(`/api/medicinePrescribe?medicalPaper=${pkid}`)
      .then((response) => {
        setMedListA([
          ...response.data.map((i) => [
            i.name,
            i.quantity,
            i.unit,
            i.quantityMedicine,
            i.usage,
            i.medicineId,
          ]),
        ]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    // console.log(pre);
    if (pkid) {
      getCurMed();
    }
    // setPre({ serListId: pkid });
  }, [showHRML]);

  return (
    <>
      <Modal
        id="HRML"
        size="lg"
        show={showHRML}
        onHide={closeHRML}
        // backdrop="static"
      >
        <Modal.Header closeButton>
          <Modal.Title>Đơn thuốc - {pkid}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Table bordered>
            <thead>
              <tr style={{ textAlign: "center" }}>
                <th>STT</th>
                <th>Tên thuốc</th>
                <th>Số lượng</th>
                <th>Đơn vị</th>
                <th>Hàm lượng thuốc</th>
                <th>Cách dùng</th>
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
                          value={row[0]}
                        />
                      </td>
                      {/* So Luong */}
                      <td style={{ width: "12%" }}>
                        <Form.Control
                          style={{ textAlign: "center" }}
                          readOnly
                          plaintext
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
                        <Form.Control
                          style={{ textAlign: "center" }}
                          disabled
                          value={row[2]}
                          readOnly
                          plaintext
                        />
                      </td>
                      {/* Ham luong thuoc */}

                      <td style={{ width: "12%" }}>
                        <Form.Control
                          style={{ textAlign: "center" }}
                          disabled
                          value={row[3]}
                          readOnly
                          plaintext
                        />
                      </td>
                      {/* Cach dung */}
                      <td style={{ width: "30%" }}>
                        <Form.Control
                          readOnly
                          plaintext
                          required
                          type="text"
                          onChange={(e) => {
                            let temp = medListA;
                            temp[rowIndex][4] = e.target.value;
                            setMedListA([...temp]);
                          }}
                          value={row[4]}
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
