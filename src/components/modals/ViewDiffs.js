import React from "react";
import "./Modals.css";

const ViewDiffs = (props) => {
  const {setIsOpen} = props
  return (
    <div className="ViewDiffs">
        <div className="modalContent">
          <div className="innerDiffContainer">
          <h3>Following diffs detected:</h3>
          <h4> </h4>
          </div>
          
          <div className="closeModal">
            <button onClick={() => setIsOpen("")}>x</button>
          </div>
        </div>
      </div>
  );
};

export default ViewDiffs;
