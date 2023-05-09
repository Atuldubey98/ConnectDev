import "./InputText.css"
type InputTextProps = {
  onChange: (e: any) => void
  value: string
  name: string
}
export default function InputText({ name, value, onChange }: InputTextProps) {
  return (
    <div className="input__text">
      <textarea name={name} value={value} onChange={onChange} />
    </div>
  )
}
