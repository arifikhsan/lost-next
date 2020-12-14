import useSWR from "swr";
import fetch from "unfetch";

function fetcher(url) {
  return fetch(url).then((res) => res.json());
}

export function useItems() {
  return swr("/items?per=6");
}

export function useItemsWithReward() {
  return swr("/items?per=6&reward=yes&condition=lost");
}

export function useItemsLost() {
  return swr("/items?per=6&condition=lost");
}

export function useItemsFound() {
  return swr("/items?per=6&condition=lost");
}

export function useItemsSearch(query) {
  return swr(`/items/search?query=${query}`);
}

function swr(url) {
  const { data, error } = useSWR(
    process.env.NEXT_PUBLIC_LOST_API_URL + url,
    fetcher
  );

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  };
}
