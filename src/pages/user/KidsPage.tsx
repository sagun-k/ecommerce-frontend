"use client";

import type React from "react";
import { Container, Row, Col, Card, Button, Spinner } from "react-bootstrap";
import { useCart } from "../../context/CartContext";
import ProductCard from "../../components/user/products/ProductCard";
import { useQuery } from "@tanstack/react-query";
import { ProductServices } from "../../services/ProductServices";
import { ProductCategory, type Product } from "../../types/product";

const kidsProducts = [
  {
    id: "k1",
    name: "Kids T-Shirt",
    price: 15.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "k2",
    name: "Toy Car",
    price: 20.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "k3",
    name: "Children's Book",
    price: 10.0,
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "k4",
    name: "Building Blocks Set",
    price: 25.0,
    image: "/placeholder.svg?height=200&width=200",
  },
];

const KidsPage: React.FC = () => {
  const { addToCart } = useCart();
  const { data: kidsProducts, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: () => ProductServices.getProductsByCategory(ProductCategory.Kids),
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
      <h1 className="text-center mb-4">Kids Collection</h1>
      <Row xs={1} md={2} lg={3} className="g-4">
        {kidsProducts?.map((product) => (
          <Col key={product.id}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default KidsPage;
