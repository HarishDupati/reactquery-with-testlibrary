import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchProductById } from "../../api/products";

interface Product {
  id: number;
  title: string;
}

interface ProductsListProps {
  data?: Product[];
}

export default function ProductsList({ data = [] }: ProductsListProps) {
  const [productId, setProductId] = useState(1) 
  console.log('productId: ', productId);

   // fetch product details by product id 
  useQuery({
    queryKey: ["products", productId],
    queryFn: () => fetchProductById(productId),
    staleTime: 100,
    // refetchInterval: 1000 * 60, // refetch for every 1 min
    refetchOnWindowFocus: false
  });

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const pidElement = e.currentTarget.dataset.pid;
    setProductId(Number(pidElement));
  };

  return (
    <>
      {data.map((i) => (
        <div key={i.title} data-pid={i.id} onClick={handleClick} data-testid={`product-${i.title}`}>
          {i.title}
        </div>
      ))}
    </>
  );
}
