import "./App.css";
import TableView from "./uiComponent/TableView";
import {
  tableViewDataTest,
  tableViewDataTest2,
} from "./testingData/tableViewDataTest";
import Tabs, { TabPanesProps } from "./uiComponent/Tabs";

function App() {
  const tabPanes: TabPanesProps[] = [
    {
      children: <TableView data={tableViewDataTest2} />,
      key: "1",
      tab: "Test tab 1",
    },
    {
      children: <TableView data={tableViewDataTest} />,
      key: "2",
      tab: "Test tab 2",
    },
  ];
  return (
    <>
      <Tabs tabPanes={tabPanes} />
    </>
  );
}

export default App;
