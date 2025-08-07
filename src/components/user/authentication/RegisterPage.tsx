import React, { useState } from "react";
import { Form, Button, Card, Alert, Col, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { UserRole, type CreateUserRequest } from "../../../types/user";
import { AuthenticationServices } from "../../../services/AuthenticationServices";
import { toast } from "react-toastify";
// import { useAuth } from "../../../context/AuthContext"; // optionally import when you use it

const RegisterPage: React.FC = () => {
  const navigate = useNavigate();
  const [submitError, setSubmitError] = useState("");

  const regitserUser = async (values: CreateUserRequest) => {
    try {
      await AuthenticationServices.register(values);
      toast.success("Registration successful! Please log in.");
      navigate("/login");
    } catch (error) {
      setSubmitError("Registration failed. Try again.");
      toast.error;
    }
  };

  const formik = useFormik<CreateUserRequest>({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: UserRole.User,
      phone: ""
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .min(3, "Must be at least 3 characters")
        .required("Required"),
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string()
        .min(6, "Password must be at least 8 characters")
        .required("Required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), ""], "Passwords must match")
        .required("Required"),
    phone:Yup.string().required("Required").max(8, "Phone number cannot exceed 8 characters"),
    }),
    onSubmit: async (values) => {
      await regitserUser(values);
    },
  });

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 navbar-blue-gradient">
      <Card className="p-0 shadow-sm d-flex flex-row overflow-hidden">
        <Row className="g-0">
          <Col
            md={6}
            className="d-flex flex-column justify-content-center align-items-center text-white p-4"
            style={{
              background: "linear-gradient(135deg, #739ec6ff, #37739eff)",
              minHeight: "100%",
            }}
          >
            <div className="text-center px-3">
              <i className="fa-solid fa-user-plus fa-4x mb-4 animate-bounce"></i>
              <h2 className="mb-3 fw-bold">Join the Community!</h2>
              <p className="lead">
                Create your account to explore new arrivals, save favorites, and
                enjoy a personalized shopping experience.
              </p>
            </div>
          </Col>

          <Col md={6} className="bg-white p-4">
            <div>
              <h2 className="text-center mb-4">Register</h2>
              {submitError && <Alert variant="danger">{submitError}</Alert>}

              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formUsername">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter username"
                    {...formik.getFieldProps("name")}
                    isInvalid={!!formik.touched.name && !!formik.errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.name}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    {...formik.getFieldProps("email")}
                    isInvalid={!!formik.touched.email && !!formik.errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.email}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhone">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="Enter phone number"
                    {...formik.getFieldProps("phone")}
                    isInvalid={!!formik.touched.phone && !!formik.errors.phone}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.phone}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    {...formik.getFieldProps("password")}
                    isInvalid={
                      !!formik.touched.password && !!formik.errors.password
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Confirm Password"
                    {...formik.getFieldProps("confirmPassword")}
                    isInvalid={
                      !!formik.touched.confirmPassword &&
                      !!formik.errors.confirmPassword
                    }
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button type="submit" className="w-100 mb-3">
                  Register
                </Button>

                <div className="text-center mt-3">
                  Already have an account? <Link to="/login">Login</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default RegisterPage;
