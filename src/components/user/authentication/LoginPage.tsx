import { useFormik } from "formik";
import React from "react";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import * as Yup from "yup";
import { useAuth } from "../../../context/AuthContext";

const LoginPage: React.FC = () => {
  const { login, setLoading } = useAuth(); // Assuming useAuth provides a login function
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email address").required("Required"),
      password: Yup.string().min(4, "Too short").required("Required"),
    }),
    onSubmit: async (values) => {
      try {
        setLoading?.(true); // Set loading state if available
        const { email, password } = values;
        const response = await login(email, password);
        if (response?.role === "admin") {
          navigate("/admin/");
        } else {
          navigate("/");
        }
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Login failed. Please check your credentials.");
      } finally {
        setLoading?.(false); // Reset loading state
      }
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
              <i className="fa-solid fa-store fa-4x mb-4 animate-bounce"></i>
              <h2 className="mb-3 fw-bold">Welcome Back!</h2>
              <p className="lead">
                Sign in to access your orders, update your account, and shop the
                latest styles.
              </p>
            </div>
          </Col>

          <Col md={6} className="bg-white p-4">
            <div>
              <h3 className="text-center mb-4">Login</h3>

              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email*</Form.Label>
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

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Password*</Form.Label>
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

                <Button variant="primary" onClick={()=>formik.handleSubmit()} className="w-100 mb-3">
                  Login
                </Button>
                <Button
                  variant="outline-dark"
                  type="button"
                  className="w-100 mb-3"
                  onClick={() => {
                    formik.setFieldValue("email", "user@gmail.com");
                    formik.setFieldValue("password", "user@123");
                  }}
                >
                  Auto fill User
                </Button>
                <Button
                  variant="outline-info"
                  type="button"
                  className="w-100 mb-3"
                  onClick={() => {
                    formik.setFieldValue("email", "admin@gmail.com");
                    formik.setFieldValue("password", "admin@123");
                  }}
                >
                  Auto fill Admin
                </Button>

                <div className="text-center">
                  <Link to="/forgot-password">Forgot Password?</Link>
                </div>
                <div className="text-center mt-3">
                  Don't have an account? <Link to="/register">Register</Link>
                </div>
              </Form>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default LoginPage;
