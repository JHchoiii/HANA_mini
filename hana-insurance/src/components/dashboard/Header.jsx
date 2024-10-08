// src/components/layout/Header.jsx

import React from "react";
import {
  Box,
  Flex,
  IconButton,
  Text,
  Input,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { SearchIcon, BellIcon, SettingsIcon } from "@chakra-ui/icons";
import { FaUserCircle } from "react-icons/fa";

const Header = () => {
  return (
    <Box bg="gray.50" px={4} boxShadow="md">
      <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
        {/* Search bar */}
        <InputGroup
          w={{ base: "full", md: "400px" }}
          display={{ base: "none", md: "flex" }}
        >
          <InputLeftElement
            pointerEvents="none"
            children={<SearchIcon color="gray.400" />}
          />
          <Input type="text" placeholder="Type here..." />
        </InputGroup>

        <Flex alignItems={"center"}>
          {/* Notification, settings, and user profile icons */}
          <IconButton
            size={"lg"}
            variant="ghost"
            aria-label={"Notification"}
            icon={<BellIcon />}
          />
          <IconButton
            size={"lg"}
            variant="ghost"
            aria-label={"Settings"}
            icon={<SettingsIcon />}
          />
          <IconButton
            size={"lg"}
            variant="ghost"
            aria-label={"Profile"}
            icon={<FaUserCircle />}
          />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Header;
