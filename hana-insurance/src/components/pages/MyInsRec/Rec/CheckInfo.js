import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux"; // 리덕스에서 useSelector 가져오기
import { motion } from "framer-motion";

import {
  Box,
  Container,
  Input,
  RadioGroup,
  Radio,
  Stack,
  Button,
  Text,
  Image,
} from "@chakra-ui/react";
import Header2 from "../../../Header2";
import Footer from "../../../footer";

const CheckInfo = () => {
  // 리덕스에서 userInfo 가져오기
  const userInfoFromStore = useSelector((state) => state.user.userInfo);

  // 사용자 정보 상태 관리
  const [userInfo, setUserInfo] = useState(userInfoFromStore);

  // 수정 가능 상태 관리
  const [isEditable, setIsEditable] = useState(false);

  // 입력값이 변경될 때 호출되는 함수
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserInfo({
      ...userInfo,
      [name]: value,
    });
  };

  // 수정 모드 토글
  const toggleEdit = () => {
    setIsEditable(!isEditable);
  };

  // 수정 내용 저장
  const saveChanges = () => {
    console.log("저장된 정보:", userInfo);
    // 여기에 저장 로직 추가 (예: API 호출)
    setIsEditable(false);
  };

  return (
    <>
      <div className="MyIns flex min-h-screen">
        <Header2 />
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.3 }}
          style={{ position: "relative", minHeight: "calc(100vh - 70px)" }}
        >
          <div className="mt-10 mb-3">
            <h1 className="text-[40px] font-bold mb-4">추천하기 전에!</h1>
            <p className="text-3xl text-gray-600 mb-8">
              고객님의 정보를 먼저 확인해주세요
            </p>
          </div>
          <div className="flex-grow flex flex-col items-center justify-center">
            <Box
              bg="#F1FFFE"
              border="1px solid #54D2C4"
              borderRadius="20px"
              p={8}
              width="420px"
              textAlign="center"
              boxShadow="lg"
            >
              <Box display="flex" alignItems="center" mb={4}>
                <div>
                  <Text
                    fontSize="3xl"
                    fontWeight="bold"
                    textAlign="start"
                    mb={2}
                  >
                    신원정보 확인
                  </Text>
                  <Text fontSize="12px" mb={8}>
                    고객님의 정보가 맞는지 확인해주세요
                  </Text>
                </div>
                <Image
                  src="/3dicons_shield2.png"
                  alt="shield icon"
                  boxSize="60px"
                  ml="60px"
                  mb="30px"
                />
              </Box>
              <div className="flex">
                <div className="left w-1/2">
                  <Box mb={8} textAlign="left">
                    <Text fontWeight="light">이름</Text>
                  </Box>
                  <Box mb={8} textAlign="left">
                    <Text fontWeight="light">생년월일</Text>
                  </Box>
                  <Box mb={8} textAlign="left">
                    <Text fontWeight="light">성별</Text>
                  </Box>
                  <Box mb={8} textAlign="left">
                    <Text fontWeight="light">휴대폰 번호</Text>
                  </Box>
                </div>
                <div className="right w-1/2">
                  <Box textAlign="left">
                    {isEditable ? (
                      <Input
                        name="name"
                        value={userInfo.name}
                        onChange={handleInputChange}
                        mb={4}
                      />
                    ) : (
                      <Text fontWeight="bold" mb={8}>
                        {userInfo.name}
                      </Text>
                    )}
                  </Box>
                  <Box textAlign="left">
                    {isEditable ? (
                      <Input
                        name="birthDate"
                        value={userInfo.birthDate}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Text fontWeight="bold" mb={8}>
                        {userInfo.birthDate}
                      </Text>
                    )}
                  </Box>
                  <Box textAlign="left">
                    {isEditable ? (
                      <RadioGroup
                        name="gender"
                        value={userInfo.gender}
                        onChange={handleInputChange}
                        my={4}
                      >
                        <Stack direction="row">
                          <Radio value="M" colorScheme="teal">
                            남
                          </Radio>
                          <Radio value="F" colorScheme="teal">
                            여
                          </Radio>
                        </Stack>
                      </RadioGroup>
                    ) : (
                      <Text fontWeight="bold" mb={8}>
                        {userInfo.gender === "M" ? "남" : "여"}
                      </Text>
                    )}
                  </Box>
                  <Box textAlign="left">
                    {isEditable ? (
                      <Input
                        name="phone"
                        value={userInfo.phone}
                        onChange={handleInputChange}
                      />
                    ) : (
                      <Text fontWeight="bold" mb={8}>
                        {userInfo.phone}
                      </Text>
                    )}
                  </Box>
                </div>
              </div>
              <div className="flex mt-5">
                <Image
                  src="https://day.hanainsure.co.kr/static/resources/platform/oneday/images/common/icon_info.svg"
                  alt="느낌표"
                  ml={3}
                  mr={2}
                />
                <Text fontSize="sm" color="gray.500">
                  틀린 정보가 있으면 수정하기 버튼을 눌러주세요
                </Text>
              </div>
            </Box>

            <Stack direction="row" spacing={4} my={8}>
              {isEditable ? (
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={saveChanges}
                  bg="#54D2C4"
                  color="white"
                  _hover={{ bg: "#43b1a2" }}
                  fontSize="m"
                  fontWeight="Light"
                >
                  저장하기
                </Button>
              ) : (
                <Button
                  colorScheme="teal"
                  size="lg"
                  onClick={toggleEdit}
                  bg="#54D2C4"
                  color="white"
                  _hover={{ bg: "#43b1a2" }}
                  fontSize="m"
                  fontWeight="Light"
                >
                  수정하기
                </Button>
              )}
              <Link to="/MyInsRec/Choice">
                <Button
                  colorScheme="teal"
                  size="lg"
                  bg="#54D2C4"
                  color="white"
                  _hover={{ bg: "#43b1a2" }}
                  fontSize="m"
                  fontWeight="Light"
                >
                  추천하기
                </Button>
              </Link>
            </Stack>
          </div>
          <div className="my-10"></div>
        </motion.div>
      </div>
      <Footer />
    </>
  );
};

export default CheckInfo;
