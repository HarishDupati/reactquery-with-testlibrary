import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import ProductsList from "../../components/ProductsList";
import { fetchProducts, postProduct } from "../../api/products";
import Button from "../../components/Button";
import { useContext, useEffect, useCallback, useState } from "react";
import { ThemeContext } from "../../context/ThemeContext";

export default function ProductContainer({keyword}: {keyword: string}) {
  const context = useContext(ThemeContext);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  
  if (!context) {
    throw new Error('ProductContainer must be used within ThemeProvider');
  }
  const {themeValue, setter} = context;
  console.log('theme: ',themeValue, setter);
  const queryClient = useQueryClient();

  const { 
    data, 
    isLoading, 
    isError, 
    fetchNextPage, 
    hasNextPage, 
    isFetchingNextPage 
  } = useInfiniteQuery({
    queryKey: ["products", keyword],
    queryFn: ({ pageParam }) => fetchProducts(keyword, pageParam),
    initialPageParam: 0,
    staleTime: 20000,
    // staleTime: 3000, // considers response is fresh for 3 secs
    // refetchInterval: 10000, // polling - polls requests for every 10 secs
    getNextPageParam: (lastPage, allPages, lastPageParam) => {
      // Check if we've loaded all products
      const totalLoaded = allPages.reduce((sum, page) => sum + page.products.length, 0);
      if (totalLoaded >= lastPage.total) {
        return undefined; // No more pages
      }
      return lastPageParam + 1;
    },
    refetchOnWindowFocus: false
  });
  console.log('data: =>', data);

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

  // Scroll to bottom detection
  const handleScroll = useCallback(() => {
    // Calculate if user has scrolled to bottom (with small buffer of 100px)
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const docHeight = document.documentElement.scrollHeight;
    
    const isNearBottom = scrollTop + windowHeight >= docHeight - 100;
    
    if (isNearBottom && hasNextPage && !isFetchingNextPage && !isLoadingMore) {
      setIsLoadingMore(true);
      fetchNextPage().then(() => {
        setIsLoadingMore(false);
      }).catch(() => {
        setIsLoadingMore(false);
      });
    }
  }, [hasNextPage, isFetchingNextPage, isLoadingMore, fetchNextPage]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  // console.log('isLoading, data, isError: ', isLoading, data, isError);
  if (isLoading) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading products...</p>
      </div>
    </div>
  );

  if (isError) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="text-red-500 text-6xl mb-4">⚠️</div>
        <p className="text-gray-700 text-lg">Error loading products</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
          <p className="text-gray-600">Discover our amazing collection of products</p>
        </div>
        
        {/* Products Grid */}
        <div 
          data-testid="products-container"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6"
        >
          <ProductsList data={data} />
        </div>

        {/* Loading More Indicator */}
        {(isFetchingNextPage || isLoadingMore) && (
          <div className="mt-8 flex justify-center">
            <div className="flex items-center space-x-2 bg-white rounded-lg shadow-md px-4 py-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-600"></div>
              <span className="text-gray-600">Loading more products...</span>
            </div>
          </div>
        )}

        {/* End of Results Indicator */}
        {data && !hasNextPage && (
          <div className="mt-8 text-center">
            <div className="inline-block bg-gray-100 rounded-lg px-4 py-2">
              <span className="text-gray-600">🎉 You've reached the end of our product catalog!</span>
            </div>
          </div>
        )}

        {/* Stats */}
        {data && (
          <div className="mt-12 text-center">
            <p className="text-gray-600">
              Showing {data.pages.reduce((sum, page) => sum + page.products.length, 0)} of {data.pages[0]?.total || 0} products
            </p>
            {hasNextPage && (
              <p className="text-sm text-gray-500 mt-2">
                💡 Scroll down to load more products automatically
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
