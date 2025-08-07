import type React from "react"
import { Container, Row, Col, Card } from "react-bootstrap"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const UserDashboardPage: React.FC = () => {
  const { user, isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return (
      <Container className="my-5 text-center">
        <h1 className="mb-4">Access Denied</h1>
        <p className="lead">
          Please <Link to="/login">login</Link> to view your dashboard.
        </p>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Welcome, {user?.name}!</h1>
      <Row className="justify-content-center">
        <Col md={6} lg={4} className="mb-4">
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <i className="fa-solid fa-id-card fa-3x text-primary mb-3"></i>
              <Card.Title>My Account</Card.Title>
              <Card.Text>View and update your profile information.</Card.Text>
              <Link to="/account" className="btn btn-outline-primary">
                Go to Account <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <i className="fa-solid fa-box fa-3x text-success mb-3"></i>
              <Card.Title>My Orders</Card.Title>
              <Card.Text>Track your past and current orders.</Card.Text>
              <Link to="/orders" className="btn btn-outline-success">
                View Orders <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card className="text-center shadow-sm h-100">
            <Card.Body>
              <i className="fa-solid fa-cart-shopping fa-3x text-info mb-3"></i>
              <Card.Title>Shopping Cart</Card.Title>
              <Card.Text>Review items in your cart and checkout.</Card.Text>
              <Link to="/cart" className="btn btn-outline-info">
                Go to Cart <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default UserDashboardPage
