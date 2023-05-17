import useSWR from "swr";

const apiBaseUrl = "https://api.freteme.com/api/";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useServices() {
  const { data, error, isLoading } = useSWR(`${apiBaseUrl}servicos`, fetcher, {
    refreshInterval: 10000,
  });
  return {
    services: data,
    isLoading,
    isError: error,
  };
}
