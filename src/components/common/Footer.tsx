import type React from "react";
import { Container, Row, Col } from "react-bootstrap";

const AppFooter: React.FC = () => {
  return (
    <footer className="text-white py-4 mt-auto navbar-blue-gradient">
      <Container>
        <Row>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>E-Shop</h5>
            <p className="text-muted">Your one-stop shop for all your needs.</p>
          </Col>
          <Col md={4} className="mb-3 mb-md-0">
            <h5>Quick Links</h5>
            <ul className="list-unstyled">
              <li>
                <a href="/" className="text-muted text-decoration-none">
                  Home
                </a>
              </li>
              <li>
                <a href="/mens" className="text-muted text-decoration-none">
                  Men's
                </a>
              </li>
              <li>
                <a href="/womens" className="text-muted text-decoration-none">
                  Women's
                </a>
              </li>
              <li>
                <a href="/cart" className="text-muted text-decoration-none">
                  Cart
                </a>
              </li>
            </ul>
          </Col>
          <Col md={4}>
            <h5>Contact Us</h5>
            <ul className="list-unstyled">
              <li className="text-muted">
                <i className="fa-solid fa-location-dot me-2"></i>123 E-Shop St,
                Retail City
              </li>
              <li className="text-muted">
                <i className="fa-solid fa-envelope me-2"></i>info@eshop.com
              </li>
              <li className="text-muted">
                <i className="fa-solid fa-phone me-2"></i>+1 (123) 456-7890
              </li>
            </ul>
          </Col>
        </Row>
        <hr className="bg-secondary" />
        <Row>
          <Col className="text-center text-muted">
            <p className="mb-0">
              &copy; {new Date().getFullYear()} E-Shop. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default AppFooter;
