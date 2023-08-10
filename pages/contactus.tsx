import { Box, Center, VStack } from '@chakra-ui/react';
import { useState } from 'react';
import Header from '../components/Header';
import ContactUs from '../components/ContactUs';
import ContactQueries from '../components/ContactQueries';

const ContactUsPage = () => {
  const [showContactQueries, setShowContactQueries] = useState(false);

  const handleFormSubmit = async (data) => {
    console.log("handleFormSubmit on page", data);
    setShowContactQueries(true);
  };

  return (
    <Box>
      <Header />
      <Center>
        <VStack spacing={4} align="start" p={4}>
          {!showContactQueries ? (
            <ContactUs onSubmit={handleFormSubmit} />
          ) : (
            <ContactQueries />
          )}
        </VStack>
      </Center>
    </Box>
  );
};

export default ContactUsPage;
