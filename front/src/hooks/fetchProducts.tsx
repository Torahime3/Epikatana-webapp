import { useQuery } from '@tanstack/react-query';
const apiScheme = import.meta.env.VITE_API_SCHEME;

const fetchProducts = async () => {
  const response = await fetch(`${apiScheme}://localhost:8000/api/products`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: fetchProducts,
  });
}
