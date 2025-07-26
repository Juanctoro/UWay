import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Historial = ({ size = 24, ...props }) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 60 60"
    fill="none"
    {...props}
  >
    <Path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M2 30A28 28 0 1 0 30 2a30.334 30.334 0 0 0-20.969 8.524L2 17.556m0 0V2m0 15.556h15.556M30 14.444V30l12.444 6.222"
    />
  </Svg>
);