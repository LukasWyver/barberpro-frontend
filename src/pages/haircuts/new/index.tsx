import Head from "next/head";
import Link from "next/link";
import { Sidebar } from "../../../components/sidebar";
import {
  Button,
  Flex,
  Heading,
  Input,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { FiChevronLeft } from "react-icons/fi";

export default function NewHaircut() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

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
            <Input
              mb={3}
              w="85%"
              size="lg"
              type="text"
              color="white"
              bg="gray.900"
              borderColor="gray.800"
              placeholder="Nome do corte"
              _hover={{ borderColor: "gray.700" }}
            />
            <Input
              mb={4}
              w="85%"
              size="lg"
              type="text"
              color="white"
              bg="gray.900"
              borderColor="gray.800"
              placeholder="Valor do corte ex: R$ 59,90"
              _hover={{ borderColor: "gray.700" }}
            />

            <Button
              mb={6}
              w="85%"
              size="lg"
              color="gray.900"
              bg="button.cta"
              _hover={{ bg: "#ffb13e" }}
            >
              Cadastrar
            </Button>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}
