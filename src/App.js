import React from "react"
import "./App.css"
import Ui from "./components/ui/Ui"
import ErrorStates from "./components/ErrorStates"
import EditAddRow from "./components/EditAddRow"
import ViewDiffs from "./components/ViewDiffs"

const App = () => {
  return (
    <div className="App">
      <Ui />
      <ErrorStates/>
      <EditAddRow/>
      <ViewDiffs/> 
    </div>
  );
}

export default App;
