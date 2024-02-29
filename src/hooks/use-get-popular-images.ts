import { IPhoto } from "@/components/types";
import { useQuery } from "@tanstack/react-query";

export const useGetPopularImages = () => {
  return useQuery<IPhoto[]>({
    queryKey: ["popular"],
    queryFn: () => fetchPopularImages(),
  });
};

const fetchPopularImages = async () => {
  const URL = `https://api.unsplash.com/photos?client_id=${
    import.meta.env.VITE_APP_ACCESS_KEY
  }&per_page=20&order_by=popular`;

  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
};
