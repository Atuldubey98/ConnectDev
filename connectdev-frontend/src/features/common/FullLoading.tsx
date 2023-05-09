import React from "react"
import { ClockLoader } from "react-spinners"

export default function FullLoading() {
  return (
    <main
      style={{
        minHeight: "80svh",
      }}
      className="d-flex-center"
    >
      <ClockLoader color="var(--accent-color)" />
    </main>
  )
}
