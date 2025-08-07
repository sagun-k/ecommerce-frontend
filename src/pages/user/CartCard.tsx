import { useQueryClient } from "@tanstack/react-query";
import { Button, Col, Form, ListGroup, Row } from "react-bootstrap";
import { toast } from "react-toastify";
import { CartServices } from "../../services/CartServices";
import type { CartItem } from "../../types/cart";

interface CartCardProps {
  item: CartItem;
  updateQuantity: (id: string, quantity: number) => void;
}

const CartCard = ({ item, updateQuantity }: CartCardProps) => {
  const queryClient = useQueryClient();

  const deleteFromCart = async () => {
    try {
      await CartServices.removeFromCart(item.id);
      queryClient.invalidateQueries({ queryKey: ["cart-products"] });
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
      toast.success("Item removed from cart successfully!");
    } catch (error) {
      toast.error(
        (error as Error)?.message || "Failed to remove item from cart"
      );
    }
  };

  return (
    <ListGroup.Item
      key={item.id}
      className="py-3 px-4 mb-3 rounded shadow-sm"
      style={{
        backgroundColor: "#fff",
        border: "1px solid #eee",
      }}
    >
      <Row className="align-items-center gx-4">
        <Col xs={12} md={3} className="text-center mb-3 mb-md-0">
          <img
            src={
              item.product.image ||
              "https://assets.timberland.com/images/t_img/f_auto,h_650,w_650,e_sharpen:60/dpr_2.0/v1721255330/TB0A6WWTP47-ALT10/Small-Logo-Print-Short-Sleeve-TShirt.png"
            }
            alt={item.product.name}
            className="img-fluid"
            style={{
              maxHeight: "120px",
              borderRadius: "8px",
              objectFit: "cover",
            }}
          />
        </Col>

        <Col xs={12} md={6}>
          <h5 className="fw-bold mb-1">{item.product.name}</h5>
          <p className="text-muted mb-2">
            <i className="fa-solid fa-tag me-2 text-primary"></i>$
            {item.product.price.toFixed(2)}
          </p>
          <Form.Group
            controlId={`quantity-${item.id}`}
            className="d-flex align-items-center"
          >
            <Form.Label className="me-2 mb-0 fw-semibold">Qty:</Form.Label>
            <Form.Control
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) => {
                updateQuantity(item.id, Number(e.target.value));
              }}
              style={{ width: "80px" }}
            />
          </Form.Group>
        </Col>

        <Col xs={12} md={3} className="text-md-end text-start mt-3 mt-md-0">
          <Button
            variant="outline-danger"
            onClick={() => {
              deleteFromCart();
            }}
          >
            <i className="fa-solid fa-trash-can me-2"></i> Remove
          </Button>
        </Col>
      </Row>
    </ListGroup.Item>
  );
};

export default CartCard;
