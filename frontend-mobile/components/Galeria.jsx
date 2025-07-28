import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Galeria = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={43}
    height={44}
    fill="none"
    {...props}
  >
    <Path
      stroke="#141B34"
      strokeWidth={3}
      d="M7.5 40c8.42-9.503 17.882-22.105 32-12.653"
    />
    <Path
      stroke="#141B34"
      strokeLinecap="round"
      strokeWidth={3}
      d="M25.5 4.005C24.56 4 21.561 4 20.5 4 11.543 4 7.065 4 4.282 6.782 1.5 9.565 1.5 14.043 1.5 23s0 13.435 2.782 16.218C7.065 42 11.543 42 20.5 42s13.435 0 16.218-2.782C39.394 36.54 39.495 32.294 39.5 24"
    />
    <Path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M31.5 13c.983 1.011 3.6 5 5 5m5-5c-.983 1.011-3.6 5-5 5m0 0V2"
    />
  </Svg>
);
