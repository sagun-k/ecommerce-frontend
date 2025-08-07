import type React from "react"
import { useState } from "react"
import { Container, Card, Form, Button, Alert } from "react-bootstrap"

const AdminSettingPage = () => {
  const [siteName, setSiteName] = useState("E-Shop")
  const [contactEmail, setContactEmail] = useState("info@eshop.com")
  const [currency, setCurrency] = useState("USD")
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setMessage("")
    setError("")

    if (!siteName || !contactEmail || !currency) {
      setError("All fields are required.")
      return
    }

    // Simulate saving settings
    setMessage("Settings updated successfully!")
  }

  return (
    <Container fluid className="py-4">
      <h1 className="mb-4">Admin Settings</h1>
      <Card className="shadow-sm p-4">
        <Card.Body>
          {message && <Alert variant="success">{message}</Alert>}
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="siteName">
              <Form.Label>Site Name</Form.Label>
              <Form.Control type="text" value={siteName} onChange={(e) => setSiteName(e.target.value)} required />
            </Form.Group>

            <Form.Group className="mb-3" controlId="contactEmail">
              <Form.Label>Contact Email</Form.Label>
              <Form.Control
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="currency">
              <Form.Label>Default Currency</Form.Label>
              <Form.Control as="select" value={currency} onChange={(e) => setCurrency(e.target.value)} required>
                <option value="USD">USD ($)</option>
                <option value="EUR">EUR (€)</option>
                <option value="GBP">GBP (£)</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              <i className="fa-solid fa-floppy-disk me-2"></i>
              Save Settings
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  )
}

export default AdminSettingPage
