import { useEffect } from "react";
import {
  Link,
  Redirect,
  useParams,
  useHistory,
  useRouteMatch,
} from "react-router-dom";
import { Box, Text, Spinner, Center, VStack } from "native-base";
import { useAuth } from "../../Hooks/useAuth";
import { createTeamMembership } from "../../service/auth";
const GoogleRedirectPage = () => {
  const { account, isLoading, isLoggedIn } = useAuth();
  const history = useHistory();


  const validate = async () => {
    if (account) {
      localStorage.setItem("isLoggedIn", true);
      localStorage.setItem("userName", account.name);
      localStorage.setItem("email", account.email);
      localStorage.setItem("user_id", account.$id);
       

      history.push("/");
    }
  };

  useEffect(() => {
    validate();
  }, [ account]);

  return (
    <Center justifyContent={"center"} alignItems={"center"} flex={1}>
      <VStack space={2} alignItems="center">
        <Spinner accessibilityLabel="Carregando Conta" />
        <Text fontSize="lg" bold>
          Validando...
        </Text>
      </VStack>
    </Center>
  );
};

export default GoogleRedirectPage;
