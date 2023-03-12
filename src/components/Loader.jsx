import React from "react";
import { Spin } from "antd";
import styled from "styled-components";

export const LoaderWrapper = styled.div`
  height: 81vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = () => (
  <LoaderWrapper>
    <Spin />
  </LoaderWrapper>
);

export default Loader;
