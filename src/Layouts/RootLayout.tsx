import { Outlet } from "react-router-dom";

 import Sidebar from "../Component/SideBar";
const RootLayout = () => {
  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <Sidebar />

      <main style={{ flex: 1, padding: "20px" }}>
        <Outlet />
      </main>
    </div>
  );
};

export default RootLayout;