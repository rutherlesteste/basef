import useSWR from "swr";

const apiBaseUrl = "https://api.freteme.com/api/";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useUser() {
  const { data, error, isLoading } = useSWR(`${apiBaseUrl}usuario`, fetcher, {
    refreshInterval: 10000,
  });
  return {
    user: data,
    isLoading,
    isError: error,
  };
}
