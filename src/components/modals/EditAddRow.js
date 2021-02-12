import React, { useState } from "react";
import "./Modals.css";

const EditAddRow = (props) => {
  const {
    setIsOpen,
    isOpen,
    setData,
    data,
    compareTimes,
    inputData,
    setInputData,
    currentRowIndex,
  } = props;

  const checkError = () => {
    if (
      inputData.title.error === true ||
      inputData.start_time_hh.error === true ||
      inputData.start_time_mm.error === true ||
      inputData.end_time_hh.error === true ||
      inputData.end_time_mm.error === true ||
      inputData.start_time_hh.value === "" ||
      inputData.start_time_mm.value === "" ||
      inputData.end_time_hh.value === "" ||
      inputData.end_time_mm.value === ""
    ) {
      return true;
    }
    if (inputData.title.value.length < 3) {
      const newInputData = { ...inputData };
      newInputData.title.error = !newInputData.title.error;
      setInputData(...newInputData);
    }
  };
  const handleRowSave = () => {
    if (checkError()) return;

    const newData = { ...data };
    const col_2 = [...newData.column_2];
    const formattedDate = formatDate();
    const index = findStartTimeIndex(formattedDate);
    if (isOpen === "edit_row") {
      col_2.splice(index, 0, formattedDate);
      col_2.splice(currentRowIndex, 1);
      newData.column_2 = col_2;
      setData(newData);
    } else {
      if (index === -1) {
        col_2.push(formattedDate);
        newData.column_2 = col_2;
        setData(newData);
      } else {
        col_2.splice(index, 0, formattedDate);
        newData.column_2 = col_2;
        setData(newData);
      }
    }
    handleCloseModal()
  };

  const findStartTimeIndex = (formattedDate) => {
    for (let index = 0; index < data.column_2.length; index++) {
      if (
        compareTimes(
          data.column_2[index].start_time,
          formattedDate.start_time
        ) > 0
      ) {
        return index;
      }
    }
    return;
  };

  const formatDate = () => {
    const startHh = parseInt(inputData.start_time_hh.value);
    const startMm = parseInt(inputData.start_time_mm.value);
    const endHh = parseInt(inputData.end_time_hh.value);
    const endMm = parseInt(inputData.end_time_mm.value);
    const startTime = new Date(2021, 0, 1, startHh, startMm, 0);
    const endTime = new Date(2021, 0, 1, endHh, endMm, 0);
    const formattedDate = {
      title: inputData.title.value,
      start_time: startTime,
      end_time: endTime,
      approved: false,
    };
    return formattedDate;
  };

  const handleInput = (event, anchor) => {
    const re = /^[0-9\b]+$/;
    const allowedTitle = /^["  *"A-ZÅÄÖa-zåäö0-9]+$/;
    if (
      anchor === "title" &&
      event.target.value !== "" &&
      allowedTitle.test(event.target.value)
    ) {
      setInputData({
        ...inputData,
        [anchor]: {
          value: event.target.value,
          error: false,
        },
      });
    } else if (
      (event.target.value === "" && anchor === "start_time_hh") ||
      anchor === "end_time_hh" ||
      (re.test(event.target.value) && event.target.value <= 23)
    ) {
      setInputData({
        ...inputData,
        [anchor]: {
          value: event.target.value,
          error: false,
        },
      });
    } else if (
      (event.target.value === "" && anchor === "start_time_mm") ||
      anchor === "end_time_mm" ||
      (re.test(event.target.value) && event.target.value <= 59)
    ) {
      setInputData({
        ...inputData,
        [anchor]: {
          value: event.target.value,
          error: false,
        },
      });
    } else {
      setInputData({
        ...inputData,
        [anchor]: {
          value: event.target.value,
          error: true,
        },
      });
    }
  };

  const handleCloseModal = () => {
    const emptyInput = { ...inputData };
    emptyInput.title.value = "";
    emptyInput.start_time_hh.value = "";
    emptyInput.start_time_mm.value = "";
    emptyInput.end_time_hh.value = "";
    emptyInput.end_time_mm.value = "";
    setInputData(emptyInput);
    setIsOpen("");
  };

  return (
    <div className="EditAddRow">
      <div className="modalContent">
        <form>
          <div className="titleContainer">
            <label>Title</label>
            <input
              className={inputData.title.error ? "startTimeMm" : null}
              onChange={(e) => handleInput(e, "title")}
              type="text"
              name="title"
              maxLength="10"
              value={inputData.title.value}
            />
          </div>
          <div className="startEndContainer">
            <div className="innerStartEnd">
              <label>Start</label>
              <div className="dateInputContainer">
                <div>
                  <input
                    className={
                      inputData.start_time_hh.error ? "startTimeMm" : null
                    }
                    onChange={(e) => handleInput(e, "start_time_hh")}
                    type="text"
                    name="start"
                    maxLength="2"
                    value={inputData.start_time_hh.value}
                  />
                  <p>HH</p>
                </div>
                <div>
                  <input
                    className={
                      inputData.start_time_mm.error ? "startTimeHh" : null
                    }
                    onChange={(e) => handleInput(e, "start_time_mm")}
                    type="text"
                    name="start"
                    maxLength="2"
                    value={inputData.start_time_mm.value}
                  />
                  <p>MM</p>
                </div>
              </div>
            </div>
            <div className="innerStartEnd">
              <label>End</label>
              <div className="dateInputContainer">
                <div>
                  <input
                    className={inputData.end_time_hh.error ? "endTimeMm" : null}
                    onChange={(e) => handleInput(e, "end_time_hh")}
                    type="text"
                    name="end"
                    maxLength="2"
                    value={inputData.end_time_hh.value}
                  />
                  <p>HH</p>
                </div>
                <div>
                  <input
                    className={inputData.end_time_mm.error ? "endTimeHh" : null}
                    onChange={(e) => handleInput(e, "end_time_mm")}
                    type="text"
                    name="end"
                    maxLength="2"
                    value={inputData.end_time_mm.value}
                  />
                  <p>MM</p>
                </div>
              </div>
            </div>
          </div>

          <div className="modalButtonContainer">
            {checkError() && <p>Please fill in the form</p>}
              <button type="button" onClick={() => handleRowSave()}>
                Save
              </button>
          </div>
        </form>
        <div className="closeModal">
          <button onClick={() => handleCloseModal()}>x</button>
        </div>
      </div>
    </div>
  );
};

export default EditAddRow;
