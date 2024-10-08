// Footer.js
import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  padding: 20px;
  width: 100%;
  background-color: #f9f9fb;
  color: #2d2d2d;
  text-align: center;
`;

const FooterLinks = styled.div`
  margin-top: 10px;

  a {
    color: #2d2d2d;
    margin-left: 10px;
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <div>©2023 Hana Insurance Co., Ltd. All Rights Reserved.</div>
      <FooterLinks>
        <a href="#">Terms of Service</a>
        <a href="#">Privacy Policy</a>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;
