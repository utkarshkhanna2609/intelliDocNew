import React, { useState, useRef, useEffect } from "react";
import {
  Box,
  Text,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Image,
  ChakraProvider,
  CSSReset,
} from "@chakra-ui/react";
import { useSession, signIn } from 'next-auth/react';
import UserInputForm from "./UserInputForm";
import Typed from "typed.js";
import ServiceComponent from "/Users/utkarshkhanna/Downloads/tantransha-boilerplate-feature/components/ServiceComponent.jsx";

const Banner = () => {
  const { data: session, status } = useSession();
  const [response, setResponse] = useState("Hello there");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);
  const typedRef = useRef(null);
  const [freeUsageCount, setFreeUsageCount] = useState(0); // For tracking free usage count

  useEffect(() => {
    // On component mount, retrieve usage count from localStorage or initialize to 0 if it doesn't exist
    const count = parseInt(localStorage.getItem("freeUsageCount") || "0");
    setFreeUsageCount(count);
  }, []);

  const handleUserInput = async (userInput) => {
    console.log("User input submitted:", userInput);

    if (freeUsageCount >= 2 && status === 'unauthenticated') {
      setShowSignInModal(true);
      return; // Do not process further if user has already used it twice and isn't authenticated
    }

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
        
        if (status === 'unauthenticated') {
          const newCount = freeUsageCount + 1;
          setFreeUsageCount(newCount);
          localStorage.setItem("freeUsageCount", newCount.toString()); // Save the incremented count to localStorage
        }
      } else {
        console.log("Error:", res.status);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const [buttonStyles, setButtonStyles] = useState({
    backgroundColor: "rgb(45, 210, 200)",
    color: "white",
  });
  const buttonHoverStyles = {
    backgroundColor: "lightblue",
    color: "black",
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
    <div>
      <Box 
        flex={"space-betweem"}>
      <Text
            fontWeight="bold"
            fontSize={{ base: "2xl", md: "3xl", lg: "4xl", xl: "5xl" }}
            mb={2}
          >
            Welcome to IntelliDoc!
          </Text>
          <Text
            fontStyle="italic"
            fontSize={{ base: "lg", md: "xl", lg: "2xl", xl: "3xl" }}
            mb={4}
          >
            Ask about health concerns.
          </Text>
      </Box>
      <Box display="flex">
        {/* Left Side */}
        <Box
          mt={40}
          flex="1"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start" // Align content to the top (left side)
          alignItems="flex-start" // Align content to the start (left side)
          p={2}
        >
          <Text
            fontSize="4xl"
            fontFamily={"Noto Sans,sans-serif"}
            fontWeight="bold"
          >
            Your AI Powered medical assistant!
          </Text>
          <Text fontSize="xl" mb={4}>
            Engage in a conversation with an AI health assistant, generate a
            health report through its assistance, and then verify the report's
            accuracy with a renowned medical professional from both the United
            States and Europe. Upgrade to Premium for exclusive features!
          </Text>
          <Button
            style={buttonStyles}
            onMouseEnter={() => setButtonStyles(buttonHoverStyles)}
            onMouseLeave={() =>
              setButtonStyles({
                backgroundColor: "rgb(45, 210, 200)",
                color: "white",
              })
            }
            size="lg"
            onClick={() => setIsModalOpen(true)}
          >
            Get Premium
          </Button>

          <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader fontWeight={"extrabold"}>Premium Pricing</ModalHeader>
              <ModalBody>
                {/* Add the pricing information and details here */}
                {/* For example: */}
                <Text fontSize="lg">
                  Upgrade to our Premium plan for exclusive features and
                  in-depth health analysis with unlimited chats and access to your previous Chats. 
                  Pricing: $10.99 per month
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button
                  colorScheme="blue"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        </Box>

        {/* Right Side */}
        <Box
          flex="1"
          borderRadius="30px"
          boxShadow="sm"
          p={4}
          backgroundColor=""
          ml={8}
          mb={10}
        >
          
          <Image
            src="74d00baa-0470-4847-afdd-3ba3970b24a4.png"
            alt="banner"
            objectFit="cover"
            objectPosition="50% 40px"
            width="100%"
            height="auto"
            mt={8}
          />
        </Box>
      </Box>
      <Box borderRadius="30px" boxShadow="sm" p={4} backgroundColor="rgb(216, 243, 241)" ml={8} mb={8}>
        {status === 'loading' && <p>Loading...</p>}
        {status === 'authenticated' || (status === 'unauthenticated' && freeUsageCount < 2) ? (
          <UserInputForm handleUserInput={handleUserInput} />
        ) : (
          <>
            {status === 'unauthenticated' && (
              <>
                <Text fontWeight={"extrabold"} color={"red.400"}>PLEASE SIGN IN TO USE</Text>

                <Modal isOpen={showSignInModal} onClose={() => setShowSignInModal(false)}>
                  <ModalOverlay />
                  <ModalContent>
                    <ModalHeader>Please Sign In</ModalHeader>
                    {/* ... (rest of your Modal content) */}
                  </ModalContent>
                </Modal>
              </>
            )}
          </>
        )}
        <Text mt={4} fontSize="lg" id="typed-text" />
      </Box>

      <Box ml={4} mb={8}>
        <ChakraProvider>
          <CSSReset />
          <ServiceComponent />
        </ChakraProvider>
      </Box>
    </div>
  );
};

export default Banner;
