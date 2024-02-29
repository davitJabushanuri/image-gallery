import { useInfiniteQuery } from "@tanstack/react-query";

interface IUserGetImages {
  query: string;
}

const ACCESS_KEY = import.meta.env.VITE_APP_ACCESS_KEY;

export const useSearchImages = ({ query }: IUserGetImages) => {
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
  const URL =
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${ACCESS_KEY}&per_page=10&page=` +
    pageParam;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
