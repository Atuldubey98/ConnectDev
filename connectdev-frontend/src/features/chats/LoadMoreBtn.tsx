import { AiOutlineUp } from "react-icons/ai";
import ButtonWithIcon from "../common/ButtonWithIcon";
import './LoadMoreBtn.css';
export type LoadMoreBtnProps = {
    hasNextPage: boolean;
    onIncrementPage: VoidFunction;
}
export default function LoadMoreBtn(props: LoadMoreBtnProps) {

    return props.hasNextPage ? <div className="load__moreBtn d-flex-center">
        <ButtonWithIcon onClick={props.onIncrementPage}><AiOutlineUp /> <span style={{
            fontWeight: "bold"
        }}>Show more</span></ButtonWithIcon>
    </div> : null;
}