import React, { useState } from "react";
import "./Modals.css";

const EditAddRow = (props) => {
  const { setIsOpen, setData, data, compareTimes } = props;
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
  const checkError = () => {
    if(inputData.title.error === true || inputData.start_time_hh.error === true || inputData.start_time_mm.error === true || inputData.end_time_hh.error === true || inputData.end_time_mm.error === true
      || inputData.title.value === "" || inputData.start_time_hh.value === "" || inputData.start_time_mm.value === "" || inputData.end_time_hh.value === "" || inputData.end_time_mm.value === "")
    return true
  }
  const handleRowSave = () => {
    if(checkError()) return
    const newData = { ...data };
    const formattedDate = formatDate();
    const index = findStartTimeIndex(formattedDate);

    if (index === -1) {
      newData.column_2.push(formattedDate);
      setData(newData);
    } else {
      newData.column_2.splice(index, 0, formattedDate);
      setData(newData);
    }

    setIsOpen("");
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
    };
    return formattedDate;
  };

  const handleInput = (event, anchor) => {
    const re = /^[0-9\b]+$/;
    if (anchor === "title" && event.target.value !== "" ) {
      setInputData({
        ...inputData,
        [anchor]: {
          value: event.target.value,
          error: false,
        },
      });
    } else if (
      (event.target.value === "" && anchor !== "title") ||
      re.test(event.target.value)
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

  return (
    <div className="EditAddRow">
      <div className="modalContent">
        <form>
          <div className="titleContainer">
            <label>Title</label>
            <input
  
              onChange={(e) => handleInput(e, "title")}
              type="text"
              name="title"
            />
          </div>
          <div className="startEndContainer">
            <div className="innerStartEnd">
              <label>Start</label>
              <div className="dateInputContainer">
                <div>
                  <input
                    className={inputData.start_time_hh.error ? "startTimeMm" : null}
                    onChange={(e) => handleInput(e, "start_time_hh")}
                    type="text"
                    name="start"
                    maxLength="2"
                    minLength="1"
                  />
                  <p>HH</p>
                </div>
                <div>
                  <input
                    className={inputData.start_time_mm.error ? "startTimeHh" : null}
                    onChange={(e) => handleInput(e, "start_time_mm")}
                    type="text"
                    name="start"
                    maxLength="2"
                    minLength="1"
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
                    minLength="1"
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
                    minLength="1"
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
          <button onClick={() => setIsOpen("")}>x</button>
        </div>
      </div>
    </div>
  );
};

export default EditAddRow;
