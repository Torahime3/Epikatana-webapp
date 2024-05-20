import { useQuery } from '@tanstack/react-query';
const apiScheme = import.meta.env.VITE_API_SCHEME;

const fetchMe = async (userToken: any) => {

    console.log();
    const response = await fetch(`${apiScheme}://localhost:8000/api/me`, {
        headers: {
            Authorization: `bearer ${userToken}`,
        },
    });
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    return response.json();
};

export function useMe(userToken: string) {

    return useQuery({
        queryKey: ['me'],
        queryFn: () => fetchMe(userToken),
        enabled: userToken !== undefined,
    });
}
