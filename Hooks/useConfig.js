import useSWR from "swr";

const apiBaseUrl = "https://api.freteme.com/api/";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useConfig() {
  const { data, error, isLoading } = useSWR(`${apiBaseUrl}config`, fetcher);
  return {
    config: data,
    isLoading,
    isError: error,
  };
}
