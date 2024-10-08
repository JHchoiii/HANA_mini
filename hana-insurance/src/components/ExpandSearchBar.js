import React, { useState } from "react";
import {
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Box,
  Collapse,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const ExpandingSearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      //   height="100vh"
    >
      <InputGroup
        width={isOpen ? "400px" : "200px"}
        transition="width 0.4s ease-in-out"
      >
        <Input placeholder="Search..." />
        <InputRightElement>
          <IconButton
            icon={<SearchIcon />}
            onClick={handleToggle}
            variant="ghost"
          />
        </InputRightElement>
      </InputGroup>
    </Box>
  );
};

export default ExpandingSearchBar;
