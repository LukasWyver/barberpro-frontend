import { useState, ChangeEvent } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Flex,
  Text,
  Heading,
  Button,
  useMediaQuery,
  InputGroup,
  InputLeftElement,
  Input,
  FormHelperText,
  FormControl,
  Stack,
  Switch,
  useToast,
} from "@chakra-ui/react";
import { Sidebar } from "../../components/sidebar";
import { FiChevronLeft, FiScissors } from "react-icons/fi";
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";

interface HaircutProps {
  id: string;
  name: string;
  price: string | number;
  status: boolean;
  user_id: string;
}

interface SubscriptionProps {
  id: string;
  status: string;
}

interface EditHaircutProps {
  haircut: HaircutProps;
  subscription: SubscriptionProps | null;
}

export default function EditHaircut({
  haircut,
  subscription,
}: EditHaircutProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [name, setName] = useState(haircut?.name);
  const [price, setPrice] = useState(haircut?.price);
  const [status, setStatus] = useState(haircut?.status);

  const toast = useToast();

  const [disableHaircut, setDisableHaircut] = useState(
    haircut?.status ? "disabled" : "enabled"
  );

  function handleDisable(e: ChangeEvent<HTMLInputElement>) {
    if (e.target.value === "disabled") {
      setDisableHaircut("enabled");
      setStatus(false);
    } else {
      setDisableHaircut("disabled");
      setStatus(true);
    }
  }

  async function handleUpdate() {
    if (name === "" || price === "") {
      return;
    }

    try {
      const apiClient = setupAPIClient();
      await apiClient.put("/haircut", {
        name: name,
        price: Number(price),
        status: status,
        haircut_id: haircut?.id,
      });

      // alert: sucesso
      toast({
        title: "Eba, sempre no estilo!",
        description: `${name} atualizado com sucesso.`,
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
        description: `${name} não foi atualizado!`,
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
        <title>Editando modelo de corte - BarberPRO</title>
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
            justifyContent="flex-start"
            direction={isMobile ? "column" : "row"}
            alignItems={isMobile ? "flex-start" : "center"}
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
              fontSize={isMobile ? "22px" : "3xl"}
            >
              Editar corte
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
              Editar modelo
            </Heading>

            <Flex w="85%" direction="column">
              <InputGroup mb={3}>
                <InputLeftElement
                  pointerEvents="none"
                  color="barber.100"
                  fontSize="1.2em"
                  pt={2}
                >
                  <FiScissors />
                </InputLeftElement>
                <Input
                  size="lg"
                  type="text"
                  value={name}
                  color="white"
                  bg="gray.900"
                  borderColor="gray.800"
                  placeholder="Nome do corte"
                  _hover={{ borderColor: "gray.700" }}
                  onChange={(e) => setName(e.target.value)}
                  isReadOnly={subscription?.status !== "active"}
                />
              </InputGroup>

              <InputGroup mb={4}>
                <FormControl>
                  <InputLeftElement
                    pt={2}
                    color="barber.100"
                    fontSize="1.2em"
                    pointerEvents="none"
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
                    isReadOnly={subscription?.status !== "active"}
                  />
                  <FormHelperText fontSize={isMobile ? "12px" : "md"}>
                    utilize &#00698; ponto &#00698; ao invés de &#00698; vírgula
                    &#00698;
                  </FormHelperText>
                </FormControl>
              </InputGroup>

              <Stack mb={6} align="center" direction="row">
                <Text color="white" fontWeight="bold">
                  Desativar corte
                </Text>
                <Switch
                  size="md"
                  colorScheme="red"
                  value={disableHaircut}
                  isReadOnly={subscription?.status !== "active"}
                  opacity={subscription?.status !== "active" ? 0.6 : 1}
                  isChecked={disableHaircut === "disabled" ? false : true}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    handleDisable(e)
                  }
                />
              </Stack>

              <Button
                mb={6}
                w="100%"
                size="lg"
                bg="button.cta"
                color="gray.900"
                onClick={handleUpdate}
                _hover={{ bg: "#ffb13e" }}
                _active={{ color: "gray.800" }}
                disabled={subscription?.status !== "active"}
              >
                Salvar
              </Button>

              {subscription?.status !== "active" && (
                <Flex
                  direction={isMobile ? "column" : "row"}
                  align="center"
                  justifyContent="center"
                >
                  <Link href="/planos">
                    <Text
                      fontWeight="bold"
                      color="#31FB6A"
                      cursor="pointer"
                      mr={1}
                      fontSize={isMobile ? "14px" : "md"}
                    >
                      seja premium
                    </Text>
                  </Link>
                  <Text color="white" fontSize={isMobile ? "12px" : "md"}>
                    e tenha todos os acessos liberados
                  </Text>
                </Flex>
              )}
            </Flex>
          </Flex>
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  const { id } = ctx.params;

  try {
    const apiClient = setupAPIClient(ctx);
    const check = await apiClient.get("/haircut/check");
    const response = await apiClient.get("/haircut/detail", {
      params: {
        haircut_id: id,
      },
    });

    return {
      props: {
        haircut: response.data,
        subscription: check.data?.subscriptions,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      redirect: {
        destination: "/haircuts",
        permanent: false,
      },
    };
  }
});
