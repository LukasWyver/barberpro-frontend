import React, { useState, ChangeEvent } from "react";
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
import { canSSRAuth } from "../../utils/canSSRAuth";
import { setupAPIClient } from "../../services/api";

interface HaircutsItem {
  id: string;
  name: string;
  price: number | string;
  status: boolean;
  user_id: string;
}

interface HaircutsProps {
  haircuts: HaircutsItem[];
}

export default function Haircuts({ haircuts }: HaircutsProps) {
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  const [haircutList, setHaircutList] = useState<HaircutsItem[]>(
    haircuts || []
  );

  const [disableHaircut, setDisableHaircut] = useState("enabled");

  async function handleDisable(e: ChangeEvent<HTMLInputElement>) {
    const apiClient = setupAPIClient();

    if (e.target.value === "disabled") {
      setDisableHaircut("enabled");
      const response = await apiClient.get("/haircuts", {
        params: {
          status: true,
        },
      });

      setHaircutList(response.data);
    } else {
      setDisableHaircut("disabled");
      const response = await apiClient.get("/haircuts", {
        params: {
          status: false,
        },
      });

      setHaircutList(response.data);
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
                _active={{ bg: "gray.600" }}
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
              <Switch
                value={disableHaircut}
                isChecked={disableHaircut === "disabled" ? false : true}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  handleDisable(e)
                }
                colorScheme="green"
                size="lg"
              />
            </Stack>
          </Flex>

          {haircutList.map((haircut) => (
            <Link key={haircut.id} href={`/haircuts/${haircut.id}`}>
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
                    {haircut.name}
                  </Text>
                </Flex>

                <Text fontWeight="bold" color="white">
                  R$ {haircut.price}
                </Text>
              </Flex>
            </Link>
          ))}
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
