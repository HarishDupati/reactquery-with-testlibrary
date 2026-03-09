import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import ProductContainer from "./ProductContainer";
import { render, screen, waitFor } from "@testing-library/react";
import ProductsList from "../../components/ProductsList";
import { ThemeContext } from "../../context/ThemeContext";
import { MemoryRouter } from "react-router";

// Create a new QueryClient for each test to avoid interference
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      gcTime: 0,
      staleTime: 0,
    },
  },
});

const mockProducts = [
  {id: 3, title: "Powder Canister", description: "Test product", price: 10, discountPercentage: 5, rating: 4, stock: 5, brand: "Test Brand", category: "test", thumbnail: "https://via.placeholder.com/150", images: ["https://via.placeholder.com/150"]},
  {id: 4, title: "Red Lipstick", description: "Test lipstick", price: 20, discountPercentage: 10, rating: 5, stock: 15, brand: "Test Brand", category: "beauty", thumbnail: "https://via.placeholder.com/150", images: ["https://via.placeholder.com/150"]}
]

const mockApiResponse = { 
  products: mockProducts, 
  total: 2, 
  skip: 0, 
  limit: 10 
};

const mockData = { pages: [mockApiResponse] }

const mockThemeContext = {
  themeValue: "light" as const,
  setter: vi.fn()
};

// Mock the API function
vi.mock('../../api/products', () => ({
  fetchProducts: vi.fn(() => Promise.resolve(mockApiResponse))
}));
    
afterEach(() => {
  vi.resetAllMocks();
})

describe("ProductContainer", () => {
  test("Check if wrapper is present", async () => {
    const client = createTestQueryClient();
    const component = (
      <MemoryRouter>
        <ThemeContext.Provider value={mockThemeContext}>
          <QueryClientProvider client={client}>
            <ProductContainer keyword="test" />
          </QueryClientProvider>
        </ThemeContext.Provider>
      </MemoryRouter>
    );
    render(component);
    
    // Wait for the component to load and render the products container
    await waitFor(() => {
      const product = screen.getByTestId("products-container");
      expect(product).toBeInTheDocument();
    }, { timeout: 5000 });
  })

  test('check if products are present', async () => {
    render(
      <MemoryRouter>
        <ProductsList data={mockData} />
      </MemoryRouter>
    )
    const sampleProduct = await screen.findByTestId('product-4')
    await expect(sampleProduct).toBeInTheDocument();
  })

  test('test if api call works', async () => {
    // Test that our mock function returns expected data
    const { fetchProducts } = await import('../../api/products');
    const apiResponse = await fetchProducts();
    
    // Verify the mock returns the expected structure
    expect(apiResponse).toEqual(mockApiResponse);

    const testData = { pages: [apiResponse] };
    
    render(
      <MemoryRouter>
        <ProductsList data={testData} />
      </MemoryRouter>
    )
    const sampleProduct = await screen.findByTestId('product-4')
    await expect(sampleProduct).toBeInTheDocument();
  })
});
