import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Ajustes = ({ size = 24, ...props }) => (
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
      d="M30 52.4a22.4 22.4 0 0 0 0-44.8m0 44.8A22.4 22.4 0 0 1 7.6 30M30 52.4V58m0-50.4A22.4 22.4 0 0 0 7.6 30M30 7.6V2M7.6 30H2m33.6 0a5.6 5.6 0 1 1-11.2 0 5.6 5.6 0 0 1 11.2 0Zm0 0H58M44 54.248l-2.8-4.844m-14-24.248L16 5.752M54.248 44l-4.844-2.8M5.752 16l4.844 2.8M54.248 16l-4.844 2.8M5.752 44l4.844-2.8M44 5.752l-2.8 4.844m-14 24.248L16 54.248"
    />
  </Svg>
);
