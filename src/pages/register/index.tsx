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
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../context/AuthContext";
import { canSSRGuest } from "../../utils/canSSRGuest";

export default function Register() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  const toast = useToast();

  async function handleRegister() {
    if (name === "" || email === "" || password === "") {
      // alert: erro!
      toast({
        title: "Ops, ...verifique!",
        description: `revise todos os campos não preenchidos!`,
        status: "warning",
        position: "top",
        size: "sm",
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    await signUp({
      name,
      email,
      password,
    });

    // alert: sucesso
    toast({
      title: "Eba, um novo colega!",
      description: `${name} adicionada com sucesso.`,
      status: "success",
      position: "top",
      size: "sm",
      duration: 3000,
      isClosable: true,
    });
  }

  return (
    <>
      <Head>
        <title>Crie sua conta no BarberPRO</title>
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
            type="text"
            value={name}
            color="white"
            variant="filled"
            background="barber.400"
            _hover={{ bg: "barber.400" }}
            focusBorderColor="barber.100"
            placeholder="Nome da barbearia"
            onChange={(e) => setName(e.target.value)}
            _placeholder={{ opacity: 0.5, color: "gray.500" }}
          />

          <Input
            mb={3}
            size="lg"
            type="email"
            color="white"
            value={email}
            variant="filled"
            background="barber.400"
            _hover={{ bg: "barber.400" }}
            placeholder="email@email.com"
            focusBorderColor="barber.100"
            onChange={(e) => setEmail(e.target.value)}
            _placeholder={{ opacity: 0.5, color: "gray.500" }}
          />

          <InputGroup size="lg" mb={6}>
            <Input
              pr="4.5rem"
              color="white"
              variant="filled"
              value={password}
              background="barber.400"
              focusBorderColor="barber.100"
              _hover={{ bg: "barber.400" }}
              type={show ? "text" : "password"}
              placeholder="Cadastrar uma senha"
              onChange={(e) => setPassword(e.target.value)}
              _placeholder={{ opacity: 0.5, color: "gray.500" }}
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
            mb={6}
            size="lg"
            color="gray.900"
            background="button.cta"
            onClick={handleRegister}
            _hover={{ bg: "#ffb13e" }}
            _active={{ color: "gray.800" }}
          >
            Cadastrar
          </Button>

          <Center mt={2}>
            <Link href="/login">
              <Flex>
                <Text color="white" cursor="pointer">
                  Já possui uma conta?
                </Text>
                <Text
                  ml={1}
                  color="white"
                  cursor="pointer"
                  fontWeight="bold"
                  _hover={{ color: "#ffb13e" }}
                >
                  Faça login
                </Text>
              </Flex>
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
