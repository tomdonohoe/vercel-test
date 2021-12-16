import { FunctionComponent } from "react";

import CopyableTextBox from './CopyableTextBox';


import { LinkGenerator } from '../../helpers/util/linkGenerator.helper';

interface InviteLinkProps {
    gameId: string;
}

const InviteLink: FunctionComponent<InviteLinkProps> = ({
    gameId,
}) => {

    const generateInviteLink = (gameId: string) => {
        const linkGenerator = new LinkGenerator(window.location);
        return linkGenerator.linkTo({ gameId: gameId, join: true });
    }

    return (
        <>
            <div>
            <h2>Invite your friends!</h2>
            <p>Share this link to invite people to play:</p>
            <CopyableTextBox link={generateInviteLink(gameId)}/>
            </div>
        </>
    )
}

export default InviteLink;