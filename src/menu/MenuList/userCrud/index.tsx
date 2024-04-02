import { Route, Routes } from "react-router-dom";
import UserCrudView from "./view";
import UserCrudAdd from "./add";
import UserCrudDelete from "./delete";
import UserCrudUpdate from "./update";

export default function UserCrud() {
  return (
    <Routes>
      <Route path="/add-user" element={UserCrudAdd()} />
      <Route path="/delete-user" element={UserCrudDelete()} />
      <Route path="/update-user" element={UserCrudUpdate()} />
      <Route path="/view-user" element={UserCrudView()} />
    </Routes>
  );
}
