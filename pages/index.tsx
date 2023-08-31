import React from "react";
import {
  Container,
  Box,
  ChakraProvider,
  CSSReset,
  extendTheme,
  Flex,
} from "@chakra-ui/react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Accordion from "../components/Accordion";
//import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer";
import ServiceComponent from "/Users/utkarshkhanna/Downloads/tantransha-boilerplate-feature/components/ServiceComponent.jsx";

const Index = () => {
  console.log("in index component");
  return (
    <Box>
      <Flex direction={"column"}>
        <Header />
        <Container maxW="container.xl" px={[4, 6, 10]} py={8}>
          <Banner />

          <Accordion />
          {/* <ContactUs /> */}
        </Container>
        <Footer />
      </Flex>
    </Box>
  );
};

export default Index;
