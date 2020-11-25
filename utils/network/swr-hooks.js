import useSWR from "swr";
import fetch from "unfetch";

function fetcher(url) {
  return fetch(url).then((res) => res.json());
}

export function useItems() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_LOST_API_URL}/items?per=6`,
    fetcher
  );

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useItemsWithReward() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_LOST_API_URL}/items?per=6&reward=yes&condition=lost`,
    fetcher
  );

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useItemsLost() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_LOST_API_URL}/items?per=6&condition=lost`,
    fetcher
  );

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  };
}

export function useItemsFound() {
  const { data, error } = useSWR(
    `${process.env.NEXT_PUBLIC_LOST_API_URL}//items?per=6&condition=lost`,
    fetcher
  );

  return {
    entries: data,
    isLoading: !error && !data,
    isError: error,
  };
}
