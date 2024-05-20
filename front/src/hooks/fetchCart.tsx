import { useQuery } from '@tanstack/react-query';
const apiScheme = import.meta.env.VITE_API_SCHEME;

const fetchCart = async (userToken: any) => {

    console.log();
    const response = await fetch(`${apiScheme}://localhost:8000/api/carts`, {
        headers: {
            Authorization: `bearer ${userToken}`,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export function useCart(userToken: string) {

    return useQuery({
        queryKey: ['carts'],
        queryFn: () => fetchCart(userToken),
        enabled: userToken !== undefined,
    });
}