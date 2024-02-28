import { SearchIcon } from "@/assets/search-icon";
import styles from "./search.module.scss";
import { FC, useEffect, useState } from "react";
import { useDebounce } from "@/hooks/use-debounce";

interface ISearch {
  setQuery: (query: string) => void;
}

export const Search: FC<ISearch> = ({ setQuery }) => {
  const [value, setValue] = useState<string>("");
  const debouncedValue = useDebounce(value);
  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  useEffect(() => {
    setQuery(debouncedValue);
  }, [debouncedValue, setQuery]);

  return (
    <form className={styles.container} role="search" aria-label="Search images">
      <label htmlFor="search">
        <SearchIcon />
        <input
          value={value}
          onChange={handleSearch}
          id="search"
          type="search"
          autoComplete="off"
          aria-autocomplete="list"
          placeholder="Search images"
        />
      </label>
    </form>
  );
};
