import React from "react";
import "./Modals.css";

const ViewDiffs = (props) => {
  const {
    setIsOpen,
    columnToRender,
    data,
    compareTimes,
    convertDateToHourMinute,
  } = props;

  const renderDiffList = () => {
    return columnToRender().map((item, index) => {
      return (
        <ul key={index}>
          {(data.column_2[index]?.title.toString() !==
            data.column_1[index]?.title.toString() &&
            data.column_2[index]?.start_time !== undefined) ||
          compareTimes(
            //start time differs more than 1 min
            data.column_1[index]?.start_time,
            data.column_2[index]?.start_time
          ) > 1 ||
          compareTimes(
            //end time differs more than 1 min
            data.column_1[index]?.end_time,
            data.column_2[index]?.end_time
          ) > 1 ||
          compareTimes(
            // Start time is prior to previous end time
            data.column_2[index]?.end_time,
            data.column_2[index + 1]?.start_time
          ) < 0 ||
          compareTimes(
            //Duration is less than five minutes
            data.column_2[index]?.end_time,
            data.column_2[index]?.start_time
          ) < 5 ? (
            <li>
              <div className="notMatchingTextContainer">
                <p> {data.column_2[index]?.title.toString()},</p>
                <p>
                  {" "}
                  {convertDateToHourMinute(data.column_2[index]?.start_time)}
                </p>
                <p>-</p>
                <p>{convertDateToHourMinute(data.column_2[index]?.end_time)}</p>
              </div>
              {data.column_2[index]?.title.toString() !==
                data.column_1[index]?.title.toString() && (
                <div className="notMatchingTextContainer">
                  <p>Titles don't match:</p>
                  <strong>
                    <p>{data.column_1[index]?.title.toString()}</p>
                  </strong>
                  <p>/</p>
                  <strong>
                    {" "}
                    <p>{data.column_2[index]?.title.toString()}</p>
                  </strong>
                </div>
              )}
              {compareTimes(
                //time1 - time2
                data.column_1[index].start_time,
                data.column_2[index].start_time
              ) > 1 && (
                <div className="notMatchingTextContainer">
                  <p>Start time differs more than 1min:</p>
                  <strong>
                    <p>
                      {convertDateToHourMinute(data.column_1[index].start_time)}
                    </p>
                  </strong>
                  <p>/</p>
                  <strong>
                    {" "}
                    <p>
                      {convertDateToHourMinute(data.column_2[index].start_time)}
                    </p>
                  </strong>
                </div>
              )}
              {compareTimes(
                //time1 - time2
                data.column_1[index].end_time,
                data.column_2[index].end_time
              ) > 1 && (
                <div className="notMatchingTextContainer">
                  <p>End time differs more than 1min:</p>
                  <strong>
                    <p>
                      {convertDateToHourMinute(data.column_1[index].end_time)}
                    </p>
                  </strong>
                  <p>/</p>
                  <strong>
                    {" "}
                    <p>
                      {convertDateToHourMinute(data.column_2[index].end_time)}
                    </p>
                  </strong>
                </div>
              )}

              {compareTimes(
                //time1 - time2
                data.column_2[index].end_time,
                data.column_2[index + 1].start_time
              ) > 0 && (
                <div className="notMatchingTextContainer">
                  <p>Start time is prior to previous end time:</p>
                  <p>Start:</p>
                  <strong>
                    <p>
                      {convertDateToHourMinute(
                        data.column_2[index + 1].start_time
                      )}
                    </p>
                  </strong>
                  <p>/</p>
                  <p>End:</p>
                  <strong>
                    <p>
                      {convertDateToHourMinute(data.column_2[index].end_time)}
                    </p>
                  </strong>
                </div>
              )}
              {compareTimes(
                //time1 - time2
                data.column_2[index].end_time,
                data.column_2[index].start_time
              ) < 5 && (
                <div className="notMatchingTextContainer">
                  <p>Duration is less than five minutes:</p>
                  <strong>
                    <p>
                      {convertDateToHourMinute(data.column_2[index].start_time)}
                    </p>
                  </strong>
                  <p>/</p>
                  <strong>
                    {" "}
                    <p>
                      {convertDateToHourMinute(data.column_2[index].end_time)}
                    </p>
                  </strong>
                </div>
              )}
            </li>
          ) : null}
        </ul>
      );
    });
  };
  return (
    <div className="ViewDiffs">
      <div className="diffModalContent">
        <div className="innerDiffContainer">
          <h3>Following diffs detected:</h3>
          <div className="renderDiffListContainer">{renderDiffList()}</div>
        </div>
        <div className="closeModal">
          <button onClick={() => setIsOpen("")}>x</button>
        </div>
      </div>
    </div>
  );
};

export default ViewDiffs;
