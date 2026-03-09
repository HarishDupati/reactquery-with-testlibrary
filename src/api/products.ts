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

interface ProductsApiResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export function fetchProducts(keyword='', pageParam = 0): Promise<ProductsApiResponse> {
  const skip = pageParam * 10;
  return fetch(`https://dummyjson.com/products/search?q=${keyword}&limit=10&skip=${skip}`).then(
    (res) => res.json(),
  );
}

interface NewProduct {
  title: string;
}

export function postProduct(product: NewProduct) {
  return fetch("https://dummyjson.com/products/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ id: 195, title: product.title }),
  });
}

export function fetchProductById(id: number) {
  return fetch(`https://dummyjson.com/products/${id}`).then((res) =>
    res.json(),
  );
}

export function fetchByKeyword(keyword: string) {
  return fetch(`https://dummyjson.com/products/search?q=${keyword}`).then((res) =>
    res.json(),
  );
}
