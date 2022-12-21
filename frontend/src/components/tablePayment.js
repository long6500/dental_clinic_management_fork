import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import axios from "../apis/api";
import { Pagination, Table, Typography } from "antd";
import moment from "moment";
import { FaRedoAlt } from "react-icons/fa";
import CSV from "../components/ExportCSV";

export const TablePayment = ({ customers }) => {
  const { Text } = Typography;

  const [cusExcel, setCusExcel] = useState([]);
  useEffect(() => {
    setCusExcel([
      ...customers?.map((i, rowIndex) => {
        return {
          "Hình thức thanh toán": i.payment,
          "Doanh thu": i.amount,
          "Số lượng phiếu": i.count,
        };
      }),
    ]);
  }, []);

  const columnsReExam = [
    {
      title: "STT",
      dataIndex: "stt",
      align: "center",
      sorter: (a, b) => a._id.localeCompare(b._id),
    },
    {
      title: "Hình thức thanh toán",
      dataIndex: "payment",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Doanh thu ",
      dataIndex: "amount",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Số lượng phiếu",
      dataIndex: "count",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
  ];

  const dataSource = customers?.map((i, rowIndex) => {
    return {
      stt: rowIndex + 1,
      id: i.id,
      payment: i.payment,
      amount: Number(i.amount),
      count: i.count,
    };
  });

  return (
    <>
      <div
        style={{
          margin: "auto",
          width: "90%",
          display: "block",
          marginTop: "10px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      >
        <Navbar>
          <Container fluid>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll">
              <Nav
                className="me-auto my-2 my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <h4 style={{ display: "inline-block", margin: "10px" }}>
                  Thống kê hình thức thanh toán
                </h4>
              </Nav>
              {/* <DatePicker.RangePicker
                defaultValue={[
                  moment(today, dateFormat),
                  moment(today, dateFormat),
                ]}
                format={dateFormat}
                style={{ float: "right", marginRight: "20px" }}
              /> */}
              <Form className="d-flex">
                <CSV csvData={cusExcel} fileName={"Payment report"} />
              </Form>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div style={{ marginLeft: "80px", marginRight: "80px" }}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Control
                style={{ marginTop: "20px" }}
                placeholder="Tìm kiếm"
                autoFocus
              />
            </Form.Group>
          </Form>
        </div>
        <div
          style={{ marginLeft: "80px", marginRight: "80px", marginTop: "5px" }}
        >
          {/* <span style={{ fontSize: "20px", fontWeight: "500" }}>
            Tổng: {totalReExam}
          </span> */}

          <Table
            columns={columnsReExam}
            dataSource={dataSource}
            pagination={false}
            summary={(pageData) => {
              let tempTotalAmount = 0;

              let totalCount = 0;

              pageData.forEach(({ amount, count }) => {
                tempTotalAmount += amount;
                totalCount += count;
              });

              return (
                <>
                  {/* <div> */}
                  <Table.Summary.Row style={{ textAlign: "center" }}>
                    <Table.Summary.Cell>
                      <b>Tổng:{pageData.length}</b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell></Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text type="danger">{Number(tempTotalAmount)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text type="danger">{Number(totalCount)}</Text>
                    </Table.Summary.Cell>
                  </Table.Summary.Row>
                </>
              );
            }}
          />
        </div>
      </div>
    </>
  );
};

export default TablePayment;
