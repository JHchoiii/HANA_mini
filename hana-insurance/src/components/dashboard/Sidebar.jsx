// src/components/layout/Sidebar.jsx
import React, { useContext, useEffect } from "react";
import {
  Box,
  CloseButton,
  Flex,
  Icon,
  Link,
  Text,
  VStack,
  Circle,
} from "@chakra-ui/react";
import { MdDashboard, MdPeople, MdVideocam } from "react-icons/md";
import styled from "styled-components";
import { ConsultationContext } from "../../contexts/ConsultationContext"; // 컨텍스트 임포트
import { useLocation } from "react-router-dom";

const LinkItems = [
  { name: "대시보드", icon: MdDashboard, path: "/dashboard/main" }, // 대시보드 경로
  { name: "청구 관리", icon: MdPeople, path: "/dashboard/claimManagement" }, // 예시 청구 관리 페이지
  { name: "회원 상담", icon: MdVideocam, path: "/dashboard/consultation" }, // 회원 상담 경로
];

const LogoContainer = styled.a`
  text-decoration: none;
  color: #444;
  font-size: 2rem;
  font-weight: bold;
  position: absolute; /* VisualArea 내부의 다른 absolute 요소들과 충돌을 피함 */
  top: 20px; /* VisualArea 내부에서의 위치 */
  left: 30px; /* VisualArea 내부에서의 위치 */
  z-index: 1000;
`;

const Sidebar = ({ isOpen, onClose }) => {
  const { hasNewRequest, clearRequest } = useContext(ConsultationContext);
  const location = useLocation();

  // Clear the request when the user navigates to the consultation page
  useEffect(() => {
    if (location.pathname === "/dashboard/consultation" && hasNewRequest) {
      clearRequest();
    }
  }, [location.pathname, hasNewRequest, clearRequest]);

  return (
    <Box
      bg="gray.50"
      borderRight="1px"
      borderRightColor="gray.200"
      w={{ base: "full", md: 60 }}
      pos="fixed"
      h="full"
      boxShadow="md"
    >
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
        {/* Sidebar header */}
        <LogoContainer href="/" title="하나미니">
          <span className="text-teal-200">Hana</span>
          Mini
        </LogoContainer>
        <CloseButton display={{ base: "flex", md: "none" }} onClick={onClose} />
      </Flex>

      {/* Sidebar Links */}
      <VStack align="stretch" spacing={2} mt={4}>
        {LinkItems.map((link) => (
          <NavItem key={link.name} icon={link.icon} path={link.path}>
            {link.name}
            {link.name === "회원 상담" && hasNewRequest && (
              <Circle size="10px" bg="green.500" ml={2} />
            )}
          </NavItem>
        ))}
      </VStack>
    </Box>
  );
};

const NavItem = ({ icon, children, path }) => {
  return (
    <Link
      href={path}
      style={{ textDecoration: "none" }}
      _focus={{ boxShadow: "none" }}
    >
      <Flex
        align="center"
        p="4"
        mx="4"
        borderRadius="lg"
        role="group"
        cursor="pointer"
        _hover={{
          bg: "teal.50",
          color: "teal.700",
        }}
      >
        {icon && <Icon mr="4" fontSize="16" as={icon} />}
        <Text fontSize="sm">{children}</Text>
      </Flex>
    </Link>
  );
};

export default Sidebar;
