import React, { useState, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import logoImg from "../../../public/images/logo.svg";
import {
  Button,
  Center,
  Flex,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { canSSRGuest } from "../../utils/canSSRGuest";

export default function Login() {
  const { signIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  async function handleLogin() {
    if (email === "" || password === "") {
      return;
    }
    await signIn({
      email,
      password,
    });
  }

  return (
    <>
      <Head>
        <title>BarberPRO - Faça login para acessar</title>
      </Head>

      <Flex
        background="barber.900"
        height="100vh"
        alignItems="center"
        justifyContent="center"
      >
        <Flex width={640} direction="column" p={14} rounded={8}>
          <Center p={4}>
            <Image
              width={240}
              src={logoImg}
              quality={100}
              objectFit="fill"
              alt="Logo barberpro"
            />
          </Center>
          <Input
            mb={3}
            size="lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            color="white"
            variant="filled"
            background="barber.400"
            placeholder="email@email.com"
            focusBorderColor="barber.100"
            _hover={{ bg: "barber.400" }}
          />

          <InputGroup size="lg" mb={6}>
            <Input
              pr="4.5rem"
              color="white"
              variant="filled"
              background="barber.400"
              focusBorderColor="barber.100"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type={show ? "text" : "password"}
              placeholder="Digite sua senha"
              _hover={{ bg: "barber.400" }}
            />
            <InputRightElement width="4.5rem">
              <button onClick={handleClick}>
                {show ? (
                  <ViewIcon color="barber.100" />
                ) : (
                  <ViewOffIcon color="barber.100" />
                )}
              </button>
            </InputRightElement>
          </InputGroup>

          <Button
            background="button.cta"
            mb={6}
            color="gray.900"
            size="lg"
            _hover={{ bg: "#ffb13e" }}
            onClick={handleLogin}
          >
            Acessar
          </Button>

          <Center mt={2}>
            <Link href="/register">
              <Text color="white" cursor="pointer">
                Ainda não possui conta? <strong>Cadastre-se</strong>
              </Text>
            </Link>
          </Center>
        </Flex>
      </Flex>
    </>
  );
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {},
  };
});
