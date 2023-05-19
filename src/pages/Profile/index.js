import * as React from "react";

import { Heading } from "native-base";
import { Box, Text, VStack } from "native-base";
import { useEffect, useState } from "react";
import { keyframes } from "styled-components";
import useSWR from "swr";
import { Center } from "native-base";
import { FormControl } from "native-base";
import { Input } from "native-base";
import { Link } from "native-base";
import { Button } from "native-base";
import { HStack } from "native-base";
import Header from "../../components/header";
import { Skeleton } from "native-base";

export default function Profile() {
  const fetcher = (...args) => fetch(...args).then((res) => res.json());
  const user_id = localStorage.getItem("user_id");
  const { data, error, isLoading } = useSWR(
    `${process.env.PUBLIC_URL}/cliente?user_id=` + user_id,
    fetcher
  );
  if (error)
    return (
      <>
        <Header></Header>
        <div
          style={{
            marginTop: 20,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          falhou ao carregar
        </div>
      </>
    );
  if (isLoading)
    return (
      <>
        {" "}
        <Header />{" "}
        <div style={{ marginTop: 90 }}>
          <Center w="100%">
            <VStack
              w="90%"
              maxW="400"
              borderWidth="1"
              space={8}
              overflow="hidden"
              rounded="md"
              _dark={{
                borderColor: "coolGray.500",
              }}
              _light={{
                borderColor: "coolGray.200",
              }}
            >
              <Skeleton h="40" />
              <Skeleton.Text px="4" />
              <Skeleton px="4" my="4" rounded="md" startColor="primary.100" />
            </VStack>
          </Center>
          ;
        </div>{" "}
      </>
    );

  return (
    <>
      <Header />
      <Center w="100%">
        <Box safeArea p="2" py="8" w="90%" maxW="290">
          <Heading
            size="lg"
            fontWeight="600"
            color="coolGray.800"
            _dark={{
              color: "warmGray.50",
            }}
          >
            Bem vindo
          </Heading>
          <Heading
            mt="1"
            _dark={{
              color: "warmGray.200",
            }}
            color="coolGray.600"
            fontWeight="medium"
            size="xs"
          >
            Atualize seu Perfil!
          </Heading>

          <VStack space={3} mt="5">
            <FormControl>
              <FormControl.Label>Email</FormControl.Label>
              <Input value={data.email} />
            </FormControl>

            <FormControl>
              <FormControl.Label>Nome</FormControl.Label>
              <Input value={data.nome} type="text" />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
              ></Link>
            </FormControl>

            <FormControl>
              <FormControl.Label>Telefone</FormControl.Label>
              <Input value={data.telefone} type="text" />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
              ></Link>
            </FormControl>
            <FormControl>
              <FormControl.Label>CPF</FormControl.Label>
              <Input value={data.cpf} type="text" />
              <Link
                _text={{
                  fontSize: "xs",
                  fontWeight: "500",
                  color: "indigo.500",
                }}
                alignSelf="flex-end"
                mt="1"
              ></Link>
            </FormControl>

            <Button mt="2" colorScheme="indigo">
              Salvar
            </Button>
            <HStack mt="6" justifyContent="center">
              <Text
                fontSize="sm"
                color="coolGray.600"
                _dark={{
                  color: "warmGray.200",
                }}
              ></Text>
              <Link
                _text={{
                  color: "indigo.500",
                  fontWeight: "medium",
                  fontSize: "sm",
                }}
                href="#"
              ></Link>
            </HStack>
          </VStack>
        </Box>
      </Center>
    </>
  );
}
