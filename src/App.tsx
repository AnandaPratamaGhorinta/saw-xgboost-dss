import React from "react";
import "./App.css";
import TableView from "./uiComponent/TableView";
import { tableViewDataTest } from "./testingData/tableViewDataTest";

function App() {
  return (
    <>
      <TableView data={tableViewDataTest} />
    </>
  );
}

export default App;
