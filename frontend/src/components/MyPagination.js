import Pagination from "react-bootstrap/Pagination";
import React from "react";

const MyPagination = ({ total, current, onChangePage }) => {
  let items = [];
  if (current > 1) {
    items.push(
      <Pagination.Prev
        key="prev"

      />
    );
  }

  for (let page = 1; page <= total; page++) {
    items.push(
      <Pagination.Item
        key={page}
        active={page === current}
        data-page={page}
        onClick={() => {
          onChangePage(page);
        }}
      >
        {page}
      </Pagination.Item>
    );
  }

  if (current < total) {
    items.push(
      <Pagination.Next
        key="next"

      />
    );
  }
  return <Pagination>{items}</Pagination>;
};

export default MyPagination;
