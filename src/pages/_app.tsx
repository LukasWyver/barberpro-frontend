import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { extendTheme } from "@chakra-ui/react";

const colors = {
  barber: {
    100: "#c6c6c6",
    400: "#1b1c29",
    900: "#12131b",
  },
  button: {
    cta: "#fba931",
    default: "#fff",
    gray: "#dfdfdf",
    danger: "#ff4040",
  },
  orange: {
    900: "#fba931",
  },
};

const theme = extendTheme({ colors });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Component {...pageProps} />
    </ChakraProvider>
  );
}

export default MyApp;
