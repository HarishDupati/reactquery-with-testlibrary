import { useState } from "react";
import "./App.css";
import ProductContainer from "./containers/ProductContainer";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeContext, type themeValueType } from "./context/ThemeContext";
import ErrorBoundary from "./hoc/ErrorBoundary";

const queryClient = new QueryClient();

function App() {
  const [themeValue, setThemeValue] = useState<"light" | "dark">("light");
  const setter = (v: themeValueType) => {
    setThemeValue(v);
  };
  const contextValue = { themeValue, setter };
  return (
    <>
      <ErrorBoundary fallback={<>Error in your component</>}>
        <ThemeContext.Provider value={contextValue}>
          <QueryClientProvider client={queryClient}>
            <ProductContainer />
          </QueryClientProvider>
        </ThemeContext.Provider>
      </ErrorBoundary>
    </>
  );
}

export default App;
