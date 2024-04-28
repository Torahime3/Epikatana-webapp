import { useQuery } from '@tanstack/react-query';

const fetchProducts = async () => {
  const response = await fetch('https://localhost:8000/api/products');
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
