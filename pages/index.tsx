import React from "react";
import { Container, Box } from "@chakra-ui/react";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Accordion from "../components/Accordion";
//import ContactUs from "../components/ContactUs"
import Footer from "../components/Footer";

const Index = () => {
  console.log("in index component");
  return (
    <Box>
      <Header />
     <Container maxW="container.xl" px={[4, 6, 10]} py={8}>
        <Banner />
        <Accordion />
        {/* <ContactUs /> */}

      </Container>
      <Footer /> 
    </Box>
  );
};

export default Index;
