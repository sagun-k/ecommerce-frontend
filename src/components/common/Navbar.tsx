import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button, Container, Dropdown, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { AuthenticationServices } from "../../services/AuthenticationServices";
import { CartServices } from "../../services/CartServices";

const AppNavbar: React.FC = () => {
  const { user, isAuthenticated, logout: stateRemove } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path: string) => location.pathname === path;

  const navLinkClass = (path: string) =>
    `mx-2 text-decoration-none ${
      isActive(path) ? "fw-bold text-muted" : "text-white fw-semibold"
    }`;

  const logout = async () => {
    try {
      await AuthenticationServices.logout();
      navigate("/");
      stateRemove();
    } catch (error) {
      toast.error("Logout failed. Please try again.");
    }
  };

  const { data: cartItemCount } = useQuery({
    queryKey: ["cart-count"],
    queryFn: () => CartServices.getCartCount(user!._id),
  });

  return (
    <Navbar expand="lg" fixed="top" className="py-3 navbar-blue-gradient ">
      <Container>
        <Link to="/" className="text-decoration-none">
          <Navbar.Brand className="fw-bold fs-4 text-white">
            <i className="fa-solid fa-store me-2"></i>
            E-Shop
          </Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mx-auto">
            <Link to="/" className={navLinkClass("/")}>
              Home
            </Link>
            <Link to="/mens" className={navLinkClass("/mens")}>
              Men
            </Link>
            <Link to="/womens" className={navLinkClass("/womens")}>
              Women
            </Link>
            <Link to="/kids" className={navLinkClass("/kids")}>
              Kids
            </Link>
            <Link to="/accessory" className={navLinkClass("/accessory")}>
              Accessories
            </Link>
          </Nav>
          <Nav className="ms-auto">
            {isAuthenticated && (
              <Link
                to="/cart"
                className="text-decoration-none text-white text-center mt-2"
              >
                <span className="position-relative me-3 text-white">
                  <i className="fa-solid fa-cart-shopping"></i> Cart
                  {Number(cartItemCount) > 0 && (
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {cartItemCount}
                      <span className="visually-hidden">cart items</span>
                    </span>
                  )}
                </span>
              </Link>
            )}

            {isAuthenticated ? (
              <Dropdown align="end">
                <Dropdown.Toggle variant="" id="dropdown-basic">
                  <i className="fa-solid fa-user me-2"></i>
                  {user?.name}
                </Dropdown.Toggle>

                <Dropdown.Menu className="dropdown-menu-end">
                  <Dropdown.Item>
                    <Link
                      to="/account"
                      className="text-decoration-none text-muted"
                    >
                      <i className="fa-solid fa-id-card me-2"></i>
                      My Account
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link
                      to="/orders"
                      className="text-decoration-none text-muted"
                    >
                      <i className="fa-solid fa-box me-2"></i>
                      My Orders
                    </Link>
                  </Dropdown.Item>
                  {user?.role === "admin" && (
                    <Link to="/admin">
                      <Dropdown.Item>
                        <i className="fa-solid fa-screwdriver-wrench me-2"></i>
                        Admin Panel
                      </Dropdown.Item>
                    </Link>
                  )}
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      logout();
                    }}
                  >
                    <i className="fa-solid fa-right-from-bracket me-2"></i>
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <>
                <Link to="/login">
                  <Button
                    style={{ background: "white", borderColor: "white" }}
                    className="me-2 text-muted"
                  >
                    <i className="fa-solid fa-right-to-bracket me-2"></i>
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button
                    style={{ background: "white", borderColor: "white" }}
                    className="text-muted"
                  >
                    <i className="fa-solid fa-user-plus me-2"></i>
                    Register
                  </Button>
                </Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default AppNavbar;
