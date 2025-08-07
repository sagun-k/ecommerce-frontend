"use client";

import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { AuthenticationServices } from "../../services/AuthenticationServices";
import { UserRole, type User } from "../../types/user";
import CreateOrEditUserModal, {
  type CreateOrUpdateUserRequest,
} from "./CreateOrEditUserModal";
import { toast } from "react-toastify";
import { UserServices } from "../../services/admin/UserService";
import PaginationControl from "../../components/common/PaginationControl";

const AdminUsersPage = () => {
  const [showModal, setShowModal] = useState<{ model?: User; isOpen: boolean }>(
    { isOpen: false, model: undefined }
  );

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: allUsers, isLoading } = useQuery({
    queryKey: ["users-all"],
    queryFn: () => AuthenticationServices.getUsers(),
  });

  const paginatedUsers = allUsers?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const queryClient = useQueryClient();

  const toggleModal = (user?: User) => {
    setShowModal((p) => ({ isOpen: !p.isOpen, model: user }));
  };

  const handleSubmit = async (request: CreateOrUpdateUserRequest) => {
    try {
      if (request._id) {
        await UserServices.updateUser(request);
      } else {
        await UserServices.createUser(request);
      }
      toast.success(
        `${
          request._id
            ? "Successfully updated User"
            : "Successfully created user"
        } `
      );
      queryClient.invalidateQueries({ queryKey: ["users-all"] });
      toggleModal();
    } catch (err) {
      toast.error("Error while creating user");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await UserServices.deleteUser(id);
      toast.success("Successfully deleted User");
      queryClient.invalidateQueries({ queryKey: ["users-all"] });
      toggleModal();
    } catch (err) {
      toast.error("Error while deleting user");
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
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Users</h1>
        <Button variant="primary" onClick={() => toggleModal()}>
          <i className="fa-solid fa-user-plus me-2"></i>
          Add New User
        </Button>
      </div>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedUsers?.map((user, index) => (
            <tr key={index}>
              <td>{user._id}</td>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.phone}</td>
              <td>{user.role}</td>
              <td>
                <Button
                  variant="light"
                  size="sm"
                  className="me-2"
                  onClick={() => toggleModal(user)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Button>
                <Button
                  disabled={user.role === UserRole.Admin}
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(user._id)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <PaginationControl
        currentPage={currentPage}
        totalItems={paginatedUsers?.length ?? 0}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
      {showModal.isOpen && (
        <CreateOrEditUserModal
          show={showModal.isOpen}
          handleClose={() => {
            toggleModal();
          }}
          onSubmit={handleSubmit}
          user={showModal.model}
        />
      )}
    </Container>
  );
};

export default AdminUsersPage;
