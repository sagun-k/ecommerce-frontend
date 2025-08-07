import { useQuery } from "@tanstack/react-query";
import type React from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import ProductCard from "../../components/user/products/ProductCard";
import { ProductServices } from "../../services/ProductServices";
import { ProductCategory, type Product } from "../../types/product";

const WomensPage: React.FC = () => {

  const { data: womensProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () =>
      ProductServices.getProductsByCategory(ProductCategory.Womens),
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="" />
      </div>
    );
  }

  return (
    <Container className="my-5">
      <h1 className="text-center mb-4">Women's Collection</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {womensProducts?.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default WomensPage;
