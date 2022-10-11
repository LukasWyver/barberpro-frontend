import Head from "next/head";
import Link from "next/link";
import { Button, Flex, Heading, Text, useMediaQuery } from "@chakra-ui/react";
import { Sidebar } from "../../components/sidebar";
import { FiChevronLeft } from "react-icons/fi";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";

interface PlanosProps {
  premium: boolean;
}

export default function Planos({ premium }: PlanosProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");
  const [isTablet] = useMediaQuery("(max-width: 900px)");

  return (
    <>
      <Head>
        <title>BarberPRO - Sua assinatura Premium</title>
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
            <Link href="/profile">
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
              Planos
            </Heading>
          </Flex>

          <Flex
            pb={8}
            maxW="780px"
            w="100%"
            direction="column"
            align="flex-start"
            justify="flex-start"
          >
            <Flex
              w="100%"
              gap={isTablet ? 2 : 4}
              direction={isMobile ? "column" : "row"}
            >
              <Flex
                p={2}
                flex={1}
                rounded={4}
                bg="barber.400"
                direction="column"
              >
                <Heading
                  mt={2}
                  mb={4}
                  fontSize="2xl"
                  color="gray.100"
                  textAlign="center"
                  fontWeight="bold"
                >
                  Plano Grátis
                </Heading>
                <Text
                  fontWeight={isTablet ? "normal" : "medium"}
                  ml={isTablet ? 2 : 4}
                  mb={2}
                  color="gray.200"
                >
                  • Registrar cortes.
                </Text>
                <Text
                  fontWeight={isTablet ? "normal" : "medium"}
                  ml={isTablet ? 2 : 4}
                  mb={2}
                  color="gray.200"
                >
                  • Criar apenas 3 modelos.
                </Text>
                <Text
                  fontWeight={isTablet ? "normal" : "medium"}
                  ml={isTablet ? 2 : 4}
                  mb={2}
                  color="gray.200"
                >
                  • Editar seu perfil.
                </Text>
              </Flex>

              <Flex
                p={2}
                flex={1}
                minW={235}
                rounded={4}
                bg="barber.400"
                direction="column"
              >
                <Heading
                  mt={2}
                  mb={4}
                  fontSize="2xl"
                  color="#31fb6a"
                  textAlign="center"
                  fontWeight="bold"
                >
                  Premium
                </Heading>
                <Text
                  fontWeight={isTablet ? "normal" : "medium"}
                  ml={isTablet ? 2 : 4}
                  mb={2}
                  color="gray.200"
                >
                  • Registrar cortes ilimitados.
                </Text>
                <Text
                  fontWeight={isTablet ? "normal" : "medium"}
                  ml={isTablet ? 2 : 4}
                  mb={2}
                  color="gray.200"
                >
                  • Criar modelos ilimitados.
                </Text>
                <Text
                  fontWeight={isTablet ? "normal" : "medium"}
                  ml={isTablet ? 2 : 4}
                  mb={2}
                  color="gray.200"
                >
                  • Editar seu perfil.
                </Text>
                <Text
                  fontWeight={isTablet ? "normal" : "medium"}
                  ml={isTablet ? 2 : 4}
                  mb={2}
                  color="gray.200"
                >
                  • Editar tipos de corte.
                </Text>

                <Text
                  fontWeight={isTablet ? "normal" : "medium"}
                  ml={isTablet ? 2 : 4}
                  mb={2}
                  color="gray.200"
                >
                  • Recebe todas atualizações.
                </Text>

                <Flex align="center" justify="center" mx={4} mb={2}>
                  <Text
                    mr={4}
                    color="white"
                    fontWeight={isTablet ? "bold" : "semibold"}
                  >
                    por apenas
                  </Text>

                  <Text fontSize="2xl" fontWeight="bold" color="#31db6a">
                    R$ 9,90
                  </Text>
                </Flex>
                {premium ? (
                  <>
                    <Button
                      m={2}
                      size="lg"
                      color="white"
                      bg="barber.900"
                      cursor="default"
                      _hover={{ bg: "barber.900" }}
                      _active={{ color: "gray.200" }}
                    >
                      VOCÊ JÁ É PREMIUM
                    </Button>

                    <Button
                      m={2}
                      size="lg"
                      bg="white"
                      color="gray.900"
                      _hover={{ bg: "gray.200" }}
                      _active={{ color: "gray.800" }}
                    >
                      ALTERAR ASSINATURA
                    </Button>
                  </>
                ) : (
                  <Button
                    m={2}
                    size="lg"
                    bg="button.cta"
                    color="gray.900"
                    _hover={{ bg: "#ffb13e" }}
                    _active={{ color: "gray.800" }}
                  >
                    VIRAR PREMIUM
                  </Button>
                )}
              </Flex>
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

    return {
      props: {
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
