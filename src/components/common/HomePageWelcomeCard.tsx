import type React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const HomePageWelcomeCard: React.FC = () => {
  return (
    <div
      className="position-relative text-center text-white py-5 mb-5"
      style={{
        backgroundImage: 'url("https://images.unsplash.com/photo-1668774833031-fa514917b190?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "400px",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Overlay for better text readability */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.4)" }}
      ></div>

      <Container className="position-relative z-1">
        <h1 className="display-4 fw-bold mb-3">Welcome to E-Shop!</h1>
        <p className="lead mb-4">Discover the latest trends and best deals.</p>
        <Button variant="light" size="lg" >
          <Link to={"/mens"} className="text-decoration-none text-dark">
            Shop Now <i className="fa-solid fa-arrow-right ms-2"></i>
          </Link>
        </Button>
      </Container>
    </div>
  );
};

export default HomePageWelcomeCard;
