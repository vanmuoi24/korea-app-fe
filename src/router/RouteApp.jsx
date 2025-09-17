import React from "react";
import { Routes, Route } from "react-router-dom";
import App from "../App";
import AdminSidebar from "../admin/LayoutAdmin";
import ManagerInformation from "../admin/ManagerInformation/ManagerInformation";
import Login from "../auth/login";
import ManageTime from "../admin/ManageTime/ManageTime";

const RouteApp = () => {
  return (
    <Routes>
      <Route path="/member/:id" element={<App />} />
      <Route path="/login" element={<Login />} />
      {/* Nếu AdminSidebar là layout cho trang admin */}
      <Route path="/admin" element={<AdminSidebar />}>
        <Route
          path="managerInformation"
          element={<ManagerInformation />}
        ></Route>
        <Route path="managerTime" element={<ManageTime />}></Route>
        {/* route con trong admin */}
        {/* ví dụ: */}
        {/* <Route index element={<Dashboard />} /> */}
        {/* <Route path="company" element={<Company />} /> */}
      </Route>
    </Routes>
  );
};

export default RouteApp;
