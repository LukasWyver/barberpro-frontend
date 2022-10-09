import React, { useState, ChangeEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import Router from "next/router";
import { Sidebar } from "../../components/sidebar";
import {
  Flex,
  Heading,
  Text,
  Button,
  Input,
  Select,
  useMediaQuery,
  useToast,
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface NewProps {
  haircuts: HaircutProps[];
}

export default function New({ haircuts }: NewProps) {
  const [customer, setCustomer] = useState("");
  const [haircutSelected, setHaircutSelected] = useState(haircuts[0]);

  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const toast = useToast();

  function handleChangeSelect(id: string) {
    const haircutItem = haircuts.find((item) => item.id === id);
    setHaircutSelected(haircutItem);
  }

  async function handleRegister() {
    if (customer === "") {
      // alert: erro!
      toast({
        title: "Ops, ...verifique!",
        description: `O cliente ${customer} não foi adicionado!`,
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
      await apiClient.post("/schedule", {
        customer: customer,
        haircut_id: haircutSelected?.id,
      });

      // alert: sucesso
      toast({
        title: "Eba, um novo cliente!",
        description: `${customer} adicionado com sucesso.`,
        status: "success",
        position: "top",
        size: "sm",
        duration: 3000,
        isClosable: true,
      });

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);

      // alert: erro!
      toast({
        title: "Ops, ...verifique!",
        description: `O cliente ${customer} não foi adicionado!`,
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
        <title>Modelos de corte - Minha barbearia</title>
      </Head>
      <Sidebar>
        <Flex
          mx={4}
          direction="column"
          alignItems="flex-start"
          justifyContent="flex-start"
        >
          <Flex
            mb={0}
            w="100%"
            direction={isMobile ? "column" : "row"}
            alignItems={isMobile ? "flex-start" : "center"}
            justifyContent="flex-start"
          >
            <Link href="/dashboard">
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
              color="white"
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Novo serviço
            </Heading>
          </Flex>

          <Flex
            py={8}
            width="100%"
            maxW="700px"
            align="center"
            bg="barber.400"
            justify="center"
            direction="column"
          >
            <Input
              mb={3}
              w="85%"
              size="lg"
              type="text"
              color="white"
              bg="gray.900"
              value={customer}
              borderColor="gray.800"
              placeholder="Nome do cliente"
              _hover={{ borderColor: "gray.700" }}
              _placeholder={{ opacity: 0.5, color: "gray.500" }}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setCustomer(e.target.value)
              }
            />

            <Select
              mb={3}
              w="85%"
              size="lg"
              bg="gray.900"
              color="white"
              borderColor="gray.800"
              placeholder="Modelo de corte"
              _hover={{ borderColor: "gray.700" }}
              onChange={(e) => handleChangeSelect(e.target.value)}
            >
              {haircuts?.map((item) => (
                <option
                  key={item?.id}
                  value={item?.id}
                  style={{ color: " #000" }}
                >
                  {item?.name}
                </option>
              ))}
            </Select>

            <Button
              mb={6}
              w="85%"
              size="lg"
              bg="button.cta"
              color="gray.900"
              onClick={handleRegister}
              _hover={{ bg: "#ffb13e" }}
              _active={{ color: "gray.800" }}
            >
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/haircuts", {
      params: {
        status: true,
      },
    });

    if (response.data === null) {
      return {
        redirect: {
          destination: "/dashboard",
          permanent: false,
        },
      };
    }

    return {
      props: {
        haircuts: response.data,
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
