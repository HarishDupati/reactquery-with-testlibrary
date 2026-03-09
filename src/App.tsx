import { useState } from "react";
import "./App.css";
import ProductContainer from "./containers/ProductContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContext, type themeValueType } from "./context/ThemeContext";
import ErrorBoundary from "./hoc/ErrorBoundary";
import AccordionExample from "./a11y/accordion";
import ComponentWithHeader from "./hoc/HOCwithoutClass";
import {
  createBrowserRouter,
  Link,
  RouterProvider,
  Outlet,
} from "react-router";
import ProductDetailsPage from "./containers/ProductDetailsPage";
import ProductsPage from "./containers/ProductsPage";
import HomePage from "./containers/HomePage/HomePage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient();

queryClient.defaultQueryOptions({
  gcTime: 60000,
  queryKey: ["products", ""],
});

function ProductsLayout() {
  return <Outlet />;
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/products",
    element: <ProductsLayout />,
    children: [
      { index: true, Component: ProductsPage },
      { path: ":id", Component: ProductDetailsPage },
    ],
  },
]);

function App() {
  const [themeValue, setThemeValue] = useState<"light" | "dark">("light");
  const setter = (v: themeValueType) => {
    setThemeValue(v);
  };
  const contextValue = { themeValue, setter };
  return (
    <>
      {/* <AccordionExample />
      <ComponentWithHeader /> */}
      <ThemeContext.Provider value={contextValue}>
        <ErrorBoundary fallback={<>Error in your component</>}>
          <QueryClientProvider client={queryClient}>
            <ReactQueryDevtools initialIsOpen={false} />

            <RouterProvider router={router} />
          </QueryClientProvider>
        </ErrorBoundary>
      </ThemeContext.Provider>
    </>
  );
}

export default App;
