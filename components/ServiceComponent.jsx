import React from 'react';
import { Box, Flex, Text, Image } from '@chakra-ui/react';

const ServiceComponent = () => {
  return (
    <Flex justifyContent="space-between">
      <Box
        
        w="45%"
        p={4}
        bg="rgb(216, 243, 241)"
        color="black"
        borderRadius="lg"
        boxShadow="md"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' }}
      >
          <Image src="d6ab785d-f3ee-4e15-859f-0f48bb36d5af.png"
            alt="banner"
            objectFit="cover"
            objectPosition="center top"
            width="100%"
            height="320px"
            mt={4}/>
        <Text fontSize="2xl" fontWeight="extrabold" mb={4}>
          AI Powered Medical Assistant
        </Text>
        <Text>
          Our AI-powered medical assistant provides personalized healthcare
          guidance and answers to your health concerns 24/7.
        </Text>
      </Box>
      <Box
        mr={-6}
        w="45%"
        p={4}
        bg="rgb(216, 243, 241)"
        color="black"
        borderRadius="lg"
        boxShadow="md"
        transition="transform 0.2s"
        _hover={{ transform: 'scale(1.02)' } }
      >
          <Image src="006271f2-31a6-47d4-bd32-4b078ff7b051.png"
            alt="banner"
            objectFit="cover"
            objectPosition="center top"
            width="100%"
            height="320px"
            mt={4}/>
        <Text fontSize="2xl" fontWeight="extrabold" mb={4}>
          API Integration & Premium Services
        </Text>
        <Text>
          Seamlessly integrate our medical assistant into your applications
          using our API. Unlock premium features for in-depth health analysis.
        </Text>
      </Box>
    </Flex>
  );
};

export default ServiceComponent;
