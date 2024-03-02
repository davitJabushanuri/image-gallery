import { fetchImages } from "@/api/fetch-images";
import { IPhoto } from "@/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPopularImages = () => {
  return useQuery<IPhoto[]>({
    queryKey: ["popular"],
    queryFn: () => {
      const URL = `https://api.unsplash.com/photos?client_id=${
        import.meta.env.VITE_APP_ACCESS_KEY
      }&per_page=20&order_by=popular`;
      return fetchImages(URL);
    },
  });
};
