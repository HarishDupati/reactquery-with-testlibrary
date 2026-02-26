import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./App.css";
import ProductsContainer from "./containers/ProductsContainer";


function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ProductsContainer />
    </QueryClientProvider>
  );
}

export default App;
