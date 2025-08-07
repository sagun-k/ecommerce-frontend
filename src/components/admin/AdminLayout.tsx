import { useState } from "react"
import { Outlet } from "react-router-dom"
import AdminNavbar from "./AdminNavbar"
import AdminSidebar from "./AdminSidebar"


const AdminLayout= () => {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className="admin-layout d-flex flex-column vh-100">
      {/* Full width navbar */}
      <AdminNavbar collapsed={collapsed} setCollapsed={setCollapsed} />

      {/* Full height below navbar */}
      <div className="flex-grow-1 d-flex overflow-hidden">
        <div
          className={`bg-light text-white p-0 sidebar transition-all ${
            collapsed ? "collapsed" : ""
          }`}
          style={{ width: collapsed ? "70px" : "240px", transition: "width 0.3s" }}
        >
          <AdminSidebar collapsed={collapsed} />
        </div>
        <div className="flex-grow-1 p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default AdminLayout
