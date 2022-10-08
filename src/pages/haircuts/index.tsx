import Head from "next/head";
import Link from "next/link";
import {
  Button,
  Flex,
  Heading,
  Stack,
  Switch,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { Sidebar } from "../../components/sidebar";
import { IoMdPricetag } from "react-icons/io";

export default function Haircuts() {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

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
            <Heading
              my={4}
              mr={4}
              color="orange.900"
              fontSize={isMobile ? "28px" : "3xl"}
            >
              Modelos de corte
            </Heading>

            <Link href="/haircuts/new">
              <Button
                mr={4}
                bg="gray.700"
                color="white"
                _hover={{ bg: "gray.600" }}
              >
                Cadastrar novo
              </Button>
            </Link>

            <Stack
              ml="auto"
              align="center"
              justifyContent="flex-end"
              direction="row"
            >
              <Text color="white" fontWeight="bold">
                ATIVOS
              </Text>
              <Switch colorScheme="green" size="lg" />
            </Stack>
          </Flex>

          <Link href="/haircuts/123">
            <Flex
              p={4}
              mb={2}
              mt={2}
              w="100%"
              rounded={4}
              bg="barber.400"
              direction={isMobile ? "column" : "row"}
              align={isMobile ? "flex-start" : "center"}
              cursor="pointer"
              justifyContent="space-between"
            >
              <Flex
                mb={isMobile ? 2 : 0}
                direction="row"
                alignItems="center"
                justifyContent="center"
              >
                <IoMdPricetag size={28} color="#fba931" />
                <Text fontWeight="bold" ml={4} color="white" noOfLines={2}>
                  Corte Completo
                </Text>
              </Flex>

              <Text fontWeight="bold" color="white">
                R$ 59.90
              </Text>
            </Flex>
          </Link>
        </Flex>
      </Sidebar>
    </>
  );
}
