import type React from "react"
import { useState, useEffect } from "react"
import { Container, Card, Form, Button, Alert, Row, Col } from "react-bootstrap"
// import { useAuth } from "@/context/AuthContext"
import { Link } from "react-router-dom"

const AccountPage: React.FC = () => {
//   const { user, isAuthenticated } = useAuth()
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [oldPassword, setOldPassword] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [confirmNewPassword, setConfirmNewPassword] = useState("")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const user = { username: "john.doe", role: "user" };
  const isAuthenticated = true;

  useEffect(() => {
    if (user) {
      setUsername(user.username)
      // In a real app, email would come from user data
      setEmail(`${user.username}@example.com`)
    }
  }, [user])

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    // Simulate profile update
    if (!username || !email) {
      setError("Username and Email cannot be empty.")
      return
    }
    setMessage("Profile updated successfully!")
  }

  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (!oldPassword || !newPassword || !confirmNewPassword) {
      setError("All password fields are required.")
      return
    }
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match.")
      return
    }
    if (oldPassword === newPassword) {
      setError("New password cannot be the same as old password.")
      return
    }

    // Simulate password update
    // In a real app, you'd verify old password with backend
    setMessage("Password updated successfully!")
    setOldPassword("")
    setNewPassword("")
    setConfirmNewPassword("")
  }

  if (!isAuthenticated) {
    return (
      <Container className="my-5 text-center">
        <h1 className="mb-4">Access Denied</h1>
        <p className="lead">
          Please <Link to="/login">login</Link> to view your account details.
        </p>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">My Account</h1>
      <Row className="justify-content-center">
        <Col md={8}>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}

          <Card className="shadow-sm mb-4">
            <Card.Header className="fw-bold">Profile Information</Card.Header>
            <Card.Body>
              <Form onSubmit={handleProfileUpdate}>
                <Form.Group className="mb-3" controlId="profileUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </Form.Group>
                <Form.Group className="mb-3" controlId="profileEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </Form.Group>
                <Button variant="primary" type="submit">
                  <i className="fa-solid fa-floppy-disk me-2"></i>
                  Update Profile
                </Button>
              </Form>
            </Card.Body>
          </Card>

          <Card className="shadow-sm">
            <Card.Header className="fw-bold">Change Password</Card.Header>
            <Card.Body>
              <Form onSubmit={handlePasswordUpdate}>
                <Form.Group className="mb-3" controlId="oldPassword">
                  <Form.Label>Old Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="confirmNewPassword">
                  <Form.Label>Confirm New Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={confirmNewPassword}
                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="warning" type="submit">
                  <i className="fa-solid fa-key me-2"></i>
                  Change Password
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default AccountPage
