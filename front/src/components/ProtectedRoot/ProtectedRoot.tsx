import React, {ReactElement} from "react";
import {Navigate} from "react-router-dom";
import {User} from "../../types";

interface Props extends React.PropsWithChildren {
    isAllowed: User | null
}

const ProtectedRoot: React.FC<Props> = ({isAllowed, children}) => {
    if (!isAllowed) {
        return <Navigate to="/login"/>
    }
    return children as ReactElement
};

export default ProtectedRoot;