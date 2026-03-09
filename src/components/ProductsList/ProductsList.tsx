import { useNavigate } from "react-router";
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

type IData = {pages: {products: Product[]}[]}

interface ProductsListProps {
  data?: IData;
}

export default function ProductsList({ data }: ProductsListProps) {
  const navigate = useNavigate();

  const handleClick = (id: number) => {
    navigate(`/products/${id}`);
  };

  return data?.pages?.flatMap((group, pageIndex) => 
    group.products.map((product) => (
      <Product
        key={`${pageIndex}-${product.id}`}
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
    ))
  );
}
