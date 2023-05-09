import banner from "../../assets/banner.svg"

export default function Banner() {
  return (
    <div className="banner d-flex-center">
      <img src={banner} alt="" width={32} />
      <h1>Devconnect</h1>
    </div>
  )
}
