import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  Image,
  Spinner,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Link,
  IconButton,
  useColorModeValue,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useToast,
  Badge,
} from "@chakra-ui/react";
import { FaDownload, FaArrowLeft, FaHome } from "react-icons/fa";
import Header2 from "../../../Header2";
import Footer from "../../../footer";
import { useSelector } from "react-redux";

const Claim2 = () => {
  const [claims, setClaims] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedClaim, setSelectedClaim] = useState(null);
  const user = useSelector((state) => state.user.userInfo);
  const toast = useToast();

  const headerTextColor = useColorModeValue("teal.600", "teal.300");

  useEffect(() => {
    if (user && user.id) {
      // 청구 내역 가져오기
      axios
        .get(
          `http://localhost:8080/api/user/my-ins/my-claims?memberId=${user.id}`
        )
        .then((response) => {
          console.log("청구 내역:", response.data); // 데이터 로깅
          setClaims(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching claims data:", error);
          toast({
            title: "청구 내역 불러오기 실패",
            description: "청구 내역을 불러오는 데 실패했습니다.",
            status: "error",
            duration: 5000,
            isClosable: true,
          });
          setLoading(false);
        });
    }
  }, [user, toast]);

  const handleFileView = (claim) => {
    setSelectedClaim(claim);
    onOpen();
  };

  return (
    <>
      <Box className="MyIns flex flex-col justify-between min-h-screen">
        <Header2 />
        <Container maxW="container.xl" p={6}>
          {/* 상단 네비게이션 */}
          <Flex mb={4} justify="space-between" align="center" direction="row">
            <Button
              onClick={() => window.history.back()}
              colorScheme="teal"
              variant="ghost"
              leftIcon={<FaArrowLeft />}
            >
              뒤로가기
            </Button>
            <Breadcrumb
              spacing="8px"
              separator=">"
              color={headerTextColor}
              mr="120px"
            >
              <BreadcrumbItem>
                <BreadcrumbLink href="#">
                  <Flex align="center">
                    <FaHome style={{ marginRight: "8px" }} />홈
                  </Flex>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">마이 보험</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem>
                <BreadcrumbLink href="#">청구 내역</BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
            <Box />
          </Flex>

          {/* 청구 내역 리스트 */}
          <Box
            p={6}
            rounded="md"
            width="100%"
            maxW="1000px"
            mx="auto"
            bg="gray.50"
            boxShadow="md"
          >
            <Text fontSize="2xl" fontWeight="bold" mb="4">
              내 청구 내역
            </Text>
            {loading ? (
              <Flex justify="center" align="center" height="100px">
                <Spinner size="xl" />
              </Flex>
            ) : claims.length > 0 ? (
              <Table variant="simple" border="1px" borderColor="gray.200">
                <Thead bg="gray.100">
                  <Tr>
                    <Th border="1px" borderColor="gray.200">
                      청구 날짜
                    </Th>
                    <Th border="1px" borderColor="gray.200">
                      계약 번호
                    </Th>
                    <Th border="1px" borderColor="gray.200">
                      상태
                    </Th>
                    <Th border="1px" borderColor="gray.200">
                      자세히 보기
                    </Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {claims.map((claim) => (
                    <Tr key={claim.claimId}>
                      <Td border="1px" borderColor="gray.200">
                        {new Date(claim.accidentDate).toLocaleDateString()}
                      </Td>
                      <Td border="1px" borderColor="gray.200">
                        {claim.selectedInsurance}
                      </Td>
                      <Td border="1px" borderColor="gray.200">
                        <Badge
                          colorScheme={
                            claim.status === "승인 완료"
                              ? "green"
                              : claim.status === "승인 대기"
                              ? "yellow"
                              : "red"
                          }
                        >
                          {claim.status}
                        </Badge>
                      </Td>
                      <Td
                        border="1px"
                        borderColor="gray.200"
                        className="flex justify-center"
                      >
                        <Button
                          size="sm"
                          colorScheme="teal"
                          onClick={() => handleFileView(claim)}
                        >
                          자세히 보기
                        </Button>
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>
            ) : (
              <Text color="gray.500">청구 내역이 없습니다.</Text>
            )}
          </Box>
        </Container>

        {/* 청구 세부사항 모달 */}
        <Modal
          isOpen={isOpen}
          onClose={() => {
            setSelectedClaim(null);
            onClose();
          }}
          size="xl"
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>청구 세부사항</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              {selectedClaim && (
                <Box
                  border="1px"
                  borderColor="gray.200"
                  borderRadius="md"
                  overflow="hidden"
                >
                  <Table
                    variant="simple"
                    width="100%"
                    border="1px"
                    borderColor="gray.300"
                  >
                    <Tbody>
                      <Tr>
                        <Th
                          width="150px"
                          border="1px"
                          borderColor="gray.300"
                          background="gray.200"
                        >
                          사고 날짜
                        </Th>
                        <Td border="1px" borderColor="gray.300">
                          {new Date(
                            selectedClaim.accidentDate
                          ).toLocaleDateString()}
                        </Td>
                      </Tr>
                      <Tr>
                        <Th
                          border="1px"
                          borderColor="gray.300"
                          background="gray.200"
                        >
                          계약 번호
                        </Th>
                        <Td border="1px" borderColor="gray.300">
                          {selectedClaim.selectedInsurance}
                        </Td>
                      </Tr>
                      <Tr>
                        <Th
                          border="1px"
                          borderColor="gray.300"
                          background="gray.200"
                        >
                          상태
                        </Th>
                        <Td border="1px" borderColor="gray.300">
                          <Badge
                            colorScheme={
                              selectedClaim.status === "승인 완료"
                                ? "green"
                                : selectedClaim.status === "승인 대기"
                                ? "yellow"
                                : "red"
                            }
                          >
                            {selectedClaim.status}
                          </Badge>
                        </Td>
                      </Tr>
                      <Tr>
                        <Th
                          border="1px"
                          borderColor="gray.300"
                          height="200px"
                          background="gray.200"
                        >
                          사고 내용
                        </Th>
                        <Td
                          border="1px"
                          borderColor="gray.300"
                          whiteSpace="pre-wrap"
                        >
                          {selectedClaim.description}
                        </Td>
                      </Tr>
                      <Tr>
                        <Th
                          border="1px"
                          borderColor="gray.300"
                          background="gray.200"
                        >
                          서류 발급처
                        </Th>
                        <Td border="1px" borderColor="gray.300">
                          {selectedClaim.documentIssuer}
                        </Td>
                      </Tr>
                      <Tr>
                        <Th
                          border="1px"
                          borderColor="gray.300"
                          background="gray.200"
                        >
                          첨부 서류
                        </Th>
                        <Td border="1px" borderColor="gray.300">
                          {selectedClaim.documents &&
                          selectedClaim.documents.length > 0 ? (
                            selectedClaim.documents.map((file, index) => (
                              <Flex key={index} align="center" mb={2}>
                                <Text>{file.fileName}</Text>
                                <Link
                                  href={`http://localhost:8080${file.fileUrl}`}
                                  isExternal
                                >
                                  <IconButton
                                    aria-label="파일 다운로드"
                                    icon={<FaDownload />}
                                    colorScheme="teal"
                                    size="sm"
                                    ml={2}
                                  />
                                </Link>
                                {/* 파일 미리보기 (이미지 파일일 경우) */}
                                {file.fileType &&
                                  file.fileType.startsWith("image") && (
                                    <Image
                                      src={`http://localhost:8080${file.fileUrl}`}
                                      alt={file.fileName}
                                      boxSize="100px"
                                      objectFit="cover"
                                      mt={2}
                                      ml={4}
                                      borderRadius="md"
                                    />
                                  )}
                              </Flex>
                            ))
                          ) : (
                            <Text>첨부된 파일이 없습니다.</Text>
                          )}
                        </Td>
                      </Tr>
                    </Tbody>
                  </Table>
                </Box>
              )}
            </ModalBody>
            <ModalFooter>
              <Button
                colorScheme="teal"
                onClick={() => {
                  setSelectedClaim(null);
                  onClose();
                }}
              >
                닫기
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>
      <Footer />
    </>
  );
};

export default Claim2;
