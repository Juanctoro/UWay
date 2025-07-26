import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Seguridad = ({ size = 24, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 -15 20 60"
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 15.998h.015m5.985 0h.015m5.985 0h.015m5.985 1.5c0 7.499-5.25 11.248-11.49 13.423a1.5 1.5 0 0 1-1.005-.015C6.25 28.746 1 24.996 1 17.498V7a1.5 1.5 0 0 1 1.5-1.5c3 0 6.75-1.8 9.36-4.08a1.755 1.755 0 0 1 2.28 0C16.765 3.716 20.5 5.5 23.5 5.5A1.5 1.5 0 0 1 25 7v10.498Z"
    />
  </Svg>
);