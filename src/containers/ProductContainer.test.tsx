
import ProductContainer from "./ProductContainer"
import { render, screen } from '@testing-library/react';


test('ProductContainer filters and displays products correctly', async () => {
// expect(document).toBeDefined();
  render(<ProductContainer />) 

    const product = await screen.findByTestId('asdf')
    await expect(product).toBeInTheDocument()

})


// describe('suite', () => {
//   it('serial test', async () => { /* ... */ })
//   it.concurrent('concurrent test 1', async ({ expect }) => { /* ... */ })
//   it.concurrent('concurrent test 2', async ({ expect }) => { /* ... */ })
// })