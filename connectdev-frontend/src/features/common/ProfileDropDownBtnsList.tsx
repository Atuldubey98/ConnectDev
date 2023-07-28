import { AiFillEdit } from "react-icons/ai"
import { FaUserFriends } from "react-icons/fa"
import { CgProfile } from "react-icons/cg"

import LogoutBtn from "./LogoutBtn"
import ProfileDropDownBtn, { ProfileDropDownBtnProps } from "./ProfileDropDownBtn"

export default function ProfileDropDownBtnsList() {
    const PROFILE_DROPDOWNS: ProfileDropDownBtnProps[] = [
        {
            link: "/friends",
            Icon: FaUserFriends,
            heading: "Friends"
        },
        {
            link: "/profile",
            Icon: CgProfile,
            heading: "Profile"
        },
        {
            link: "/profile/edit",
            Icon: AiFillEdit,
            heading: "Edit Profile"
        }
    ]
    return <ul className="profile__dropdownItems">
        {
            PROFILE_DROPDOWNS.map(profileBtn => <ProfileDropDownBtn key={profileBtn.link} {...profileBtn} />)
        }
        <LogoutBtn />
    </ul>
}