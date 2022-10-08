import React, { useContext, useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Text,
  Heading,
  Box,
  Input,
  Button,
  useToast,
} from "@chakra-ui/react";
import { Sidebar } from "../../components/sidebar";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { AuthContext } from "../../context/AuthContext";
import { setupAPIClient } from "../../services/api";

interface UserProps {
  id: string;
  name: string;
  email: string;
  endereco: string | null;
}

interface ProfileProps {
  user: UserProps;
  premium: boolean;
}

export default function Profile({ user, premium }: ProfileProps) {
  const { logoutUser } = useContext(AuthContext);
  const toast = useToast();

  const [name, setName] = useState(user && user?.name);
  const [endereco, setEndereco] = useState(
    user?.endereco ? user?.endereco : ""
  );

  async function handleLogout() {
    await logoutUser();
  }

  async function handleUpdateUser() {
    if (name === "") {
      // alert: erro!
      toast({
        title: "Ops, ...verifique!",
        description: `Seu cadastro não foi atualizado!`,
        status: "warning",
        position: "top",
        size: "sm",
        duration: 3000,
        isClosable: true,
      });

      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.put("/users", {
        name: name,
        endereco: endereco,
      });

      // alert: sucesso
      toast({
        title: "Eba, mandou bem!",
        description: `Cadastro atualizado com sucesso.`,
        status: "success",
        position: "top",
        size: "sm",
        duration: 3000,
        isClosable: true,
      });
    } catch (err) {
      console.log(err);

      // alert: erro!
      toast({
        title: "Ops, ...verifique!",
        description: `Seu cadastro não foi atualizado!`,
        status: "warning",
        position: "top",
        size: "sm",
        duration: 3000,
        isClosable: true,
      });
    }
  }

  return (
    <>
      <Head>
        <title>Minha Conta - BarberPRO</title>
      </Head>
      <Sidebar>
        <Flex
          mx={4}
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            w="100%"
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
          >
            <Heading fontSize="3xl" mt={4} mb={4} mr={4} color="orange.900">
              Minha Conta
            </Heading>
          </Flex>

          <Flex
            py={8}
            w="100%"
            maxW="700px"
            bg="barber.400"
            direction="column"
            alignItems="center"
            justifyContent="center"
          >
            <Flex direction="column" w="85%">
              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Nome da barbearia:
              </Text>
              <Input
                mb={3}
                w="100%"
                size="lg"
                type="text"
                color="white"
                bg="gray.900"
                borderColor="gray.800"
                placeholder="Nome da sua barbearia"
                _hover={{ borderColor: "gray.700" }}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />

              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Endereço:
              </Text>
              <Input
                mb={3}
                w="100%"
                size="lg"
                type="text"
                color="white"
                bg="gray.900"
                borderColor="gray.800"
                placeholder="Endereço da barbearia"
                _hover={{ borderColor: "gray.700" }}
                onChange={(e) => setEndereco(e.target.value)}
                value={endereco}
              />

              <Text mb={2} fontSize="xl" fontWeight="bold" color="white">
                Plano atual:
              </Text>

              <Flex
                p={1}
                mb={3}
                w="100%"
                rounded={6}
                borderWidth={1}
                direction="row"
                bg="barber.900"
                alignItems="center"
                borderColor="gray.700"
                justifyContent="space-between"
              >
                <Text
                  p={2}
                  color={premium ? "orange.900" : "#4dffb4"}
                  fontSize="lg"
                  fontWeight="semibold"
                >
                  Plano {premium ? "Premium" : "Grátis"}
                </Text>
                <Link href="/planos">
                  <Box
                    p={1}
                    px={2}
                    mr={1}
                    rounded={4}
                    color="white"
                    bg="#00cd52"
                    cursor="pointer"
                    fontWeight="semibold"
                  >
                    Mudar de plano
                  </Box>
                </Link>
              </Flex>

              <Button
                mt={3}
                mb={4}
                w="100%"
                size="lg"
                bg="button.cta"
                _hover={{ bg: "#ffb13e" }}
                _active={{ color: "gray.800" }}
                onClick={handleUpdateUser}
              >
                Salvar
              </Button>
              <Button
                mb={6}
                w="100%"
                size="lg"
                bg="transparent"
                borderWidth={2}
                color="red.500"
                borderColor="red.500"
                _hover={{ bg: "transparent" }}
                onClick={handleLogout}
                _active={{
                  color: "red.400",
                }}
              >
                Sair da conta
              </Button>
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/me");

    const user = {
      id: response.data.id,
      name: response.data.name,
      email: response.data.email,
      endereco: response.data?.endereco,
    };

    return {
      props: {
        user: user,
        premium:
          response.data?.subscriptions?.status === "active" ? true : false,
      },
    };
  } catch (err) {
    console.log(err);

    return {
      redirect: {
        destination: "/dashboard",
        permanent: false,
      },
    };
  }
});
