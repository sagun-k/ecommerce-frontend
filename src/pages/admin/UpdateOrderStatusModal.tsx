import { useFormik } from "formik";
import { Button, Form, Modal } from "react-bootstrap";
import * as Yup from "yup";
import { OrderStatus, type OrderWithUserDetails } from "../../types/order";

type CreateOrEditProductModalProps = {
  showModal: boolean;
  handleClose: () => void;
  order?: OrderWithUserDetails;
  handleUpdateStatus: (orderId:string, status:OrderStatus) => void;
};

const validationSchema = Yup.object({
  status: Yup.string().required("Status is required"),
});

const UpdateOrderStatusModal = ({
  showModal,
  handleClose,
  order,
  handleUpdateStatus,
}: CreateOrEditProductModalProps) => {
  const formik = useFormik<{ status: OrderStatus; id: string }>({
    initialValues: {
      status: order?.status || OrderStatus.Pending,
      id: order!._id,
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {
      handleUpdateStatus(values.id, values.status);
    },
  });

  return (
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
            Update order status for Order ID: {order?._id}
        </Modal.Title>
      </Modal.Header>
      <Form onSubmit={formik.handleSubmit}>
        <Modal.Body>
          <Form.Group className="mb-3" controlId="productCategory">
            <Form.Label>Status</Form.Label>
            <Form.Control
              as="select"
              name="status"
              value={formik.values.status}
              onChange={formik.handleChange}
              isInvalid={!!formik.errors.status && formik.touched.status}
            >
              <option value="">Select Status</option>
              <option value={OrderStatus.Cancelled}>Cancelled</option>
              <option value={OrderStatus.Delivered}>Delivered</option>
              <option value={OrderStatus.Shipped}>Shipped</option>
            </Form.Control>
            <Form.Control.Feedback type="invalid">
              {formik.errors.status}
            </Form.Control.Feedback>
          </Form.Group>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" type="submit">
            Update Status
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default UpdateOrderStatusModal;
