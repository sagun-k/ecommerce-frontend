import { Modal, Form, Button, Row, Col } from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  ProductCategory,
  type CreateProductRequest,
  type Product,
} from "../../types/product";

type CreateOrEditProductModalProps = {
  showModal: boolean;
  handleClose: () => void;
  product?: Product | null;
  handleUpdateOrCreateProduct: (product: CreateProductRequest) => void;
};

const validationSchema = Yup.object({
  name: Yup.string().required("Product name is required"),
  category: Yup.string().required("Category is required"),
  price: Yup.number()
    .min(0, "Price must be positive")
    .required("Price is required"),
  stock: Yup.number()
    .min(0, "Stock must be positive")
    .required("Stock is required"),
  image: Yup.string()
    .required("Image URL is required"),
});

const CreateOrEditProductModal = ({
  showModal,
  handleClose,
  product,
  handleUpdateOrCreateProduct,
}: CreateOrEditProductModalProps) => {
  const formik = useFormik<CreateProductRequest>({
    initialValues: {
      id:product?.id || "",
      name: product?.name || "",
      category: product?.category || undefined,
      price: product?.price || 0,
      stock: product?.stock || 0,
      image: product?.image || "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      handleUpdateOrCreateProduct(values);
      handleClose();
    },
  });

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          {product ? "Edit Product" : "Add New Product"}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="productName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.name && formik.touched.name}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              name="category"
              value={formik.values.category}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.category && formik.touched.category}
            >
              <option value="">Select Category</option>
              <option value={ProductCategory.Mens}>Mens</option>
              <option value={ProductCategory.Womens}>Womens</option>
              <option value={ProductCategory.Kids}>Kids</option>
              <option value={ProductCategory.Accessories}>Accessories</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.category}
            </Form.Control.Feedback>
          </Form.Group>

          <Row>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="productPrice">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  name="price"
                  value={formik.values.price}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.price && formik.touched.price}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.price}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group className="mb-3" controlId="productStock">
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  name="stock"
                  value={formik.values.stock}
                  onChange={formik.handleChange}
                  isInvalid={!!formik.errors.stock && formik.touched.stock}
                />
                <Form.Control.Feedback type="invalid">
                  {formik.errors.stock}
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>

          <Form.Group className="mb-3" controlId="productImage">
            <Form.Label>Product Image</Form.Label>

            {/* Image preview */}
            {formik.values.image && typeof formik.values.image === "string" && (
              <div className="mb-2">
                <img
                  src={formik.values.image}
                  alt="Product Preview"
                  style={{
                    maxWidth: "100%",
                    maxHeight: "150px",
                    objectFit: "cover",
                  }}
                />
              </div>
            )}

            {/* File input to upload a new image */}
            <Form.Control
              type="file"
              name="image"
              accept="image/*"
              onChange={(event) => {
                const file = event.currentTarget.files?.[0];
                if (file) {
                  formik.setFieldValue("image", file);
                }
              }}
              isInvalid={!!formik.errors.image && formik.touched.image}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.image as string}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            {product ? "Save Changes" : "Add Product"}
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default CreateOrEditProductModal;
