import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import {
  Button,
  Flex,
  Heading,
  Text,
  Link as ChakraLink,
  useMediaQuery,
} from "@chakra-ui/react";
import { IoMdPerson } from "react-icons/io";

import { canSSRAuth } from "../../utils/canSSRAuth";
import { Sidebar } from "../../components/sidebar";
import { setupAPIClient } from "../../services/api";

export interface ScheduleItem {
  id: string;
  customer: string;
  haircut: {
    id: string;
    name: string;
    price: string | number;
    user_id: string;
  };
}

interface DashboardProps {
  schedule: ScheduleItem[];
}

export default function Dashboard({ schedule }: DashboardProps) {
  const [list, setList] = useState(schedule);
  const [isMobile] = useMediaQuery("(max-width: 500px)");

  return (
    <>
      <Head>
        <title>BarberPRO - Minha barbearia</title>
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
            <Heading fontSize="3xl" my={4} mr={4} color="orange.900">
              Agenda
            </Heading>

            <Link href="/new">
              <Button
                mr={4}
                bg="gray.700"
                color="white"
                _hover={{ bg: "gray.600" }}
                _active={{ bg: "gray.600" }}
              >
                Registrar
              </Button>
            </Link>
          </Flex>

          {list.map((item) => (
            <ChakraLink
              key={item?.id}
              m={0}
              p={0}
              mt={0}
              w="100%"
              bg="transparent"
              style={{ textDecoration: "none" }}
            >
              <Flex
                p={4}
                mb={3}
                w="100%"
                rounded={4}
                bg="barber.400"
                justify="space-between"
                direction={isMobile ? "column" : "row"}
                align={isMobile ? "flex-start" : "center"}
              >
                <Flex
                  align="center"
                  direction="row"
                  justify="flex-start"
                  mb={isMobile ? 2 : 0}
                  w={isMobile ? "100%" : "50%"}
                >
                  <IoMdPerson size={28} color="#fba931" />
                  <Text color="white" fontWeight="bold" ml={4} noOfLines={1}>
                    {item?.customer}
                  </Text>
                </Flex>

                <Flex
                  w={isMobile ? "100%" : "50%"}
                  direction={isMobile ? "column" : "row"}
                >
                  <Text
                    color="white"
                    noOfLines={1}
                    fontWeight="bold"
                    mb={isMobile ? 2 : 0}
                  >
                    {item?.haircut?.name}
                  </Text>

                  <Text color="white" fontWeight="bold" mb={isMobile ? 2 : 0}>
                    R$ {item?.haircut?.price}
                  </Text>
                </Flex>
              </Flex>
            </ChakraLink>
          ))}
        </Flex>
      </Sidebar>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
  try {
    const apiClient = setupAPIClient(ctx);
    const response = await apiClient.get("/schedule");

    return {
      props: {
        schedule: response.data,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        schedule: [],
      },
    };
  }
});
