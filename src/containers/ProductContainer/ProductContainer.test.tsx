import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductContainer from "./ProductContainer";
import { render, screen } from "@testing-library/react";
import ProductsList from "../../components/ProductsList";
import { fetchProducts } from "../../api/products";

const client = new QueryClient();

const mockData = [{id: 3, title: "Powder Canister"},{id: 4, title: "Red Lipstick"}]

    
afterEach(() => {
  vi.resetAllMocks();
})

describe("ProductContainer", () => {
  test("Check if wrapper is present", async () => {
    const component = (
      <QueryClientProvider client={client}>
        <ProductContainer />
      </QueryClientProvider>
    );
    render(component);
    const product = await screen.findByTestId("products-container");
    await expect(product).toBeInTheDocument();
  })

  test('check if products are present', async () => {
    render(
        <ProductsList data={mockData} />
    )
    const sampleProduct = await screen.findByTestId('product-Red Lipstick')
    await expect(sampleProduct).toBeInTheDocument();
  })

  test('test if api call works', async () => {
    // if you use vi.fn() inplace of spyon here, it can override the global fetch funciton.
    // which can cause errors and result in unexpected test results.
    const fetchSpy = vi.spyOn(globalThis, 'fetch').mockResolvedValue({
      json: () => Promise.resolve({ products: mockData })
    } as Response)
    const apiResponse = await fetchProducts();
    expect(fetchSpy).toHaveBeenCalled();

    render(
        <ProductsList data={apiResponse.products} />
    )
    const sampleProduct = await screen.findByTestId('product-Red Lipstick')
    await expect(sampleProduct).toBeInTheDocument();
  })
});
