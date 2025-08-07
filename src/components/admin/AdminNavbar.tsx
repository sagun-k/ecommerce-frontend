import React from "react";
import { Button, Dropdown, Navbar } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { AuthenticationServices } from "../../services/AuthenticationServices";
import "./AdminNavbar.css"; // Optional external styling

interface Props {
  collapsed: boolean;
  setCollapsed: (val: boolean) => void;
}

const AdminNavbar: React.FC<Props> = ({ collapsed, setCollapsed }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout: stateRemove } = useAuth();

  // Create breadcrumb-style heading
  const pathSegments = location.pathname.split("/").filter(Boolean);
  const breadcrumb =
    pathSegments.length > 1
      ? pathSegments
          .slice(0, 2)
          .join(" > ")
          .replace(/^\w/, (c) => c.toUpperCase())
      : "Admin > dashboard";

  const logout = async () => {
    try {
      await AuthenticationServices.logout();
      stateRemove();
      navigate("/login");
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  return (
    <Navbar
      expand="lg"
      className="px-3 py-2 bg-light justify-content-between align-items-center"
    >
      <div className="d-flex align-items-center">
        <Button
          variant=""
          onClick={() => setCollapsed(!collapsed)}
          className={`me-3 burger-toggle ${collapsed ? "collapsed" : ""}`}
        >
          <i className="fas fa-bars"></i>
        </Button>
        <Navbar.Text className="fw-semibold">{breadcrumb}</Navbar.Text>
      </div>

      <Dropdown align="end">
        <Dropdown.Toggle variant="" id="dropdown-user">
          <i className="fa-solid fa-user me-2"></i>
          {user?.name}
        </Dropdown.Toggle>

        <Dropdown.Menu className="dropdown-menu-end">

          <Dropdown.Divider />
          <Dropdown.Item onClick={() => {logout()}}>
            <i className="fa-solid fa-right-from-bracket me-2"></i>
            Logout
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </Navbar>
  );
};

export default AdminNavbar;
