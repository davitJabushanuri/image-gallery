import { fetchImages } from "@/api/fetch-images";
import { useInfiniteQuery } from "@tanstack/react-query";

interface IuseSearchImages {
  query: string;
}

export const useSearchImages = ({ query }: IuseSearchImages) => {
  return useInfiniteQuery({
    queryKey: ["images", query],
    queryFn: ({ pageParam = 1 }) => {
      const URL =
        `https://api.unsplash.com/search/photos?query=${query}&client_id=${
          import.meta.env.VITE_APP_ACCESS_KEY
        }&per_page=20&page=` + pageParam;
      return fetchImages(URL);
    },
    initialPageParam: 1,
    getNextPageParam: (_prevPage, _allPages, lastPage) => {
      return lastPage + 1;
    },
    enabled: !!query,
  });
};
