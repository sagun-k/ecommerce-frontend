import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { Button, Container, Spinner, Table } from "react-bootstrap";
import { toast } from "react-toastify";
import { ProductServices } from "../../services/ProductServices";
import type { CreateProductRequest, Product } from "../../types/product";
import CreateOrEditProductModal from "./CreateOrEditProductModal";
import PaginationControl from "../../components/common/PaginationControl";

const AdminProductsPage = () => {
  const [showModalState, setShowModalState] = useState<{
    isOpen: boolean;
    model: Product | undefined;
  }>({ isOpen: false, model: undefined });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const { data: allProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductServices.getProducts,
  });

  const queryClient = useQueryClient();

  const paginatedProducts = allProducts?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  const handleClose = () => {
    setShowModalState((p) => ({ ...p, isOpen: false }));
  };
  const handleShow = (product?: Product) => {
    setShowModalState((p) => ({ ...p, isOpen: true, model: product }));
  };

  const handleSubmit = async (product: CreateProductRequest) => {
    try {
      if (product.id) {
        await ProductServices.updateProduct(product.id, product);
      } else {
        await ProductServices.createProduct(product);
      }
      toast.success(
        product.id
          ? "Product updated successfully!"
          : "Product created successfully!"
      );
      queryClient.invalidateQueries({ queryKey: ["products"] });
      setShowModalState((p) => ({ ...p, isOpen: false, model: undefined }));
    } catch (error) {
      console.error("Error updating or creating product:", error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await ProductServices.deleteProduct(id);
      queryClient.invalidateQueries({ queryKey: ["products"] });
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error updating or creating product:", error);
    }
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Manage Products</h1>
        <Button
          variant="primary"
          onClick={() => setShowModalState({ isOpen: true, model: undefined })}
        >
          <i className="fa-solid fa-plus me-2"></i>
          Add New Product
        </Button>
      </div>

      <Table striped bordered hover responsive className="shadow-sm">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Category</th>
            <th>Price</th>
            <th>Stock</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts?.map((product) => (
            <tr key={product.id}>
              <td>
                <img
                  src={product.image}
                  alt={product.name}
                  style={{ width: "50px", height: "50px", objectFit: "cover" }}
                />
              </td>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>${product.price.toFixed(2)}</td>
              <td>{product.stock}</td>
              <td>
                <Button
                  variant=""
                  size="sm"
                  className="me-2"
                  onClick={() => handleShow(product)}
                >
                  <i className="fa-solid fa-pen-to-square"></i>
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(product.id)}
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
        totalItems={allProducts?.length ?? 0}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
      {showModalState.isOpen && (
        <CreateOrEditProductModal
          showModal={showModalState.isOpen}
          handleClose={handleClose}
          product={showModalState.model}
          handleUpdateOrCreateProduct={handleSubmit}
        />
      )}
    </Container>
  );
};

export default AdminProductsPage;
