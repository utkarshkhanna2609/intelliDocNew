import React from "react";
import { Image, Box } from "@chakra-ui/react";

const Logo = () => {
  return (
    <Box>
      <Image
        src="/intellidocLogo.jpeg"
        alt="Logo"
        boxSize="80px"
        rounded={10000}
      />
    </Box>
  );
};

export default Logo;
