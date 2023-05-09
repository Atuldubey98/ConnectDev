import "./FilterComp.css"
import { GoSearch } from "react-icons/go"
export default function FilterComp() {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }
  return (
    <section className="filter__comp d-flex-center">
      <form className="d-flex-center" onSubmit={onSubmit}>
        <input placeholder="Search for post" />
        <GoSearch size={18} />
      </form>
      
    </section>
  )
}
