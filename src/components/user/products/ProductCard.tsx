import type React from "react";
import { Button, Card } from "react-bootstrap";
import { toast } from "react-toastify";
import { useAuth } from "../../../context/AuthContext";
import { CartServices } from "../../../services/CartServices";
import type { Product } from "../../../types/product";
import { useQueryClient } from "@tanstack/react-query";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const addToCart = async () => {
    try {
      await CartServices.addToCart(product.id, 1, user?._id!);
      queryClient.invalidateQueries({ queryKey: ["cart-count"] });
      toast.success("Product added to cart successfully!");
    } catch (error) {
      toast.error((error as Error)?.message || "Failed to add product to cart");
    }
  };

  return (
    <Card
      className="h-100 border-0 shadow-sm product-card transition-all"
      style={{
        background: "linear-gradient(to bottom right, #e6f0ff, #ffffff)", // Light blue to white
        borderRadius: "12px",
      }}
    >
      <img
        src={
          product.image ||
          "https://assets.timberland.com/images/t_img/f_auto,h_650,w_650,e_sharpen:60/dpr_2.0/v1721255330/TB0A6WWTP47-ALT10/Small-Logo-Print-Short-Sleeve-TShirt.png"
        }
        alt={product.name}
        className="card-img-top mx-auto mt-3"
        style={{
          objectFit: "contain",
          height: "200px",
          width: "auto",
          borderRadius: "8px",
        }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold text-dark text-center mb-2">
          {product.name}
        </Card.Title>

        {product.category && (
          <Card.Text className="text-muted text-center small">
            Category:{" "}
            {product.category.charAt(0).toUpperCase() +
              product.category.slice(1)}
          </Card.Text>
        )}

        <div className="d-flex justify-content-between align-items-center mt-auto pt-3">
          <span className="fs-5 fw-semibold text-dark">
            ${product.price.toFixed(2)}
          </span>
          <Button
            variant="light"
            className="text-white fw-semibold px-3"
            style={{
              background: "linear-gradient(to right, #4a90e2, #007acc)", // Blue gradient button
              border: "none",
              borderRadius: "30px",
            }}
            onClick={() => addToCart()}
          >
            <i className="fa-solid fa-cart-plus me-2"></i>
            Add to Cart
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;
