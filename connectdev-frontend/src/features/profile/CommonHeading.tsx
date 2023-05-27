export default function CommonHeading({ text }: { text: string }) {
  return (
    <h2
      style={{
        textTransform: "capitalize",
      }}
    >
      {text}
    </h2>
  )
}
