interface Product {
  id: number;
  title: string;
}

interface ProductsApiResponse {
  products: Product[];
}

export function fetchProducts(): Promise<ProductsApiResponse> {
  return fetch('https://dummyjson.com/products').then(res => res.json())
} 

interface NewProduct {
  title: string;
}

export function postProduct(product: NewProduct) {
  return fetch('https://dummyjson.com/products/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({id: 195, title: product.title})
  })
}

export function fetchProductById(id: number): Promise<ProductsApiResponse> {
  return fetch(`https://dummyjson.com/products/${id}`).then(res => res.json())
} 