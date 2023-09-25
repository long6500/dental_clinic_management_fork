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

import CSV from "./ExportCSV";

export const Customers123 = ({ customers }) => {
  const { Text } = Typography;
  const [offsetReExam, setOffsetReExam] = useState(0);
  const [limitReExam, setLimitReExam] = useState(5);
  const [totalReExam, setTotalReExam] = useState(0);
  const [reExamination, setReExamination] = useState([]);

  const today = new Date();

  const [startDate, setStartDate] = useState(
    moment(today).format("YYYY-MM-DD")
  );
  const [endDate, setEndDate] = useState(moment(today).format("YYYY-MM-DD"));

  const [cusExcel, setCusExcel] = useState([]);

  useEffect(() => {
    setCusExcel([
      ...customers?.map((i, rowIndex) => {
        return {
          "Mã khách hàng": i.id,
          "Tên khách hàng": i.name,
          "Doanh thu": i.totalAmount,
          "Doanh thu thực": i.customerPayment,
          "Còn nợ": i.debt,
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
      title: "Mã khách hàng",
      dataIndex: "id",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Tên khách hàng",
      dataIndex: "name",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Doanh thu",
      dataIndex: "totalAmount",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Doanh thu thực",
      dataIndex: "customerPayment",
      align: "center",
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Còn nợ",
      dataIndex: "debt",
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
      name: i.name,
      totalAmount: Number(i.totalAmount),
      customerPayment: Number(i.customerPayment),
      //check khi debt < 0?
      debt: i.debt,
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
                  Thống kê khách hàng
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
                {/* <Button
                  variant="primary"
                  style={{ marginRight: "20px" }}
                  onClick={loadDataReExam}
                >
                  Xuất file
                </Button> */}
                <CSV csvData={cusExcel} fileName={"Customer"} />
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
              let totalCustomerPayment = 0;
              let totalDebt = 0;
              let totalCount = 0;

              pageData.forEach(
                ({ totalAmount, customerPayment, debt, count }) => {
                  tempTotalAmount += totalAmount;
                  totalCustomerPayment += customerPayment;
                  totalDebt += debt;
                  totalCount += count;
                }
              );

              return (
                <>
                  {/* <div> */}
                  <Table.Summary.Row style={{ textAlign: "center" }}>
                    <Table.Summary.Cell>
                      <b>Tổng:{pageData.length}</b>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell></Table.Summary.Cell>
                    <Table.Summary.Cell></Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text type="danger">{Number(tempTotalAmount)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text type="danger">{Number(totalCustomerPayment)}</Text>
                    </Table.Summary.Cell>
                    <Table.Summary.Cell>
                      <Text type="danger">{Number(totalDebt)}</Text>
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

export default Customers123;
