import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  Button,
  Card,
  Col,
  Container,
  ListGroup,
  Row,
  Spinner,
} from "react-bootstrap";
// import { useCart } from "@/context/CartContext"
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { CartServices } from "../../services/CartServices";
import CartCard from "./CartCard";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import CheckoutModal from "./CheckoutModal";
import { OrderServices } from "../../services/OrderServices";
import type { CartItem } from "../../types/cart";
import type { CreateOrderItem, CreateOrderRequest } from "../../types/order";

const CartPage = () => {
  const { user } = useAuth();

  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const { data: fetchedCartItems, isLoading } = useQuery({
    queryKey: ["cart-products", user?._id],
    queryFn: () => CartServices.getCartItems(user!._id),
  });

  const [cartItems, setCartItems] = useState(fetchedCartItems ?? []);

  // Sync local state when fetchedCartItems changes (initial load or refetch)
  useEffect(() => {
    if (fetchedCartItems) setCartItems(fetchedCartItems);
  }, [fetchedCartItems]);

  // Handler to update quantity locally
  const updateQuantity = (id: string, quantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, quantity) } : item
      )
    );
  };

  const cartTotal =
    cartItems?.reduce(
      (total, item) =>
        total + Number(item.product.price) * Number(item.quantity),
      0
    ) ?? 0;

  const queryClient = useQueryClient();

  const deleteAllFromCart = async () => {
    try {
      await CartServices.removeAllCartItems(user!._id);
      queryClient.invalidateQueries({ queryKey: ["cart-products"] });
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
      toast.success("Item removed from cart successfully!");
    } catch (error) {
      toast.error(
        (error as Error)?.message || "Failed to remove item from cart"
      );
    }
  };

  const mapToCreateOrderRequest = (items: CartItem[]): CreateOrderRequest => {
    const totalAmount = items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );
    const products = items.map((val) => {
      return {
        productId: val.product.id,
        quantity: val.quantity,
      } satisfies CreateOrderItem;
    });
    return {
      userId: user!._id,
      products,
      totalAmount,
    } satisfies CreateOrderRequest;
  };

  const handleConfirmCheckout = async () => {
    try {
      const orderRequest = mapToCreateOrderRequest(cartItems);
      await OrderServices.createOrder(orderRequest);
      toast.success("Order placed successfully!");
      setShowCheckoutModal(false);
      queryClient.invalidateQueries({ queryKey: ["cart-products"] });
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Your Shopping Cart</h1>
      {cartItems?.length === 0 ? (
        <div className="text-center p-5 border rounded shadow-sm">
          <i className="fa-solid fa-cart-shopping fa-3x text-muted mb-3"></i>
          <p className="lead">Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <Row>
          <Col md={8}>
            <Card className="shadow-sm">
              <ListGroup variant="flush">
                {cartItems?.map((item) => (
                  <CartCard item={item} updateQuantity={updateQuantity} />
                ))}
              </ListGroup>
              <Card.Footer className="d-flex justify-content-between align-items-center">
                <Button
                  variant="outline-danger"
                  onClick={() => {
                    deleteAllFromCart();
                  }}
                >
                  <i className="fa-solid fa-broom me-2"></i>
                  Clear Cart
                </Button>
              </Card.Footer>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="shadow-sm">
              <Card.Header className="fw-bold">Order Summary</Card.Header>
              <Card.Body>
                <div className="d-flex justify-content-between mb-2">
                  <span>Subtotal ({cartItems?.length} items)</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between mb-2">
                  <span>Shipping</span>
                  <span>Free</span>
                </div>
                <hr />
                <div className="d-flex justify-content-between fw-bold fs-5">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </Card.Body>
              <Card.Footer>
                <Button
                  className="btn btn-primary w-100"
                  onClick={() => setShowCheckoutModal(true)}
                >
                  Checkout
                </Button>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      )}
      {showCheckoutModal && (
        <CheckoutModal
          show={showCheckoutModal}
          onClose={() => setShowCheckoutModal(false)}
          cartItems={cartItems}
          totalAmount={cartTotal}
          onConfirm={() => {
            handleConfirmCheckout();
          }}
        />
      )}
    </Container>
  );
};

export default CartPage;
