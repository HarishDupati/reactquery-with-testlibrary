import React from 'react'

  const mockProducts = [
    { id: 1, name: 'Laptop', category: 'Electronics', price: 999 },
    { id: 2, name: 'Book', category: 'Education', price: 29 }
  ]
export default function ProductContainer() {


  return (
    <div data-testid="asdf">{
        mockProducts.map(i => (<div key={i.id}>{i.name}</div>))
      }</div>
  )
}
