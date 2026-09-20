import { ImageResponse } from "next/og"

import { LOGO_PATH } from "@/components/Logo"

export const size = {
  width: 180,
  height: 180,
}

export const contentType = "image/png"

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#faf9f5",
        }}
      >
        <svg
          width="128"
          height="128"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path fill="#171717" fillRule="evenodd" d={LOGO_PATH} />
        </svg>
      </div>
    ),
    { ...size }
  )
}
