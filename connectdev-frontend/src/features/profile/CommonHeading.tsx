export default function CommonHeading({ text }: { text: string }) {
  return (
    <p
      style={{
        fontWeight: "700",
        textTransform: "capitalize",
      }}
    >
      {text}
    </p>
  )
}
