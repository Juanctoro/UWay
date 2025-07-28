import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Icono_Historial = ({ size = 24, ...props }) => (
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
      d="M1.5 10a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L1.5 6m0 0V1m0 5h5m4-1v5l4 2"
    />
  </Svg>
);
