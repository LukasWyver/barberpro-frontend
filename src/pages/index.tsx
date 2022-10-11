import Head from "next/head";
import { Flex, Text } from "@chakra-ui/react";
import { canSSRGuest } from "../utils/canSSRGuest";

export default function Home() {
  return (
    <>
      <Head>
        <title>BarberPRO - Seu sistema completo</title>
      </Head>

      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Text fontSize={30}>Página Teste</Text>
      </Flex>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
