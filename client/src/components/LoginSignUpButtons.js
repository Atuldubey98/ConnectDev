import { Link } from "react-router-dom";

export default function LoginSignUpButtons({ buttonName, linkName, to }) {
  return (
    <div className=" mb-3 d-flex flex-column align-items-center">
      <button type="submit" className="btn btn-success mb-1">
        {buttonName}
      </button>
      <Link to={to}>{linkName}</Link>
    </div>
  );
}
