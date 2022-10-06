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

export default function Register() {
  const { signUp } = useContext(AuthContext);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);

  async function handleRegister() {
    if (name === "" || email === "" || password === "") {
      alert("revise todos os campos não preenchidos!");
      return;
    }

    await signUp({
      name,
      email,
      password,
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
            color="white"
            variant="filled"
            value={name}
            onChange={(e) => setName(e.target.value)}
            background="barber.400"
            placeholder="Nome da barbearia"
            focusBorderColor="barber.100"
            _hover={{ bg: "barber.400" }}
          />

          <Input
            size="lg"
            type="email"
            color="white"
            variant="filled"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            background="barber.400"
            placeholder="email@email.com"
            focusBorderColor="barber.100"
            mb={3}
            _hover={{ bg: "barber.400" }}
          />

          <InputGroup size="lg" mb={6}>
            <Input
              pr="4.5rem"
              color="white"
              variant="filled"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              background="barber.400"
              focusBorderColor="barber.100"
              type={show ? "text" : "password"}
              placeholder="Cadastrar uma senha"
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
            mb={6}
            size="lg"
            color="gray.900"
            onClick={handleRegister}
            background="button.cta"
            _hover={{ bg: "#ffb13e" }}
          >
            Cadastrar
          </Button>

          <Center mt={2}>
            <Link href="/login">
              <Text color="white" cursor="pointer">
                Já possui uma conta? <strong>Faça login</strong>
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
