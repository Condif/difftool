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
        <tr id={index} key={index}>
          {data.column_1[index] ? (
            <td>
              <div>
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
              <div>
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

                <div className="innerDiv">
                  {compareTimes(
                    data.column_1[index].end_time,
                    data.column_2[index].start_time
                  ) > 0 ? (
                    <span className="material-icons">arrow_upward</span>
                  ) : null}

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
                  { compareTimes(
                    data.column_2[index].start_time,
                    data.column_2[index].end_time
                  ) < 5 ? (
                    <span className="material-icons arrow_forward">arrow_forward</span>
                  ) : 
                  compareTimes(
                    data.column_1[index].end_time,
                    data.column_2[index].start_time
                  ) > 0 ? (
                    <span className="material-icons arrow_downward">arrow_downward</span>
                  ) : null}
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
    const diff = Math.abs((new Date(time1) - new Date(time2)) / 1000 / 60);
    return diff;
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
      <table id="data">
        {data.length !== 0 && <tbody>{renderTable()}</tbody>}
      </table>
    </div>
  );
};

export default Ui;
