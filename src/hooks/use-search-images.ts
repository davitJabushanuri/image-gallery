import { useInfiniteQuery } from "@tanstack/react-query";

interface IuseSearchImages {
  query: string;
}

export const useSearchImages = ({ query }: IuseSearchImages) => {
  return useInfiniteQuery({
    queryKey: ["images", query],
    queryFn: ({ pageParam = 1 }) => fetchImages(query, pageParam),
    initialPageParam: 1,
    getNextPageParam: (_prevPage, _allPages, lastPage) => {
      return lastPage + 1;
    },
    enabled: !!query,
  });
};

const fetchImages = async (query: string, pageParam: number) => {
  const URL =
    `https://api.unsplash.com/search/photos?query=${query}&client_id=${
      import.meta.env.VITE_APP_ACCESS_KEY
    }&per_page=20&page=` + pageParam;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
