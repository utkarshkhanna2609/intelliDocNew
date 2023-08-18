import React, { useState, useRef, useEffect } from "react";
import { Box, Image, Text, Input, Button, Center } from "@chakra-ui/react";
import handleUserInput from "./UserInputHandler";
import UserInputForm from "./UserInputForm";
import Typed from "typed.js";

const Banner = () => {
  const [response, setResponse] = useState("Hello there");
  const typedRef = useRef(null);

  const handleUserInput = async (userInput) => {
    console.log("User input submitted:", userInput);

    try {
      const res = await fetch("/api/query", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: userInput }),
      });

      console.log("Response status:", res.status);

      if (res.ok) {
        const data = await res.json();
        console.log("Response data:", data);
        setResponse(data.response);
      } else {
        console.log("Error:", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    if (typedRef.current) {
      typedRef.current.destroy();
    }
    typedRef.current = new Typed("#typed-text", {
      strings: [response],
      typeSpeed: 10,
    });

    // Clean up the instance on unmount
    return () => {
      typedRef.current.destroy();
    };
  }, [response]);

  return (
    <>
      <Box
        position="relative"
        height={{ base: "240px", md: "320px", lg: "400px", xl: "480px" }}
        mb={{ base: 8, md: 12, lg: 16 }}
      >
        <Image
          src="d6ab785d-f3ee-4e15-859f-0f48bb36d5af.png"
          alt="banner"
          objectFit="cover"
          objectPosition="50% -140px"
          width="100%"
          height="100%"
          zIndex="-1"
        />
        <Box
          position="absolute"
          bottom={{ base: "0", md: "40px", lg: "80px", xl: "120px" }}
          left={{ base: "0", md: "40px", lg: "80px", xl: "120px" }}
          width={{
            base: "calc(100% - 80px)",
            md: "calc(100% - 160px)",
            lg: "50%",
          }}
          color="white"
          zIndex="1"
        >
          <Text
            color="white"
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl", xl: "5xl" }}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.9)" 
          >
            Welcome to the IntelliMed!
          </Text>
          <Text
            color="white"
            fontStyle="italic"
            fontSize={{ base: "lg", md: "xl", lg: "2xl", xl: "3xl" }}
            mt={2}
            textShadow="2px 2px 4px rgba(0, 0, 0, 0.8)" 
          >
            Ask about health concerns.
          </Text>
        </Box>
      </Box>

      <Box 
        borderRadius="30px"
        boxShadow="sm"
        p={4} width="100%" backgroundColor="gray.100">
        <UserInputForm handleUserInput={handleUserInput} />
        {/* Use an element with id "typed-text" for Typed.js */}
        <Text mt={4} fontSize="lg" id="typed-text" />
      </Box>
    </>
  );
};

export default Banner;
