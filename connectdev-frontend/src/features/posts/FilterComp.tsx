import { GoSearch } from "react-icons/go"
import "./FilterComp.css"
import useSearchForm from "./useSearchForm"
import { useParams } from "react-router-dom"
import { memo } from "react"
function FilterComponent() {
  const { searchRef, large, onSubmit } = useSearchForm()
  const { search } = useParams()
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
          defaultValue={search}
        />
        <GoSearch size={18} />
      </form>
    </section>
  )
}
const FilterComp = memo(FilterComponent)
export default FilterComp
