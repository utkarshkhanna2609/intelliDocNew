import React, { useState } from "react";
import { Input, Button, Text } from "@chakra-ui/react";

const UserInputForm = ({ handleUserInput }) => {
  const [userInput, setUserInput] = useState("");

  const handleInputChange = (event) => {
    setUserInput(event.target.value);
  };

  const handleSubmit = () => {
    handleUserInput(userInput);
  };

  return (
    <>
      <Text fontSize="xl" fontWeight="bold" mb={2}>
        Enter your input below:
      </Text>
      <Input
        value={userInput}
        onChange={handleInputChange}
        placeholder="Type here..."
        size="md"
      />
      <Button mt={4} onClick={handleSubmit}>
        Submit
      </Button>
    </>
  );
};

export default UserInputForm;
