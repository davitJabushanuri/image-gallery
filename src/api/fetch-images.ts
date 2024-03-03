export const fetchImages = async (URL: string) => {
  try {
    const response = await fetch(URL);

    if (response.status === 403) {
      throw new Error("Rate limit exceeded. Try again later.");
    }

    if (!response.ok) {
      throw new Error("Server is not responding. Try again later.");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    if (error instanceof Error) throw new Error(error.message);

    throw new Error("Failed to fetch");
  }
};
