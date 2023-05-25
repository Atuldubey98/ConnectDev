import "./CommonField.css"
type CommonFieldProps = {
  head: string
  text: string | number
}
export default function CommonField(props: CommonFieldProps) {
  return (typeof props.text === "string" && props.text.length) ||
    typeof props.text === "number" ? (
    <div className="common__field">
      <span className="head">{props.head} : </span>
      <span>{props.text}</span>
    </div>
  ) : null
}
