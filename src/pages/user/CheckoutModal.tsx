import React from "react";
import { Modal, Button, ListGroup, Row, Col, Badge } from "react-bootstrap";
import type { CartItem } from "../../types/cart";

interface CheckoutModalProps {
  show: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalAmount: number;
  onConfirm: () => void;
}

const CheckoutModal: React.FC<CheckoutModalProps> = ({
  show,
  onClose,
  cartItems,
  totalAmount,
  onConfirm,
}) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton className="bg-primary text-white">
        <Modal.Title>Checkout - Order Summary</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ backgroundColor: "#f9f9f9" }}>
        <ListGroup variant="flush" className="mb-3">
          {cartItems.map((item) => (
            <ListGroup.Item key={item.id} className="py-3">
              <Row>
                <Col xs={8} className="fw-semibold">
                  {item.product.name} <Badge bg="secondary">x{item.quantity}</Badge>
                </Col>
                <Col xs={4} className="text-end fw-bold">
                  ${(item.product.price * item.quantity).toFixed(2)}
                </Col>
              </Row>
            </ListGroup.Item>
          ))}
        </ListGroup>

        <hr />

        <h5 className="d-flex justify-content-between mb-3">
          <span>Total:</span>
          <span>${totalAmount.toFixed(2)}</span>
        </h5>

        <div className="mb-4">
          <h6>Payment Method:</h6>
          <p className="mb-1">
            <strong>Cash on Delivery (COD)</strong>
          </p>
          <small className="text-muted">
            Other payment methods will be available soon. Stay tuned!
          </small>
        </div>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="outline-secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm Order
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CheckoutModal;
