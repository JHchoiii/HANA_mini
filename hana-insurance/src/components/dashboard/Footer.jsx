// src/components/layout/Footer.jsx

import React from "react";
import { Box, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Box bg="teal.500" color="white" py={4} textAlign="center">
      <Text>
        &copy; {new Date().getFullYear()} 하나 미니 보험. All rights reserved.
      </Text>
    </Box>
  );
};

export default Footer;
