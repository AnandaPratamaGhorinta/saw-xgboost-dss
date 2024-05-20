import { Route, Routes } from "react-router-dom";
import CreateCriteria from "./create";
import DeleteCriteria from "./delete";
import UpdateCriteria from "./update";
import ViewCriteria from "./view";

export default function CriteriaSetting() {
  return (
    <Routes>
      <Route path="/add-criteria" element={CreateCriteria()} />
      <Route path="/delete-criteria" element={DeleteCriteria()} />
      <Route path="/update-criteria" element={UpdateCriteria()} />
      <Route path="/" element={ViewCriteria()} />
    </Routes>
  );
}
