import { memo } from "react";
import { IconType } from "react-icons"
import { useNavigate } from "react-router-dom"
export type ProfileDropDownBtnProps = {
    Icon: IconType;
    link: string;
    heading: string;
}
const ProfileDropDownBtn = (props: ProfileDropDownBtnProps) => {
    const navigate = useNavigate()
    const { Icon, link, heading } = props;
    return <li
        onClick={() => navigate(link)}
        className="d-flex-center"
    >
        <Icon />
        <span>{heading}</span>
    </li>
}
export default memo(ProfileDropDownBtn);