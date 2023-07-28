import { LegacyRef, TextareaHTMLAttributes, forwardRef, memo } from "react";

export interface NewPostTextAreaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    textErrTxt: string;
}
const NewPostTextArea = forwardRef((props: NewPostTextAreaProps, ref: LegacyRef<HTMLTextAreaElement>) => {
    const { textErrTxt, ...textareaProps } = props;
    return <>
        <textarea
            ref={ref}
            {...textareaProps}
        />
        <div className="create__errTxt">{textErrTxt}</div>
    </>
})

export default memo(NewPostTextArea);