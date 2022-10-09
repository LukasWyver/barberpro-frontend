import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { Sidebar } from "../../../components/sidebar";
import {
  Button,
  Flex,
  FormControl,
  FormHelperText,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { FiChevronLeft, FiScissors } from "react-icons/fi";
import { canSSRAuth } from "../../../utils/canSSRAuth";
import { setupAPIClient } from "../../../services/api";

interface NewHaircutProps {
  subscription: boolean;
  count: number;
}

export default function NewHaircut({ subscription, count }: NewHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTablet] = useMediaQuery("(max-width: 900px)");

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");

  const toast = useToast();

  async function handleRegister() {
    if (name === "" || price === "") {
      // alert: erro!
      toast({
        title: "Ops, ...verifique!",
        description: `Erro ao cadastrar este corte!`,
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
      await apiClient.post("/haircut", {
        name: name,
        price: Number(price),
      });

      // alert: sucesso
      toast({
        title: "Eba, um novo corte!",
        description: `${name} adicionado com sucesso.`,
        status: "success",
        position: "top",
        size: "sm",
        duration: 3000,
        isClosable: true,
      });

      Router.push("/haircuts");
    } catch (err) {
      console.log(err);

      // alert: erro!
      toast({
        title: "Ops, ...verifique!",
        description: `Erro ao cadastrar este corte!`,
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
        <title>BarberPRO - Novo modelo de corte</title>
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
            mb={isMobile ? 4 : 0}
            direction={isMobile ? "column" : "row"}
            align={isMobile ? "flex-start" : "center"}
          >
            <Link href="/haircuts">
              <Button
                p={4}
                mr={4}
                display="flex"
                bg="gray.700"
                color="white"
                alignItems="center"
                justifyContent="center"
                _hover={{ bg: "gray.600" }}
                _active={{ bg: "gray.600" }}
              >
                <FiChevronLeft size={24} color="white" />
                Voltar
              </Button>
            </Link>
            <Heading
              my={4}
              mr={4}
              color="orange.900"
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Modelos de corte
            </Heading>
          </Flex>

          <Flex
            py={8}
            w="100%"
            maxW="700px"
            align="center"
            bg="barber.400"
            justify="center"
            direction="column"
          >
            <Heading mb={4} color="white" fontSize={isMobile ? "22px" : "3xl"}>
              Cadastrar modelo
            </Heading>
            <InputGroup w="85%">
              <InputLeftElement
                pointerEvents="none"
                color="barber.100"
                fontSize="1.2em"
                pt={2}
              >
                <FiScissors />
              </InputLeftElement>
              <Input
                mb={3}
                size="lg"
                type="text"
                value={name}
                color="white"
                bg="gray.900"
                borderColor="gray.800"
                placeholder="Nome do corte"
                _hover={{ borderColor: "gray.700" }}
                onChange={(e) => setName(e.target.value)}
                _placeholder={{ opacity: 0.5, color: "gray.500" }}
              />
            </InputGroup>
            <InputGroup w="85%">
              <FormControl>
                <InputLeftElement
                  pointerEvents="none"
                  color="barber.100"
                  fontSize="1.2em"
                  pt={2}
                >
                  R$
                </InputLeftElement>

                <Input
                  pl={10}
                  size="lg"
                  type="number"
                  value={price}
                  color="white"
                  bg="gray.900"
                  borderColor="gray.800"
                  placeholder="Preço do corte"
                  _hover={{ borderColor: "gray.700" }}
                  onChange={(e) => setPrice(e.target.value)}
                  _placeholder={{ opacity: 0.5, color: "gray.500" }}
                />
                <FormHelperText mb={4}>
                  utilize &#00698; ponto &#00698; ao invés de &#00698; vírgula
                  &#00698;
                </FormHelperText>
              </FormControl>
            </InputGroup>
            <Button
              mb={6}
              w="85%"
              size="lg"
              color="gray.900"
              bg="button.cta"
              onClick={handleRegister}
              _hover={{ bg: "#ffb13e" }}
              _active={{ color: "gray.800" }}
              disabled={!subscription && count >= 3 ? true : false}
            >
              Cadastrar
            </Button>
            {!subscription && count >= 3 && (
              <Flex
                align="center"
                justifyContent="center"
                direction={isTablet ? "column" : "row"}
              >
                <Text color="white" fontSize={isMobile ? "12px" : "md"}>
                  Você atingiu seu limite de corte,
                </Text>
                <Link href="/planos">
                  <Text
                    fontWeight="bold"
                    color="#31FB6A"
                    cursor="pointer"
                    mx={1}
                    fontSize={isMobile ? "14px" : "md"}
                  >
                    seja premium
                  </Text>
                </Link>
                <Text color="white" fontSize={isMobile ? "12px" : "md"}>
                  {" "}
                  e tenha acesso ilimitado.
                </Text>
              </Flex>
            )}
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/haircut/check");
    const count = await apiClient.get("/haircut/count");

    return {
      props: {
        subscription:
          response.data?.subscriptions?.status === "active" ? true : false,
        count: count.data,
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
