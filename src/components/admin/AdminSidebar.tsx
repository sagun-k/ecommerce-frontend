import type React from "react";
import { Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";

const AdminSidebar: React.FC<{ collapsed: boolean }> = ({ collapsed }) => {
  const location = useLocation();

  // Helper function to check if a route is active
  const isActive = (path: string) => location.pathname === path;

  const navItemClass = (path: string) =>
    `m-2 text-decoration-none d-flex align-items-center px-3 py-2 rounded ${
      isActive(path) ? "bg-light text-dark fw-bold" : "text-muted"
    }`;

  return (
    <div className="d-flex flex-column p-3 h-100">
      {!collapsed && (
        <h4 className="mb-4 text-dark">
          <i className="fa-solid fa-screwdriver-wrench me-2"></i>
          Admin Panel
        </h4>
      )}
      <Nav className="flex-column">
        <Link to="/admin" className={navItemClass("/admin")}>
          <i className="fa-solid fa-house-chimney me-2"></i>
          {!collapsed && "Dashboard"}
        </Link>
        <Link to="/admin/products" className={navItemClass("/admin/products")}>
          <i className="fa-solid fa-boxes-stacked me-2"></i>
          {!collapsed && "Products"}
        </Link>
        <Link to="/admin/orders" className={navItemClass("/admin/orders")}>
          <i className="fa-solid fa-receipt me-2"></i>
          {!collapsed && "Orders"}
        </Link>
        <Link to="/admin/users" className={navItemClass("/admin/users")}>
          <i className="fa-solid fa-users me-2"></i>
          {!collapsed && "Users"}
        </Link>
        <Link to="/admin/chats" className={navItemClass("/admin/chats")}>
          <i className="fas fa-comments me-2"></i> {!collapsed && "Chats"}
        </Link>
      </Nav>
      <div className="mt-auto">
        <Nav.Link onClick={() => {}} className="text-white py-2">
          <i className="fa-solid fa-right-from-bracket me-2"></i>
          {!collapsed && "Logout"}
        </Nav.Link>
      </div>
    </div>
  );
};

export default AdminSidebar;
