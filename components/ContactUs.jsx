import { useState } from 'react';
import {
  Box,
  Button,
  Center,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useSession } from 'next-auth/react';
import contactUsController from '../lib/clientSideControllers/contactUsController';
import { useForm } from 'react-hook-form';

const ContactUs = ({ onSubmit }) => {
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const { handleSubmit, register, formState: { errors } } = useForm();
  const [error, setError] = useState(null);

  const handleFormSubmit = async (data) => {
    if (!session) {
      setError('Please sign in to submit the form.');
      return;
    }

    setIsLoading(true);

    try {
      const senderId = session.user.id;
      await contactUsController.addCreateContactUs(senderId, data);
      console.log(" in contactus component fb operation completed");
      // Reset form fields
      onSubmit();
    } catch (error) {
      console.log('contact us error', JSON.stringify(error));
      setError('An error occurred while submitting the form. Please try again later.');
    }

    setIsLoading(false);
  };

  return (
    <Center>
      <VStack spacing={4} align="start" p={4}>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <FormControl id="message" isRequired>
            <FormLabel>Message</FormLabel>
            <Input type="text" {...register('message', { required: true })} />
            {errors.message && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
          <FormControl id="name" isRequired>
            <FormLabel>Name</FormLabel>
            <Input type="text" {...register('name', { required: true })} />
            {errors.name && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
          <FormControl id="phoneNumber" isRequired>
            <FormLabel>Phone Number</FormLabel>
            <Input type="text" {...register('phoneNumber', { required: true })} />
            {errors.phoneNumber && <FormErrorMessage>This field is required</FormErrorMessage>}
          </FormControl>
          {error && <p>{error}</p>}
          <Button type="submit" isLoading={isLoading} disabled={!session || status === 'loading'}>
            Submit
          </Button>
        </form>
      </VStack>
    </Center>
  );
};

export default ContactUs;
