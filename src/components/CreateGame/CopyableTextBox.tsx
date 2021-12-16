import { FunctionComponent } from "react";

interface CopyableTextBoxProps {
    link: string;
}

const CopyableTextBox: FunctionComponent<CopyableTextBoxProps> = ({
    link,
}) => {

    const handleClick = () => {
        navigator.clipboard.writeText(link);
    }

    return (
        <div>
        <span id="copyLinkInputBox">{ link }</span>
        <input type="button" onClick={handleClick} value="Copy link" />
      </div>
    )
}

export default CopyableTextBox;