// src/components/dashboard/InsProd.jsx

import Header2 from "../../Header2";
import Footer from "../../footer";
import React, { useState, useEffect } from "react";
import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  IconButton,
  Spinner,
  Divider,
} from "@chakra-ui/react";
import { MdSearch } from "react-icons/md";
import axios from "axios";
import { disassemble } from "es-hangul";
import { Link, useLocation } from "react-router-dom"; // useLocation 임포트
import { motion, AnimatePresence } from "framer-motion";
import "../../css/Custom.css";

const categories = [
  "전체",
  "자동차",
  "운전자",
  "여행",
  "건강",
  "반려동물",
  "생활",
  "레저",
  "사고",
];

// 카테고리별 색상 매핑
const categoryColors = {
  전체: "bg-gray-200 text-gray-800",
  자동차: "bg-blue-300 text-white",
  운전자: "bg-green-300 text-white",
  여행: "bg-yellow-300 text-white",
  건강: "bg-red-300 text-white",
  반려동물: "bg-purple-300 text-white",
  생활: "bg-pink-300 text-white",
  레저: "bg-indigo-300 text-white",
  사고: "bg-orange-300 text-white",
  // 필요에 따라 추가 카테고리 및 색상 매핑
};

// 카테고리별 아이콘 매핑 (선택 사항)
const categoryIcons = {
  자동차: "🚗",
  운전자: "👨‍✈️",
  여행: "✈️",
  건강: "💊",
  반려동물: "🐶",
  생활: "🏠",
  레저: "🎣",
  사고: "⚠️",
  // 필요에 따라 추가 카테고리 및 아이콘 매핑
};

const InsProd = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("전체");
  const [loading, setLoading] = useState(true);

  const location = useLocation(); // useLocation 초기화

  useEffect(() => {
    axios
      .get("http://localhost:8080/api/user/my-prod/mini-products")
      .then((response) => {
        if (Array.isArray(response.data)) {
          setProducts(response.data);
          setLoading(false);
        } else {
          console.error("API 응답이 배열이 아닙니다:", response.data);
          setProducts([]);
          setLoading(false);
        }
      })
      .catch((error) => {
        console.error("보험 상품을 가져오는 중 오류 발생", error);
        setProducts([]);
        setLoading(false);
      });
  }, []);

  // 검색어 또는 상품 목록이 변경될 때 필터링 수행
  useEffect(() => {
    let filtered = products;

    if (searchTerm) {
      const disassembledKeyword = disassemble(searchTerm);
      filtered = filtered.filter((product) => {
        const disassembledName = disassemble(product.insuranceName);
        return disassembledName.includes(disassembledKeyword);
      });
    }

    if (selectedCategory !== "전체") {
      filtered = filtered.filter(
        (product) => product.insuranceCategory === selectedCategory
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory]);

  // 쿼리 파라미터에서 검색어 가져오기
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const searchParam = params.get("search");
    if (searchParam) {
      setSearchTerm(searchParam);
    }
  }, [location.search]);

  // 검색어를 업데이트하고 필터링
  const updateSearchTerm = (term) => {
    if (typeof term !== "string") {
      console.error("Search term must be a string");
      return;
    }
    setSearchTerm(term);
    const disassembledKeyword = disassemble(term);
    const results = products.filter((product) => {
      const disassembledName = disassemble(product.insuranceName);
      return disassembledName.includes(disassembledKeyword);
    });
    setFilteredProducts(results);
  };

  const handleFilter = (category) => {
    setSelectedCategory(category);
    if (category === "전체") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) => product.insuranceCategory === category
      );
      setFilteredProducts(filtered);
    }
  };

  const handleSearch = (event) => {
    const keyword = event.target.value;
    updateSearchTerm(keyword);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <Spinner size="xl" />
      </Box>
    );
  }

  return (
    <div>
      <div className="MyIns overflow-auto bg-[#f2f6f5]">
        <Header2 />
        <div
          className="h-[200px] w-[1200px] top-[120px] rounded-[20px] bg-cover"
          style={{ backgroundImage: "url('/rainbow_BG.jpg')" }}
        >
          <p className="mt-[50px] z-10 flex items-center justify-center font-hanaLight ">
            <strong className="text-[35px] ">하나 미니 보험 상품</strong>
          </p>
          <p className="text-[25px] mt-[20px] z-10 flex items-center justify-center font-hanaLight ">
            오늘 바로 보장 받으세요!
          </p>
        </div>
        {/* <p className="text-[30px] mt-[30px]">
          하나 미니 보험 상품 <br /> 오늘 바로 보장 받으세요!
        </p> */}

        <div className="flex justify-start w-[600px] mt-12 text-[17px]">
          <span className="text-[#54d2c4] mr-3 font-bold ">하나 미니 보험</span>{" "}
          어떤 상품을 찾으시나요?
        </div>

        {/* 검색바 */}
        <Box
          mb={4}
          className="flex justify-start w-[600px] mt-4 relative bg-white"
        >
          <InputGroup>
            <Input
              placeholder="검색어를 입력하세요..."
              value={searchTerm}
              onChange={handleSearch}
            />
            <InputRightElement>
              <IconButton
                aria-label="search"
                icon={<MdSearch />}
                onClick={() => updateSearchTerm(searchTerm)}
              />
            </InputRightElement>
          </InputGroup>
        </Box>

        <div className="ml-8 mt-[55px] flex">
          {/* 필터 버튼 */}
          <div className="flex flex-col items-start space-y-6 px-4 py-4">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleFilter(category)}
                className={`px-4 py-2 border border-gray-300 rounded-[25px] w-[200px] focus:outline-none ${
                  selectedCategory === category
                    ? "bg-[#54d2c4] text-white"
                    : "hover:bg-[#54d2c4]"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* 상품 리스트 */}
          <div className="grid grid-cols-1 md:grid-cols-3 w-[930px] h-[600px] overflow-y-auto custom-scrollbar gap-8">
            <AnimatePresence>
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.insuranceId}
                  layout
                  initial={{ opacity: 1, y: 0 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.45 }}
                  className="border border-gray-300 bg-white w-[280px] h-[230px] rounded-[15px] overflow-hidden flex flex-col justify-between"
                >
                  <div className="p-4 w-full">
                    {/* 보험 이름 */}
                    <h3
                      className="font-bold text-[20px] m-2 truncate"
                      title={product.insuranceName}
                    >
                      {product.insuranceName}
                    </h3>
                    <Divider />
                    {/* 보험 설명 */}
                    <p
                      className="text-gray-500 mt-2 mb-4 truncate"
                      title={product.description}
                    >
                      {product.description}
                    </p>

                    {/* 카테고리 배지 추가 */}
                    <div className="flex justify-end items-center space-x-2 mt-10">
                      {/* 카테고리 아이콘 (선택 사항) */}
                      {categoryIcons[product.insuranceCategory] && (
                        <span className="text-lg">
                          {categoryIcons[product.insuranceCategory]}
                        </span>
                      )}
                      {/* 카테고리 배지 */}
                      <span
                        className={`px-2 py-1 rounded-full text-sm font-semibold ${
                          categoryColors[product.insuranceCategory] ||
                          "bg-gray-200 text-gray-800"
                        }`}
                      >
                        {product.insuranceCategory}
                      </span>
                    </div>
                  </div>
                  <Link to={product.link}>
                    <div className="bg-[#54d2c4] text-white text-center py-3 cursor-pointer hover:bg-[#32867d]">
                      상세보기
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>

        <div className="mb-8" />
      </div>
      <Footer />
    </div>
  );
};

export default InsProd;
