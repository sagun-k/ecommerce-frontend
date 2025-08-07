import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";

export interface CreateOrUpdateUserRequest {
  _id: string;
  name: string;
  email: string;
  password?: string;
  role: string;
  status: string;
  phone: string;
}

interface CreateOrEditUserModalProps {
  show: boolean;
  handleClose: () => void;
  onSubmit: (values: CreateOrUpdateUserRequest) => void;
  user?: Partial<CreateOrUpdateUserRequest>; // If provided, this is edit mode
}

const CreateOrEditUserModal: React.FC<CreateOrEditUserModalProps> = ({
  show,
  handleClose,
  onSubmit,
  user,
}) => {
    console.log(user)
  const formik = useFormik<CreateOrUpdateUserRequest>({
    initialValues: {
      _id: user?._id || "",
      name: user?.name || "",
      email: user?.email || "",
      password: user?.password || "",
      role: user?.role || "user",
      status: user?.status || "Active",
      phone: user?.phone || "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("name is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      phone: Yup.string()
        .required("Phone required")
        .max(8, "Max characters is 8"),
      password: user
        ? Yup.string().notRequired()
        : Yup.string()
            .min(6, "Password must be at least 6 characters")
            .required("Password is required"),
      role: Yup.string().oneOf(["user", "admin"]).required("Role is required"),
      status: Yup.string()
        .oneOf(["Active", "Inactive"])
        .required("Status is required"),
    }),
    onSubmit: (values) => {
      onSubmit(values);
    },
    enableReinitialize: true,
  });

  console.log(formik.errors);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? "Edit User" : "Add New User"}</Modal.Title>
      </Modal.Header>
      <Form>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="name">
            <Form.Label>Name*</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email*</Form.Label>
            <Form.Control
              type="email"
              name="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          {user === undefined && (
            <Form.Group className="mb-3" controlId="password">
              <Form.Label>Password*</Form.Label>
              <Form.Control
                type="password"
                name="password"
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                isInvalid={formik.touched.password && !!formik.errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {formik.errors.password}
              </Form.Control.Feedback>
            </Form.Group>
          )}

          <Form.Group className="mb-3" controlId="phone">
            <Form.Label>Phone*</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.phone && !!formik.errors.phone}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="role">
            <Form.Label>Role*</Form.Label>
            <Form.Control
              as="select"
              name="role"
              value={formik.values.role}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.role && !!formik.errors.role}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.role}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="status">
            <Form.Label>Status*</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.status && !!formik.errors.status}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.status}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="light" onClick={handleClose}>
            Close
          </Button>
          <Button variant="success" onClick={() => formik.handleSubmit()}>
            {user ? "Save Changes" : "Add User"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateOrEditUserModal;
