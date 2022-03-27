import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  body {
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #1e262b;
    font-family: "Maven Pro", sans-serif;
    margin: 0;
    height: 100vh;
    width: 100vw;
    color: floralwhite;
  }
`;

export default GlobalStyles;
