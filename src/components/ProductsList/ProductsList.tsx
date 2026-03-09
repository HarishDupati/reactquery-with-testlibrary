import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router";
import { fetchProductById } from "../../api/products";
import Product from "../Product/Product";

interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
}

interface ProductsListProps {
  data?: Product[];
}

export default function ProductsList({ data = [] }: ProductsListProps) {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  return data?.pages?.map((group, i) => (
    <>
    {group.products.map((product) => (
    <Product 
      key={product.id}
      id={product.id}
      title={product.title}
      description={product.description}
      price={product.price}
      discountPercentage={product.discountPercentage}
      rating={product.rating}
      stock={product.stock}
      brand={product.brand}
      category={product.category}
      thumbnail={product.thumbnail}
      images={product.images}
      onClick={handleClick}
      data-testid={`product-${product.id}`}
    />
  )
  )}
  </>
  ))
}
