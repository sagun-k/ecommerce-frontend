import { useQuery } from "@tanstack/react-query";
import React from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Link } from "react-router-dom";
import HomePageWelcomeCard from "../../components/common/HomePageWelcomeCard";
import ProductCard from "../../components/user/products/ProductCard";
import { useAuth } from "../../context/AuthContext";
import { ProductServices } from "../../services/ProductServices";
import { ProductCategory, type Product } from "../../types/product";

const HomePage: React.FC = () => {
  const {
    data: allProducts,
    isLoading,
    error,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: ProductServices.getProducts,
  });

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  if (error) {
    return <div>Error loading products.</div>;
  }

  const getProductsByCategory = (category: string) => {
    return (
      allProducts
        ?.filter((product) => product.category === category)
        .slice(0, 4) || []
    );
  };

  const categories = [
    { name: "Men's Collection", key: ProductCategory.Mens, path: "/mens" },
    {
      name: "Women's Collection",
      key: ProductCategory.Womens,
      path: "/womens",
    },
    { name: "Kids' Collection", key: ProductCategory.Kids, path: "/kids" },
    {
      name: "Accessories",
      key: ProductCategory.Accessories,
      path: "/accessory",
    },
  ];

  return (
    <Container className="my-5">
      <HomePageWelcomeCard />

      {categories.map((category) => (
        <div key={category.key} className="mb-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">{category.name}</h2>
            <Button variant="">
              <Link
                to={category.path}
                className="text-decoration-none text-muted"
              >
                See All
                <i className="fa-solid fa-arrow-right ms-2"></i>
              </Link>
            </Button>
          </div>
          <div className="overflow-none pb-3">
            <Row xs={1} sm={2} md={3} lg={4} className="flex-nowrap g-4">
              {getProductsByCategory(category.key).map((product) => (
                <Col key={product.id}>
                  <ProductCard product={product} />
                </Col>
              ))}
            </Row>
          </div>
        </div>
      ))}
    </Container>
  );
};

export default HomePage;
