import * as React from "react"
import Svg, { Path } from "react-native-svg"
export const Camara = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={43}
    height={44}
    fill="none"
    {...props}
  >
    <Path
      stroke="#141B34"
      strokeLinecap="round"
      strokeWidth={3}
      d="M31.5 10c4.691 0 6.037 0 7.653 1.24.416.32.788.691 1.107 1.107C41.5 13.963 41.5 16.31 41.5 21v9c0 5.657 0 8.485-1.757 10.243C37.985 42 35.157 42 29.5 42h-16c-5.657 0-8.485 0-10.243-1.757C1.5 38.485 1.5 35.657 1.5 30v-9c0-4.691 0-7.037 1.24-8.653a6 6 0 0 1 1.107-1.107C5.463 10 6.81 10 11.5 10"
    />
    <Path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="m31.5 12-1.772-4.43c-.764-1.91-1.43-4.078-3.395-5.05C25.285 2 24.023 2 21.5 2s-3.785 0-4.833.52c-1.966.972-2.631 3.14-3.395 5.05L11.5 12"
    />
    <Path
      stroke="#141B34"
      strokeWidth={3}
      d="M28.5 26a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"
    />
    <Path
      stroke="#141B34"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M21.5 10h.018"
    />
  </Svg>
);