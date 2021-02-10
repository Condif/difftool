import React, { useEffect, useState } from "react";
import "./Ui.css";
import { dataToDiff } from "../../diff_data";
import EditAddRow from "../modals/EditAddRow";
import ViewDiffs from "../modals/ViewDiffs";

const Ui = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState("");

  useEffect(() => {
    setData(dataToDiff);
  }, []);

  const renderTable = () => {
    return data.column_1.map((item, index) => {
      return (
        <tr id={index} key={index}>
          {data.column_1[index] ? (
            <td>
              <div className="tableContent">
                <p>{data.column_1[index].title}</p>
                <p>
                  {convertDateToHourMinute(data.column_1[index].start_time)} -{" "}
                  {convertDateToHourMinute(data.column_1[index].end_time)}
                </p>
              </div>
            </td>
          ) : (
            <td className="emptyEntry"></td>
          )}
          {data.column_2[index] ? (
            <td>
              <div className="tableContent">
                <p
                  className={
                    data.column_2[index].title.toString() !==
                    data.column_1[index].title.toString()
                      ? "mark"
                      : null
                  }
                >
                  {data.column_2[index].title}
                </p>
                <div className="upwardArrowDiv">
                  {data.column_2[index + 1] &&
                  compareTimes(
                    //time1 - time2
                    data.column_2[index].end_time,
                    data.column_2[index + 1].start_time
                  ) > 1 ? (
                    <span className="material-icons arrow_upward">
                      arrow_upward
                    </span>
                  ) : null}
                </div>
                <div className="innerDiv">
                  <p
                    className={
                      compareTimes(
                        data.column_1[index].start_time,
                        data.column_2[index].start_time
                      ) > 1
                        ? "lessThanOneMinute"
                        : null
                    }
                  >
                    {convertDateToHourMinute(data.column_2[index].start_time)}
                  </p>
                  <p>-</p>
                  <p
                    className={
                      compareTimes(
                        data.column_1[index].end_time,
                        data.column_2[index].end_time
                      ) > 1
                        ? "lessThanOneMinute"
                        : null
                    }
                  >
                    {" "}
                    {convertDateToHourMinute(data.column_2[index].end_time)}
                  </p>
                </div>
                <div className="leftDownArrowDiv">
                  <div className="arrowForwardDownwardDiv" >
                    {compareTimes(
                      data.column_2[index].end_time,
                      data.column_2[index].start_time
                    ) < 5 && (
                      <span className="material-icons arrow_forward">
                        arrow_forward
                      </span>
                    )}{" "}
                  </div>
                  <div className="arrowForwardDownwardDiv" >
                    {data.column_2[index - 1]
                      ? compareTimes(
                          data.column_2[index - 1].end_time,
                          data.column_2[index].start_time
                        ) > 0 && (
                          <span className="material-icons arrow_downward">
                            arrow_downward
                          </span>
                        )
                      : null}
                  </div>
                  </div>
                <div className="rightTableContent">
                  <div className="editContainer">
                    <span
                      type="button"
                      onClick={() => setIsOpen("edit_add_row")}
                      className="material-icons mode_edit"
                    >
                      mode_edit
                    </span>
                  </div>
                  <div className="editContainer">
                    <span
                      type="button"
                      onClick={() => deleteRow(index)}
                      className="material-icons delete"
                    >
                      delete
                    </span>
                  </div>
                </div>
              </div>
            </td>
          ) : (
            <td className="emptyEntry"></td>
          )}
        </tr>
      );
    });
  };

  const convertDateToHourMinute = (time) => {
    const date = new Date(time);
    return date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const compareTimes = (time1, time2) => {
    const diff = (new Date(time1) - new Date(time2)) / 1000 / 60;
    return diff;
  };

  const deleteRow = (index) => {
    const newData = { ...data };

    newData.column_2.splice(index, 1);
    setData(newData);
  };

  return (
    <div className="Ui">
      {isOpen === "edit_add_row" && (
        <EditAddRow
          compareTimes={compareTimes}
          data={data}
          setIsOpen={setIsOpen}
          setData={setData}
        />
      )}
      {isOpen === "view_diffs" && <ViewDiffs />}
      <h3>{data.title}</h3>
      <div className="uiTopBar">
        <h4>{data.date}</h4>
        <div className="topBarRight">
          <button>Discard Changes</button>
          <button onClick={() => setIsOpen("view_diffs")}> View Diffs</button>
        </div>
      </div>
      <table id="data">
        {data.length !== 0 && <tbody>{renderTable()}</tbody>}
      </table>
      <div className="uiBottomBar">
        <button onClick={() => setIsOpen("edit_add_row")}>Add row +</button>
      </div>
    </div>
  );
};

export default Ui;
