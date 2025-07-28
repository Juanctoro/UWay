import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Inicio = ({ size = 24, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
   width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 20.5v-8a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v8m-6-11a2 2 0 0 1 .709-1.528l7-6a2 2 0 0 1 2.582 0l7 6A2 2 0 0 1 19 9.5v9a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2v-9Z"
    />
  </Svg>
);
