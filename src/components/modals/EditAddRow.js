import React, {useState} from "react";
import "./Modals.css";

const EditAddRow = (props) => {
  const { setIsOpen, setData, data, compareTimes } = props;
  const [inputData, setInputData] = useState({
    title: "",
    start_time: "",
    end_time: ""
  })

  const handleRowSave = () => {
    const newData = {...data}

    const index = findStartTimeIndex()
    
    if(index === -1) {
      newData.column_2.push(inputData)
      setData(newData)
    } else {
      newData.column_2.splice(index, 0, inputData)
      setData(newData)
    }
    
    setIsOpen("")
  }

  const findStartTimeIndex = () => {
    for (let index = 0; index < data.column_2.length; index++) {
      if(compareTimes(data.column_2[index].start_time, inputData.start_time) > 0) {
        return index
      } 
    }
    return
  }

  const handleInput = (event, anchor) => {
    setInputData({
      ...inputData,
      [anchor]: event.target.value
    });
  }

  return (
    <div className="EditAddRow">
      <div className="modalContent">
        <form>
          <div className="titleContainer">
            <label>Title</label>
            <input onChange={(e) => handleInput(e, "title")} type="text" name="title" />
          </div>
          <div className="startEndContainer">
            <div className="innerStartEnd">
              <label>Start</label>
              <input onChange={(e) => handleInput(e, "start_time")} type="text" name="start" />
            </div>
            <div className="innerStartEnd">
              <label>End</label>
              <input onChange={(e) => handleInput(e, "end_time")} type="text" name="end" />
            </div>
          </div>
          <div className="modalButtonContainer">
            <button type="button" onClick={() => handleRowSave()} >Save</button>
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
