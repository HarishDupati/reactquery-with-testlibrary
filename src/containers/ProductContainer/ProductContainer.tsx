import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProductsList from "../../components/ProductsList";
import { fetchProducts, postProduct } from "../../api/products";
import Button from "../../components/Button";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import Users from "../../hoc/withFetch";

export default function ProductContainer() {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('ProductContainer must be used within ThemeProvider');
  }
  const {themeValue, setter} = context;
  console.log('theme: ',themeValue, setter);
  const queryClient = useQueryClient();

  const { isLoading, data, isError } = useQuery({
    queryKey: ["products"],
    queryFn: () => fetchProducts(),
    staleTime: 100,
    // refetchInterval: 1000 * 60, // refetch for every 1 min
    refetchOnWindowFocus: false
  });

  const mutation = useMutation({
    mutationFn: postProduct,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });


  // for creating a new product using post call
  const handleClick = () => {
    mutation.mutate({
      title: "new product",
    });
  };

  // console.log('isLoading, data, isError: ', isLoading, data, isError);
  if (isLoading) return <>Loading...</>;

  if (isError) return <>Error</>;

  return (
    <>
      {<Users />}
      <Button label={"Add a product"} onClick={handleClick} />
      <div data-testid="products-container">
        <ProductsList data={data?.products} />
      </div>
    </>
  );
}
