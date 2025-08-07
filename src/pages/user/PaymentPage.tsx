import type React from "react"
import { useState } from "react"
import { Container, Card, Form, Button, Row, Col, Alert } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import { useCart } from "../../context/CartContext"

const PaymentPage: React.FC = () => {
  const { cartItems, cartTotal, clearCart } = useCart()
  const navigate = useNavigate()
  const [paymentMethod, setPaymentMethod] = useState("creditCard")
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [billingAddress, setBillingAddress] = useState({
    address: "",
    city: "",
    zip: "",
    country: "",
  })
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")

  const handleCardChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCardDetails({ ...cardDetails, [e.target.name]: e.target.value })
  }

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingAddress({ ...billingAddress, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess("")

    if (cartItems.length === 0) {
      setError("Your cart is empty. Please add items before proceeding to payment.")
      return
    }

    if (paymentMethod === "creditCard") {
      const { cardNumber, cardName, expiryDate, cvv } = cardDetails
      if (!cardNumber || !cardName || !expiryDate || !cvv) {
        setError("Please fill in all credit card details.")
        return
      }
      if (!billingAddress.address || !billingAddress.city || !billingAddress.zip || !billingAddress.country) {
        setError("Please fill in all billing address details.")
        return
      }
    }

    // Simulate payment processing
    setTimeout(() => {
      setSuccess("Payment successful! Redirecting to orders page...")
      clearCart() // Clear cart after successful payment
      setTimeout(() => {
        navigate("/orders")
      }, 2000)
    }, 1500)
  }

  if (cartItems.length === 0 && !success) {
    return (
      <Container className="my-5 text-center">
        <h1 className="mb-4">No Items in Cart</h1>
        <p className="lead">Please add items to your cart before proceeding to payment.</p>
        <Link to="/" className="btn btn-primary">
          Start Shopping
        </Link>
      </Container>
    )
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Payment Information</h1>
      <Row className="justify-content-center">
        <Col md={8}>
          <Card className="shadow-sm p-4">
            <Card.Body>
              {error && <Alert variant="danger">{error}</Alert>}
              {success && <Alert variant="success">{success}</Alert>}

              <h4 className="mb-3">Order Summary</h4>
              <ul className="list-group mb-4">
                {cartItems.map((item) => (
                  <li key={item.id} className="list-group-item d-flex justify-content-between align-items-center">
                    {item.name} (x{item.quantity})
                    <span className="fw-bold">${(item.price * item.quantity).toFixed(2)}</span>
                  </li>
                ))}
                <li className="list-group-item d-flex justify-content-between align-items-center fw-bold">
                  Total
                  <span>${cartTotal.toFixed(2)}</span>
                </li>
              </ul>

              <h4 className="mb-3">Select Payment Method</h4>
              <Form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <Form.Check
                    type="radio"
                    id="creditCard"
                    label="Credit Card"
                    name="paymentMethod"
                    value="creditCard"
                    checked={paymentMethod === "creditCard"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="mb-2"
                  />
                  <Form.Check
                    type="radio"
                    id="paypal"
                    label="PayPal"
                    name="paymentMethod"
                    value="paypal"
                    checked={paymentMethod === "paypal"}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                  />
                </div>

                {paymentMethod === "creditCard" && (
                  <Card className="mb-4 p-3 bg-light">
                    <h5 className="mb-3">Credit Card Details</h5>
                    <Row>
                      <Col md={12} className="mb-3">
                        <Form.Group controlId="cardNumber">
                          <Form.Label>Card Number</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardNumber"
                            placeholder="XXXX XXXX XXXX XXXX"
                            value={cardDetails.cardNumber}
                            onChange={handleCardChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12} className="mb-3">
                        <Form.Group controlId="cardName">
                          <Form.Label>Name on Card</Form.Label>
                          <Form.Control
                            type="text"
                            name="cardName"
                            placeholder="Full Name"
                            value={cardDetails.cardName}
                            onChange={handleCardChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="expiryDate">
                          <Form.Label>Expiry Date</Form.Label>
                          <Form.Control
                            type="text"
                            name="expiryDate"
                            placeholder="MM/YY"
                            value={cardDetails.expiryDate}
                            onChange={handleCardChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="cvv">
                          <Form.Label>CVV</Form.Label>
                          <Form.Control
                            type="text"
                            name="cvv"
                            placeholder="123"
                            value={cardDetails.cvv}
                            onChange={handleCardChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>

                    <h5 className="mb-3 mt-3">Billing Address</h5>
                    <Form.Group className="mb-3" controlId="billingAddress">
                      <Form.Label>Address</Form.Label>
                      <Form.Control
                        type="text"
                        name="address"
                        placeholder="1234 Main St"
                        value={billingAddress.address}
                        onChange={handleAddressChange}
                        required
                      />
                    </Form.Group>
                    <Row>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="billingCity">
                          <Form.Label>City</Form.Label>
                          <Form.Control
                            type="text"
                            name="city"
                            placeholder="City"
                            value={billingAddress.city}
                            onChange={handleAddressChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={6} className="mb-3">
                        <Form.Group controlId="billingZip">
                          <Form.Label>Zip Code</Form.Label>
                          <Form.Control
                            type="text"
                            name="zip"
                            placeholder="12345"
                            value={billingAddress.zip}
                            onChange={handleAddressChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                      <Col md={12} className="mb-3">
                        <Form.Group controlId="billingCountry">
                          <Form.Label>Country</Form.Label>
                          <Form.Control
                            type="text"
                            name="country"
                            placeholder="Country"
                            value={billingAddress.country}
                            onChange={handleAddressChange}
                            required
                          />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Card>
                )}

                <Button variant="primary" type="submit" className="w-100">
                  <i className="fa-solid fa-credit-card me-2"></i>
                  Pay Now (${cartTotal.toFixed(2)})
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}

export default PaymentPage
