import { useQuery } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';

const fetchOrders = async (token: string) => {
  const response = await fetch('https://localhost:8000/api/orders', {
    headers: {
      'Authorization': `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

export function useOrders() {
  const [cookies] = useCookies(['userToken']);
  const token = cookies.userToken;

  return useQuery({
    queryKey: ['orders'],
    queryFn: () => fetchOrders(token),
    enabled: !!token, // Fetch orders only if token is available
  });
}
