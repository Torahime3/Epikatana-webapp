import { useMutation } from '@tanstack/react-query';
import { useCookies } from 'react-cookie';
const apiScheme = import.meta.env.VITE_API_SCHEME;

const createPaymentIntent = async (amount: number, userToken: string) => {
  const response = await fetch(`${apiScheme}://localhost:8000/api/create-payment-intent`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${userToken}`,
    },
    body: JSON.stringify({ amount }),
  });

  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  return response.json();
};

export function useCreatePaymentIntent() {
  const [cookies] = useCookies(['userToken']);
  const userToken = cookies.userToken;

  return useMutation({
    mutationFn: (amount: number) => createPaymentIntent(amount, userToken), 
  });
}
