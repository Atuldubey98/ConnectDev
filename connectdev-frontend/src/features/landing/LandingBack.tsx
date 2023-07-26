import banner from "../../assets/banner.svg"
import './LandingBack.css';
export default function LandingBack() {
    return <div className="landing__back">
        <div className="landing__banner d-flex-center">
            <img src={banner} alt="" width={40} height={40} />
            <h1>Devconnect</h1>
        </div>
        <p>Social Media application for developers</p>
    </div>
}