import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Cuenta = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={17}
    height={20}
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M15.5 19v-2a4 4 0 0 0-4-4h-6a4 4 0 0 0-4 4v2m11-14a4 4 0 1 1-8 0 4 4 0 0 1 8 0Z"
    />
  </Svg>
);
