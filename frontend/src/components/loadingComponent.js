import React from "react";
import Spinner from "react-bootstrap/Spinner";

const loadingComponent = ({ isLoading }) => {
  return (
    <>
      {isLoading && (
        <>
          <div id="blurLoading"></div>
          <Spinner id="overallSpinner" animation="border"></Spinner>
        </>
      )}
    </>
  );
};

export default loadingComponent;
