import React, { useEffect, useState } from "react";
import "./Ui.css";
import { dataToDiff } from "../../diff_data";
import EditAddRow from "../modals/EditAddRow";
import ViewDiffs from "../modals/ViewDiffs";

const Ui = () => {
  const [data, setData] = useState([]);
  const [isOpen, setIsOpen] = useState("");
  const [currentRowIndex, setCurrentRowIndex] = useState("");
  const [inputData, setInputData] = useState({
    title: {
      value: "",
      error: false,
    },
    start_time_hh: {
      value: "",
      error: false,
    },
    start_time_mm: {
      value: "",
      error: false,
    },
    end_time_hh: {
      value: "",
      error: false,
    },
    end_time_mm: {
      value: "",
      error: false,
    },
  });

  useEffect(() => {
    setData(dataToDiff);
  }, []);

  const columnToRender = () => {
    if (data.column_1.length >= data.column_2.length) {
      return data.column_1;
    } else {
      return data.column_2;
    }
  };

  const renderTable = () => {
    return columnToRender().map((item, index) => {
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
                <div className="titleDiv">
                  <div className="pDiv">
                    {data.column_1[index] ? (
                      <p
                        className={
                          data.column_2[index]?.title.toString() !==
                            data.column_1[index]?.title.toString() &&
                          !data.column_2[index]?.approved
                            ? "mark"
                            : null
                        }
                      >
                        {data.column_2[index]?.title}
                      </p>
                    ) : (
                      <p>{data.column_2[index].title}</p>
                    )}
                  </div>
                </div>
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
                  {data.column_1[index] ? (
                    <p
                      className={
                        compareTimes(
                          data.column_1[index].start_time,
                          data.column_2[index].start_time
                        ) > 1 && !data.column_2[index]?.approved
                          ? "lessThanOneMinute"
                          : null
                      }
                    >
                      {convertDateToHourMinute(data.column_2[index].start_time)}
                    </p>
                  ) : (
                    <p>
                      {convertDateToHourMinute(data.column_2[index].start_time)}
                    </p>
                  )}
                  <p>-</p>
                  {data.column_1[index] ? (
                    <p
                      className={
                        compareTimes(
                          data.column_1[index].end_time,
                          data.column_2[index].end_time
                        ) > 1 && !data.column_2[index]?.approved
                          ? "lessThanOneMinute"
                          : null
                      }
                    >
                      {" "}
                      {convertDateToHourMinute(data.column_2[index].end_time)}
                    </p>
                  ) : (
                    <p>
                      {convertDateToHourMinute(
                        data.column_2[index]?.start_time
                      )}
                    </p>
                  )}
                </div>
                <div className="leftDownArrowDiv">
                  <div className="arrowForwardDownwardDiv">
                    {compareTimes(
                      data.column_2[index].end_time,
                      data.column_2[index].start_time
                    ) < 5 &&
                      !data.column_2[index]?.approved && (
                        <span className="material-icons arrow_forward">
                          arrow_forward
                        </span>
                      )}
                  </div>
                  <div className="arrowForwardDownwardDiv">
                    {compareTimes(
                      //? to deal with index 0 - 1 not existing
                      data.column_2[index - 1]?.end_time,
                      data.column_2[index].start_time
                    ) > 0 && (
                      <span className="material-icons arrow_downward">
                        arrow_downward
                      </span>
                    )}
                  </div>
                </div>
                <div className="rightTableContent">
                  <div className="editContainer">
                    <span
                      type="button"
                      onClick={() => handleEditRow("edit_row", index)}
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
                  <div className="editContainer">
                    <span
                      type="button"
                      onClick={() => handleSetApproved(index)}
                      className={
                        data.column_2[index]?.approved
                          ? "material-icons checkMarkApproved"
                          : "material-icons delete"
                      }
                    >
                      check
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
  const convertDateToHours = (time) => {
    const date = new Date(time);
    const h = date.getHours();
    return h;
  };
  const convertDateToMin = (time) => {
    const date = new Date(time);
    const min = date.getMinutes();
    return min;
  };

  const handleEditRow = (anchor, index) => {
    const title = data.column_2[index]?.title;
    const startTimeH = convertDateToHours(data.column_2[index]?.start_time);
    const startTimeMin = convertDateToMin(data.column_2[index]?.start_time);
    const endTimeH = convertDateToHours(data.column_2[index]?.end_time);
    const endTimeMin = convertDateToMin(data.column_2[index]?.end_time);

    const input = { ...inputData };
    input.title.value = title;
    input.start_time_hh.value = startTimeH;
    input.start_time_mm.value = startTimeMin;
    input.end_time_hh.value = endTimeH;
    input.end_time_mm.value = endTimeMin;

    setInputData(input);
    setCurrentRowIndex(index);
    setIsOpen(anchor);
  };
  const handleSetApproved = (index) => {
    const newData = { ...data };
    let column_2 = [];
    newData.column_2.forEach((element) => {
      column_2.push(element);
    });
    const approvedEpisode = { ...column_2[index] };
    approvedEpisode.approved = !approvedEpisode.approved;

    column_2[index] = approvedEpisode;
    newData.column_2 = column_2;
    setData(newData);
  };
  const convertDateToHourMinute = (time) => {
    if (!time) return;
    const date = new Date(time);
    return date.toLocaleTimeString(navigator.language, {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const compareTimes = (time1, time2) => {
    if (!time1 || !time2) return;
    const diff = (new Date(time1) - new Date(time2)) / 1000 / 60;
    return diff;
  };

  const deleteRow = (index) => {
    //Även om newData är en kopia av data får man inte pusha till nestat
    // objekt i den arrayen utan man måste skapa en kopia som man pushar till eftersom den har en referens till originella data i state.
    // Skapa därför variabel och använda spread på listan så du kan ändra i kopian av listan eftersom värdena i listan annars ligger i statet.
    //spread operator does not do a deep copy if I am correct and will lead to state mutations with NESTED objects in React.
    const newData = { ...data };
    const col_2 = [...newData.column_2];

    col_2.splice(index, 1);
    newData.column_2 = col_2;
    setData(newData);
  };

  const discard = () => {
    setData(dataToDiff);
  };

  return (
    <div className="Ui">
      {(isOpen === "edit_row" || isOpen === "add_row") && (
        <EditAddRow
          compareTimes={compareTimes}
          data={data}
          setIsOpen={setIsOpen}
          setData={setData}
          inputData={inputData}
          setInputData={setInputData}
          isOpen={isOpen}
          currentRowIndex={currentRowIndex}
        />
      )}
      {isOpen === "view_diffs" && (
        <ViewDiffs
          setIsOpen={setIsOpen}
          columnToRender={columnToRender}
          data={data}
          compareTimes={compareTimes}
          convertDateToHourMinute={convertDateToHourMinute}
        />
      )}
      <h3>{data.title}</h3>
      <div className="uiTopBar">
        <h4>{data.date}</h4>
        <div className="topBarRight">
          <button onClick={discard}>Discard Changes</button>
          <button onClick={() => setIsOpen("view_diffs")}> View Diffs</button>
        </div>
      </div>
      <table id="data">
        {data.length !== 0 && <tbody>{renderTable()}</tbody>}
      </table>
      <div className="uiBottomBar">
        <button onClick={() => setIsOpen("add_row")}>Add row +</button>
      </div>
    </div>
  );
};

export default Ui;
