import useSWR from "swr";
import {
  Button,
  useToast,
  VStack,
  HStack,
  Text,
  Center,
  IconButton,
  CloseIcon,
  Alert,
  NativeBaseProvider,
} from "native-base";

const apiBaseUrl = "https://api.freteme.com/api/";
const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function useUserServices() {
  const id = localStorage.getItem("user_id");
  const { data, error, isLoading } = useSWR(
    `${apiBaseUrl}servicos?user_id=${id}`,
    fetcher,
    {
      refreshInterval: 5000,
    }
  );

  console.error(data);

  return {
    data: id != undefined && id != null ? data : [],
    isLoading,
    isError: error,
  };
}
