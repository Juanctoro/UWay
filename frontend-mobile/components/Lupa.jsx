import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Lupa = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={21}
    height={22}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2.417}
      d="m18.375 18.875-3.8-3.8m0 0a7 7 0 1 0-9.9-9.9 7 7 0 0 0 9.9 9.9Z"
    />
  </Svg>
);

