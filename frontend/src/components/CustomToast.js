import React, { useState } from "react";
import Toast from "react-bootstrap/Toast";

const CustomToast = ({
  value = false,
  content = "",
  isSuccess = true,
  onClose = () => {},
}) => {
  return (
    <Toast onClose={onClose} show={value} delay={4000} autohide>
      <Toast.Header>
        <strong className="me-auto">
          {isSuccess ? "Thành công" : "Thất bại"}
        </strong>
      </Toast.Header>
      <Toast.Body>{content}</Toast.Body>
    </Toast>
  );
};

export default CustomToast;
