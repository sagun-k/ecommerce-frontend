import { useQuery, useQueryClient } from "@tanstack/react-query";
import type React from "react";
import { useState } from "react";
import { Badge, Button, Container, Spinner, Table } from "react-bootstrap";
import { OrderServices } from "../../services/OrderServices";
import { OrderStatus, type OrderWithUserDetails } from "../../types/order";
import { toast } from "react-toastify";
import UpdateOrderStatusModal from "./UpdateOrderStatusModal";
import PaginationControl from "../../components/common/PaginationControl";

const paginatedOrdersPage: React.FC = () => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    model?: OrderWithUserDetails;
  }>({
    isOpen: false,
    model: undefined,
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: orders, isLoading } = useQuery({
    queryKey: ["orders-all"],
    queryFn: () => OrderServices.getOrders(),
  });

  const paginatedOrders = orders?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const queryClient = useQueryClient();

  const handleUpdateStatus = async (orderId: string, status: OrderStatus) => {
    try {
      await OrderServices.updateOrderStatus(orderId, status);
      queryClient.invalidateQueries({ queryKey: ["orders-all"] });
      setModalState({ isOpen: false, model: undefined });
      toast.success("Order status updated successfully!");
    } catch (error) {
      toast.error("Failed to update order status. Please try again.");
    }
  };

  const getStatusVariant = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.Delivered:
        return "success";
      case OrderStatus.Cancelled:
        return "danger";
      case OrderStatus.Pending:
        return "info";
      case OrderStatus.Shipped:
        return "secondary";
      default:
        return "";
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
    <Container fluid className="py-4">
      <h1 className="mb-4">Manage Orders</h1>
      <Table striped bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Total</th>
            <th>Status</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedOrders?.map((order, index) => (
            <tr key={index}>
              <td>{order._id}</td>
              <td>{order.userId.name}</td>
              <td>${order.totalAmount.toFixed(2)}</td>
              <td>
                <Badge bg={getStatusVariant(order.status)}>
                  {order.status}
                </Badge>
              </td>
              <td>{new Date(order.createdAt).toLocaleDateString()}</td>
              <td>
                {order.status !== OrderStatus.Delivered &&
                  order.status !== OrderStatus.Cancelled && (
                    <Button
                      onClick={() => {
                        setModalState((p) => ({
                          ...p,
                          isOpen: true,
                          model: order,
                        }));
                      }}
                      variant=""
                      size="sm"
                      title="Update Order Status"
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </Button>
                  )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationControl
        currentPage={currentPage}
        totalItems={paginatedOrders?.length ?? 0}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
      {modalState.isOpen && (
        <UpdateOrderStatusModal
          showModal={modalState.isOpen}
          handleClose={() => setModalState({ isOpen: false, model: undefined })}
          order={modalState.model}
          handleUpdateStatus={handleUpdateStatus}
        />
      )}
    </Container>
  );
};

export default paginatedOrdersPage;
