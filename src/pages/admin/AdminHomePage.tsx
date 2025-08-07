import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { Container, Row, Col, Card, Spinner } from "react-bootstrap";
import { DashboradServices } from "../../services/admin/DashboradService";

const AdminHomePage: React.FC = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: () => DashboradServices.getDashboardData(),
  });

  console.log("Dashboard Stats:", stats);

  if(isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="" />
      </div>
    );
  }

  return (
    <Container fluid className="py-4">
      <h1 className="mb-4">Admin Dashboard</h1>
      <Row>
        <Col md={4} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <i className="fa-solid fa-boxes-stacked fa-3x text-primary mb-3"></i>
              <Card.Title className="h4">Total Products</Card.Title>
              <Card.Text className="display-4 fw-bold">{stats?.totalProducts}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <i className="fa-solid fa-receipt fa-3x text-success mb-3"></i>
              <Card.Title className="h4">New Orders</Card.Title>
              <Card.Text className="display-4 fw-bold">{stats?.totalOrders}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4} className="mb-4">
          <Card className="text-center shadow-sm">
            <Card.Body>
              <i className="fa-solid fa-users fa-3x text-info mb-3"></i>
              <Card.Title className="h4">Registered Users</Card.Title>
              <Card.Text className="display-4 fw-bold">{stats?.totalUsers}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row className="mt-4">
        <Col md={12}>
          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Recent Activity</Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <i className="fa-solid fa-circle-info me-2 text-muted"></i>New
                  product "Wireless Earbuds" added.
                </li>
                <li className="mb-2">
                  <i className="fa-solid fa-circle-info me-2 text-muted"></i>
                  Order #ORD003 placed by John Doe.
                </li>
                <li className="mb-2">
                  <i className="fa-solid fa-circle-info me-2 text-muted"></i>
                  User "Jane Smith" registered.
                </li>
                <li className="mb-2">
                  <i className="fa-solid fa-circle-info me-2 text-muted"></i>
                  Product "Vintage Watch" stock updated.
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default AdminHomePage;
