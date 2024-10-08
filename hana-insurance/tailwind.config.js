module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // src 디렉토리 하위의 모든 파일을 대상으로
  ],
  theme: {
    extend: {
      fontFamily: {
        hanaLight: ["Hana2Light", "sans-serif"], // 'Hana2-Light.otf'에 대한 사용자 정의 글꼴 설정
        hanaMedium: ["Hana2Medium", "sans-serif"], // 'Hana2-Medium.otf'에 대한 사용자 정의 글꼴 설정
      },
    },
  },
  plugins: [],
};
