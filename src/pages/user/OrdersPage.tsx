"use client";

import type React from "react";
import {
  Container,
  Card,
  Row,
  Col,
  Badge,
  Spinner,
  Button,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { OrderServices } from "../../services/OrderServices";
import { OrderStatus } from "../../types/order";
import { toast } from "react-toastify";

const OrdersPage: React.FC = () => {
  const { user } = useAuth();

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders", user?._id],
    queryFn: () => OrderServices.getOrdersByUserId(user!._id),
  });

  const queryClient = useQueryClient();
  const handleCancelOrder = async (orderId: string) => {
    try {
      await OrderServices.updateOrderStatus(orderId, OrderStatus.Cancelled);
      queryClient.invalidateQueries({ queryKey: ["orders", user?._id] });
      toast.success("Order cancelled successfully!");
    } catch (error) {
      console.error("Failed to cancel order:", error);
      toast.error("Failed to cancel order. Please try again.");
    }
  };

  const getBadgeVariant = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Delivered:
        return "success";
      case OrderStatus.Cancelled:
        return "danger";
    return "warning";
    }
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="" />
      </div>
    );
  }
  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">My Orders</h1>
      {orders?.length === 0 ? (
        <div className="text-center p-5 border rounded shadow-sm">
          <i className="fa-solid fa-box-open fa-3x text-muted mb-3"></i>
          <p className="lead">You haven't placed any orders yet.</p>
          <Link to="/" className="btn btn-primary">
            Start Shopping
          </Link>
        </div>
      ) : (
        <Row xs={1} md={1} lg={1} className="g-4">
          {orders?.map((order) => (
            <Col key={order._id}>
              <Card className="shadow-sm">
                <Card.Header className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>Order ID:</strong> {order._id}
                  </div>

                  <div>
                    <Badge
                      bg={getBadgeVariant(order.status)}
                      className="mx-2"
                    >
                      {order.status}
                    </Badge>
                    <strong>Date:</strong>{" "}
                    {new Date(order.createdAt).toLocaleDateString()}
                  </div>
                </Card.Header>
                <Card.Body>
                  <h5 className="mb-3">Items:</h5>
                  <ul className="list-unstyled">
                    {order.products.map((item, index) => (
                      <li
                        key={index}
                        className="d-flex justify-content-between"
                      >
                        <span>
                          {item.productId.name} (x{item.quantity})
                        </span>
                        <span>
                          ${(item.productId.price * item.quantity).toFixed(2)}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <h4 className="mb-0">
                      Total: ${order.totalAmount.toFixed(2)}
                    </h4>
                    {order.status !== OrderStatus.Delivered &&
                      order.status !== OrderStatus.Cancelled && (
                        <Button
                          variant="danger"
                          onClick={() => handleCancelOrder(order._id)}
                        >
                          Cancel Order
                        </Button>
                      )}
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default OrdersPage;
