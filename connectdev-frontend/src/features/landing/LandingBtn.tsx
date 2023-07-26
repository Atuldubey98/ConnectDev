import { IconType } from "react-icons";
import { Link } from "react-router-dom";
export type LandingBtnProps = {
    to: string;
    Icon: IconType
    lable: string;
}
export default function LandingBtn(props: LandingBtnProps) {
    const { to, Icon, lable } = props;
    return <Link to={"/posts"} className="landign__btn d-flex-center">
        <Icon />
        <span>{lable}</span>
    </Link>
}