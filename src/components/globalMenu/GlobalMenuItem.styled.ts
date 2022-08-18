import styled, { css, keyframes } from "styled-components";

const slide = keyframes`
  100% {
    transform: translateX(2px);
  }
`

export const GlobalMenuItemIconWrapper = styled.i`
  animation: ${slide} 800ms infinite;
`