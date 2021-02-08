import React, { useEffect, useState } from "react";
import "./Ui.css";
import { dataToDiff } from "../../diff_data";

const Ui = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    setData(dataToDiff);
  }, []);

  const renderTable = () => {
    return data.column_1.map((item, index) => {
      return (
        <tr id={index}>
          {data.column_1[index] ? (
            <td>
              {data.column_1[index].title}
              {data.column_1[index].start_time}
              {data.column_1[index].end_time}
            </td>
          ) : (
            <td></td>
          )}
          {data.column_2[index] ? (
            <td>
              {data.column_2[index].title}
              {data.column_2[index].start_time}
              {data.column_2[index].end_time}
            </td>
          ) : (
            <td></td>
          )}
        </tr>
      );
    });
  };

  return (
    <div className="Ui">
      <h3>{data.title}</h3>
      <div className="uiTopBar">
        <h4>{data.date}</h4>
        <div className="topBarRight">
          <button>Discard Changes</button>
          <button> View Diffs</button>
        </div>
      </div>
      <table className="table" id="data">
        {data.length !== 0 && <tbody>{renderTable()}</tbody>}
      </table>
    </div>
  );
};

export default Ui;
