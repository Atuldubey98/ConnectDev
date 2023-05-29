import { GoSearch } from "react-icons/go"
import "./FilterComp.css"
import useSearchFocus from "./useSearchFocus"
export default function FilterComp() {
  const onSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
  }
  const { searchRef, large } = useSearchFocus()
  return (
    <section className="filter__comp d-flex-center">
      <form
        style={{
          maxWidth: large ? "450px" : "400px",
          border: `2px solid ${large ? "darkgray" : "lightgray"}`,
        }}
        className="d-flex-center"
        onSubmit={onSubmit}
      >
        <input
          ref={searchRef}
          placeholder="Search for post or user"
          type="search"
        />
        <GoSearch size={18} />
      </form>
    </section>
  )
}
