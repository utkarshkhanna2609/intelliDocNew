import { useEffect, useState } from 'react';
import { Box, Table, Tbody, Td, Th, Thead, Tr, VStack } from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import contactUsController from '../lib/clientSideControllers/contactUsController';

const ContactQueries = () => {
  const { data: session, status } = useSession();
  const [contactQueries, setContactQueries] = useState([]);

  useEffect(() => {
    const fetchContactQueries = async () => {
      if (session) {
        try {
          const queries = await contactUsController.getAllContactQueries();
          console.log("alll queries",queries );
          setContactQueries(queries);
        } catch (error) {
          console.log('Error fetching contact queries:', error);
        }
      }
    };

    fetchContactQueries();
  }, [session]);

  return (
    <VStack spacing={4} align="start">
      {!session || status === 'loading' ? (
        <Box>Please sign in to view contact queries.</Box>
      ) : (
        <Box>
          <Table>
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Message</Th>
                <Th>Phone Number</Th>
              </Tr>
            </Thead>
            <Tbody>
              {contactQueries.map((query) => (
                <Tr key={query.messageID}>
                  <Td>{query.name}</Td>
                  <Td>{query.message}</Td>
                  <Td>{query.phoneNumber}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </VStack>
  );
};

export default ContactQueries;
