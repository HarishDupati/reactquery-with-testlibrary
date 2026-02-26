import { useQuery } from "@tanstack/react-query"

export default function ProductsContainer() {
  const {isLoading, data, isError}= useQuery({
    queryKey: ['products'],
    queryFn: () => fetch('https://dummyjson.com/products').then(res => res.json())
  })
  console.log('isLoading, data, isError: ', isLoading, data, isError);

  if(isLoading) {
    return <>Loading...</>
  }

  return (
    <div data-testid="products-container">
      {
        data && data.products.map(({title}: {title: string}) => (<div key ={title}>{title}</div>))
      }

    </div>
  )
}
