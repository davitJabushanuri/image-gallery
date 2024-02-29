import { useInfiniteQuery } from "@tanstack/react-query";

interface IUserGetImages {
  query: string;
}

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

export const useGetImages = ({ query = "popular" }: IUserGetImages) => {
  return useInfiniteQuery({
    queryKey: ["images", query],
    queryFn: ({ pageParam = 1 }) => fetchImages(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (_prevPage, _allPages, lastPage) => {
      return lastPage + 1;
    },
  });
};

const fetchImages = async (query: string, pageParam: number) => {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}&per_page=10&page=` +
        pageParam,
    );
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
