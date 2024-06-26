import { useQuery } from '@tanstack/react-query';
const apiScheme = import.meta.env.VITE_API_SCHEME;

const fetchProductDetails = async (id: number) => {
  const response = await fetch(`${apiScheme}://localhost:8000/api/products/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function useProductDetails(id: number) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductDetails(id),
  });
}
